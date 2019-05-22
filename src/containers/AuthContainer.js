import React, {Component} from 'react';

import SignUpForm from '../components/Auth/Signup';
import LoginForm from '../components/Auth/Login';
import { Container } from 'native-base';

import * as actions from '../stores/actions/index';
import { connect } from 'react-redux';

class AuthForm extends Component{
    state = {
        visibleForm: 'LOGIN'
    }

    _hideAuthScreen = async () => {
        // 1. Slide out the form container
        await this._setVisibleForm(null);
    };

    _setVisibleForm = async visibleForm => {
        // 1. Hide the current form (if any)
        if (this.state.visibleForm && this.formRef && this.formRef.hideForm) {
            await this.formRef.hideForm();
        }
        this.setState({ 
            visibleForm 
        });
    };

    render() {
        const { visibleForm } = this.state;
        const {
            loading,
            error,
            onAuth
         } = this.props;
        return (
            <Container >
                {visibleForm === 'SIGNUP' && (
                    <SignUpForm
                        ref={ref => (this.formRef = ref)}
                        onLoginLinkPress={() => this._setVisibleForm('LOGIN')}
                        signUp = {onAuth}
                        error = {error}
                        loading = {loading}
                    />
                )}
                {visibleForm === 'LOGIN' && (
                    <LoginForm
                        ref={ref => (this.formRef = ref)}
                        onSignupLinkPress={() => this._setVisibleForm('SIGNUP')}
                        login = {onAuth}
                        error = {error}
                        loading = {loading}
                    />
                )}
            </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm) ;