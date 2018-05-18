import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	PixelRatio,
	BackHandler,
	TextInput,
	Image,	
	TouchableOpacity,
	Alert
} from 'react-native'
import { pubS, DetailNavigatorStyle, } from '../../styles/'
import { scaleSize } from '../../utils/adapter'
import { coutryCode } from '../../utils/coutryCode'
import { Btn,TextInputComponent,Loading } from '../../components/' 
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'

import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal'
import { checkI18nPhone } from '../../utils/checkI18nPhone'
import { sendVerifCodeAction,bindAddressAction,resetActivityStatusAction } from '../../actions/activityAction'
// import DeviceInfo from 'react-native-device-info'
// import { isValidNumber } from 'libphonenumber-js/custom'
import Toast from 'react-native-toast'
class BindPhone extends Component{
	constructor(props){
		super(props)
		let userLocaleCountryCode
	    // let userLocaleCountryCode = DeviceInfo.getDeviceCountry()
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
	        callingCode,
	        loadingVisible: false,
			loadingText: '',
			countNum: 59,
			timerTitle: '获得验证码',
			touchabled: true,
	    }
	}
	componentDidMount(){
	
	}

	componentWillReceiveProps(nextProps){
		//发送验证码成功
			// Toast.showLongBottom(I18n.t('click_again')) 
		//绑定手机号成功
		if(this.props.activityReducer.bindStatus !== nextProps.activityReducer.bindStatus){
			this.setState({
				loadingVisible: false
			})
			if(nextProps.activityReducer.bindStatus === 1){
				console.log('nextProps.activityReducer.inviteCode===',nextProps.activityReducer.inviteCode)
				this.props.navigator.push({
				    screen: 'recom_prize',
				    title:I18n.t('recom_prize'),
				    navigatorStyle: DetailNavigatorStyle,
				    backButtonTitle:I18n.t('back'),
				    backButtonHidden:false,
				    passProps: {
				    	inviteCode: nextProps.activityReducer.inviteCode.invite_code
				    }
				})
			}else{
				if(nextProps.activityReducer.bindStatus === 2){
					console.log('nextProps.activityReducer.bind',nextProps.activityReducer.bindMsg)
					Alert.alert(nextProps.activityReducer.bindMsg)
				}
			}
			this.props.dispatch(resetActivityStatusAction())
		}

		
	}
	componentWillUnmount(){
		clearInterval(this.interval)
	}
	selectCoutry = () => {

	}
	onChangeVeriCode = (value) => {
		const { verifCode } = this.state
		
		this.setState({
			verifCode: value
		})
	}

	onChangeInvCode = (value) => {
		const { invCode } = this.state
		
		this.setState({
			invCode: value
		})
	}

	onPressBindBtn = () => {
		const { currentAccount } = this.props.accountManageReducer
		const { phoneNumber,callingCode,verifCode, invCode } = this.state 
		clearInterval(this.interval)
		if(verifCode.length !== 6){
			Alert.alert('验证码无效')
		}else{
			this.setState({
				loadingVisible: true,
				loadingText:'正在绑定',
			})
			this.props.dispatch(bindAddressAction({
				phoneNumber,
				callingCode,
				verifCode,
				invCode,
				address:`0x${currentAccount.address}`
			}))
		}
	}
	onChangePhone = (value) => {
		this.setState({
			phoneNumber: value
		})
	}
	onPressCode = () => {
		//验证手机号合法性
		const { phoneNumber,cca2,callingCode } = this.state 

		try{
			let res = checkI18nPhone(cca2,callingCode,phoneNumber)
			if(res){
				this.onStartCountDown()
				this.setState({
					// loadingVisible: true,
					loadingText:'正在发送验证码',
					touchabled: false
				})
				this.props.dispatch(sendVerifCodeAction(callingCode,phoneNumber))
			}
		}catch (error) {
			Alert.alert(error)
		}

	}
	//验证码倒计时
	 onStartCountDown = () => {
	    const codeTime = this.state.countNum;
	    const now = Date.now()
	    const overTimeStamp = now + codeTime * 1000 + 100/*过期时间戳（毫秒） +100 毫秒容错*/
	    this.interval = setInterval(() =>{
	      /* 切换到后台不受影响*/
	      const nowStamp = Date.now()
	      if (nowStamp >= overTimeStamp) {
	          /* 倒计时结束*/
	          this.interval&&clearInterval(this.interval);
	          this.setState({
	              countNum: codeTime,
	              timerTitle: '获取验证码',
	              touchabled: true
	          })
	      }else{
	          const leftTime = parseInt((overTimeStamp - nowStamp)/1000, 10)
	          this.setState({
	              countNum: leftTime,
	              timerTitle: `${leftTime}s后重新获取`,
	          })
	      }

	    },1000)

	  }
	render(){
		const { currentAccount,globalAccountsList } = this.props.accountManageReducer
		const { verifCode, invCode, coutry, phoneNumber, loadingVisible, loadingText, countNum, timerTitle, touchabled} = this.state
		return(
			<View style={pubS.container}>
				<Loading loadingVisible={loadingVisible} loadingText={loadingText}/>
	            <View style={[{justifyContent:'center'},pubS.textInputWH,pubS.bottomStyle1]}>
	            	<Text style={pubS.font26_4}>{`0x${currentAccount.address}`}</Text>
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
			              style={{color:'#657CAB'}}
			              value={phoneNumber}
			              onChangeText={this.onChangePhone}
			              underlineColorAndroid={'transparent'}
			            />
		        	</View>
		        	<TouchableOpacity 
		        		activeOpacity={touchabled ? .7 : 1} 
		        		onPress={touchabled ? () => this.onPressCode() : () => {return}}
		        	>
		            	<Text style={pubS.font26_7}>{timerTitle}</Text>
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
	              btnPress={touchabled ? () => this.onPressBindBtn() : () => {return}}
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
		activityReducer: state.activityReducer,
		accountManageReducer: state.accountManageReducer
	})
)(BindPhone)