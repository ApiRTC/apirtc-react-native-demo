'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  ListView,
  Platform,
  Picker,
} from 'react-native';

import {
  RTCView
} from 'react-native-webrtc';

require('./apiRTC-React-3.14.debug.js');

const Item = Picker.Item;
let callId = 0;
let webRTCClient = null;
let callNumber = 0;
let options =["No other connected user"];
let container;

function setInitialState() {
  container.setState({status: 'ready', info: 'Select the destination number and Press "Video Call"'});
  const remoteList = container.state.remoteList;
  delete remoteList[callId];
  container.setState({ remoteList: remoteList });
  container.setState({selfViewSrc: undefined});
}

React.onHangup = function(type, detail) {
  setInitialState();
};

React.onIncomingCall = function(type, detail) {
  container.setState({status: 'connect', info: 'Incoming call from :' + detail.callerId});
};

React.onUserMediaSuccess = function(type, detail) {
  container.setState({selfViewSrc: detail.stream.toURL()});
};

React.onRemoteStreamAdded = function(type, detail) {
  container.setState({info: 'Call established'});
  const remoteList = container.state.remoteList;
  remoteList[callId] = detail.stream.toURL();
  container.setState({ remoteList: remoteList });
};

function updateAddressBook () {

  console.log('updateAddressBook');
  var connectedUsersList = apiRTC.session.getConnectedUsersList(),
    length = connectedUsersList.length,
    i = 0;

  if (connectedUsersList.length !== 0) {
    //Cleaning addressBook list
    options =[];

    for (i = 0; i < length; i += 1) {
      //Checking if connectedUser is not current user befire adding in addressBook list
      if (connectedUsersList[i].userId !== apiRTC.session.apiCCId) {
          options.push(connectedUsersList[i].userId);
          container.onValueChange (connectedUsersList[i].userId, connectedUsersList[i].userId)
      }
    }
  }
}

React.onConnectedUsersListUpdate = function(type, detail) {
  console.log('onConnectedUsersListUpdate');
  updateAddressBook ();
};

React.onSessionReady = function(type, detail) {
  console.log('sessionReadyHandler :' + apiRTC.session.apiCCId);
  //webRTC Client creation
  webRTCClient = apiRTC.session.createWebRTCClient({
    //status : "status" //Optionnal
  });
  container.setState({status: 'ready', info: 'Select the destination number and Press "Video Call"'});
};

//apiRTC initialization
apiRTC.init({
  apiKey : "myDemoApiKey",
  apiCCId :123456
});

function mapHash(hash, func) {
  const array = [];
  for (const key in hash) {
    const obj = hash[key];
    array.push(func(obj, key));
  }
  return array;
}

const reactNativeApiRTC = React.createClass({
  getInitialState: function() {
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
    return {
      info: 'Initializing',
      status: 'init',
      selfViewSrc: null,
      remoteList: {},
      selected1: 'key1',
    };
  },
  componentDidMount: function() {
    container = this;
  },
  _call(event) {
    this.setState({status: 'connect', info: 'Connecting'});
    callId = webRTCClient.call(callNumber);
  },
  _hangup(event) {
    webRTCClient.hangUp();
    setInitialState();
  },
  onValueChange (key: string, value: string) {
    console.log('onValueChange');
    const newState = {};
    newState[key] = value;
    callNumber = value;
    this.setState(newState);
  },
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.info}
        </Text>
        { this.state.status == 'ready' ?
          (<View>
            <Picker
              style={styles.picker}
              mode="dropdown"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this, 'selected1')}>
              {options.map((item, index) => {
                return (<Item label={item} value={item} key={item}/>)
              })}
            </Picker>
            <TouchableHighlight
              onPress={this._call}>
              <Text style={styles.welcome}>Video Call</Text>
            </TouchableHighlight>
          </View>) : null
        }
        { this.state.status != 'ready' ?
          (<RTCView streamURL={this.state.selfViewSrc} style={styles.selfView}/>) : null
        }
        {
          mapHash(this.state.remoteList, function(remote, index) {
            return <RTCView key={index} streamURL={remote} style={styles.remoteView}/>
          })
        }
        { this.state.status == 'connect' ?
          (<TouchableHighlight
            onPress={this._hangup}>
            <Text style={styles.welcome}>Hangup</Text>
          </TouchableHighlight>) : null
        }
      </View>
    );
  }
});

const styles = StyleSheet.create({
  selfView: {
    width: 200,
    height: 150,
  },
  remoteView: {
    width: 200,
    height: 150,
    //width: config.screenWidth,
    //height: config.screenHeight
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    margin: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  listViewContainer: {
    height: 150,
  },
  picker: {
  },
});

AppRegistry.registerComponent('reactNativeApiRTC', () => reactNativeApiRTC);
