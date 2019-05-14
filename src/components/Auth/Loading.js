import React from 'react';

import { StyleSheet, Text, View ,ActivityIndicator, AsyncStorage} from 'react-native';
import firebase, { database } from 'react-native-firebase';

import { inject, observer } from 'mobx-react';

class Loading extends React.Component{
    constructor(props){
        super(props);
        this._authStore = this.props.authStore;
    }

    checkIsAuth = () =>  {
        const {setToken, setUserId} = this._authStore;
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                const userId = user.uid;
                user.getIdToken(true).then(token => {
                    AsyncStorage.setItem("access_token", token).then(
                        () => {
                            setToken(token)
                        }
                    )
                })
                setUserId(userId);
                this.props.navigation.navigate('Main');
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
