import React,{useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import LoginScreen from '../Screens/LoginScreen';

const Stack = createStackNavigator();
export default function AuthStack() {

  useEffect(()=>{
    GoogleSignin.configure({
      webClientId:'148465752787-ib67fd21316s6aukcej3fb79mc8ki7mk.apps.googleusercontent.com'
    });
  })

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login Screen"
        component={LoginScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#234',
            fontFamily: 'Kufam-SemiBoldItalic',
            fontSize: 18,
          },
          headerStyle: {
            shadowColor: '#fff',
            elevation: 0,
          },
          // headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
}