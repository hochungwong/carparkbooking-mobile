import React , {Component}  from 'react';
import AppContainer from './routes/index';

import {Provider} from 'mobx-react';
import stores from './stores/stores';

class App extends Component {
    render(){
        return (
            <Provider {...stores}>
                <AppContainer />
            </Provider>
            
        )
    }
}

export default App;