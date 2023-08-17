import React from "react";
import { View, TextInput, Text, Pressable, ScrollView } from "react-native";
import { styles } from "./Styles";
import Send_message from '../assets/svg/Send_message';
import Svg_bubble_speech from "../assets/svg/Bubble-speech.js"




const initialState = {
    message: null,
    allMessage: new Map(),
    defaultMessage: 'Enter message',
};
export default class Chat_apiRTC extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.conversation = this.props.conversation;
        this.session = this.props.session;
        this.nbMessage = 0;
    }

    componentDidMount() {
        //this.conversation.on("message", (content, sender, time) => {
        this.conversation.on("message", (content) => {
            //console.error("Message receive");
            let sender = content.sender;
            let contentMessage = content.content;
            let contactUsername = sender.getUsername();
            this.updateGroupChatContent(contentMessage, contactUsername);
        });
    }

    sendMessage() {
        console.info("Send message");
        let message = this.state.message;
        this.conversation.sendMessage(message)
            .then((uuid) => {
                console.info("Message send !");
                this.updateGroupChatContent(message, this.session.getOrCreateContact(this.session.getId()).getUsername());
                this.setState({ defaultMessage: '' });
            }).catch((err) => {
                console.error('Error while send message - ', err);
            });
    }

    updateGroupChatContent(content, sender_id) {
        console.info("update group chat content");
        let date = new Date();
        let time = date.getHours() + ":" + date.getMinutes();
        this.nbMessage = this.nbMessage + 1;
        this.setState({ allMessage: this.state.allMessage.set(this.nbMessage, time + " => " + sender_id + " : " + content) });
    }

    typeMessageHandler(message) {
        console.info('Change message content => ' + message);
        this.setState({ message: message });
    }

    render() {

        function inputZone(ctx) {
            return (
                <View style={styles.main}>
                    <TextInput
                        onChangeText={(val) => ctx.typeMessageHandler(val)}
                        style={styles.inputMessage}
                        placeholder={ctx.state.defaultMessage}
                        placeholderTextColor="#FFF"
                    />
                    <Pressable
                        style={styles.sendMessage}
                        onPress={() => ctx.sendMessage()}>
                        <Send_message />
                    </Pressable>
                </View>
            );
        }

        function messageDisplayer(ctx) {
            return (
                <View style={styles.messageDisplayer}>
                    <ScrollView
                        ref={ref => { this.scrollView = ref }}
                        onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>
                        {message(ctx)}
                    </ScrollView>
                </View>
            );
        }

        function message(ctx) {
            return Array.from(ctx.state.allMessage.values()).map((value, index) => <Text key={index} style={styles.message}>{value}</Text>);
        }

        if (!this.props.chatOpen) return null;
        return (
            <View style={styles.boxChat}>
                {messageDisplayer(this)}
                {inputZone(this)}
            </View>
        )
    }
}