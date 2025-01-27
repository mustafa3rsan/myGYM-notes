import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'green',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Programlarım',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size || 24} />
          ),
        }}
      />
      <Tabs.Screen
        name="mygym"
        options={{
          title: 'myGYM',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size || 24} />
          ),
        }}
      />
    </Tabs>
  );
}
