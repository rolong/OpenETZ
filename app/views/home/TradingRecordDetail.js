//交易记录详情
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  WebView, 
  Clipboard
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import QRCode from 'react-native-qrcode'
import { sliceAddress,timeStamp2FullDate } from '../../utils/splitNumber'
import I18n from 'react-native-i18n'
import Toast from 'react-native-toast'
class TextInstructions extends Component{
  static defaultProps = {
    inColor: '#657CAB',
    onPressText: undefined,
  }
  render(){
    const { title, instructions,inColor,onPressText } = this.props
    return(
      <TouchableOpacity onPress={onPressText} activeOpacity={onPressText ? .7 : 1} style={{height: scaleSize(70),justifyContent:'space-between',marginLeft: scaleSize(35),marginTop: scaleSize(20)}}>
        <Text style={pubS.font24_4}>{title}</Text>
        <Text style={{color:inColor,fontSize: setScaleText(24)}} numberOfLines={2}>{instructions}</Text>
      </TouchableOpacity>
    )
  }
}


class TradingRecordDetail extends Component{
  constructor(props){
    super(props)
    this.state = {
   
    }
  }


  toWebView = (hash) => {
    this.props.navigator.push({
      screen: 'tx_web_view',
      navigatorStyle:DetailNavigatorStyle,
      passProps: {
        hash,
      }
    })
  }
  onCopyBtn = () => {
    Clipboard.setString(this.props.detailInfo.tx_receiver)
    Toast.showLongBottom(I18n.t('copy_successfully'))
  }

  
  render(){
    const { detailInfo} = this.props

    return(
      <View style={pubS.container}>
        <Image source={require('../../images/xhdpi/ico_selectasset_transactionrecords_succeed.png')} style={styles.iocnStyle}/>
        <View style={styles.topView}></View>
        <View style={styles.mainStyle}>
          <View style={[styles.accountStyle,pubS.rowCenter2]}>
            <Text style={pubS.font60_1}>{detailInfo.tx_value}</Text>
            <Text style={[pubS.font22_3,{marginLeft: scaleSize(18),marginTop: scaleSize(28)}]}>{detailInfo.tx_token}</Text>
          </View>
          <TextInstructions
            title={I18n.t('payer')}
            instructions={detailInfo.tx_sender}
          />
          <TextInstructions
            title={I18n.t('payee')}
            instructions={detailInfo.tx_receiver}
          />
          <TextInstructions
            title={I18n.t('note')}
            instructions={detailInfo.tx_note}
          />

          <View style={[{width: scaleSize(680),alignSelf:'center',marginTop: scaleSize(30),marginBottom: scaleSize(10)},pubS.bottomStyle]}></View>
          <View style={[pubS.rowCenterJus,{paddingRight: scaleSize(35)}]}>
            <View>
              <TextInstructions
                title={I18n.t('tx_number')}
                instructions={sliceAddress(detailInfo.tx_hash)} 
                inColor={'#2B8AFF'}
                onPressText={() => this.toWebView(detailInfo.tx_hash)}
                />
              <TextInstructions
                title={I18n.t('block')}
                instructions={detailInfo.tx_block_number}
                />
              <TextInstructions
                title={I18n.t('tx_time')}
                instructions={timeStamp2FullDate(detailInfo.tx_time)}
                />
            </View>
            <View style={{marginTop: scaleSize(40)}}>
              <QRCode
                value={detailInfo.tx_receiver}
                size={scaleSize(170)}
                bgColor='#000'
                fgColor='#fff'
              />
              <TouchableOpacity onPress={this.onCopyBtn} activeOpacity={.7} style={[styles.btnStyle,pubS.center]}>
                <Text style={pubS.font22_3}>{I18n.t('copy_url')}</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    btnStyle:{
        height: scaleSize(50),
        width: scaleSize(170),
        backgroundColor: '#E3E8F1',
        borderRadius:scaleSize(6),
        marginTop: scaleSize(10)
    },
    iocnStyle:{
      width: scaleSize(100),
      height: scaleSize(100),
      position:'absolute',
      left: scaleSize(325),
      top: scaleSize(50),
      zIndex: 999,
    },
    accountStyle:{
      height: scaleSize(178),
      borderColor:'#DBDFE6',
      borderBottomWidth: StyleSheet.hairlineWidth,
      width: scaleSize(680),
      alignSelf:'center',
      marginBottom: scaleSize(10),
      // borderWidth:1,
    },
    mainStyle:{
        backgroundColor:'#fff',
        width: scaleSize(750)
    },
    topView:{
      height: scaleSize(100),
      backgroundColor: '#144396',
    },
})

export default TradingRecordDetail
