import React,{Component} from 'react';

import {StyleSheet,Text,TextInput,View,Button} from 'react-native';
import {Spinner} from 'native-base';
import firebase from 'react-native-firebase';

export default class Login extends Component{
    state = {
        email:'',
        password:'',
        isLogin: true
    }

    handleLogin = () => {
        const {email,password ,isLogin} = this.state;
        this.props.login(email,password, isLogin);
    };

    signUpPage = () => {
        const {onSignupLinkPress} = this.props;
        onSignupLinkPress();
    };

    render(){
        const {email,password} =this.state;
        const { error, loading } = this.props;
        let errorMsg = null;
        if(error) { 
            errorMsg = (
                <Text style={{color:'red'}}>
                    {error.message}
                </Text>
            )
        }
        let form = null;
        form = (
            <View style={styles.container}>
                <Text>Login In</Text>
                {errorMsg}
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize = "none"
                    textContentType = 'emailAddress'
                    placeholder ="Email"
                    onChangeText={email => this.setState({email})}
                    value={email}
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry
                    autoCapitalize = "none"
                    placeholder ="Password"
                    onChangeText={password => this.setState({password})}
                    value={password}
                />
                <Button title="Log In" onPress={this.handleLogin} />
                <Button
                    title="Don't have an account? Sign UP"
                    onPress={this.signUpPage}
                />
            </View>
        )
        if(loading) {
            form = (
                <View style={styles.container}>
                    <Spinner color={'black'}/>
                </View>           
            )
        }
        return(
            form
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    textInput :{
        height:40,
        width:"90%",
        borderColor:'gray',
        borderWidth:1,
        marginTop:8
    }
})