import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: '홈',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: '지도',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: 'AI 추천',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'analytics' : 'analytics-outline'}
              color={color}
            />
          ),
        }}
      />

      {/* ✅ 추가된 주문내역 탭 */}
      <Tabs.Screen
        name="orderlist"
        options={{
          title: '주문내역',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'receipt' : 'receipt-outline'}
              color={color}
            />
          ),
        }}
      />

      {/* ✅ My 페이지 탭 수정 */}
      <Tabs.Screen
        name="mypage"
        options={{
          title: 'My',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
