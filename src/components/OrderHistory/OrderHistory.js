import React, { Component } from 'react'

import {Platform, StyleSheet, Text,View,Dimensions,ScrollView} from 'react-native';
import { Card, CardItem, Button, Icon , Left, Body, Right} from 'native-base';

import firebase from 'react-native-firebase';

import TimerCountdown from 'react-native-timer-countdown';

const { width , height } = Dimensions.get('window');

class OrderHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            isOrderCancelled: false
        }
    }
   
    //cancel order in 15 minutes
    cancelOrderInSpecificTime = orderId => {
        const ordersForUsersRef = firebase.database().ref(`/ordersForUsers/${orderId}`);
        ordersForUsersRef.once('value').then(
            snapshot => {
                snapshot.forEach(child => {
                    child.ref.set(null)
                });
            }
        ).then(
            this.setState({
                isOrderCancelled: true
            })
        ).catch(e => {
            console.log(e)
        })
    }  

    jumpToDetail = () => {
        this.props.navigation.navigate('OrderDetails');
    }

    render() {
        const orders = this.props.navigation.getParam('orders');
        const { isOrderCancelled } = this.state;
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
            {orders !== null && orders.length !== 0 ?
                orders.map((order, key) => (
                    <Card key={key}>
                        <CardItem style={styles.cardHeader} header bordered>
                            <Left>
                                <Text>{new Date(order.startedTime).toLocaleString()}</Text>
                            </Left>
                            <Body />
                        </CardItem>
                        {/* <CardItem bordered style={styles.cardBody}>
                                <Left>
                                    <Text>Email:</Text>
                                </Left>
                                <Body>
                                    <Text>{order.order.email}</Text>
                                </Body>
                            </CardItem> */}
                            <CardItem bordered style={styles.cardBody}>
                                <Left>
                                    <Text>Plate Number: </Text>
                                </Left>
                                <Body>
                                    <Text>{order.plate}</Text>
                                </Body>
                            </CardItem>
                            <CardItem footer >
                                {isOrderCancelled ? 
                                    <Left>
                                        <Text>Order Cancelled</Text>
                                    </Left>
                                    :
                                    <Left>
                                        <Text>Please arrive within{' '}</Text>
                                        <TimerCountdown
                                            initialMilliseconds={order.endTime - Number(Date.now())} //14.5 * 60 * 1000
                                            onExpire={() => {this.cancelOrderInSpecificTime(order.id)}}
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
                                        <Body>
                                            <Button
                                                info rounded bordered style={styles.cardHeader_button}
                                                onPress={this.toogleOrderSummary}
                                            >
                                                <Text style={styles.cardHeader_button_text}>Cancel</Text>
                                            </Button>
                                        </Body>
                                        {/* <Right>
                                            <Button
                                                info rounded bordered style={styles.cardHeader_button}
                                                onPress={this.jumpToDetail}
                                            >
                                                <Text style={styles.cardHeader_button_text}>Detial ></Text>
                                            </Button>
                                        </Right> */}
                                    </Left> 
                                }

                            </CardItem>
                    </Card>
                    
                )): 
                <Card>
                    <CardItem style={styles.cardHeader} header bordered>
                            <Left />
                            <Body>
                                <Text>No Orders Currently</Text>
                            </Body>
                            <Right />
                    </CardItem>
                </Card>
            }
        </ScrollView>
        )
    }
}

export default OrderHistory ;

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