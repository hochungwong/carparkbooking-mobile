import React,{Component} from 'react';

import {StyleSheet,Text,TextInput,View,Button} from 'react-native';
import firebase from 'react-native-firebase';

export default class Login extends Component{
    state = {
        email:'',
        password:'',
        errorMessage:null
    }

    handleLogin = () => {
        const {email,password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email,password).then(
            () => this.props.navigation.navigate('Main')
        ).catch(error => this.setState({
            errorMessage: error.message
        }));
    };

    loginPage = () => {
        this.props.navigation.navigate('SignUp')
    };

    render(){
        const {email,password,errorMessage} =this.state;
        return(
            <View style={styles.container}>
                <Text>Login</Text>
                {errorMessage && 
                    <Text style={{color:'red'}}>
                        {errorMessage}
                    </Text>
                }
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
                <Button title="Login" onPress={this.handleLogin}/>
                <Button 
                    title= "Don't have an account? Sign Up"
                    onPress= {this.loginPage}
                />
            </View>
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