'use strict';
import React, { Component } from 'react';
import { AppRegistry, Picker, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RTCView } from 'react-native-webrtc';

require('./apiRTC-React-latest.min.debug.js');

const styles = StyleSheet.create({
	callButton: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: '#00cc00',
		justifyContent: 'center',
		alignItems: 'center'
	},
	callButtonContainer: {
		width: 60,
		height: 60,
		borderRadius: 30
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
  picker: {
		minWidth: 80,
	},
	pickerItem: { color: 'white' },
  remoteView: {
    width: 200,
    height: 150
  },
  selfView: {
    width: 200,
    height: 150,
  },
  welcome: {
		flexShrink: 1,
    fontSize: 20,
		color: 'white',
    textAlign: 'center',
    margin: 10,
  }
});

const simulatorInfo = 'Looks like you are running on simulator. You can only be called from another device.';

const initialState = {
	initStatus : 'Registration ongoing',
	info: '',
	status: 'ready',
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
		this._hangup = this._hangup.bind(this);
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
		this.setState({status: 'ready', initStatus : 'You can be reached at this number :' + apiRTC.session.apiCCId , info: 'Select the destination number'});
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

  _hangup() {
    this.webRTCClient.hangUp();
    this._manageHangup();
  }

  _manageHangup() {
    this.setState({
			status: 'ready',
			info: this.state.info === simulatorInfo ? simulatorInfo : 'Select the destination number and Press "Video Call"',
			remoteViewSrc: null,
			selfViewSrc: null
		});
  }

	render () {

		function renderCallControls (ctx) {
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
					<TouchableOpacity
						style={ styles.callButtonContainer }
						onPress= { ctx._call }>
						<View style={ styles.callButton }>
							<Icon name='ios-call' style={ styles.callIcon }/>
						</View>
					</TouchableOpacity>
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

		function renderHangUp (ctx) {
			if (ctx.state.status !== 'connect') return null;
			return (
				<Button
					onPress={ ctx._hangup }
					title="Hangup"
					color="#CC0000"
					accessibilityLabel="Hangup the video call"
				/>
			);
		}

		return (
			<View style={ styles.container }>
				<Text style={ styles.welcome }>{ this.state.initStatus }</Text>
				<Text style={ styles.welcome }>{ this.state.info }</Text>
				{ renderCallControls(this) }
				{ renderRemoteView(this) }
				{ renderSelfView(this) }
				{ renderHangUp(this) }
			</View>
		);
	}
}

AppRegistry.registerComponent('reactNativeApiRTC', () => reactNativeApiRTC);
