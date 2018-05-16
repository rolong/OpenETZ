import React, { Component } from 'react'
import {
	View,
	Text,
	Image,
} from 'react-native'
import { pubS, DetailNavigatorStyle, } from '../../styles/'

export default class PecomPrize extends Component{
	render(){
		return(
			<View style={{flex:1}}>
				<Image source={require('../../images/xhdpi/recommended_prize.jpg')} style={{width: '100%',height: '100%'}}/>
			</View>
		)
	}
}