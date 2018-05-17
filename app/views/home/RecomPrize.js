import React, { Component } from 'react'
import {
	View,
	Text,
	Image,
	StyleSheet,
	ART
} from 'react-native'
import { pubS, DetailNavigatorStyle, } from '../../styles/'
import { scaleSize } from '../../utils/adapter'
import { Btn } from '../../components/'
import QRCode from 'react-native-qrcode'
const { Surface, Shape, Path } = ART
const path = new Path()
      .moveTo(0, 0)
      .lineTo(scaleSize(380), 0)
      .lineTo(scaleSize(350), scaleSize(30))
      .lineTo(scaleSize(380), scaleSize(60))
      .lineTo(scaleSize(0), scaleSize(60))
      .lineTo(scaleSize(30), scaleSize(30))
      .lineTo(scaleSize(0), scaleSize(0))
      .close()
const tpath = new Path().moveTo(40,40).lineTo(99,10)
export default class RecomPrize extends Component{
	constructor(props){
		super(props)
		this.state={

		}
	}
	// componentWillMount(){
	// 	this.props.inviteCode
	// }

	onBtn = () => {
		
	}	
	render(){
		console.log('this.props.inviteCode==',this.props.inviteCode)
		return(
			<View style={{flex:1}}>
				<Image source={require('../../images/xhdpi/inv_bg.png')} style={[pubS.fullWH,{position:'relative'}]}/>
				<Image source={require('../../images/xhdpi/inv_pkg.png')} style={[styles.pkgStyle,pubS.posCenter]}/>
				<View style={[styles.qrStyle,pubS.posCenter]}>
					<QRCode
			            value={'wallet address'}
			            size={scaleSize(210)}
			            bgColor='#000'
			            fgColor='#fff'
			        />
				</View>
				<View style={[styles.pkgTextStyle,pubS.posCenter]}>
					<Text style={[pubS.font30_4,{textAlign: 'center'}]}>下载ETZ钱包</Text>
					<Text style={[pubS.font30_4,{textAlign: 'center'}]}>立得5ETZ奖励</Text>
				</View>
				<View style={[styles.btnStyle,pubS.posCenter]}>
					<Btn
						btnWidth={scaleSize(430)}
						bgColor={'#FFF422'}
						btnText={'邀请好友'}
						btnPress={this.onBtn}
						textStyle={pubS.font36_5}
					/>
				</View>
				<View style={[styles.invcodeStyle,pubS.posCenter]}>
					<Text style={[pubS.font60_2,{textAlign:'center',marginTop: scaleSize(50)}]} >{this.props.inviteCode}</Text>
				</View>
				<View style={[styles.artStyle,pubS.posCenter]}>
					<Surface width={scaleSize(380)} height={scaleSize(60)}>
		                <Shape d={path} stroke="#4A4EFD" fill="#4A4EFD" strokeWidth={0.1} />
		            </Surface>
				</View>
				<View style={[styles.invTextStyle,pubS.posCenter]}>
					<Text style={[pubS.font28_4,{textAlign:'center'}]}>我的邀请码</Text>
				</View>
				<View style={[styles.bottomTextStyle,pubS.posCenter]}>
					<Text style={[pubS.font24_6,{textAlign: 'center'}]}>每推荐一个好友下载注册</Text>
					<Text style={[pubS.font24_6,{textAlign: 'center',marginTop: 5}]}>推荐人可获得1ETZ,最高可获得5ETZ</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	qrStyle:{
		top: scaleSize(130),
		left: scaleSize(260),
	},
	invTextStyle:{
		bottom: scaleSize(296),
	},
	artStyle:{
		bottom: scaleSize(285),
		zIndex: 999,
	},
	pkgTextStyle:{
		top: scaleSize(430),
	},
	bottomTextStyle:{
		bottom: scaleSize(72),
		width: scaleSize(391),
	},
	invcodeStyle:{
		height: scaleSize(150),
		width: scaleSize(540),
		bottom: scaleSize(165),
		backgroundColor:'#fff',
		zIndex: -1	
	},
	btnStyle:{
		top: scaleSize(540),
	},
	pkgStyle: {
        top: scaleSize(50),
        width: scaleSize(640),
        height: scaleSize(666),
    // ...ifIphoneX(
    //   {
    //     position:'absolute',
    //     top: scaleSize(250),
    //     left: 135 ,
    //     width: scaleSize(166),
    //     height: scaleSize(242),
    //   },
    //   {
    //     position:'absolute',
    //     top: scaleSize(250),
    //     left: scaleSize(292),
    //     width: scaleSize(166),
    //     height: scaleSize(242),
    //   },
    //   {
    //     position:'absolute',
    //     top: scaleSize(250),
    //     left: scaleSize(292),
    //     width: scaleSize(166),
    //     height: scaleSize(242),
    //   }
    // )
    },
})