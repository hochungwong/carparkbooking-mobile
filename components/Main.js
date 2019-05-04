import React from 'react';

import { StyleSheet, Text, View ,Button} from 'react-native';
import firebase from 'react-native-firebase';

export default class Main extends React.Component{
    static navigationOptions = () => {
		return {
			header: null,
		};
    };
    
    state = {
        currentUser: null,
    }

    componentDidMount(){
        const { currentUser } = firebase.auth();
        console.log(currentUser._user)
        this.setState({
            currentUser:currentUser
        });
        firebase.messaging().getToken().then(
            token => console.log(token)
        )
    }

    handleSignOut = () => {
        firebase.auth().signOut(()=>{
            this.props.navigation.navigate('Login');
        }).catch(e => console.log(e))
    }

    jumpToMap = () => {
        this.props.navigation.navigate('CarparkMap');
    }
    
    render(){
        const {currentUser} = this.state;
        return(
            <View style={styles.container}>
                <Text>
                    Hi {currentUser && currentUser.email}
                </Text>
                <Button title="To Carpark" onPress={this.jumpToMap}/>
                <Button title="Sign Out" onPress={this.handleSignOut}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})