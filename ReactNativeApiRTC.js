import React from 'react';
import { Picker, StyleSheet, Text, TouchableHighlight, View, Button } from 'react-native';
import { RTCView } from 'react-native-webrtc';

require('./apiRTC-React.min.js');

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 15,
        backgroundColor: 'white'
    },
    picker: {},
    remoteView: {
        width: 200,
        height: 150
    },
    selfView: {
        width: 200,
        height: 150,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

const initialState = {
    initStatus: 'Registration ongoing',
    info: '',
    status: 'ready',
    selfViewSrc: null,
    remoteList: new Map(),
    connectedUsersList: [],
    selected: null,
    callId: 0
};

export default class ReactNativeApiRTC extends React.Component {

    constructor(props) {
        super(props);

        this.state = initialState;

        this.ua = null;
        this.connectedSession = null;
        this.currentCall = null;
    }

    componentDidMount() {
        apiRTC.setLogLevel(4);
        this.ua = new apiRTC.UserAgent({
            cloudUrl: 'https://cloud.apizee.com',
            uri: 'apzkey:myDemoApiKey'
        });

        this.ua.register()
            .then((session) => {
                this.connectedSession = session;
                this.onSessionReady();
                this.connectedSession
                    .on('contactListUpdate', (updatedContacts) => {
                        this.onConnectedUsersListUpdate(updatedContacts);
                    })
                    .on('incomingCall', (invitation) => {
                        this.onIncomingCall(invitation);
                    })
            })
            .catch((err) => {
                console.error(err);
            });
    }

    onSessionReady() {
        this.setState({ status: 'ready', initStatus: 'You can be reached at this number :' + this.connectedSession.id, info: 'Select the destination number and Press "Video Call"' });
    }

    onConnectedUsersListUpdate(updatedContacts) {
        console.log('onConnectedUsersListUpdate', updatedContacts);

        var connectedUsersList = this.connectedSession
            .getOnlineContactsArray()
            .map(contact => contact.getId())
            .filter(id => id !== this.connectedSession.id);

        if (!this.state.selected && connectedUsersList[0] !== undefined) {
            this.state.selected = connectedUsersList[0];
        }
        this.setState({ connectedUsersList });
    }

    onIncomingCall(invitation) {
        console.log('Incoming call');
        this.setState({ status: 'connect', info: 'Incoming call from :' + invitation.getSender().getId() });

        invitation.accept()
            .then((call) => {
                this.setCallListeners(call);
            });
    }

    //

    call = () => {
        this.setState({ status: 'connect', info: 'Connecting' });
        var contact = this.connectedSession.getOrCreateContact(this.state.selected);
        var call = contact.call();
        if (call === null) {
            console.error("Cannot establish call");
            return;
        }
        this.setCallListeners(call);
        this.setState({ callId: call.getId() });
        this.currentCall = call;
    }

    hangUp = () => {
        if (this.currentCall) {
            this.currentCall.hangUp();
            this.currentCall = null;
        }
        this.manageHangup();
    }

    setCallListeners(call) {
        call
            .on('localStreamAvailable', (stream) => {
                this.onLocalMediaStream(stream);
            })
            .on("streamAdded", (stream) => {
                this.onRemoteStreamAdded(stream);
            })
            .on('hangup', () => {
                this.onHangup();
            });
    }

    onLocalMediaStream(stream) {
        console.log('onLocalMediaStream');
        this.setState({ selfViewSrc: stream.getData().toURL() });
    }

    onRemoteStreamAdded(stream) {
        console.log('onRemoteStreamAdded');
        this.setState({
            info: 'Call established', remoteList:
                this.state.remoteList.set(this.state.callId, stream.getData().toURL())
        });
    }

    onHangup() {
        console.log('onHangup');
        this.manageHangup();
    }

    manageHangup() {
        const remoteList = this.state.remoteList;
        remoteList.delete(this.state.callId);
        this.setState({
            status: 'ready',
            info: 'Select the destination number and Press "Video Call"',
            remoteList,
            selfViewSrc: undefined
        });
    }

    //

    render() {
        function renderPicker(ctx) {
            if (ctx.state.status !== 'ready') return null;
            return (
                <View>
                    <Picker
                        style={styles.picker}
                        mode='dropdown'
                        selectedValue={ctx.state.selected}
                        onValueChange={itemValue => ctx.setState({ selected: itemValue })}>
                        {ctx.state.connectedUsersList.length !== 0 ? ctx.state.connectedUsersList.map(item => <Picker.Item label={item} value={item} key={item} />) : [<Picker.Item label={'No other connected user'} value={'No other connected user'} key={'noOtherConnectedUser'} />]}
                    </Picker>
                    <Button
                        onPress={ctx.call}
                        title="Video Call"
                        color="#00CC00"
                        accessibilityLabel="Establish a video call"
                    />
                </View>
            );
        }

        function renderSelfView(ctx) {
            if (ctx.state.status === 'ready') return null;
            return <RTCView streamURL={ctx.state.selfViewSrc} style={styles.selfView} />
        }

        function renderRemoteViews(ctx) {
            return Array.from(ctx.state.remoteList.values()).map((value, index) => <RTCView key={index} streamURL={value} style={styles.remoteView} />);
        }

        function renderHangUp(ctx) {
            if (ctx.state.status !== 'connect') return null;
            return (
                <Button
                    onPress={ctx.hangUp}
                    title="Hangup"
                    color="#CC0000"
                    accessibilityLabel="Hangup the video call"
                />
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{this.state.initStatus}</Text>
                <Text style={styles.welcome}>{this.state.info}</Text>
                {renderPicker(this)}
                {renderSelfView(this)}
                {renderRemoteViews(this)}
                {renderHangUp(this)}
            </View>
        );
    }
}