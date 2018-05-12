import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	PixelRatio,
	BackHandler,
	TextInput,
	Image,	
	TouchableOpacity
} from 'react-native'
import { pubS, DetailNavigatorStyle, } from '../../styles/'
import { scaleSize } from '../../utils/adapter'
import { coutryCode } from '../../utils/coutryCode'
import { Btn,TextInputComponent } from '../../components/' 
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'

import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal'
import DeviceInfo from 'react-native-device-info'
// import { isValidNumber } from 'libphonenumber-js/custom'
class BindPhone extends Component{
	constructor(props){
		super(props)
	    let userLocaleCountryCode = DeviceInfo.getDeviceCountry()
	    const userCountryData = getAllCountries()
	      .filter(country => coutryCode.includes(country.cca2))
	      .filter(country => country.cca2 === userLocaleCountryCode)
	      .pop()
	     console.log('userCountryData==',userCountryData)
	    let callingCode = null
	    let cca2 = userLocaleCountryCode
	    if (!cca2 || !userCountryData) {
	      cca2 = 'CN'
	      callingCode = '86'
	    } else {
	      callingCode = userCountryData.callingCode
	    }
	    this.state = {
	    	verifCode: '',
			invCode: '',
			coutry: '',
			phoneNumber:'',
	        cca2,
	        callingCode
	    }
	}
	componentDidMount(){

	}

	selectCoutry = () => {

	}
	onChangeVeriCode = (value) => {

	}

	onChangeInvCode = (value) => {

	}

	onPressBindBtn = () => {
		const { phoneNumber,cca2 } = this.state 

		// if(isValidNumber({ phone: phoneNumber, country: "CN" })){
		// 	this.props.navigator.push({
		//       screen: 'recom_prize',
		//       title:I18n.t('recom_prize'),
		//       navigatorStyle: DetailNavigatorStyle,
		//       backButtonTitle:I18n.t('back'),
		//       backButtonHidden:false,
		//     })
		// }else{
		// 	alert('错误')
		// }
	}
	onChangePhone = (value) => {
		this.setState({
			phoneNumber: value
		})
	}
	onPressCode = () => {

	}
	render(){
		const { currentAccount,globalAccountsList } = this.props.accountManageReducer
		const { verifCode, invCode, coutry, phoneNumber} = this.state
		return(
			<View style={pubS.container}>
	            <View style={[{justifyContent:'center'},pubS.textInputWH,pubS.bottomStyle1]}>
	            	<Text style={pubS.font26_4}>{currentAccount.address}</Text>
	            </View>
	            <View style={[pubS.textInputWH,pubS.bottomStyle1,pubS.rowCenterJus]}>
		            <CountryPicker
		              ref={'picker'}
			          countryList={coutryCode}
			          onChange={value => {
			          	console.log('coutry value=',value)
			            this.setState({ cca2: value.cca2, callingCode: value.callingCode })
			          }}
			          cca2={this.state.cca2}
			          translation="eng"
			          closeable={true}
			          filterable={true}
			          filterPlaceholder={'搜索你的国家'}
			          transparent={true}
			          closeButtonImage={require('../../images/xhdpi/btn_ico_collectionnobackup_close_def.png')}
			          showCallingCode={true}
			        />
			        <View style={pubS.arrowViewStyle}>
		            	<Image source={require('../../images/xhdpi/btn_ico_payment_select_def.png')} style={{width: scaleSize(16),height: scaleSize(30)}}/>
		            </View>
	            </View>
		        <View style={[pubS.rowCenterJus,pubS.bottomStyle1,pubS.textInputWH]}>
		        	<Text style={pubS.font26_5}>+{this.state.callingCode}</Text>
		        	<View style={{width: '70%'}}>
			            <TextInput
			              placeholder={I18n.t('phone_number')}
			              placeholderTextColor={'#C7CACF'}
			              value={phoneNumber}
			              onChangeText={this.onChangePhone}
			              underlineColorAndroid={'transparent'}
			            />
		        	</View>
		        	<TouchableOpacity activeOpacity={.7} onPress={this.onPressCode}>
		            	<Text style={pubS.font26_7}>获得验证码</Text>
		        	</TouchableOpacity>
		        </View>
	            <TextInputComponent
	              placeholder={I18n.t('verif_code')}
	              value={verifCode}
	              onChangeText={this.onChangeVeriCode}
	            />
	            <TextInputComponent
	              placeholder={I18n.t('Inv_code')}
	              value={invCode}
	              onChangeText={this.onChangeInvCode}
	            />
	            <Btn
	              btnPress={this.onPressBindBtn}
                  btnText={I18n.t('bind_btn')}
                  btnMarginTop={scaleSize(50)}
	            />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	touchFlag:{
		height: 50
	},
    data: {
	    padding: 15,
	    marginTop: 10,
	    backgroundColor: '#ddd',
	    borderColor: '#888',
	    borderWidth: 1 / PixelRatio.get(),
	    color: '#777'
   }
})

export default connect(
	state => ({
		accountManageReducer: state.accountManageReducer
	})
)(BindPhone)