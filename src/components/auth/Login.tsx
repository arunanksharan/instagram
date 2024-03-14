import React, { Component } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { supabaseClient } from '../../utils/supabaseClient';

interface LoginState {
  email: string;
  password: string;
}

// Define the navigation params expected by screens navigated from this component
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login' // Replace 'Register' with the correct screen name if different
>;

// Define the props expected by the RegisterClass component
export interface LoginProps {
  navigation?: LoginScreenNavigationProp;
}

async function signInWithEmail({ email, password }: LoginState) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error('29: Error loggin in:', error);
  } else {
    console.log('31: Login successful:', data);
  }
  return data;
}

export class LoginClass extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.onLogin = this.onLogin.bind(this);
  }

  async onLogin() {
    const { email, password } = this.state;
    const loginRes = await signInWithEmail({ email, password });
    console.log('50: LoginRes:', loginRes);
    if (loginRes) {
      this.props.navigation?.navigate('Landing'); // Replace 'ThankYouScreen' with your screen name
    }
  }

  render() {
    return (
      <View>
        <Text>Login</Text>
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />

        <Button onPress={() => this.onLogin()} title="Login" />
      </View>
    );
  }
}

export default LoginClass;
