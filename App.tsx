import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import LandingScreen from './src/components/auth/Landing';
import { RootStackParamList } from './src/types';
import RegisterScreen from './src/components/auth/RegisterClass';
import LoginClass from './src/components/auth/Login';
import { useEffect, useState } from 'react';
import { supabaseClient } from './src/utils/supabaseClient';
import { Session } from '@supabase/supabase-js';
import CustomHeader from './src/components/CustomHeader';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      setUserSession(session);
      setLoggedIn(session !== null);
    };

    fetchSession();

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        setUserSession(session);
        setLoggedIn(session !== null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (!userSession) {
    console.log('No user session');
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginClass}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    console.log('User session:', userSession);
    return (
      <View style={styles.container}>
        <CustomHeader email={userSession.user?.email} />
        <Text>User is logged in</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
