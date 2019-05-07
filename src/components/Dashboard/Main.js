import React from 'react';

import { StyleSheet,  View  } from 'react-native';
import firebase from 'react-native-firebase'
import { observer, inject } from 'mobx-react';

import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

import axios from 'axios';

const LATITUD_DELTA = 0.005;
const LONGITUDE_DELTA = 0.001;

class Main extends React.Component{
    static navigationOptions = () => {
      return {
        header: null,
      };
    };
    
    constructor(props){
      super(props);
      this.state = {
        currentUser: null,
      }
      this._userStore = this.props.userStore;
      this._authStore = this.props.authStore;
    }

    _setCoord = () => {
        const {setLat,setLng} = this._userStore;
        navigator.geolocation.getCurrentPosition(
          ({coords}) => {
            const { latitude,longitude } = coords
            const region = {
              latitude,
              longitude,
              latitudeDelta: LATITUD_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }
            setLat(region.latitude);
            setLng(region.longitude);
          },
          error => console.log('find me error',error),
          {enableHighAccuracy: false, timeout: 20000},
      )
    }
  
    _watchCoord = () => {
      const {setLat,setLng} = this._userStore;
      navigator.geolocation.watchPosition(
        ({coords}) => {
          const {latitude, longitude} = coords
          const region = {
            latitude,
            longitude,
            latitudeDelta: LATITUD_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
          // this.setState({
          //   region: region
          // })
          setLat(region.latitude);
          setLng(region.longitude);
          this.transferToGeolocation(region.latitude, region.longitude);
        }
      )
    }

    transferToGeolocation = (lat,lng) => {
      const {setAddress} = this._userStore;
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA5VHl9u1kMya_xE21vcdEtOYcqLL8Qcic`;
      axios.get(geocodeUrl).then(
        res => {
          setAddress(res.data.results[0].formatted_address);
        }
      ).catch( e => {
        console.log(e)
      })
    }
    async componentDidMount(){
        const { currentUser } = firebase.auth();
        this.setState({
            currentUser:currentUser
        });
        // firebase.messaging().getToken().then(
        //     token => console.log(token)
        // )
        this._setCoord()
        this._watchCoord()
    }

    handleSignOut = () => {
        const { wipeUserId, wipeToken } = this._authStore;
        firebase.auth().signOut(()=>{
          wipeUserId();
          wipeToken()
        }).then(() => {
          this.props.navigation.navigate('Login');
        }).catch(e => 
          console.log(e)
        )
    }

    jumpToMap = () => {
        this.props.navigation.navigate('CarparkMap');
    }
    
    jumpToCam = () => {
      this.props.navigation.navigate('Cam');
    }

    render(){
        const {currentUser} = this.state;
        const { userId , access_token } = this._authStore;
        // const userId = this.props.navigation.getParam('userId');
        // const access_token = this.props.navigation.getParam('token');
        const {region ,currentAddress} = this._userStore;
        console.log(userId, "/", access_token)
        return(
            <Container>
              <Header >
                <Left />
                <Body >
                  <Text >Hi {currentUser && currentUser.email} !</Text>
                </Body>
                <Right />
              </Header>
              <Content>
                <List>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail square source={require('../assets/logo/carpark.png')} resizeMode='contain'/>
                    </Left>
                    <Body>
                      <Text onPress={this.jumpToMap}>Find Carpark Near</Text>
                      <Text note numberOfLines={2}>Your are at: {currentAddress ? currentAddress : "Loding address..."}</Text>
                    </Body>
                    <Right>
                      <Button onPress={this.jumpToMap} transparent>
                        <Text>Go</Text>
                      </Button>
                    </Right>
                  </ListItem>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail square source={require('../assets/logo/carplate.png')} resizeMode='contain'/>
                    </Left>
                    <Body>
                      <Text>Identify Your Car Plate</Text>
                      <Text note numberOfLines={1}>Just need to take a photo of your car plate</Text>
                    </Body>
                    <Right>
                      <Button onPress={this.jumpToCam} transparent>
                        <Text >Start</Text>
                      </Button>
                    </Right>
                  </ListItem>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail square source={require('../assets/logo/signout.png')} resizeMode='contain'/>
                    </Left>
                    <Body>
                      <Text>Sign out</Text>
                      <Text note numberOfLines={1}>Current Account: {currentUser && currentUser.email}</Text>
                    </Body>
                    <Right>
                      <Button onPress={this.handleSignOut} transparent>
                        <Text >Logout</Text>
                      </Button>
                    </Right>
                  </ListItem>    
                </List>
              </Content>
            </Container>
        )
    }
}

export default inject('userStore','authStore')(observer(Main)) ;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})