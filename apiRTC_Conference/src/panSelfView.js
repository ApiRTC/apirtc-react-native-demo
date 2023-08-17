import React, { useRef, useState } from 'react';
import { View, Pressable, PanResponder, Animated, SafeAreaView } from 'react-native';
import {
    RTCView,
} from 'react-native-webrtc';
import { styles } from './Styles';

let valueY;
let valueX;

const MovingViewWithPanResponder = (props) => {

    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y }
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset();
            }
        })
    ).current;

    return (
        <Animated.View style={styles.selfView(pan.x, pan.y)}
            {...panResponder.panHandlers}>
            <RTCView style={{
                width: "100%",
                height: "100%",
            }} streamURL={props.selfViewSrc} zOrder={1} />
        </Animated.View>
    );
};
export default MovingViewWithPanResponder;