import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import OnboardingScreen from './OnboardingScreen';  // Add OnboardingScreen here


const Stack = createStackNavigator();

export default function AuthNavigator({ onAuthSuccess }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn">
          {props => <SignInScreen {...props} onAuthSuccess={onAuthSuccess} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    
      </Stack.Navigator>
    </NavigationContainer>
  );
}
