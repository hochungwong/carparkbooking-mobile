/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import { createStackNavigator,createSwitchNavigator,createAppContainer} from 'react-navigation';

import Loading from '../components/Auth/Loading';
import SignUp from '../components/Auth/Signup';
import Login from '../components/Auth/Login';
import Main from './Main';

import CarparkMap from './MapView/CarparkMap';
import CarparkDetail from './Carpark/CarparkDetail';

// const App = SwitchNavigator (
//   {
//     Loading:{
//       screen:Loading
//     },
//     SignUp:{
//       screen:SignUp
//     },
//     Login:{
//       screen:Login
//     },
//     Main:{
//       screen:Main
//     }
//   },
//   {
//   initialRouteName: "Loading"
//   }
// )

// export default App ;
const AppStack = createStackNavigator({
  Main:Main
})

const AuthStack = createStackNavigator({
  Login:Login,
  SignUp:SignUp
})

const MapStack = createStackNavigator({
  CarparkMap: CarparkMap
})

export default createAppContainer(createSwitchNavigator(
  {
    Loading: Loading,
    Main: AppStack,
    Login: Login,
    SignUp: SignUp,
    CarparkMap: MapStack,
    CarparkDetail: CarparkDetail
  },
  {
    initialRouteName:'Loading'
  }
))