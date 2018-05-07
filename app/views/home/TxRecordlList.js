import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'

import { pubS,DetailNavigatorStyle,MainThemeNavColor } from '../../styles/'
import { setScaleText, scaleSize,ifIphoneX } from '../../utils/adapter'
import RecordListItem from './tradingRecord/RecordListItem'
import { splitNumber,sliceAddress,timeStamp2Date } from '../../utils/splitNumber'

import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import accountDB from '../../db/account_db'
class TxRecordlList extends Component{
  constructor(props){
    super(props)
    this.state = {
      recordList: []
    }
  }

  componentWillMount(){
    this.getRecordList()    
  }



  async getRecordList(){
    const { currentAccount, globalAccountsList } = this.props.accountManageReducer
    //根据当前账户(0x${currentAccount.address} = tx_sender)地址查找 交易记录
    //token name
    let selRes = await accountDB.selectTable({
      sql: 'select * from trading where tx_sender = ? and tx_token = ?',
      parame: [`0x${currentAccount.address}`,this.props.curToken]
    })

    this.setState({
      recordList: selRes
    })

  }

  toTradingRecordDetail = (res) => {
    this.props.navigator.push({
      screen: 'trading_record_detail',
      title:I18n.t('tx_records_1'),
      navigatorStyle: MainThemeNavColor,
      backButtonTitle:I18n.t('back'),
      backButtonHidden:false,
      passProps: {
        detailInfo: res,
        fromList: 'list'
      }
    })
  }
  renderItem = (item) => {
    let res = item.item
    
    return(
      <RecordListItem
        style={{marginBottom: scaleSize(10)}}
        listIcon={res.tx_result === 1 ? require('../../images/xhdpi/lab_ico_selectasset_payment_def.png') : require('../../images/xhdpi/lab_ico_selectasset_error_def.png')}
        listIconStyle={{width: scaleSize(20),height:scaleSize(20)}}
        onPressListItem={() => this.toTradingRecordDetail(res)}
        receiverAddress={sliceAddress(res.tx_receiver)}
        receiverTime={timeStamp2Date(res.tx_time)}
        receiverVal={res.tx_value}
        unit={this.props.curToken}
        payFail={res.tx_result === 1 ? false : true}
      />
    )
  }
  ListHeaderComponent = () => {
    const { etzBalance, etz2rmb } = this.props
      return(
        <View style={[styles.listViewStyle,pubS.center]}>
          <Text style={pubS.font72_1}>{splitNumber(etzBalance)}</Text>
          <Text style={pubS.font26_3}>{this.props.currencySymbol}</Text>
        </View>
      ) 
  }
  payBtn = () => {
    this.props.navigator.push({
      screen: 'on_payment',
      title:I18n.t('send'),
      backButtonTitle:I18n.t('back'),
      backButtonHidden:false,
      navigatorStyle: DetailNavigatorStyle,
      passProps:{
        curToken: this.props.curToken,
        curDecimals:this.props.curDecimals
      }
    })
  }
  collectBtn = () => {
    this.props.navigator.push({
      screen: 'on_receive',
      title:I18n.t('receive'),
      backButtonTitle:I18n.t('back'),
      backButtonHidden:false,
      navigatorStyle: DetailNavigatorStyle,
    })
  }
  ListEmptyComponent = () => {
    return(
      <View style={{marginTop: 10,alignItems:'center'}}>
        <Text style={pubS.font24_4}>{I18n.t('no_tx_info')}</Text>
      </View>
    )
  }
  render(){
    console.log('交易列表',this.state.recordList)
    return(
      <View style={[styles.container,{backgroundColor:'#F5F7FB'}]}>
        <View style={{marginBottom: scaleSize(96)}}> 
          <FlatList
            data={this.state.recordList}
            renderItem={this.renderItem}
            keyExtractor = {(item, index) => index}
            ListHeaderComponent={this.ListHeaderComponent}
            ListEmptyComponent={this.ListEmptyComponent}
          />
        </View>
        <View style={[styles.bottomBtnStyle,pubS.rowCenter]}>
          <TouchableOpacity activeOpacity={.7} onPress={this.payBtn} style={[styles.btnStyle,{backgroundColor:'#ffa93b'},pubS.center]}>
            <Text style={pubS.font30_3}>{I18n.t('send')}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.7} onPress={this.collectBtn} style={[styles.btnStyle,{backgroundColor:'#ff6f51'},pubS.center]}>
            <Text style={pubS.font30_3}>{I18n.t('receive')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...ifIphoneX(
      {
        flex: 1,
        width:375
      },
      {
        flex: 1,
        // width: scaleSize(750),
      },
      {
        flex: 1,
        // width: scaleSize(750),
      }
    )

  },
  btnStyle:{
    width: '50%',
    height: scaleSize(96),
  },
  bottomBtnStyle:{
    ...ifIphoneX(
      {
        width: 375,
        height: scaleSize(96),
        position:'absolute',
        bottom: 0,
      },
      {
        width: scaleSize(750),
        height: scaleSize(96),
        position:'absolute',
        bottom: 0,
      },
      {
        width: scaleSize(750),
        height: scaleSize(96),
        position:'absolute',
        bottom: 0,
      }
    )
  },
  listViewStyle:{
    height: scaleSize(280),
    backgroundColor: '#144396',
  },
})
export default connect(
  state => ({
    tradingManageReducer: state.tradingManageReducer,
    accountManageReducer: state.accountManageReducer,
  })
)(TxRecordlList)
