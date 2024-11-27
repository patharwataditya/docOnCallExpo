import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/signup';
import HomeScreen from '../screens/HomeScreen';
import DoctorsList from '../screens/DoctorsList';
import NursesList from '../screens/NursesList';
import TabTwoScreen from '../(tabs)/explore';
import { RootStackParamList } from '../RootStackParamList';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerTitle: 'Sign Up' }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="DoctorsList"
        component={DoctorsList}
        options={{ headerTitle: 'Doctors' }}
      />
      <Stack.Screen
        name="NursesList"
        component={NursesList}
        options={{ headerTitle: 'Nurses' }}
      />
      <Stack.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          headerTitle: 'Scan QR Code',
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default App;