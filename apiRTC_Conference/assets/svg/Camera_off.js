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

export default class Camera_off extends React.Component {
    render() {

        return (
            <View style={{ width: '100%', height: '100%' }}>
                <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M11.65 6H12.8C13.9201 6 14.4802 6 14.908 6.21799C15.2843 6.40973 15.5903 6.71569 15.782 7.09202C16 7.51984 16 8.0799 16 9.2V10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 14.679 21 15.0462 20.9684 15.3184M3 3L6.00005 6.00005M21 21L15.9819 15.9819M6.00005 6.00005C5.01167 6.00082 4.49359 6.01337 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C15.9049 16.6668 15.9585 16.3837 15.9819 15.9819M6.00005 6.00005L15.9819 15.9819" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </Svg>
            </View>
        );
    }
}