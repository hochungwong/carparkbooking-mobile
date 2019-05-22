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
        console.log(userId)
        onFetchPlateNumber(userId);      
    }

    render() {
        const { 
            plateNumber , orders, loading ,onLogout
        } = this.props;
        const ordersData = [];
        for(let key in orders) {
           console.log(key)
           console.log(orders[key])
           const timeData = Object.values(orders[key])[0];
           const plate = Object.keys(orders[key])[0]
           console.log(timeData)
           // user id
           for(let k in timeData){
                ordersData.push({
                    plate: plate,
                    carparkId: key,
                    ...timeData[k]
                })
                console.log(timeData[k])
           } 
        }
        console.log(ordersData)
        console.log(plateNumber)
        return (
            loading ? 
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
            :
            <Dashboard
                ordersData={ordersData} 
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})