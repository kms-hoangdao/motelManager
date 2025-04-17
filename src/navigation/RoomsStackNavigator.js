import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RoomsScreen from '../screens/RoomsScreen';
import AddRoomScreen from '../screens/AddRoomScreen';
import EditRoomScreen from '../screens/EditRoomScreen';
import RoomDetailsScreen from '../screens/RoomDetailsScreen';

const Stack = createStackNavigator();

const RoomsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RoomsList" component={RoomsScreen} />
      <Stack.Screen name="AddRoom" component={AddRoomScreen} />
      <Stack.Screen name="EditRoom" component={EditRoomScreen} />
      <Stack.Screen name="RoomDetails" component={RoomDetailsScreen} />
    </Stack.Navigator>
  );
};

export default RoomsStackNavigator; 