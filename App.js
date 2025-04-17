import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { RoomProvider } from './src/contexts';

export default function App() {
  return (
    <SafeAreaProvider>
      <RoomProvider>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </RoomProvider>
    </SafeAreaProvider>
  );
}
