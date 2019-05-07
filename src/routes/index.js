import React from 'react';

import { createStackNavigator,createAppContainer, createSwitchNavigator} from 'react-navigation';

import Loading from '../components/Auth/Loading';
import SignUp from '../components/Auth/Signup';
import Login from '../components/Auth/Login';
import Main from '../components/Dashboard/Main';

import CarparkMap from '../components/MapView/MapView';
import CarparkDetail from '../components/Carpark/CarparkDetail';

import CheckoutForm from '../components/Checkout/CheckoutForm';

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
    CheckoutForm: {
      screen: CheckoutForm,
      navigationOptions: () => ({
        header: null
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