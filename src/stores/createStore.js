import { applyMiddleware, compose, createStore ,combineReducers} from 'redux';
import { getFirebase, reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import RNFirebase from 'react-native-firebase';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import dashboardReducer from './reducers/dashboard';

const reactNativeFirebaseConfig = {
  debug: true
};
// for more config options, visit http://docs.react-redux-firebase.com/history/v2.0.0/docs/api/compose.html
const reduxFirebaseConfig = {
  userProfile: 'users', // save users profiles to 'users' collection
  enableRedirectHandling: false
};

const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    firebase: firebaseReducer
})

export default (initialState = { firebase: {} }) => {
  // initialize firebase
  const firebase = RNFirebase.initializeApp(reactNativeFirebaseConfig);
  const middleware = [
     // make getFirebase available in third argument of thunks
    thunk.withExtraArgument({ getFirebase }),
  ];

  const store = createStore(
    rootReducer,
    initialState, // initial state
    compose(
     reactReduxFirebase(firebase, reduxFirebaseConfig), // pass initialized react-native-firebase app instance
     applyMiddleware(...middleware)
    )
  )
  return store
}