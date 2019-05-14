import React, { Component } from 'react'

import { AsyncStorage ,ActivityIndicator, View, StyleSheet, Text} from 'react-native';

import Dashboard from '../components/Dashboard/Main';

import { inject, observer } from 'mobx-react';

class MainContainer extends Component {

    componentDidMount() {
        const {userStore, authStore} = this.props;
        const {userId } = authStore;
        const {fetchOrders, fetchCarplate } = userStore;
        
        this.intervalId = setInterval(
            () => {
                AsyncStorage.getItem("access_token").then(
                    access_token => {
                        console.log(access_token);
                        fetchOrders(userId, access_token);
                    }
                )
            },2000);
        fetchCarplate(userId);
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    render() {
        const { userStore, authStore } = this.props;
        const { access_token } = authStore;
        console.log(access_token)
        const { orders ,plateNumber } = userStore;
        const _orders = JSON.parse(orders);
        return (
            access_token === null ? 
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
            :
            <Dashboard
                orders={_orders} 
                plateNumber ={plateNumber}
                {...this.props}
            />
        )
    }
}

export default inject('authStore', 'userStore')(observer(MainContainer));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})