import React, { Component } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { supabaseClient } from '../../utils/supabaseClient';

interface RegisterState {
  email: string;
  password: string;
  name: string;
}

// Define the navigation params expected by screens navigated from this component
type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register' // Replace 'Register' with the correct screen name if different
>;

// Define the props expected by the RegisterClass component
export interface RegisterProps {
  navigation?: RegisterScreenNavigationProp;
}

async function signUpNewUser({ email, password, name }: RegisterState) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https://example.com/welcome',
    },
  });
  if (error) {
    console.error('Error signing up:', error);
  } else {
    console.log('Sign up successful:', data);
  }
  return data;
}

export class RegisterClass extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  async onSignUp() {
    const { email, password, name } = this.state;
    const signUpRes = await signUpNewUser({ email, password, name });
    console.log('signUpRes:', signUpRes);
    if (signUpRes) {
      this.props.navigation?.navigate('Home'); // Replace 'ThankYouScreen' with your screen name
    }
  }

  render() {
    return (
      <View>
        <Text>SignUp</Text>
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <TextInput
          placeholder="name"
          onChangeText={(name) => this.setState({ name })}
        />
        <Button onPress={() => this.onSignUp()} title="SIGN UP" />
      </View>
    );
  }
}

export default RegisterClass;
