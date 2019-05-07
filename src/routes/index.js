import React from 'react';

import { createStackNavigator,createSwitchNavigator,createAppContainer} from 'react-navigation';

import Loading from '../components/Auth/Loading';
import SignUp from '../components/Auth/Signup';
import Login from '../components/Auth/Login';
import Main from '../components/Dashboard/Main';

import CarparkMap from '../components/MapView/MapView';
import CarparkDetail from '../components/Carpark/CarparkDetail';

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

const MapStack = createStackNavigator({
  CarparkMap: CarparkMap
})

const AppContainer =  createAppContainer(createSwitchNavigator(
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

export default () => <AppContainer />