import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  Image
} from 'react-native';

import {Content, List, ListItem} from 'native-base';
import Logo from '../assets/logo/carpark.png';

export default class SideBarList extends Component {

    backToUser = () => {
        this.props.navigation.navigate('Main');
    }

    jumpToCam = () => {
        this.props.navigation.navigate('Cam')
    }

    render() {
        return (
            <Content style={{backgroundColor:'#FFFFFF'}}>
                <Image
                    style={styles.logo__img}
                    source={Logo}
                />
                <List>
                    <ListItem onPress={this.backToUser}>
                        <Text>
                            User Dashboard
                        </Text>
                    </ListItem>
                    <ListItem onPress={this.jumpToCam}>
                        <Text>
                            Car Plate Recognition
                        </Text>
                    </ListItem>
                </List>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    logo__img: {
        marginTop:80,
        height: 80,
        width: 80,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
})