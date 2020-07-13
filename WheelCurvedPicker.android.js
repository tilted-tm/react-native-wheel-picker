'use strict'

import * as React from 'react'
import {
	ColorPropType,
	requireNativeComponent,
	View,
} from 'react-native'

const WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker');

type Props = {
	name: 'WheelCurvedPicker',
	propTypes: {
		...View.propTypes,
		data: Array,
		textColor: ColorPropType,
		textSize: number,
		itemStyle: React.style,
		itemSpace: number,
		onValueChange: () => void,
		selectedValue: any,
		selectedIndex: Number,
		lineColor: any,
		lineGradientColorFrom: any,
		lineGradientColorTo: any,
	}
}


class WheelCurvedPicker extends React.PureComponent<Props> {
	constructor(props){
		super(props)
		this.state = this._stateFromProps(props)
	}

	static defaultProps = {
		itemStyle : {
			color:'white',
			fontSize:26
		},
		itemSpace: 20
	}

	componentWillReceiveProps (props) {
		this.setState(this._stateFromProps(props));
	}

	_stateFromProps (props) {
		let selectedIndex = 0;
		const items = [];
		React.Children.forEach(props.children, function (child, index) {
			if (child.props.value === props.selectedValue) {
				selectedIndex = index;
			}
			items.push({value: child.props.value, label: child.props.label});
		});

		const textSize = props.itemStyle.fontSize
		const  textColor = props.itemStyle.color

		return {selectedIndex, items, textSize, textColor};
	}

	_onValueChange = (e) => {
		const { onValueChange } = this.props
		if (onValueChange) {
			this.props.onValueChange(e.nativeEvent.data);
		}
	}

	render() {
		const { items, selectedIndex, textColor, textSize } = this.state
		return (
			<WheelCurvedPickerNative
				{...this.props}
				onValueChange={this._onValueChange}
				data={items}
				textColor={textColor}
				textSize={textSize}
				selectedIndex={parseInt(selectedIndex)} />
		)
	}
}

class Item extends React.PureComponent {
	render () {
		// These items don't get rendered directly.
		return null;
	}
}

WheelCurvedPicker.Item = Item

export default WheelCurvedPicker
