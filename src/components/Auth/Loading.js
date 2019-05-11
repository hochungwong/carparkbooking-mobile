import React from 'react';

import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native';
import firebase from 'react-native-firebase';

import { inject, observer } from 'mobx-react';

class Loading extends React.Component{
    constructor(props){
        super(props);
        this._authStore = this.props.authStore;
    }

    checkIsAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                const {currentUser} = firebase.auth();
                const userId = currentUser._user.uid;
                const {setToken, setUserId} = this._authStore;
                setUserId(userId);
                firebase.auth().currentUser.getIdToken(true).then(
                    token => setToken(token)
                ).then(token => 
                    this.props.navigation.navigate('Main', {token: token, userId: userId})
                ).catch(e => {
                    console.log(e)
                })
            }else{
                this.props.navigation.navigate('Login');
            }
        })
    }

    componentDidMount(){
        this.checkIsAuth();
    }  

    render(){
        return(
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

export default inject('authStore')(observer(Loading))

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
