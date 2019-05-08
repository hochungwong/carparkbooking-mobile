import React, { Component } from 'react'

import { View, StyleSheet, Text, Platform, TextInput, ToastAndroid, ActionSheetIOS, ImageBackground, Alert} from 'react-native';
import {Container, Header, Button, Content, Form, Item, Icon, Label, Radio, DatePicker, Thumbnail} from 'native-base';

import { inject, observer } from 'mobx-react';

import metrics from '../config/metrics';

import axios from 'axios';

class UserInfo extends Component {
    constructor(props){
        super(props);
        this._authStore = this.props.authStore;
        this._userStore = this.props.userStore;
        this.state = {
            email: this.props.navigation.getParam('email'),
            plateNumber: this.props.navigation.getParam('plate'),
            name:'',
            phoneNumber:'',
            show_avatar: this._userStore.avatar
        }
    }


    submitInfo = userId => {
		const {access_token} = this._authStore;
		const {setPhoneNumber}  = this._userStore;
        const url = `https://parking-73057.firebaseio.com/userInfo.json?auth=${access_token}`;
        const infoData = {
            info: [
                {'k': 'email', 'v': this.state.email},
                {'k': 'plate', 'v': this.state.plateNumber},
                {'k': 'name', 'v': this.state.name},
                {'k': 'phone', 'v': this.state.phoneNumber},
            ],
            userId: userId
		}
		setPhoneNumber(this.state.phoneNumber);
        axios.post(url ,infoData).then(
            response => {
                if(response.status === 200){
                    Alert.alert('Info Sumbimittion',"Success")
                }else{
                    Alert.alert('Info Sumbimittion','Fail')
                }
			}
        ).catch(e => {
            console.log(e)
        })
    }

    render() {
        const { email, plateNumber, name, phoneNumber , show_avatar} = this.state;
        const {userId} = this._authStore;
        return (
            <ImageBackground blurRadius={3} source={show_avatar} style={styles.edit__bg}>
				<View style={styles.edit__header}>
					<View style={styles.edit__header__button}>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon
								type='Ionicons'
								name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-down'}
								style={styles.edit__header__icon}
							/>
						</Button>
					</View>
					{/* <View style={styles.edit__header__view}>
						<Thumbnail style={styles.edit__profile__thumb} large source={this.state.show_avatar}/>
						<Button transparent onPress={() =>this._selectPhoto()}>
							<Text style={styles.edit__icon}>{I18n.t('info.profile')}</Text>
						</Button>
					</View> */}
				</View>

				<Content>
					<Form>
						<Item style={styles.edit__item}>
							<Thumbnail square source={require('../assets/info/info.png')}
												 style={[styles.edit__thumb, {marginRight: 17, width: 14, height: 20}]}/>
							{/* <Label style={styles.edit__input}>Email;:</Label> */}
							<Text style={styles.info__text}>{email}</Text>
						</Item>
						<Item style={styles.edit__item}>
                            <Thumbnail 
                                square 
                                source={require('../assets/info/lab.png')}
                                style={[styles.edit__thumb, {marginRight: 14, width: 18, height: 14}]}/>
							{/* <Text style={styles.edit__input}>Plate Number: </Text> */}
							<Text style={styles.info__text}>{plateNumber ? plateNumber : "plate number"}</Text>
						</Item>
                        <Item style={styles.edit__item}>
							<Thumbnail square source={require('../assets/info/name.png')}
												 style={[styles.edit__thumb, {marginRight: 14, width: 18, height: 14}]}/>
							{/* <Text style={styles.edit__input}>Name: </Text> */}
							<TextInput
								value={name}
								placeholder="Name"
								style={styles.edit__input}
								onChangeText={value => this.setState({name: value})}
							/>
						</Item>
						<Item style={styles.edit__item}>
							<Thumbnail square source={require('../assets/info/city.png')}
												 style={[styles.edit__thumb, {marginRight: 14, width: 18, height: 14}]}/>
							{/* <Text style={styles.edit__input}>Phone: </Text> */}
							<TextInput
								value={phoneNumber}
								placeholder="Phone Number"
								style={styles.edit__input}
								onChangeText={value => this.setState({phoneNumber: value})}
							/>
						</Item>
					</Form>
					<Button 
						bordered 
						style={styles.edit__button}
						onPress={name === '' || phoneNumber === ''?
							() => {Alert.alert("Please enter name or phone number")}
							:
							() => {this.submitInfo(userId)}
						}
					>
						<Text style={styles.edit__button__text}>Submit</Text>
					</Button>
				</Content>
			</ImageBackground>
        )
    }
}


export default inject('authStore','userStore')(observer(UserInfo));

const styles = StyleSheet.create({
	edit__bg: {
		flex: 1,
		flexDirection: 'column',
		width: metrics.DEVICE_WIDTH,
		height: 180,
		backgroundColor:'#fff',
		resizeMode:'cover'
	},
	edit__header: {
		height: 180,
		flexDirection: 'column',
		backgroundColor: 'transparent',
		borderBottomWidth:0
	},
	edit__profile__thumb:{
		borderWidth:3,
		borderColor:'#fff',
		alignSelf:'center'
	},
	edit__header__button:{
		alignSelf: 'flex-start',
		marginTop:20,
		marginLeft:20
	},
	edit__header__view:{
		alignSelf: 'center'
	},
	edit__header__icon: {
		color: '#fff',
		fontSize: Platform.OS === 'ios' ? 30 : 25,
		marginLeft: 0,
		marginTop: 0
	},
	edit__item:{
		height: 55
	},
	edit__button: {
		alignSelf: 'center',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 35,
		height: 36,
		borderColor: '#000',
		borderWidth: 1,
		borderRadius: 2
	},
	edit__button__text:{
		color: '#000',
		fontSize: 16,
		fontFamily: 'PingFangSC-Light'
	},
	edit__input: {
		color: '#000',
		fontSize: 16,
		fontFamily: 'PingFangSC-Thin',
		alignSelf:'center'
	},
	edit__icon: {
		color: '#000',
		fontSize: 16,
		fontFamily: 'PingFangSC-Light',
		alignSelf:'center',
		marginBottom:10
	},
	edit__radio__item: {
		paddingRight: 40,
		borderColor: 'transparent'
	},
	edit__thumb:{
        marginLeft: 10,
        resizeMode:'contain'
    },
    info__text: {
		color: '#000',
		fontSize: 16,
		fontFamily: 'PingFangSC-Thin'
	},
});
