import React, { Component } from 'react';
import { Drawer, Spinner } from 'native-base';

import CarparkMap from './CarparkMap';
import SideBarList from '../SideBar/SideBarList';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect , withFirebase} from 'react-redux-firebase';

class MapView extends Component {
    static navigationOptions = () => {
		return {
			header: null,
		};
    };

    closeDrawer = () => {
        this.drawer._root.close();
    }
    
    openDrawer = () => {
        this.drawer._root.open();
    }

    render() {
        const { carparks } = this.props;
        const orders = this.props.navigation.getParam('orders')
        return (
            carparks !== undefined ? 
                <Drawer
                    side = 'right'
                    ref = {ref => {this.drawer = ref}}
                    content = {<SideBarList {...this.props}/>}
                    onClose = {() => this.closeDrawer()}
                >   
                    <CarparkMap openDrawer={this.openDrawer} carparks={carparks} orders={orders} {...this.props}/>               
                </Drawer>
                :
                <Spinner color= 'black' />
        )
    }
}

const mapStateToProps = state => {
    return {
        carparks: state.firebase.data.carparksForUsers
    }
}

export default compose(
    connect(mapStateToProps),
    withFirebase,
    firebaseConnect([
        '/carparksForUsers'
    ])
)(MapView)