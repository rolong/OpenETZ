import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  StatusBar
} from 'react-native'

import { pubS } from '../../../styles/'
import { setScaleText, scaleSize, ifIphoneX } from '../../../utils/adapter'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import  PrivateKey from './PrivateKey'
import KeyStore from './KeyStore'
import Mnemonic from './Mnemonic'
import { connect } from 'react-redux'
import { toSplash,toHome } from '../../../root'
import { resetDeleteStatusAction } from '../../../actions/accountManageAction'
import { Loading } from '../../../components/' 
import I18n from 'react-native-i18n'
class ImportAccount extends Component{
  componentWillReceiveProps(nextProps){
    // if(nextProps.accountManageReducer.importSucc !== this.props.accountManageReducer.importSucc && nextProps.accountManageReducer.importSucc){
    //   ToastAndroid.show('import successfully',3000)
    //   toSplash()
    //   this.props.dispatch(resetDeleteStatusAction())
    // }
  }

  render(){
    const { importSucc } = this.props.accountManageReducer
    return(
      <View style={pubS.container}>
      <StatusBar backgroundColor="#000000"  barStyle="dark-content" animated={true} />
        {
          // <Loading loadingVisible={importSucc} loadingText={'importing account'}/>
          
        }
        <ScrollableTabView
          style={styles.TabViewStyle}
          tabBarActiveTextColor={'#2B8AFF'}
          tabBarInactiveTextColor={'#CACED4'}
          tabBarTextStyle={{fontSize: setScaleText(26)}}

          renderTabBar={() => (
            <DefaultTabBar
              underlineStyle={[styles.underlineStyle]}  
              tabBarBackgroundColor={'#fff'}
              style={styles.tabBarStyle}
              tabStyle={{ paddingTop: 10, height: 45, zIndex: 999, }}
            />
          )}
        >
            <Mnemonic key={1} tabLabel={I18n.t('mnemonic_phrase')} thisProps={this} fromLogin={this.props.fromLogin}/>
            <KeyStore key={2} tabLabel={"Keystore"} thisProps={this} fromLogin={this.props.fromLogin}/>
            <PrivateKey key={3} tabLabel={I18n.t('private_key')} thisProps={this} fromLogin={this.props.fromLogin}/>
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  TabViewStyle:{
    ...ifIphoneX(
      {
        width:375
      },
      {
        width: scaleSize(750)
      },
      {
        width: scaleSize(750)
      }
    )
  },
  underlineStyle: {
    borderColor: '#2B8AFF',
    backgroundColor: '#2B8AFF',
    borderBottomWidth:3,
    height:0,
  },
  tabBarStyle:{
    ...ifIphoneX(
      {
         width: 375,
         alignItems: 'center',
         backgroundColor: '#fff',
         borderColor:'transparent',
         marginBottom:-1
      },
      {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor:'transparent',
        marginBottom:-1
      },
      {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor:'transparent',
        marginBottom:-1
      }
    )
  }
})

export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer
  })
)(ImportAccount)