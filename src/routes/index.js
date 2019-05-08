import React from 'react';

import { createStackNavigator,createAppContainer, createSwitchNavigator} from 'react-navigation';

import Loading from '../components/Auth/Loading';
import SignUp from '../components/Auth/Signup';
import Login from '../components/Auth/Login';
import Main from '../components/Dashboard/Main';

import CarparkMap from '../components/MapView/MapView';
import CarparkDetail from '../components/Carpark/CarparkDetail';

import Cam from '../components/CarPlateRecognition/Cam';

import OrderHistory from '../components/OrderHistory/OrderHistory';

import UserInfo from '../components/UserInformation/UserInfo';

// const CarparkDetailStack = createStackNavigator(
//   {
//     CarparkDetail: {
//       screen: CarparkDetail,
//       navigationOptions: () => ({
//         header: null
//       })
//     },
//   },
//   {
//     mode: 'modal',
//     headerMode: 'none'
//   }
// )

const MainStack = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: () => ({
        gesturesEnabled: false,
        header: null
      })
    },
    CarparkMap: {
      screen: CarparkMap
    },
    CarparkDetail: {
      screen: CarparkDetail,
      navigationOptions: () => ({
        header: null
      })
    },
    Cam: {
      screen: Cam,
      navigationOptions: () => ({
        header: null
      })
    },
    OrderHistory: {
      screen: OrderHistory,
      navigationOptions: () => ({
        header: null
      })
    },
    UserInfo: {
      screen: UserInfo,
      navigationOptions: () => ({
        heaeder: null
      })
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)
 

const RootStack = createAppContainer(createSwitchNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({
        gesturesEnabled: false,
        header: null
      })
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: () => ({
        gesturesEnabled: false,
        header: null
      })
    },
    Loading: {
      screen: Loading
    },
    Main: MainStack,
    
  },
  {
    initialRouteName:'Loading'
  }
  )
)


export default () => <RootStack />