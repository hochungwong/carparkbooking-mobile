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
        console.log(orders)
        console.log(plateNumber)
        return (
            loading ? 
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
            :
            <Dashboard
                orders={orders} 
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