import * as actionTypes from './actionTypes';
import axios from 'axios';

import firebase from 'react-native-firebase';

export const fetchPlateNumberStart = () => {
    return {
        type: actionTypes.FETCH_PLATENUMBER_START
    }
}

export const fetchPlateNumberSuccess = plateNumber => {
    return {
        type: actionTypes.FETCH_PLATENUMBER_SUCCESS,
        plateNumber: plateNumber
    }
}

export const fetchPlateNumberFailed = error => {
    return {
        type: actionTypes.FETCH_PLATENUMBER_FAIL,
        error: error
    }
}

export const fetchPlateNumber = userId => {
    return dispatch => {
        dispatch(fetchPlateNumberStart());
        firebase.database().ref(`/carplates/${userId}`).once('value').
          then(snapshot => {
            if(snapshot && snapshot.val() !== null){
              const {plate} = snapshot.val();
              dispatch(fetchPlateNumberSuccess(plate));
            }
          }).catch(e => {
            console.log(e)
            dispatch(fetchPlateNumberFailed(e))
        })
    }
}


export const fetchCarparksStart = () => {
    return {
        type: actionTypes.FETCH_CARPARKS_START
    };
};

export const fetchCarparksFailed = error => {
    return {
        type: actionTypes.FETCH_CARPARKS_FAIL,
        error: error
    }
}

export const fetchCarparksSuccess = carpark => {
    return {
        type: actionTypes.FETCH_CARPARKS_SUCCESS,
        carpark: carpark
    };
};

export const fetchCarpark = (token, userId) => {
    return dispatch => {
        console.log(token, userId)
        dispatch(fetchCarparksStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"' ;
        axios.get('https://parking-73057.firebaseio.com/carparks.json' + queryParams).then(
                response => {
                    console.log(response.data)
                    const fetchedData = [] ;
                    for(let key in response.data) {
                        fetchedData.push({
                            ...response.data[key],
                            id: key
                        });
                    }
                    dispatch(fetchCarparksSuccess(fetchedData));
                }
            ).catch(error => {
                console.log(error)
                dispatch(fetchCarparksFailed(error));
            })
        }
    }

export const submitCarPlateStart = () => {
    return {
        type: actionTypes.SUBMIT_PLATENUMBER_START
    }
}

export const submitCarPlateSuccess =  plateNumber => {
    return {
        type: actionTypes.SUBMIT_PLATENUMBER_SUCCESS,
        plateNumber: plateNumber
    }
}

export const submitCarPlateFailed = error => {
    return {
        type: actionTypes.SUBMIT_PLATENUMBER_FAIL,
        error: error
    }
}

export const submitCarPlate = (userId, plate) => {
    return dispatch => {
        dispatch(submitCarPlateStart());
        firebase.database().ref(`/carplates/${userId}`).set({
            plate,
            userId
          }).then(
            () => dispatch(submitCarPlateSuccess(plate))
          ).catch(e => {
            console.log(e)
            dispatch(submitCarPlateFailed(e))
          })
    }
}