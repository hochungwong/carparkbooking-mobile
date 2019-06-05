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