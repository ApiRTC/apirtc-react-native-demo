import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Switch,
    Dimensions,
    ScrollView,
    Pressable,
    TouchableOpacity,
    PanResponder,
    Platform,

} from 'react-native';
import { SvgUri } from 'react-native-svg';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices
} from 'react-native-webrtc';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

import DeviceInfo from 'react-native-device-info';

import '@apirtc/react-native-apirtc';
//import apiCC from '@apirtc/apirtc';
//import apiRTC from '@apirtc/apirtc';
import ForegroundService from './ForegroundService';
import Chat_apiRTC from './Chat_apiRTC';
import MovingViewWithPanResponder from './panSelfView';
import Svg_bubble_speech from "../assets/svg/Bubble-speech.js"
import { styles } from "./Styles";

/* Import SVG */
import Microphone_on from "../assets/svg/Microphone_on.js"
import Microphone_off from "../assets/svg/Microphone_off.js"
import ScreenShare_on from "../assets/svg/ScreenShare_on.js"
import ScreenShare_off from "../assets/svg/ScreenShare_off.js"
import Camera_off from "../assets/svg/Camera_off.js"
import Camera_on from "../assets/svg/Camera_on.js"
import Hangup from "../assets/svg/Hangup.js"
import Menu from "../assets/svg/Menu.js"
import Switch_camera from '../assets/svg/Switch_camera.js';
import Camera_record from '../assets/svg/Camera_record.js'

const initialState = {
    initStatus: 'Registration ongoing',
    info: '',
    status: 'pickConv',
    selfViewSrc: null,
    selfScreenSrc: null,
    remoteListSrc: new Map(),
    remoteList: new Map(),
    connectedUsersList: [],
    selected: null,
    callId: 0,
    roomName: 'defaultRoom',
    mute: false,        // --| Use for mute state and switch state
    muteVideo: false,   // --|
    chatOpen: false,
    screenUnderstood: false,
    screenDisableUnderStood: true,
    menuOpen: false,
    coordX: 0,
    coordY: 0,
    isRecording: false,

    switch_screenShare: false,
    newMessage: null,
    cameraIsFront: true,
    timer: null,

};

const defaultText = 'Select room';

export default class PeerToPeer extends React.Component {

    constructor(props) {
        super(props);
        console.log(DeviceInfo.getBundleId());
        this.state = initialState;

        this.ua = null;
        this.connectedSession = null;
        this.currentCall = null;
        this.conversation = null;
        this.localStream = null;
        this.localScreen = null;
        this.publishedLocalStream = null;
        this.publishedLocalScreen = null;
        this.chatChild = null;

        this.foreground = new ForegroundService();
    }

    componentDidMount() {    
        
        apiRTC.setLogLevel(0);

        this.setState({ remoteListSrc: new Map(), remoteList: new Map() })

        this.ua = new apiRTC.UserAgent({
            //cloudUrl: 'https://cloud.apizee.com',
            uri: 'apzkey:myDemoApiKey'
        });

        this.ua.register()
            .then((session) => {
                this.connectedSession = session;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    joinConversation() {
        this.setState({ status: 'onCall' });
        this.conversation.join()
            .then(() => {
                console.info('Conversation join');
                this.setState({ initStatus: 'Conversation join' });
                apiRTC.Stream.createStreamFromUserMedia().then((localStream) => {
                    this.localStream = localStream;
                    console.info("Update local stream");
                    this.conversation.publish(localStream).then((pubStream) => {
                        //console.error('published');
                        this.publishedLocalStream = pubStream;
                        this.setState({ selfViewSrc: localStream.getData().toURL() });
                    }).catch((err) => {
                        console.error('Error publish stream');
                        console.error(err);
                    });
                }).catch((err) => {
                    console.error(err);
                    console.error("Get self view : " + err);
                });
            }).catch((err) => {
                console.error(err);
            });
    }

    setListeners() {
        this.conversation.on("contactJoined", (newContact) => {
            console.info("REACT - Contact list change");
            let array_contact = this.state.connectedUsersList;
            array_contact.push(newContact.getUsername);
            this.setState({ connectedUsersList: array_contact });
            this.setState({ connectedUsersList: Object.values(this.state.connectedUsersList) });
        });

        this.conversation.on("streamAdded", (remoteStream) => {
            //Good subscription -> the we add
            let remoteStream_rtcView = remoteStream.getData().toURL();
            //set remote stream map
            this.setState({ remoteListSrc: this.state.remoteListSrc.set(remoteStream.getId(), remoteStream_rtcView) });
            this.setState({ remoteList: this.state.remoteList.set(remoteStream.getId(), remoteStream) });
        });

        this.conversation.on("streamListChanged", (streamInfo) => {
            if (streamInfo.listEventType === 'added' && streamInfo.isRemote === true) {
                //console.warn("Try to subscribe conversation");
                this.conversation.subscribeToStream(streamInfo.streamId)
                    .then(() => console.info("Subscribe to stream : " + streamInfo.streamId))
                    .catch((err) => {
                        console.error(err);
                        console.error("REACT - Failed to subscribe to stream");
                    });
                this.conversation.subscribeToStream(streamInfo.streamId);
            }
        });

        this.conversation.on('recordingAvailable', (recordingInfo) => {
            console.log('recordingInfo :', recordingInfo);
            console.warn('recordingInfo.mediaURL :', recordingInfo.mediaURL);
            //Media URL is the link to cloud.apizee forr look the stream
        });

        this.conversation.on("contactLeft", (contactLeft) => {
            let toDelete = [];
            this.state.remoteList.forEach(stream => {
                if (contactLeft.getUsername() == stream.getContact().getUsername()) {
                    toDelete.push(stream.getId());
                }
            });
            toDelete.forEach((streamId) => {
                if (this.state.remoteListSrc.get(streamId)) {
                    let updateRemoteListSrc = new Map(this.state.remoteListSrc);
                    updateRemoteListSrc.delete(streamId);
                    this.setState({ remoteListSrc: updateRemoteListSrc });

                    let updateRemoteList = new Map(this.state.remoteList);
                    updateRemoteList.delete(streamId);
                    this.setState({ remoteList: updateRemoteList });
                }
            });
        });
    }

    call = () => {
        //on video call
        if (this.connectedSession) {
            if (this.conversation) {
                this.conversation = null;
                this.call();
            } else {
                this.conversation = this.connectedSession.getOrCreateConversation(this.state.roomName, {
                    meshModeEnabled: true,
                    meshOnlyEnabled: true
                });
                this.setListeners();
                this.joinConversation();
            }
        } else {
            console.error("Hot reload kill session, press R");
        }
    }

    hangUp = () => {
        if (this.publishedLocalScreen) {
            this.conversation.unpublish(this.publishedLocalScreen);
        }
        if (this.publishedLocalStream) {
            this.conversation.unpublish(this.publishedLocalStream);
        }
        this.publishedLocalStream = null;
        this.publishedLocalScreen = null;
        this.localScreen = null;
        this.localStream = null;
        this.conversation.leave().then(() => {
            this.setState({ selfScreenSrc: null, selfViewSrc: null, status: 'pickConv', remoteListSrc: new Map(), connectedUsersList: [] });
        });
    }

    screenSharing = () => {
        if (this.state.selfScreenSrc) {
            this.foreground.stopService();
            this.setState({ selfScreenSrc: null });
            this.setState({ switch_screenShare: false });
            this.setState({ screenUnderstood: false });
            this.setState({ screenDisableUnderStood: false });
            this.conversation.unpublish(this.localScreen);
            this.localScreen = null;
        } else {
            this.foreground.startService('Screen sharing', 'is capturing your screen');
            const displayMediaStreamConstraints = {
                video: true,
                audio: false,
            }
            apiRTC.Stream.createScreensharingStream(displayMediaStreamConstraints).then((localScreenShare) => {
                this.localScreen = localScreenShare;
                this.setState({ selfScreenSrc: this.localScreen.getData().toURL() });
                this.conversation.publish(localScreenShare).then((publishedScreenShare) => {
                    this.publishedLocalScreen = publishedScreenShare;
                    this.setState({ switch_screenShare: true });
                }).catch((err) => {
                    console.error(err);
                });
            }).catch((err) => {
                console.error(err);
            });
        }
    }

    mute = () => {
        if (this.state.mute == false) {
            console.info('Mute');
            this.publishedLocalStream.disableAudio();
            this.setState({ mute: true });
        } else {
            console.info('Unmute');
            this.publishedLocalStream.enableAudio();
            this.setState({ mute: false });
        }
    }

    muteVideo = () => {
        if (this.state.muteVideo == false) {
            console.info('Mute');
            this.publishedLocalStream.disableVideo();
            this.setState({ muteVideo: true });
        } else {
            console.info('Unmute');
            this.publishedLocalStream.enableVideo();
            this.setState({ muteVideo: false });
        }
    }

    chatOpen() {
        if (this.state.chatOpen == false) {
            console.info('Open chat');
            this.setState({ chatOpen: true });
        } else {
            console.info('Close chat');
            this.setState({ chatOpen: false });
        }
    }

    changeSelfViewPosition(evt) {
        let coordX = evt.nativeEvent.locationX;
        let coordY = evt.nativeEvent.locationY;
        this.setState({ coordX: coordX });
        this.setState({ coordY: coordY });
        console.log(`x coord = ${evt.nativeEvent.locationX}`);
        console.log(`y coord = ${evt.nativeEvent.locationY}`);

    }

    screenOK() {
        if (this.state.screenUnderstood == false) {
            this.setState({ screenUnderstood: true });
        } else {
            this.setState({ screenUnderstood: false });
        }
    }

    screenDisableOK() {
        if (this.state.screenDisableUnderStood == false) {
            this.setState({ screenDisableUnderStood: true });
        } else {
            this.setState({ screenDisableUnderStood: false });
        }
    }

    menu() {
        if (this.state.menuOpen == false) {
            this.setState({ menuOpen: true });
        } else {
            this.setState({ menuOpen: false });
        }
    }

    switchCamera() {
        this.localStream.getData().getVideoTracks().forEach((track) => {
            track._switchCamera()
        })
    }

    recordingManager() {
        if (this.state.isRecording == false) {
            this.setState({ isRecording: true });
            console.info("startCompositeRecording");

            this.conversation.startRecording()
                .then((recordingInfo) => {
                    console.info('startRecording', recordingInfo);
                    console.info('startRecording mediaURL', recordingInfo.mediaURL);
                })
                .catch((e) => {
                    console.error("Error while start recording : ", e);
                });
        } else {
            this.setState({ isRecording: false });
            console.info("stopCompositeRecording");

            this.conversation.stopRecording()
                .then((recordingInfo) => {
                    console.info('stopRecording', recordingInfo);
                })
                .catch((e) => {
                    console.error("Error while start recording : ", e);
                });
        }
    }


    render() {
        function setRoom(ctx, value) {
            ctx.state.roomName = value;
        }

        function renderPicker(ctx) {
            if (ctx.state.status !== 'pickConv') return null;
            return (
                <View style={{ paddingHorizontal: 70, marginTop: 150 }}>
                    <TextInput
                        onChangeText={(val) => setRoom(ctx, val)}
                        style={styles.input}
                        placeholder={defaultText}
                    />
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
            if (ctx.state.status !== 'onCall') return null;
            return (
                <MovingViewWithPanResponder selfViewSrc={ctx.state.selfViewSrc} />
            );
        }

        /**
         * CAll this function in return to see your screen
         */
        /*function renderScreenSelfView(ctx) {
            if (ctx.state.status !== 'onCall' || ctx.state.selfScreenSrc == null) return null;
            return (
                <RTCView style={styles.selfScreenView} streamURL={ctx.state.selfScreenSrc} />
            );
        }*/

        function screenCaptureinfo(ctx) {
            if (ctx.state.status !== 'onCall' || ctx.state.selfScreenSrc == null || ctx.state.screenUnderstood == true) return null;
            return (
                <View style={styles.screenCaptureInformation}>
                    <View style={styles.screenCaptureContainer}>
                        <Text>You're sharing your screen !</Text>
                        <Pressable
                            style={styles.screenCaptureButton}
                            onPress={() => ctx.screenOK()}
                            title='Screen Capture understood'
                        >
                            <Text>OK</Text>
                        </Pressable>
                    </View>
                </View>
            );
        }

        function screenCaptureinfo2(ctx) {
            if (ctx.state.status !== 'onCall' || ctx.state.screenDisableUnderStood == true) return null;
            return (
                <View style={styles.screenCaptureInformation}>
                    <View style={styles.screenCaptureContainer}>
                        <Text>Screen share has been stopped</Text>
                        <Pressable
                            style={styles.screenCaptureButton}
                            onPress={() => ctx.screenDisableOK()}
                            title='Screen Capture disable understood'
                        >
                            <Text>OK</Text>
                        </Pressable>
                    </View>
                </View>
            );
        }

        function renderRemoteViews(ctx) {
            if (ctx.state.status !== 'onCall') return null;
            return (

                <View style={styles.remoteContainer}>
                    <ScrollView style={[styles.scollView, { flexGrow: 1 }]}>
                        <View style={styles.remoteContainerFlex}>
                            {renderRemoteView(ctx)}
                        </View>
                    </ScrollView>
                </View>

            );
        }

        function renderRemoteView(ctx) {
            if (ctx.state.remoteListSrc.size == 0) return null;
            return Array.from(ctx.state.remoteListSrc.values()).map((value, index) => <RTCView key={index} streamURL={value} zOrder={100} style={styles.remoteView} />);
        }

        function renderButtons(ctx) {
            if (ctx.state.status !== 'onCall') return null;
            return (
                <View style={styles.renderButton}>
                    <TouchableOpacity
                        style={[styles.renderButtonComponent, { backgroundColor: '#1D1F20', borderColor: '#313335', borderWidth: 2 }]}
                        onPress={() => { ctx.menu() }}>
                        <View style={styles.svgButton}>
                            <Menu />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.renderButtonComponent}
                        onPress={() => { ctx.mute() }}>
                        <View style={styles.svgButton}>
                            {renderMuteButton(ctx)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.renderButtonComponent}
                        onPress={() => { ctx.muteVideo() }}>
                        <View style={styles.svgButton}>
                            {renderMuteVideoButton(ctx)}
                        </View>
                    </TouchableOpacity>
                    {dipslayScreenShare(ctx)}
                    <TouchableOpacity
                        style={styles.renderButtonComponent}
                        onPress={() => { ctx.chatOpen() }}>
                        <View style={styles.svgButton}>
                            <Svg_bubble_speech />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.renderButtonComponent, { backgroundColor: '#FF6056' }]}
                        onPress={() => { ctx.hangUp() }}>
                        <View style={styles.svgButton}>
                            <Hangup />
                        </View>
                    </TouchableOpacity>
                </View>
            );
        };

        function dipslayScreenShare(ctx) {
            if (Platform.OS === 'ios') return null;
            return (
                <TouchableOpacity
                    style={styles.renderButtonComponent}
                    onPress={() => { ctx.screenSharing() }}>
                    <View style={styles.svgButton}>
                        {renderScreenSharingButton(ctx)}
                    </View>
                </TouchableOpacity>
            );
        }

        function renderMuteButton(ctx) {
            if (ctx.state.mute == false) {
                return (
                    <Microphone_on />
                );
            }
            return <Microphone_off />
        }

        function renderMuteVideoButton(ctx) {
            if (ctx.state.muteVideo == false) {
                return (
                    <Camera_on />
                );
            }
            return <Camera_off />
        }

        function renderScreenSharingButton(ctx) {
            if (ctx.state.selfScreenSrc) {
                return (
                    <ScreenShare_on />
                );
            }
            return <ScreenShare_off />
        }

        function chat(ctx) {
            if (ctx.state.status !== 'onCall' && ctx.state.chatOpen !== true) return null;
            return (
                <Chat_apiRTC
                    chatOpen={ctx.state.chatOpen}
                    conversation={ctx.conversation}
                    session={ctx.connectedSession}
                    message={ctx.state.newMessage}
                    ref={instance => { this.chatChild = instance; }} />
            );
        }

        function renderDialog(ctx) {
            if (ctx.state.status !== 'onCall' || ctx.state.menuOpen !== true) return null;
            return (
                <View style={styles.dialogContainer}>
                    <View style={styles.dialogBox}>
                        {/*If you need to add a element to the menu*/}
                        {/*Just copy paste TouchableOpacity element*/}
                        <TouchableOpacity
                            onPress={() => { ctx.switchCamera() }}
                            style={styles.touchDialog}>
                            <View style={styles.contentDialogCountainer}>
                                <View style={styles.svgDialog}>
                                    <Switch_camera />
                                </View>
                                <View style={styles.testDialog}>
                                    <Text style={{ color: '#BBCCDD' }}>Switch camera</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/*End here*/}
                        <TouchableOpacity
                            onPress={() => { ctx.recordingManager() }}
                            style={styles.touchDialog}>
                            <View style={styles.contentDialogCountainer}>
                                <View style={styles.svgDialog}>
                                    <Camera_record />
                                </View>
                                <View style={styles.testDialog}>
                                    {recordText(ctx)}
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/*End here*/}
                    </View>
                </View>
            );
        }

        function recordText(ctx) {
            if (ctx.state.isRecording) {
                return (
                    <Text style={{ color: '#BBCCDD' }}>Stop recording</Text>
                );
            }
            return <Text style={{ color: '#BBCCDD' }}>Start recording</Text>

        }

        return (
            <View style={styles.container}>
                {renderPicker(this)}
                {renderRemoteViews(this)}
                {renderButtons(this)}
                {renderDialog(this)}
                {renderSelfView(this)}
                {chat(this)}
                {screenCaptureinfo(this)}
                {screenCaptureinfo2(this)}
            </View>
        );
    }
}