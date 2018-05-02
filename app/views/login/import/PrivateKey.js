import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,

} from 'react-native'

import { pubS } from '../../../styles/'
import { setScaleText, scaleSize } from '../../../utils/adapter'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { TextInputComponent,Btn,Loading } from '../../../components/'
import { toHome } from '../../../root'
import { importAccountAction,resetDeleteStatusAction } from '../../../actions/accountManageAction'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import I18n from 'react-native-i18n'
import Toast from 'react-native-toast'
class PrivateKey extends Component{
  constructor(props){
    super(props)
    this.state = {
      privKeyVal: '',
      psdVal: '',
      repeadPsdVal: '',
      promptVal: '',
      privKeyWarning: '',
      psdWarning: '',
      rePsdWarning: '',
      userNameVal: '',
      userNameWarning: '',
      visible: false,
    }
  }
  componentWillMount(){
    this.props.dispatch(resetDeleteStatusAction())
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.accountManageReducer.importStatus !== this.props.accountManageReducer.importStatus){
      this.setState({
        visible: false
      })
      if(nextProps.accountManageReducer.importStatus === 'success'){
        Toast.showLongBottom(I18n.t('import_successful'))
        setTimeout(() => {
          toHome()
        },100)
      }else{
        if(nextProps.accountManageReducer.importStatus === 'fail'){
          Toast.showLongBottom(I18n.t('import_fail'))
        }
      }
    }
  }
  onChangePrivateText = (val) => {
    this.setState({
      privKeyVal: val,
      privKeyWarning: ''
    })
  }
  onChangPsdText = (val) => {
    this.setState({
      psdVal: val,
      psdWarning: ''
    })
  }
  onChangeRepeatText = (val) => {
    this.setState({
      repeadPsdVal: val,
      rePsdWarning: ''
    })
  }
  onChangePromptText = (val) => {
    this.setState({
      promptVal: val
    })
  }
  onPressImport = () => {
    const { privKeyWarning, psdWarning, rePsdWarning, privKeyVal, psdVal, repeadPsdVal,userNameVal, userNameWarning} = this.state
    let privReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{64}$/

    // let psdReg = /^(?=.*[a-z])(?=.)(?=.*\d)[a-z\d]{8,}$/
    let psdReg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,}$/
    if(userNameVal.length === 0){
      this.setState({
        userNameWarning: I18n.t('enter_account_name'),
        visible: false
      })
    }else{
      if(!privReg.test(privKeyVal)){
        this.setState({
          privKeyWarning: I18n.t('private_key_warning'),
        })
      }else{
        if(!psdReg.test(psdVal)){
          this.setState({
            psdWarning: I18n.t('password_verification'),
          })
        }else{
          if(psdVal !== repeadPsdVal){
            this.setState({
              rePsdWarning: I18n.t('passwords_different'),
            })
          }else{
            this.onImport()
          }
        }
      }
    }
  }

  onImport = () => {
    const { privKeyVal, psdVal,userNameVal } = this.state  
    this.setState({
      visible: true
    })

    setTimeout(() => {
      this.props.dispatch(importAccountAction({
        privateKey: privKeyVal,
        privatePassword: psdVal,
        privateUserName: userNameVal,
        type: 'private',
        fromLogin: this.props.fromLogin === 'login' ? 'login' : 'accounts'
      }))
    },1000)
  }
  onChangeUseNameText = (val) => {
    this.setState({
      userNameVal: val,
      userNameWarning: ''
    })
  }
  render(){
    const { privKeyVal, psdVal, repeadPsdVal, promptVal, privKeyWarning, psdWarning, rePsdWarning,userNameVal, userNameWarning } = this.state
    return(
      <View>
        <Loading loadingVisible={this.state.visible} loadingText={I18n.t('loading_importing_account')}/>
        <TextInputComponent
          placeholder={I18n.t('account_name')}
          value={userNameVal}
          onChangeText={this.onChangeUseNameText}
          warningText={userNameWarning}//
        />
        <TextInputComponent
          isMultiline={true}
          placeholder={I18n.t('private_key')}
          value={privKeyVal}
          onChangeText={this.onChangePrivateText}
          warningText={privKeyWarning}
          iptMarginTop={scaleSize(60)}
        />
        <TextInputComponent
          placeholder={I18n.t('password')}
          value={psdVal}
          onChangeText={this.onChangPsdText}
          secureTextEntry={true}
          warningText={psdWarning}
        />
        <TextInputComponent
          placeholder={I18n.t('repeat_password')}
          value={repeadPsdVal}
          onChangeText={this.onChangeRepeatText}
          secureTextEntry={true}
          warningText={rePsdWarning}
        />
        {
          // <TextInputComponent
          //   placeholder={'password hint (Optional)'}
          //   value={promptVal}
          //   onChangeText={this.onChangePromptText}
          // />
          
        }
        <Btn
          btnMarginTop={scaleSize(60)}
          btnPress={this.onPressImport}
          btnText={I18n.t('import')}
        />
      </View>
    )
  }
}

export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer
  })
)(PrivateKey)