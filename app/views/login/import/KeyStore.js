import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../../styles/'
import { setScaleText, scaleSize,ifIphoneX,isIphoneX } from '../../../utils/adapter'
import { TextInputComponent,Btn,Loading } from '../../../components/'
import { importAccountAction,resetDeleteStatusAction,showImportLoadingAction } from '../../../actions/accountManageAction'
import { connect } from 'react-redux'
import { toHome } from '../../../root'
import I18n from 'react-native-i18n'
import Toast from 'react-native-toast'
class KeyStore extends Component{
  constructor(props){
    super(props)
    this.state={
      keystoreVal:'',
      keystoreWarning: '',
      userNameVal: '',
      userNameWarning: '',
    }
  }
  
  onChangelKeystore = (val) => {
    this.setState({
      keystoreVal: val,
      keystoreWarning: ''
    })
  }
  onChangeUseNameText = (val) => {
    this.setState({
      userNameVal: val,
      userNameWarning: '',
    })
  }

  onPressImport = () => {
    const { keystoreVal, keystoreWarning,userNameVal,userNameWarning } = this.state
    if(userNameVal.length === 0){
      this.setState({
        userNameWarning: I18n.t('enter_account_name'),
      })
    }else{
      if(typeof JSON.parse(keystoreVal) !== 'object' || JSON.parse(keystoreVal).address.length !== 40){
        this.setState({
          keystoreWarning: I18n.t('keystore_warning'),
        })
      }else{
        this.onBtn()
      }
    }
    
  }

  onBtn = () => {
    const { keystoreVal, userNameVal } = this.state 
    this.props.dispatch(showImportLoadingAction(true))
    setTimeout(() => {
      this.props.dispatch(importAccountAction({
        keystoreVal,
        keystoreUserName: userNameVal,
        type: 'keystore',
        fromLogin: this.props.fromLogin === 'login' ? 'login' : 'accounts'
      }))
    },1000)
  }
  render(){
    isIphoneX() ?    //判断IPONEX
    this.state.DEFULT_IPONEX = 345
    : this.state.DEFULT_IPONEX = scaleSize(680);
    const { keystoreVal, keystoreWarning,userNameVal,userNameWarning,DEFULT_IPONEX } = this.state
    return(
      <View style={styles.container}>
        <TextInputComponent
          placeholder={I18n.t('account_name')}
          value={userNameVal}
          onChangeText={this.onChangeUseNameText}
          warningText={userNameWarning}//
        />
        <TextInputComponent
          isMultiline={true}
          placeholder={I18n.t('keystore_content')}
          value={keystoreVal}
          onChangeText={this.onChangelKeystore}
          warningText={keystoreWarning}
          iptMarginTop={scaleSize(60)}
        />
        {
          // <TextInputComponent
          //   placeholder={'password'}
          //   value={passwordVal}
          //   onChangeText={this.onChangPassword}
          //   secureTextEntry={true}
          //   warningText={passwordWarning}
          // />
        }
        <Btn
          btnMarginTop={scaleSize(60)}
          btnPress={this.onPressImport}
          btnText={I18n.t('import')}
          btnWidth={DEFULT_IPONEX}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...ifIphoneX(
      {
        flex: 1,
        backgroundColor:'#fff',
        width: 375
        // width: scaleSize(750),
      },
      {
        flex: 1,
        backgroundColor:'#fff',
        // width: scaleSize(750),
      },
      {
        flex: 1,
        backgroundColor:'#fff',
        // width: scaleSize(750),
      }
    )
  }
})

export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer
  })
)(KeyStore)