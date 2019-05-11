import React , {Component} from 'react';
import { View , Text } from 'react-native';
import { Marker } from 'react-native-maps'; 

import axios from 'axios';

class CarparkMarker extends Component{
    constructor(props){
        super(props);
        this.state = {
            coordinateData: [],
            carparkData: []
        }
        this.coordinateData = [];
        this.carparkData = [];
    }

    async componentDidMount() {
        let data = await fetchSpot();
        this.carparkData = data;
        this.setState({
            carparkData: this.carparkData
        })
        const result = data.map(async i => {return new Promise((resolve,reject) => {
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
        const {coordinateData,carparkData} = this.state;
        let tempArr = [];
        for (let key in coordinateData){
            const i = coordinateData[key];
            const j = carparkData[key].carparkData;
            const k = carparkData[key].carparkId
            tempArr.push({
                coordinate: i.coordinate,
                address: i.address,
                price: j.parkingFees,
                name: j.name,
                totalNumber: j.totalValidNumber,
                carparkId: k
            })
        }
        console.log(tempArr)
        return (
            tempArr.map((i,key) => (
                <Marker
                  key = {key}
                  coordinate = {i.coordinate}
                  onPress={() => {this.props.navigation.navigate('CarparkDetail', {carparkData: i})}}
                >
                    <View style={{backgroundColor: "red", padding:5, borderRadius:50, opacity:0.8}}>
                        <Text style={{textAlign:'center'}}>{i.name}</Text>
                        <Text style={{textAlign:'center'}}>${i.price} AUD</Text>
                    </View>
                </Marker >
            ))
        )
    }
}


export default CarparkMarker ;

const fetchSpot = () => {
    return new Promise((resolve,reject) => {
        axios.get('https://parking-73057.firebaseio.com/carparksForUsers.json').then(
            response => {
            const fetchedData = [];
            for(let key in response.data){
                fetchedData.push( {
                    ...response.data[key],
                    id: key
                });
            }
                resolve(fetchedData);
            }   
        ).catch(error => {
            reject(new Error(error))
            })
        })
    }