import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import RoomsScreen from '../screens/RoomsScreen';
import TenantsScreen from '../screens/TenantsScreen';
import BillsScreen from '../screens/BillsScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Rooms':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Tenants':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Bills':
              iconName = focused ? 'document-text' : 'document-text-outline';
              break;
            case 'Payments':
              iconName = focused ? 'cash' : 'cash-outline';
              break;
            case 'Statistics':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Rooms" 
        component={RoomsScreen} 
        options={{ title: 'Phòng' }}
      />
      <Tab.Screen 
        name="Tenants" 
        component={TenantsScreen} 
        options={{ title: 'Người thuê' }}
      />
      <Tab.Screen 
        name="Bills" 
        component={BillsScreen} 
        options={{ title: 'Hóa đơn' }}
      />
      <Tab.Screen 
        name="Payments" 
        component={PaymentsScreen} 
        options={{ title: 'Thanh toán' }}
      />
      <Tab.Screen 
        name="Statistics" 
        component={StatisticsScreen} 
        options={{ title: 'Thống kê' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator; 