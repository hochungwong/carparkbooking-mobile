import { observable, action, decorate} from 'mobx';

import { AsyncStorage } from 'react-native';

import axios from 'axios';
import firebase from 'react-native-firebase';

const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = 0.001;

export default class UserStore {
    region = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longtiudeDelta: LONGITUDE_DELTA
    };
    isCarparkTab = false;
    currentAddress = "";
    avatar = require('../components/assets/logo/carpark.png');
    email = "";
    plateNumber = "";
    phoneNumber = null;
    orders = null;

    //fetch orders
    fetchOrders = (userId, token) => { 
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        const url = (`https://parking-73057.firebaseio.com/ordersForUsers.json` + queryParams);
        axios.get(url).then(
            response => {
                if(response.status === 200) {
                    const fetchedData = [];
                    for ( let key in response.data ) {
                        fetchedData.push( {
                            ...response.data[key],
                            id: key
                        } );
                    }
                    this.setOrders(JSON.stringify(fetchedData));
                }else{
                    console.log('Fetch Failed');
                }
            }
        ).catch(e => {
            console.log(e)
        })
    }

    //fetch place number
    fetchCarplate = userId => {
        firebase.database().ref(`/carplates/${userId}`).once('value').
          then(snapshot => {
            if(snapshot && snapshot.val() !== null){
              const {plate} = snapshot.val();
              this.setPlateNumber(plate);
            }
          }).catch(e => [
            console.log(e)
          ])
      }

    setRegion = newRegion => Object.assign(this.region, newRegion)

    setLat = lat => {
        this.region.latitude = lat
    }

    setLng = lng => {
        this.region.longitude = lng
    }

    setCarparkTab = () => {
        this.isCarparkTab = !this.isCarparkTab;
    }

    setAddress = address => {
        this.currentAddress = address;
    }

    setEmail = email => {
        this.email = email
    }

    setPlateNumber = plate => {
        this.plateNumber = plate;
    }

    setOrders = orders => {
        this.orders = orders;
    }

    setPhoneNumber = phone => {
        this.phoneNumber = phone;
    }

    wipePlateNumber = () => {
        this.plateNumber = null
    }
}

decorate(UserStore, {
    region: observable,
    isCarparkTab: observable,
    currentAddress: observable,
    email: observable,
    plateNumber: observable,
    phoneNumber: observable,
    orders: observable,

    setRegion: action,
    setLat: action,
    setLng: action,
    setCarparkTab: action,
    setAddress: action,
    setEmail: action,
    setPlateNumber: action,
    setPhoneNumber: action,
    wipePlateNumber: action,
    setOrders: action,
    fetchOrders: action,
    fetchCarplate: action
})
