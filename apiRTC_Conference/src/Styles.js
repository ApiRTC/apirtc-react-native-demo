import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    messageDisplayer: {
        height: '85%'
    },
    message: {
        color: '#FFFFFF',
    },
    sendMessage: {
        position: 'absolute',
        bottom: 5,
        right: 0,
        width: '10%',
        height: '10%',
        padding: 1,
        margin: 1,
        marginRight: '3%',
        backgroundColor: 'transparent',
        elevation: 99,
    },
    inputMessage: {
        width: '80%',
        height: '10%',
        margin: 1,
        borderWidth: 2,
        borderColor: 'white',
        position: 'absolute',
        bottom: 5,
        left: 2,
        color: 'white',
        paddingHorizontal: 15,
    },
    boxChat: {
        position: 'absolute',
        bottom: '30%',
        right: 0,
        height: '70%',
        width: '70%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    scollView: {
        width: '100%',
        height: '100%',
        zIndex: -3,
        elevation: -3
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        elevation: -1,
        zIndex: -1
    },
    remoteView: {
        width: windowWidth / 2 - 10,
        height: windowHeight / 2 - 10,
        backgroundColor: '#d1d1d1',
    },
    input: {
        width: '80%',
        borderWidth: 1,
        marginBottom: 20
    },
    main: {
        width: '100%',
        height: '100%',
        zIndex: -1,
        elevation: -1,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    selfScreenView: {
        position: 'absolute',
        width: '20%',
        height: '20%',
        bottom: 2,
        right: '20%',
        backgroundColor: 'black',
        elevation: 99,
    },
    chatButton: {
        position: 'absolute',
        bottom: '5%',
        right: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 100,
        backgroundColor: 'transparent',
        elevation: 99,
    },
    remoteContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        backgroundColor: '#2b2c2d'
    },
    remoteContainerFlex: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#2b2c2d'
    },
    renderButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '10%',
        //backgroundColor: '#ededed',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    renderButtonComponent: {
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 20,
        width: 50,
        height: 50,
        backgroundColor: '#8eabc7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    svgButton: {
        width: '60%',
        height: '60%',
    },
    renderButtonText: {
        margin: 0,
    },
    renderButtonSwitch: {
        margin: 0,
    },
    screenCaptureInformation: {
        elevation: 20,
        position: 'absolute',
        width: '100%',
        height: '7%',
        bottom: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    screenCaptureContainer: {
        width: '70%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#ccf1ff',
    },
    screenCaptureButton: {
        backgroundColor: '#0084ff',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },

    dialogContainer: {
        width: '50%',
        height: '100%',
        position: 'absolute',
        bottom: '7%',
        left: '6%',
    },
    dialogBox: {
        position: 'absolute',
        bottom: '3%',
        width: '100%',
        borderWidth: 1,
        borderColor: '#313335',
        borderRadius: 15,
        backgroundColor: '#1D1F20',
    },
    touchDialog: {
        //position: relative;
        width: '100%',
        height: 30,
        marginBottom: 4,
        marginTop: 4
    },
    contentDialogCountainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 20,
    },
    testDialog: {
        marginLeft: 20,
    },
    svgDialog: {
        height: '100%',
        width: 20
    },
    menuRemoteContainer: {
        width: '50%',
        borderWidth: 1,
        borderColor: '#313335',
        borderRadius: 15,
        backgroundColor: '#1D1F20',
    },
    behindMenuRemoteContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 21,
        backgroundColor: 'rgba(0,0,0,0.5)',
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

    /*PANSELFVIEW*/
    selfView: (x, y) => {
        return {
            width: "30%",
            height: "30%",
            zIndex: 20,
            position: 'absolute',
            transform: [{ translateX: x }, { translateY: y }],
        }
    }
});

export { styles }