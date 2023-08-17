import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';

import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class ScreenShare_on extends React.Component {
    render() {

        return (
            <View style={{ width: '100%', height: '100%' }}>
                <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M12 20.5H16M12 20.5H8M12 20.5V16.5M12 16.5C16 16.5 19.5 16.1667 20 15.8333C20.5 15.5 21 12.6667 21 10C21 7.33333 20.5 4.5 20 4.16667C19.5 3.83333 16 3.5 12 3.5C8 3.5 4.5 3.83333 4 4.16667C3.5 4.5 3 7.33333 3 10C3 12.6667 3.5 15.5 4 15.8333C4.5 16.1667 8 16.5 12 16.5Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </Svg>
            </View>
        );
    }
}