import React, { Component } from 'react'

import {Platform, StyleSheet, Text,View,TouchableOpacity,Dimensions,Image,Alert,ScrollView} from 'react-native';
import { Card, CardItem, Content, Container , Button, Icon , Left, Body, Right} from 'native-base';

import { inject, observer } from 'mobx-react';

import axios from 'axios';

const { width , height } = Dimensions.get('window');

class OrderHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            orders: []
        }
        this._authStore = this.props.authStore;
        this._userStore = this.props.userStore;
    }
   
    
    fetchOrder = (userId, token) => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        const url = (`https://parking-73057.firebaseio.com/ordersForUsers.json` + queryParams);
        axios.get(url).then(
            response => {
                if(response.status === 200) {
                    const fetchedData = [];
                    for ( let key in response.data ) {
                        fetchedData.push( {
                            ...response.data[key],
                            id: key
                        } );
                    }
                    this.setState({
                        orders: fetchedData
                    })
                }else{
                    console.log('Fetch Failed');
                }
            }
        ).catch(e => {
            console.log(e)
        })
    }

    componentDidMount(){
        const { userId, access_token } = this._authStore;
        this.fetchOrder(userId, access_token);
    }
    
    render() {
        const { orders } = this.state;
        console.log(orders);
        return (
            <ScrollView>
                <View style={styles.info__header__style}>
					<View style={styles.info__header__button}>
						<Button transparent ƒ>
							<Icon
								type='Ionicons'
								name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-down'}
								style={styles.info__header__icon}
							/>
						</Button>
					</View>
				</View>
            {orders.length !== 0?
                orders.map((order,key) => (
                    <Card key={key}>
                        <CardItem style={styles.cardHeader} header bordered>
                            <Left>
                                <Text>{order.order.time}</Text>
                            </Left>
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

export default inject('authStore','userStore')(observer(OrderHistory)) ;

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