import React, { Component } from 'react'

import { ActivityIndicator, View, StyleSheet, Text} from 'react-native';

import Dashboard from '../components/Dashboard/Main';

import * as actions from '../stores/actions/index';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

class MainContainer extends Component {

    componentDidMount() {
        const {userId, onFetchPlateNumber} = this.props;
        onFetchPlateNumber(userId);      
    }

    render() {
        const { 
            plateNumber , orders, onLogout, userId
        } = this.props;
        const ordersData = [];
        //structure orders
        for(let key in orders) {
           const timeData = Object.values(orders[key])[0];
           const plate = Object.keys(orders[key])[0]
           for(let k in timeData){
                ordersData.push({
                    plate: plate,
                    carparkId: key,
                    ...timeData[k]
                })
           } 
        }
        //pick specific orders for users
        const ordersDataForUsers = [];
        ordersData.map(order => {
            if (order.userId === userId) {
                ordersDataForUsers.push(order)
            } else {
                console.log("no specific orders")
            }
        })

        return (
            // loading ? 
            // <View style={styles.container}>
            //     <Text>Loading</Text>
            //     <ActivityIndicator size="large" />
            // </View>
            // :
            <Dashboard
                ordersData={ordersDataForUsers} 
                plateNumber ={plateNumber}
                logout = {onLogout}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        plateNumber: state.dashboard.plateNumber,
        loading: state.dashboard.loading,
        orders: state.firebase.data.ordersForManager
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPlateNumber: userId => dispatch(actions.fetchPlateNumber(userId)),
        onLogout: () => dispatch(actions.logout())
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect([
        '/ordersForManager'
    ])
)(MainContainer);
