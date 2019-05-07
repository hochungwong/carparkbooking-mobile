import React, { Component } from 'react';
import { Drawer } from 'native-base';

import CarparkMap from './CarparkMap';
import SideBarList from '../SideBar/SideBarList';

import { inject, observer } from 'mobx-react';

const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = 0.001;

class MapView extends Component {
    static navigationOptions = () => {
		return {
			header: null,
		};
    };

    constructor(props){
        super(props);
        this._userStore = this.props.userStore;
    }

    closeDrawer = () => {
        this.drawer._root.close();
    }
    
    openDrawer = () => {
        this.drawer._root.open();
    }

    render() {
        const {region} = this._userStore;
        const _region = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }
        return (
            <Drawer
                side = 'right'
                ref = {ref => {this.drawer = ref}}
                content = {<SideBarList {...this.props}/>}
                onClose = {() => this.closeDrawer()}
            >   
                <CarparkMap openDrawer={this.openDrawer} region={_region} {...this.props}/>               
            </Drawer>
        )
    }
}

export default inject('userStore')(observer(MapView)) ;