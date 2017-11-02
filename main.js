'use strict';
import React, { Component } from 'react';
import { AppRegistry, Picker, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RTCView } from 'react-native-webrtc';

require('./apiRTC-React-latest.min.debug.js');

const styles = StyleSheet.create({
	buttonContainer: {
		position: 'absolute',
		bottom: 10,
		width: 60,
		height: 60,
		borderRadius: 30
	},
	callButton: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: '#00cc00',
		justifyContent: 'center',
		alignItems: 'center'
	},
	callIcon: {
		position: 'relative',
		left: 6,
		width: 40,
		height: 40,
		padding: 0,
		color: 'white',
		backgroundColor: 'rgba(0, 0, 0, 0)',
		fontSize: 40
	},
	callControls: {
		flexShrink: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center'
	},
	hangUpButton: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: '#cc0000',
		justifyContent: 'center',
		alignItems: 'center'
	},
	hangUpIcon: {
		position: 'relative',
		top: 5,
		left: -5,
		width: 40,
		height: 40,
		padding: 0,
		color: 'white',
		backgroundColor: 'rgba(0, 0, 0, 0)',
		fontSize: 40,
		transform: [ { rotateZ: '135deg' } ]
	},
  infoMessage: {
		flexShrink: 1,
    fontSize: 20,
		color: 'white',
    textAlign: 'center',
    marginTop: 30,
		marginBottom: -10
  },
  picker: {
		minWidth: 80,
	},
	pickerItem: {
		color: 'white'
	},
  remoteView: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
  selfView: {
    width: 200,
    height: 150,
  },
  statusMessage: {
		flexShrink: 1,
    fontSize: 20,
		color: 'white',
    textAlign: 'center',
    margin: 10,
  }
});

const selectNumber = 'Destination number:';
const simulatorInfo = 'Looks like you are running on simulator. You can only be called from another device.';

const initialState = {
	statusMessage : 'Registration ongoing',
	info: '',
	status: 'initializing', // status lifecycle: initializing > ready > connect
	selfViewSrc: null,
	remoteViewSrc: null,
	connectedUsersList: [],
	selected: 'key1',
	callId: 0
};

class reactNativeApiRTC extends Component {

	constructor (props) {
		super(props);
    this.webRTCClient = null;
		this.state = initialState;

		React.onSessionReady = this._onSessionReady.bind(this);
		React.onConnectedUsersListUpdate = this._onConnectedUsersListUpdate.bind(this);
		React.onUserMediaSuccess = this._onUserMediaSuccess.bind(this);
		React.onRemoteStreamAdded = this._onRemoteStreamAdded.bind(this);
		React.onIncomingCall = this._onIncomingCall.bind(this);
		React.onHangup = this._onHangup.bind(this);

		this._call = this._call.bind(this);
		this._hangUp = this._hangUp.bind(this);
		this._manageHangup = this._manageHangup.bind(this);
	}

  componentDidMount () {
    //apiRTC initialization
    apiRTC.init({ apiKey: 'myDemoApiKey' });
  }

  componentWillUnmount () {
    //apiRTC initialization
    apiRTC.disconnect();
  }

	_onSessionReady () {
		console.log('_onSessionReady :' + apiRTC.session.apiCCId);
		this.webRTCClient = apiRTC.session.createWebRTCClient({});
		this.setState({ status: 'ready', statusMessage : 'You can be reached at this number :' + apiRTC.session.apiCCId , info: selectNumber });
	}

	_onConnectedUsersListUpdate () {
	  console.log('_onConnectedUsersListUpdate');
	  this.setState({ connectedUsersList: apiRTC.session.getConnectedUsersList().map(user => user.userId).filter(id => id !== apiRTC.session.apiCCId) });
	}

	_onUserMediaSuccess (type, detail) {
	  console.log('_onUserMediaSuccess - type = ', type);
		console.log('_onUserMediaSuccess - detail = ', detail);
		// when running on simulator, device can only be called, it cannot call another device
		if (detail && detail.stream) this.setState({ selfViewSrc: detail.stream.toURL() });
		else this.setState({ info: simulatorInfo });
	}

	_onRemoteStreamAdded (type, detail) {
	  console.log('_onRemoteStreamAdded - type = ', type);
		console.log('_onRemoteStreamAdded - detail = ', detail);
		this.setState({ info: 'Call established', callId: detail.callId, remoteViewSrc: detail.stream.toURL() });
	}

	_onIncomingCall (type, detail) {
	  console.log('_onIncomingCall - type = ', type);
	  this.setState({ status: 'connect', info: 'Incoming call from :' + detail.callerId });
	};

	_onHangup (type, detail) {
	  console.log('_onHangup - type = ', type);
		console.log('_onHangup - detail = ', detail);
	  this._manageHangup();
	};

  _call () {
    this.setState({ status: 'connect', info: 'Connecting' });
    const callId = this.webRTCClient.call(this.state.selected);
		this.setState({ callId });
  }

  _hangUp() {
    this.webRTCClient.hangUp();
    this._manageHangup();
  }

  _manageHangup() {
    this.setState({
			status: 'ready',
			info: this.state.info === simulatorInfo ? simulatorInfo : selectNumber,
			remoteViewSrc: null,
			selfViewSrc: null
		});
  }

	render () {

		function renderPicker (ctx) {
			if (ctx.state.status !== 'ready' || ctx.state.info === simulatorInfo) return null;
			return (
				<View style={ styles.callControls }>
					<Picker
						style={ styles.picker }
						itemStyle={ styles.pickerItem }
						mode='dropdown'
						selectedValue={ ctx.state.selected }
						onValueChange={ itemValue => ctx.setState({ selected: itemValue }) }>
						{ ctx.state.connectedUsersList.length !== 0 ? ctx.state.connectedUsersList.map(item => <Picker.Item label={ item } value={ item } key={ item }/>) : [ <Picker.Item label={ 'No other connected user' } value={ 'No other connected user' } key={ 'noOtherConnectedUser' }/> ] }
					</Picker>
				</View>
			);
		}

		function renderSelfView (ctx) {
			if (ctx.state.status === 'ready' || !ctx.state.selfViewSrc) return null;
			return <RTCView streamURL={ ctx.state.selfViewSrc } style={ styles.selfView } objectFit='cover'/>
		}

		function renderRemoteView (ctx) {
			if (ctx.state.status === 'ready' || !ctx.state.remoteViewSrc) return null
			return <RTCView streamURL={ ctx.state.remoteViewSrc } style={ styles.remoteView } objectFit='cover'/>;
		}

		function renderCallButtons (ctx) {
			// not ready ('initializing') or simulator (simulatorInfo): render no button
			if (ctx.state.status === 'initializing' || ctx.state.info === simulatorInfo) return null;
			// no call in progress ('ready'): render call button
			if (ctx.state.status === 'ready') {
				return (
						<TouchableOpacity
						style={ styles.buttonContainer }
						onPress= { ctx._call }>
						<View style={ styles.callButton }>
							<Icon name='ios-call' style={ styles.callIcon }/>
						</View>
					</TouchableOpacity>
				);
			}
			// call in progress ('connect'): hangUp button
			return (
				<TouchableOpacity
					style={ styles.buttonContainer }
					onPress= { ctx._hangUp }>
					<View style={ styles.hangUpButton }>
						<Icon name='ios-call' style={ styles.hangUpIcon }/>
					</View>
				</TouchableOpacity>
			);
		}

		return (
			<View style={ styles.container }>
				<Text style={ styles.statusMessage }>{ this.state.statusMessage }</Text>
				<Text style={ styles.infoMessage }>{ this.state.info }</Text>
				{ renderPicker(this) }
				{ renderRemoteView(this) }
				{ renderSelfView(this) }
				{ renderCallButtons(this) }
			</View>
		);
	}
}

AppRegistry.registerComponent('reactNativeApiRTC', () => reactNativeApiRTC);
