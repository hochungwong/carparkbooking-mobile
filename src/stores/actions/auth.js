import * as actionTypes from './actionTypes';
import { AsyncStorage } from 'react-native';

import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout =  () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isLogin) => {
    return dispatch => {
        dispatch(authStart());
        //login url
        let authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCWOWY00uCQVPghJTdMKFa1wFrqYO5Ik04';
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        if(!isLogin){
            authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCWOWY00uCQVPghJTdMKFa1wFrqYO5Ik04'
        }
        axios.post(authUrl, authData).then(
            response => {
                const {idToken, localId} = response.data;
                AsyncStorage.setItem('token', idToken);
                AsyncStorage.setItem('userId', localId);
                dispatch(authSuccess(idToken, localId));   
            }
        ).catch(e => {
            dispatch(authFail(e.response.data.error));
        })
    }
}

export const authStateCheck = () => {
    return dispatch => {
        AsyncStorage.getItem('token').then(token => {
            if(!token) {
                dispatch(logout());
            } else {
                AsyncStorage.getItem('userId').then(userId => {
                    dispatch(authSuccess(token, userId));
                })
            }
        })   
    }
    
}