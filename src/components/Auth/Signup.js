import React from 'react';

import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Spinner } from 'native-base';

export default class SignUp extends React.Component {
    state = { email: '', password: '', isLogin: false}
  
    handleSignUp = () => {
      const { email, password, isLogin} = this.state;
      this.props.signUp(email,password,isLogin);
    }
    
    loginPage = () => {
        const { onLoginLinkPress } = this.props;
        onLoginLinkPress();
    };

    render() {
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
              <Text>Sign Up</Text>
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
              <Button title="Sign Up" onPress={this.handleSignUp} />
              <Button
                title="Already have an account? Log In"
                onPress={this.loginPage}
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
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    }
  })