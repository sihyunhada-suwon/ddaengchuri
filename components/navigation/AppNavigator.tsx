import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../app/(tabs)/home'; // 홈화면 경로 맞게 수정!
import AddressCard from '../AddressCard';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddressCard"
          component={AddressCard}
          options={{ title: '주소 설정' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
