import React, { Component } from 'react';

import AuthScreen from './containers/AuthContainer';
import MainScreen from './routes/index';

import { connect } from 'react-redux';
import * as actions from './stores/actions/index';

class App extends Component{
    componentDidMount(){
        this.props.onCheckAuthState();
    }
    
    render(){
        const { isAuthenticated } = this.props;
        let route = (
            <AuthScreen />
        );
        if(isAuthenticated){
            route = (
                <MainScreen />
            )
        }
        return(
            route
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthState: () => dispatch(actions.authStateCheck()),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(App) ;