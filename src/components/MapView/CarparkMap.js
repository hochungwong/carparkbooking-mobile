import React, {Component} from 'react';
import {StyleSheet,  View,TouchableOpacity,Dimensions,} from 'react-native';
import MapView from 'react-native-maps';
import { Header, Title, Button, Icon, Left, Body, Right,Text } from "native-base";

import CarparkMarkers from './CarparkMarkers';

const { width, height : windowsHeight } = Dimensions.get('window');
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = 0.001;

class CarparkMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      trackedRegion: {}
    }
  }

  componentDidMount() {
    this._setCoord();
    this._watchCoord();
  }
  
  _setCoord = () => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          const { latitude,longitude } = coords
          const region = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
          this.setState({
            trackedRegion: region
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
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
        this.setState({
          trackedRegion: region
        })
      }
    )
  }

  _clearCoordWatch = () => {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _findMe = () => {
    try {
      this._setCoord()
    }catch(error){
      console.log(error.message || '')
    }
  }

  componentWillUnmount() {
    this._clearCoordWatch();
  } 
    
  render() {
    const { trackedRegion } = this.state;   
    const varTop = windowsHeight - 125;
    const hitSlop = {
      top: 15,
      bottom: 15,
      left: 15,
      right: 15
    };
    const childStyle = vheHeight => {
      return {
        position: 'absolute',
        top: vheHeight,
        left: 10,
        right: 10,
        backgroundColor: 'transparent',
        alignItems: 'center'
      }
    }
    return (
      <View style={styles.container}>
        <Header transparent >
            <Left>
            </Left>
            <Body >
              <Title>
                Carpark
              </Title>
            </Body>
            <Right>
              <Button transparent onPress={()=>this.props.openDrawer()}>
                <Icon name='menu'/>
              </Button>
            </Right>
        </Header>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton = {true}
          region= {trackedRegion}
          showsCompass = {true}
        >
          <CarparkMarkers {...this.props} />       
        </MapView>        
        <View style={childStyle(varTop)}>
        <TouchableOpacity
          style={styles.mapButton}
          hitSlop = {hitSlop}
          activeOpacity = {0.7}  
          onPress = {()=> {this._findMe()}}
        >
          <Text style={styles.mapButtonText}>
            Find Me
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CarparkMap ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    height: windowsHeight,
    width: width
  },
  map: {
    flex: 1,
    zIndex: -1,
  },
  mapButton: {
    width: 75,
    height: 75,
    borderRadius: 85/2,
    backgroundColor: 'rgba(252, 253, 253, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 8,
    shadowOpacity: 0.12,
    opacity: .6,
    zIndex: 10,
  },
  mapButtonText: {
    fontWeight: 'bold',
    color: 'black'
  },
  tabSetting: {
    position: 'absolute',
		left: 0,
		right: 0,
		bottom: 20,
		flex: 1,
		backgroundColor: "#fff",
		alignItems:'center'
  },

})
