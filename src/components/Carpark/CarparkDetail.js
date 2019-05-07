import React, { Component } from 'react'
import {Platform, StyleSheet, Text, View,TouchableOpacity,Dimensions,Image} from 'react-native';
import { Card, CardItem, Content, Container , Button, Icon , Left, Body, Right} from 'native-base';

const { width, height }= Dimensions.get('window');

export default class CarparkDetail extends Component {
    static navigationOptions = () => {
		return {
			header: null,
		};
    };
    render() {
        const carparkData = this.props.navigation.getParam('carparkData');
        console.log(carparkData)
        return (
            <Container>
                <View style={styles.info__header__style}>
					<View style={styles.info__header__button}>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
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
                            <Text>{carparkData.name}</Text>
                        </Left>
                        <Right>
                            <Button
                                info rounded bordered style={styles.cardHeader_button}
                                onPress={() => {this.props.navigation.navigate('CheckoutForm')}}
                            >
                                <Text style={styles.cardHeader_button_text}>Book</Text>
                            </Button>
						</Right>
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
                        <Text>{carparkData.address}</Text>
                    </CardItem>
                </Card>
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    info__header__style: {
		height: 100,
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
        height: Platform.OS === 'ios' ? height*0.45: height*0.62,
		width: width-4,
    }
})