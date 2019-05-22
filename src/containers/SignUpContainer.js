import React , { Component } from 'react';
import SignUpForm from '../components/Auth/Signup';
import * as actions from '../stores/actions/index';

import { connect } from 'react-redux';

class Login extends Component{
    render(){
        const { onAuth, loading, error } = this.props;
        return(
            <SignUpForm 
                onAuth = {onAuth}
                loading = {loading}
                error = {error}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isLogin) => dispatch(actions.auth(email, password, isLogin))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login) ;