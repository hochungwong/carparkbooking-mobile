import React, { Component } from 'react'
import {Platform, StyleSheet, Text, View, Dimensions,Image,Alert} from 'react-native';
import { Card, CardItem, Container , Button, Icon , Left, Body, Right} from 'native-base';

import axios from 'axios';
import firebase from 'react-native-firebase';

import { connect } from 'react-redux';

const { width, height }= Dimensions.get('window');

class CarparkDetail extends Component {
    static navigationOptions = () => {
		return {
			header: null,
		};
    };

    constructor(props){
        super(props);
        this.state = {
            isBookClick: false,
            plateNumber: '',
            carparkId: '',
            isOrdered: false
        }
    }
    
    toogleOrderSummary = () => {
        this.setState({
            isBookClick: ! this.state.isBookClick
        })
    }

    
    submitOrder = (order, plateNumber ,carparkId,userId, latitude,longitude) => {
        const sessionsRef = firebase.database().ref("sessions");
        sessionsRef.set({
            startedAt: firebase.database.ServerValue.TIMESTAMP
        });
        sessionsRef.once("value").then(
            snapshot => {
                const serverTime = snapshot.val().startedAt;
                return serverTime;
        }).then(serverTime => {
            //submit to ordersForUsers
            const url = `https://parking-73057.firebaseio.com/ordersForUsers.json`;
            const orderData = {
                order: order,
                userId: userId,
                carparkId: carparkId,
                startedTime: serverTime,
                endTime: serverTime + 15 * 60 * 1000 
            }
            const coordinate = {
                latitude,
                longitude
            }
            axios.post(url, orderData).then(
                response => {
                    if(response.status === 200) {
                        this.props.navigation.navigate('OrderDetails', {order:  orderData, coordinate: coordinate});
                    }else{
                        Alert.alert("Order Submission","Fail, please try again");
                    }           
                }
            ).catch(e => {
                console.log(e)
            })
            return serverTime;
        }).then(serverTime => {
            const ordersForManagerRef = firebase.database().ref(`ordersForManager/${carparkId}/${plateNumber}` );
            ordersForManagerRef.push({
                startedTime: serverTime,
                endTime: serverTime + 15 * 60 * 1000,
                userId: userId
            }).then(() => {
                console.log("submit to manager succeesfully")
            }).catch(e => {
                console.log(e)
            })
        }).catch(e => {
            console.log(e)
        })
    }  

    componentDidMount() {
        const carparkData = this.props.navigation.getParam('carparkData');
        const orders = this.props.navigation.getParam('orders');
        const { carparkId } = carparkData;
        //check if the user booked before
        orders !== null && orders.map(order => {
            if (order.carparkId.toString() === carparkId){
                this.setState({
                    isOrdered: true
                })
            }
        })
    }

    render() {
        const { isBookClick , isOrdered } = this.state;
        const carparkData = this.props.navigation.getParam('carparkData');
        const {userId, plateNumber} = this.props;
        const {name, address, price, carparkId ,coordinate} = carparkData
        const latitude = coordinate['latitude'];
        const longitude = coordinate['longitude'];
        const order = {
            carpark: name,
            plateNumber: plateNumber,
        }
        return (
            <Container>
                <View style={styles.info__header__style}>
					<View style={styles.info__header__button}>
						<Button transparent onPress={this.toogleOrderSummary}>
							<Icon
								type='Ionicons'
								name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-down'}
								style={styles.info__header__icon}
							/>
						</Button>
					</View>
				</View>
                <Card >
                    <CardItem style={styles.cardHeader}>
                        <Left>
                            <Text>{name}</Text>
                        </Left>
                        {/* {isBookClick ?  */}
                        {isOrdered ?
                            <Right>
                                <Text style={styles.cardHeader_button_text}>AlreadyBooked</Text>
                            </Right>
                            :
                            <Right>
                                <Button
                                    info rounded bordered style={styles.cardHeader_button}
                                    onPress={this.toogleOrderSummary}
                                >
                                    <Text style={styles.cardHeader_button_text}>Book</Text>
                                </Button>
                            </Right>
                        }
                    </CardItem>
                    <CardItem cardBody style={styles.cardBody}>
                        <View style={{flex: 1}}>
                            <View style={styles.image__container}>
                                <View>
                                    <Image 
                                        resizeMode = 'contain'
                                        style = {styles.image}
                                        source = {{uri: 'http://www.ecarinsight.com.au/wp-content/uploads/2018/02/Tesla-Supercharger-Broadway-1.jpg'}}
                                    />
                                </View>
                            </View>
                        </View>
                    </CardItem>
                    <CardItem footer>
                        <Text>{address}</Text>
                    </CardItem>
                </Card>
                {isBookClick && 
                    <Card >
                        <CardItem style={styles.cardHeader} header bordered>
                            <Left>
                                <Text>$ {price} AUD/hr</Text>
                            </Left>
                        </CardItem>
                        {/* <CardItem bordered style={styles.cardBody}>
                            <Left>
                                <Text>Email:</Text>
                            </Left>
                            <Body>
                                <Text>{email}</Text>
                            </Body>
                        </CardItem> */}
                        <CardItem bordered style={styles.cardBody}>
                            <Left>
                                <Text>Plate Number: </Text>
                            </Left>
                            <Body>
                                <Text>{plateNumber}</Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Left>
                                <Button
                                    info rounded bordered style={styles.cardHeader_button}
                                    onPress={this.toogleOrderSummary}
                                >
                                    <Text style={styles.cardHeader_button_text}>Cancel</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button
                                    info rounded bordered style={styles.cardHeader_button}
                                    onPress={plateNumber ? () => {
                                                this.submitOrder(order,plateNumber,carparkId,userId,latitude, longitude)
                                            }
                                            :   
                                            () => {Alert.alert("Please first record your car plate")}
                                    }
                                >
                                    <Text style={styles.cardHeader_button_text}>Confirm</Text>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                }
            </Container>
        )
    }
}

const mapStateToProps = state => {
    const {auth, dashboard}= state
    return {
        access_token: auth.token,
        userId: auth.userId,
        plateNumber: dashboard.plateNumber
    }
}

export default connect(mapStateToProps)(CarparkDetail) ;

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