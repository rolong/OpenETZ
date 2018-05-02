import React, { Component } from 'react'
import {
  View,
  Text,
  WebView,
  StyleSheet
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize,ifIphoneX } from '../../utils/adapter'

class HelpCenter extends Component{
  render(){
    return(
        <WebView  
          source={{uri:'https://mp.weixin.qq.com/s/8RQ8GOi0d2z03vYcTjsCrw'}}
          style={styles.webViewStyle}
        />
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
