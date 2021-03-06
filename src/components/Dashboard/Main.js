import React from 'react';

import { StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

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
        currentAddress: '',
        region: {}
      }
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
              region
            })
            this.transferToGeolocation(region.latitude, region.longitude);
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
            region
          })
          this.transferToGeolocation(region.latitude, region.longitude);
        }
      )
    }

    transferToGeolocation = (lat,lng) => {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA5VHl9u1kMya_xE21vcdEtOYcqLL8Qcic`;
      axios.get(geocodeUrl).then(
        res => {
          this.setState({
            currentAddress: res.data.results[0].formatted_address
          })
        }
      ).catch( e => {
        console.log(e)
      })
    }

    componentDidMount(){
        this._setCoord();
        this._watchCoord();
    }

    handleSignOut = () => {
        this.props.onLogout();
    }

    jumpToMap = (region, orders) => {
      this.props.navigation.navigate('CarparkMap', {region: region, orders: orders});
    }
    
    jumpToCam = () => {
      this.props.navigation.navigate('Cam');
    }

    jumpToInfo = email => {
        this.props.navigation.navigate('UserInfo', {email: email});
    }

    jumpToHistory = (orders, userId) => {
      this.props.navigation.navigate('OrderHistory', {orders: orders, userId: userId})
    }

    render(){
        const {currentUser , currentAddress, region} = this.state;
        const { ordersData, plateNumber, userId } = this.props;
        return(
            <Container>
              <Header >
                <Text style={styles.header}>Hi {currentUser && currentUser.email} !</Text>
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
                      <Button onPress={() => {this.jumpToMap(region, ordersData)}} transparent>
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
                      <Text note numberOfLines={2}>{plateNumber ? `Your plate number:  ${plateNumber}` : "Just need to take a photo of your car plate"}</Text>
                    </Body>
                    <Right>
                      <Button onPress={this.jumpToCam} transparent>
                        <Text >{plateNumber ? "Modify" : "Start"}</Text>
                      </Button>
                    </Right>
                  </ListItem>
                  {/* <ListItem thumbnail>
                    <Left>
                      <Thumbnail square source={require('../assets/logo/info.png')} resizeMode='contain'/>
                    </Left>
                    <Body>
                      <Text>User Information</Text>
                      <Text note numberOfLines={1}>Current Account: {currentUser && currentUser.email}</Text>
                    </Body>
                    <Right>
                      <Button onPress={()=>{this.jumpToInfo(email)}} transparent>
                        <Text >View</Text>
                      </Button>
                    </Right>
                  </ListItem>     */}
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail square source={require('../assets/logo/history.png')} resizeMode='contain'/>
                    </Left>
                    <Body>
                      <Text>Order History</Text>
                      <Text note numberOfLines={1}>Track Order History</Text>
                    </Body>
                    {ordersData.length === 0 ? 
                      <Right>
                        <Button disabled transparent>
                          <Text >No orders</Text>
                        </Button>
                      </Right>
                      :
                      <Right>
                        <Button onPress={() => {this.jumpToHistory(ordersData, userId)}} transparent>
                          <Text >View</Text>
                        </Button>
                      </Right>
                    }
                  </ListItem>    
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail square source={require('../assets/logo/signout.png')} resizeMode='contain'/>
                    </Left>
                    <Body>
                      <Text>Sign out</Text>
                      <Text note numberOfLines={1}>Change Users?</Text>
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

export default Main ;

const styles = StyleSheet.create({
    header: {
      justifyContent: 'center'
    },
})