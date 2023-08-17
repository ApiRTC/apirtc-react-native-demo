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

export default class Svg_bubble_speech extends React.Component {
	render() {

		return (
			<View style={{ width: '100%', height: '100%' }}>
				<Svg fill="#000000" height="100%" width="100%" viewBox="0 0 67.428 67.428">
					<G>
						<Path d="M33.468,67.183C15.013,67.183,0,52.169,0,33.714S15.014,0.245,33.468,0.245c18.455,0,33.469,15.014,33.469,33.469
		c0,5.622-1.421,11.162-4.117,16.076l4.608,17.2l-16.849-4.516C45.408,65.557,39.512,67.183,33.468,67.183z M33.468,4.245
		C17.219,4.245,4,17.465,4,33.714s13.219,29.469,29.468,29.469c5.582,0,11.021-1.574,15.729-4.554l0.74-0.469l11.835,3.172
		l-3.243-12.1l0.419-0.72c2.609-4.483,3.989-9.601,3.989-14.799C62.937,17.465,49.717,4.245,33.468,4.245z"/>
						<Circle cx="50.623" cy="33.714" r="4.206" />
						<Circle cx="33.469" cy="33.714" r="4.207" />
						<Circle cx="16.313" cy="33.714" r="4.206" />
					</G>
				</Svg>
			</View>
		);
	}
}