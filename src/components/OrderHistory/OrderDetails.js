import React, { Component } from 'react'

import {Platform, StyleSheet, Text,View,TouchableOpacity,Dimensions,Image,Alert,ScrollView} from 'react-native';
import { Card, CardItem, Content, Container , Button, Icon , Left, Body, Right} from 'native-base';

import { inject, observer } from 'mobx-react';

import firebase from 'react-native-firebase';

import TimerCountdown from "react-native-timer-countdown";

const { width , height } = Dimensions.get('window');

class OrderDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
        this._authStore = this.props.authStore;
        this._userStore = this.props.userStore;
    }
   
    //cancel order in 15 minutes
    cancelOrderInSpecificTime = () => {
        const order = this.props.navigation.getParam('order');
        const {id} = order;
        const ordersForUsersRef = firebase.database().ref(`/ordersForUsers/${id}`);
        ordersForUsersRef.once('value').then(
            snapshot => {
                snapshot.forEach(child => {
                    child.ref.set(null)
                });
            }
        ).catch(e => {
            console.log(e)
        })
    }  

    componentDidMount(){
        // this.cancelOrderInSpecificTime();
    }
    
    render() {
        const order  = this.props.navigation.getParam('order');
        const orderEndTime = order.endTime;
        console.log(orderEndTime);
        const curretnTime = Number(Date.now());
        console.log(curretnTime);
        return (
            <ScrollView>
                <View style={styles.info__header__style}>
					<View style={styles.info__header__button}>
						<Button transparent >
							<Icon
								type='Ionicons'
								name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-down'}
								style={styles.info__header__icon}
							/>
						</Button>
					</View>
				</View>
                    <Card key={order.id}>
                        <CardItem style={styles.cardHeader} header bordered>
                            <Left>
                                <Text>{new Date(order.time).toLocaleString()}</Text>
                            </Left>
                            <Body>
                                <Text>{order.id}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered style={styles.cardBody}>
                            <Left>
                                <Text>Email:</Text>
                            </Left>
                            <Body>
                                <Text>{order.order.email}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered style={styles.cardBody}>
                            <Left>
                                <Text>Plate Number: </Text>
                            </Left>
                            <Body>
                                <Text>{order.order.plateNumber}</Text>
                            </Body>
                        </CardItem>
                        <CardItem footer style={{height: 100}}>
                            {/* <Left>
                                <Text >Please Arrive at the carpark within 15 minitues</Text>
                            </Left> */}
                            <TimerCountdown
                                initialMilliseconds={orderEndTime - curretnTime}
                                onTick={(milliseconds) => console.log("tick", milliseconds)}
                                onExpire={() => {this.cancelOrderInSpecificTime()}}
                                formatMilliseconds={(milliseconds) => {
                                    const remainingSec = Math.round(milliseconds / 1000);
                                    const seconds = parseInt((remainingSec % 60).toString(), 10);
                                    const minutes = parseInt(((remainingSec / 60) % 60).toString(), 10);
                                    const hours = parseInt((remainingSec / 3600).toString(), 10);
                                    const s = seconds < 10 ? '0' + seconds : seconds;
                                    const m = minutes < 10 ? '0' + minutes : minutes;
                                    let h = hours < 10 ? '0' + hours : hours;
                                    h = h === '00' ? '' : h + ':';
                                    return h + m + ':' + s;
                                }}
                                allowFontScaling={true}
                                style={{ fontSize: 20 }}
                            />
                        </CardItem>
                    </Card>
        </ScrollView>
        )
    }
}

export default inject('authStore','userStore')(observer(OrderDetails)) ;

const styles = StyleSheet.create({
    info__header__style: {
		height: 80,
		flexDirection: 'column',
		backgroundColor: 'transparent',
		borderBottomWidth: 0,
	},
	info__header__button: {
		alignSelf: 'flex-start',
		marginTop:20,
		marginLeft:20
	},
	info__header__view: {
		alignSelf: 'center'
	},
	info__header__icon: {
		color: 'black',
		fontSize: Platform.OS === 'ios' ? 30 : 25,
		marginLeft: 0,
		marginTop: 0
    },
    cardHeader: {
        height: 50
    },
    cardHeader_button: {
		borderColor: '#000',
		alignItems: 'center',
		paddingHorizontal:5,
		height: 29,
		// width: 80,
	},
	cardHeader_button_text: {
		fontFamily: 'PingFangSC-Light',
		color: '#000',
		...Platform.select({
			ios:{
				fontSize:12
			},
			android:{
				fontSize:11,
				textAlign:'center'
			}
		})
	},
    image__container: {
		backgroundColor:'transparent',
	},
    image: {
        height: Platform.OS === 'ios' ? height*0.45: height*0.44,
		width: width-4,
    }
})