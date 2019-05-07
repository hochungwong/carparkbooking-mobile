import React, { Component } from 'react';
import { Drawer } from 'native-base';

import CarparkMap from './CarparkMap';
import SideBarList from '../SideBar/SideBarList';

export default class MapView extends Component {
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
        const region = this.props.navigation.getParam('region');
        return (
            <Drawer
                ref = {ref => {this.drawer = ref}}
                content = {<SideBarList {...this.props}/>}
                onClose = {() => this.closeDrawer()}
            >
                 
                    <CarparkMap openDrawer={this.openDrawer} region={region}/>
                
            </Drawer>
        )
    }
}
