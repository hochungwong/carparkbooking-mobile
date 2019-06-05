import React from 'react';

import { createStackNavigator,createAppContainer, createSwitchNavigator} from 'react-navigation';

import Main from '../containers/MainContainer';

import CarparkMap from '../components/MapView/MapView';

import CarparkDetail from '../components/Carpark/CarparkDetail';

import Cam from '../components/CarPlateRecognition/Cam';

import OrderHistory from '../components/OrderHistory/OrderHistory';

import OrderDetails from '../components/OrderHistory/OrderDetails';

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
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)
 

const RootStack = createAppContainer(createSwitchNavigator(
  {
    Main: MainStack,
    OrderDetails: {
      screen: OrderDetails,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  )
)


export default () => <RootStack />