import React , {Component} from 'react';
import { View , Text } from 'react-native';
import { Marker } from 'react-native-maps'; 

import {connect} from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import axios from 'axios';

class CarparkMarkers extends Component{
    constructor(props){
        super(props);
        this.state = {
            coordinateData: [],
            carparksData: []
        }
        this.coordinateData = [];
        this.carparkData = [];
    }

    componentDidMount() {
        const { carparks } = this.props;
        const carparksData = [];
        for(let key in carparks){
            carparksData.push( {
                ...carparks[key],
                id: key
            });
        }
        this.setState({
            carparksData: carparksData
        })
        const result = carparksData.map(//async
             i => {return new Promise((resolve,reject) => {
                const {carparkData} = i;
                const geolocationUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${carparkData.unit}+${carparkData.street},+${carparkData.suburb},+${carparkData.province}&key=AIzaSyA5VHl9u1kMya_xE21vcdEtOYcqLL8Qcic`;
                axios.get(geolocationUrl).then(res => {resolve(res.data.results[0])})
            })
        })
        Promise.all(result).then(res => {
            res.map(k => {
                const { geometry, formatted_address } = k;
                const { location } = geometry
                const coor = {
                    coordinate:{
                        latitude: location.lat,
                        longitude: location.lng
                    },
                    address: formatted_address
                }
                this.coordinateData.push(coor);
            })
            this.setState({
                coordinateData: this.coordinateData
            })
        })
    }

    jumpToCarparkDetails = (carparkData) => {
        this.props.navigation.navigate('CarparkDetail',{carparkData: carparkData});
    }

    render(){
        const { orders ,currentTotalNumber} = this.props;
        const {coordinateData,carparksData} = this.state;
        let tempArr = [];
        for (let key in coordinateData){
            const i = coordinateData[key];
            const j = carparksData[key].carparkData;
            const k = carparksData[key].carparkId
            tempArr.push({
                coordinate: i.coordinate,
                address: i.address,
                price: j.parkingFees,
                name: j.name,
                totalNumber: j.totalValidNumber,
                carparkId: k
            })
        }
        return (
            tempArr.map((i,key) => (
                <Marker
                  key = {key}
                  coordinate = {i.coordinate}
                  onPress={() => {this.props.navigation.navigate('CarparkDetail', {carparkData: i, orders: orders})}}
                >
                    <View style={{backgroundColor: "red", padding:5, borderRadius:50, opacity:0.8}}>
                        <Text style={{textAlign:'center'}}>{i.name}</Text>
                        <Text style={{textAlign:'center'}}>${i.price} AUD</Text>
                        <Text style={{textAlign:'center'}}>Available: {i.totalNumber}</Text>
                    </View>
                </Marker >
            ))
        )
    }
}

const mapDispatchToProps = state => {
    return {
        currentTotalNumber: state.firebase.data.latestTotalNumber 
    }
}

export default  compose(
    connect(mapDispatchToProps),
    firebaseConnect([
        '/latestTotalNumber'
    ])
) (CarparkMarkers) ;


// const fetchSpot = () => {
//     return new Promise((resolve,reject) => {
//         axios.get('https://parking-73057.firebaseio.com/carparksForUsers.json').then(
//             response => {
//             const fetchedData = [];
//             for(let key in response.data){
//                 fetchedData.push( {
//                     ...response.data[key],
//                     id: key
//                 });
//             }
//                 resolve(fetchedData);
//             }   
//         ).catch(error => {
//             reject(new Error(error))
//             })
//         })
//     }