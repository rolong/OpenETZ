import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Clipboard,
  StatusBar
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import { TextInputComponent,Btn } from '../../components/'
import Modal from 'react-native-modal'
import QRCode from 'react-native-qrcode'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'

const wallet = require('ethereumjs-wallet')
import Toast from 'react-native-toast'
class Receive extends Component{
  constructor(props){
    super(props)
    this.state={
        visible: false,
        payTotalVal: '',
        addressText: '',
    }

  }

  componentWillMount(){

    const { currentAccount } = this.props.accountManageReducer

    this.setState({
      addressText: `0x${currentAccount.address}`
    })

    if(currentAccount.backup_status === 0){
      this.setState({
        visible: true
      })
    }

  }

  componentWillUnmount(){
    this.setState({
      visible: false
    }) 
  }


  // onChangePayTotal = (val) => {
  //   this.setState({
  //     payTotalVal: val,
  //   })
  // }

  onPressCopyBtn = () => {
      Clipboard.setString(this.state.addressText)
      Toast.showLongBottom(I18n.t('copy_successfully'))
  }

  onHide = () => {
    this.setState({
      visible: false
    })
  }
  backupBtn = () => {
    const { currentAccount } = this.props.accountManageReducer

    this.setState({
      visible: false
    })
    
    this.props.navigator.push({
      screen: 'back_up_account',
      title: currentAccount.account_name,
      backButtonTitle:I18n.t('back'),
      backButtonHidden:false,
      navigatorStyle: DetailNavigatorStyle,
      passProps: {
        userName: currentAccount.account_name,
        address: currentAccount.address,
        b_id: currentAccount.id,
      },
      // navigatorButtons: {
      //   rightButtons: [
      //     {
      //       title: 'Save',
      //       id: 'save_back_up_info'
      //     }
      //   ]
      // }
    })
  }

  render(){
    const { payTotalVal,visible,addressText } = this.state
    return(
      <View style={[pubS.container,{paddingTop: scaleSize(35)}]}>
      <StatusBar backgroundColor="#000000"  barStyle="dark-content" animated={true} />
        {
        // <TextInputComponent
        //   placeholder={'Enter receive amount (Optional)'}
        //   value={payTotalVal}
        //   onChangeText={this.onChangePayTotal}
        // >
        // </TextInputComponent>
        }

        <View style={{marginTop: scaleSize(125),alignSelf:'center'}}>
          <QRCode
            value={addressText}
            size={scaleSize(400)}
            bgColor='#000'
            fgColor='#fff'
          />
        </View>
        <Text style={[pubS.font24_2,{marginTop: scaleSize(19),alignSelf:'center'}]}>{addressText}</Text>
        <Btn
          btnPress={this.onPressCopyBtn}
          btnText={I18n.t('copy_receive_address')}
          btnMarginTop={scaleSize(100)}
        />


      <Modal
        isVisible={visible}
        onBackButtonPress={this.onHide}
        onBackdropPress={this.onHide}
        style={styles.modalView}
        backdropOpacity={.8}
      >
        <Image source={require('../../images/xhdpi/img_collectionnobackup.png')} style={styles.modalImageStyle}/>
        <View style={[{alignItems:'center'}]}>
            <View style={styles.blueView}>
                <Text style={[pubS.font36_3,{marginTop: scaleSize(32)}]}>{I18n.t('backup_first')}</Text>
                <Text style={[pubS.font22_2,{marginTop: scaleSize(13),width: '90%',textAlign:'center'}]}>{I18n.t('backup_modal_1')}</Text>
            </View>
            <View style={styles.whileView}>
                <Text style={[pubS.font30_2,{marginTop: scaleSize(25)}]}>{`--  ${I18n.t('backup_mnemonic')} --`}</Text>
                <Text style={[pubS.font24_2,{textAlign:'center'}]}>{I18n.t('backup_modal_2')}</Text>
                <Text style={[pubS.font30_2,{marginTop: scaleSize(25)}]}>{`--  ${I18n.t('backup_keystore')}  --`}</Text>
                <Text style={[pubS.font24_2,{textAlign:'center'}]}>{I18n.t('backup_modal_3')}</Text>
                <TouchableOpacity activeOpacity={.7} onPress={this.backupBtn} style={[styles.backupBtnStyle,pubS.center]}>
                  <Text style={pubS.font28_2}>{I18n.t('backup_now')}</Text>
                </TouchableOpacity>
            </View>
      </View>
      </Modal>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  modalImageStyle:{
    height: scaleSize(121),
    width: scaleSize(107),
    zIndex:999,
    position:'absolute',
    top:0,
    left: scaleSize(226.5),
  },
  backupBtnStyle:{
    height: scaleSize(70),
    width: scaleSize(500),
    borderWidth: 1,
    borderColor: '#2B8AFF',
    borderRadius: scaleSize(35),
    marginTop: scaleSize(30),
  },
  whileView:{
      height: scaleSize(420),
      backgroundColor:'#fff',
      width:'100%',
      alignItems:'center',
      borderBottomLeftRadius :scaleSize(10),
      borderBottomRightRadius :scaleSize(10),
  },
  blueView: {
    height: scaleSize(355),
    backgroundColor:'#2B8AFF',
    width:'100%',
    alignItems:'center',
    borderTopLeftRadius: scaleSize(10),
    borderTopRightRadius: scaleSize(10),
    marginTop: scaleSize(84)
  },
  modalView:{
    width: scaleSize(620),
    height: scaleSize(865),
    position: 'absolute',
    top: scaleSize(59),
    alignSelf: 'center',
    backgroundColor:'transparent',
    // borderColor:'#fff',
    // borderWidth:1,

  }
})
export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer
  })
)(Receive)
