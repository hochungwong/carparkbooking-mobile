import React, {Component} from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import Main from './src/App';
import createStore from './src/stores/createStore';

const initialState = { firebase: {} };
//create store
const store = createStore(initialState);

class App extends Component{
    render() {
        YellowBox.ignoreWarnings([
            'Warning: Async Storage has been extracted from react-native core',
            'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
            'Module ALPRCameraManager requires main queue setup since it overrides `constantsToExport` but doesn\'t implement `requiresMainQueueSetup`. In a future release React Native will default to initializing all native modules on a background thread unless explicitly opted-out of.',
            'Warning: Failed prop type: The prop `region.latitude` is marked as required in `MapView`, but its value is `undefined`.'
        ]
            );
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        )
    }
}

export default App ;