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

export default class Switch_camera extends React.Component {
    render() {

        return (
            <View style={{ width: '100%', height: '100%' }}>
                <Svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    stroke="#000000"
                    fill="#BBCCDD"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <Path d="M11 19H4a2 2 0 01-2-2V7a2 2 0 012-2h5" />
                    <Path d="M13 5h7a2 2 0 012 2v10a2 2 0 01-2 2h-5" />
                    <Circle cx="12" cy="12" r="3" />
                    <Path d="M18 22l-3-3 3-3" />
                    <Path d="M6 2l3 3-3 3" />
                </Svg>
            </View>
        );
    }
}