import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    carpark: [],
    orders: [],
    plateNumber: '',
    loading: false,
}

//fetch plate number
const fetchPlateNumberStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchPlateNumberSuccess = ( state, action ) => {
    return updateObject( state, {
        plateNumber: action.plateNumber,
        loading: false
    } );
};

const fetchPlateNumberFailed = (state, action) => {
    return updateObject(state, {loading: false} );
}

//submit carplate
const submitCarPlateStart = (state, aciton) => {
    return updateObject(state, { loading: true} );
}

const submitCarPlateSuccess = (state, action) => {
    return updateObject(state, {
        plateNumber: action.plateNumber,
        loading: false
    })
}

const submitCarPlateFailed = (state ,action) => {
    return updateObject(state, {
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        //fetch plate number
        case actionTypes.FETCH_PLATENUMBER_START: return fetchPlateNumberStart(state, action);
        case actionTypes.FETCH_PLATENUMBER_SUCCESS: return fetchPlateNumberSuccess(state, action);
        case actionTypes.FETCH_PLATENUMBER_FAIL: return fetchPlateNumberFailed(state, action);
        //submit plate number
        case actionTypes.SUBMIT_PLATENUMBER_START: return submitCarPlateStart(state, action);
        case actionTypes.SUBMIT_PLATENUMBER_SUCCESS: return submitCarPlateSuccess(state, action);
        case actionTypes.SUBMIT_PLATENUMBER_FAIL: return submitCarPlateFailed(state, action);
        default: return state;
    }
}


export default reducer ;