import React, { Component } from 'react'
import {
	View,
	WebView,
	StyleSheet,
	StatusBar,
	Platform
} from 'react-native'
import { scaleSize,ifIphoneX } from '../../utils/adapter'
export default class TxWebView extends Component{
	render(){
		return(
			<View style={{flex:1}}>
				{
		          Platform.OS === 'ios' ?
		          <StatusBar backgroundColor="#000000"  barStyle="dark-content" animated={true} />
		          : null
		        }				
				<WebView
			        source={{uri:`https://explorer.etherzero.org/tx/${this.props.hash}`,method:'GET'}}
					style={styles.WebViewStyle}
					startInLoadingState={true}
	                domStorageEnabled={true}//开启dom存贮
	                javaScriptEnabled={true}//开启js
		      	>	
				</WebView>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	WebViewStyle:{
		...ifIphoneX(
			{flex:1,alignSelf:'center',width: 375},
			{flex:1,alignSelf:'center',width: scaleSize(750)},
			{flex:1,alignSelf:'center',width: scaleSize(750)}
		)
	}
})