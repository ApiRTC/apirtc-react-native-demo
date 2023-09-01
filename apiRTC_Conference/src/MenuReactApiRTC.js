import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Button,
    TextInput,
    ScrollView,
    Pressable,
    StatusBar,
    Platform,
} from 'react-native';

import ReactNativeApiRTC from './ReactNativeApiRTC';

import { setStatusBarBackgroundColor } from 'expo-status-bar';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    picker: {},
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        padding: 5,
        marginBottom: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

const initialState = {
    confMode: false,
    peerMode: false,
    buttonReady: false
};


export default class MenuReactApiRTC extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.bindChangeConfMode = null;
        this.connectedSession = null;
    }

    componentDidMount() {
        apiRTC.setLogLevel(10);

        this.ua = new apiRTC.UserAgent({
            //cloudUrl: 'https://cloud.apizee.com',
            uri: 'apzkey:myDemoApiKey'
        });

        this.ua.register()
            .then((session) => {
                this.connectedSession = session;
                this.setState({buttonReady: true})
            })
            .catch((err) => {
                console.error(err);
            });

    }

    changeMode(mode, value) {
        if (mode == 'confMode') {
            setStatusBarBackgroundColor('black');
            if (Platform.OS === 'ios') {
                StatusBar.setBarStyle('dark-content');
            }
            this.setState({ confMode: value });
        }
        if (mode == 'peerMode') {
            setStatusBarBackgroundColor('black');
            if (Platform.OS === 'ios') {
                StatusBar.setBarStyle('dark-content');
            }
            this.setState({ peerMode: value });
        }
    }

    changeConfMode() {
        if(this.state.confMode) {
            this.setState({confMode: false});
        } else {
            this.setState({confMode: true});
        }
    }

    render() {
        function conference(ctx) {
            if (ctx.state.confMode !== true) return null;
            return <ReactNativeApiRTC session={ctx.connectedSession} func={ctx.changeConfMode.bind(ctx)} />;
        }

        function peertopeer(ctx) {
            if (ctx.state.peerMode !== true) return null;
            return (
                <View style={{ display: 'flex', alignItems: 'center', marginTop: '50%' }}>
                    <Text>Peer to peer is not avaible, try conférence mode</Text>
                    <Pressable style={styles.button} onPress={() => { ctx.setState({ peerMode: false }) }}>
                        <Text style={styles.text}>Back</Text>
                    </Pressable>
                </View>
            );
        }

        function menu(ctx) {
            if (ctx.state.peerMode == true || ctx.state.confMode == true || ctx.state.buttonReady == false) return null;
            return (
                <View style={{ marginTop: 250, paddingHorizontal: 100 }}>
                    <Pressable style={styles.button} onPress={() => ctx.changeMode('confMode', true)}>
                        <Text style={styles.text}>Conference</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => ctx.changeMode('peerMode', true)}>
                        <Text style={styles.text}>Peer to peer</Text>
                    </Pressable>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {menu(this)}
                {conference(this)}
                {peertopeer(this)}
            </View>
        );
    }
}