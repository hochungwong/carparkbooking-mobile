import React from 'react';

import { StyleSheet, Text, View ,Button} from 'react-native';
import firebase from 'react-native-firebase'
import { observer, inject } from 'mobx-react';

const LATITUD_DELTA = 0.005;
const LONGITUDE_DELTA = 0.001;

export default class Main extends React.Component{
    static navigationOptions = () => {
		return {
			header: null,
		};
    };
    
    state = {
        currentUser: null,
        region: {}
    }

    _setCoord = () => {
        navigator.geolocation.getCurrentPosition(
          ({coords}) => {
            const { latitude,longitude } = coords
            const region = {
              latitude,
              longitude,
              latitudeDelta: LATITUD_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }
            this.setState({
              region: region
            })
          },
          error => console.log('find me error',error),
          {enableHighAccuracy: false, timeout: 20000},
      )
    }
  
    _watchCoord = () => {
      navigator.geolocation.watchPosition(
        ({coords}) => {
          const {latitude, longitude} = coords
          const region = {
            latitude,
            longitude,
            latitudeDelta: LATITUD_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
          this.setState({
            region: region
          })
        }
      )
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
        this._setCoord()
        this._watchCoord()
    }

    handleSignOut = () => {
        firebase.auth().signOut(()=>{
            this.props.navigation.navigate('Login');
        }).catch(e => console.log(e))
    }

    jumpToMap = () => {
        this.props.navigation.navigate('CarparkMap',{region: this.state.region});
    }
    
    render(){
        const {currentUser,region} = this.state;
        console.log(region)
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