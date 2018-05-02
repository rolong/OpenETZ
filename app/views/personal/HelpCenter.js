import React, { Component } from 'react'
import {
  View,
  Text,
  WebView,
  StyleSheet,
  StatusBar,
  Platform
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize,ifIphoneX } from '../../utils/adapter'

class HelpCenter extends Component{
  render(){
    return(
      <View style={{flex:1}}>
        {
          Platform.OS === 'ios' ?
          <StatusBar backgroundColor="#000000"  barStyle="dark-content"  animated={true} />
          : null
        }
        <WebView  
          source={{uri:'https://mp.weixin.qq.com/s/8RQ8GOi0d2z03vYcTjsCrw'}}
          style={styles.webViewStyle}
          startInLoadingState={true}
          domStorageEnabled={true}//开启dom存贮
          javaScriptEnabled={true}//开启js
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
   webViewStyle:{
     ...ifIphoneX(
       {
         width:375,
         flex:1,
         alignSelf:'center',
       },
       {
        width: scaleSize(750),
        flex:1,
        alignSelf:'center',
       },
       {
        width: scaleSize(750),
        flex:1,
        alignSelf:'center',
       }
     )
   }
})
export default HelpCenter
