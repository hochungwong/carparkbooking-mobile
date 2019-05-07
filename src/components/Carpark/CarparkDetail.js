import React, { Component } from 'react'
import {Platform, StyleSheet, Text, View,TouchableOpacity,Dimensions} from 'react-native';
import { Card, CardItem, Content, Container } from 'native-base';
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
            <View>
                <Text>Carpark Detail Here</Text>
            </View>
        )
    }
}
