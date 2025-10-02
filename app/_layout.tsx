import 'react-native-gesture-handler';
import 'react-native-reanimated';
import 'react-native-get-random-values';

// ✅ 임시 폴리필: 런타임에서 훅이 undefined면 무해한 대체로 채움
const __RNR = require('react-native-reanimated');

if (typeof __RNR.useWorkletCallback === 'undefined') {
  __RNR.useWorkletCallback = (fn: any) => fn;
}
if (typeof __RNR.useAnimatedGestureHandler === 'undefined') {
  // handlers 객체 그대로 반환 → 제스처가 기본 동작만 하게 함
  __RNR.useAnimatedGestureHandler = (handlers: any) => handlers;
}

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'; // ✅ 추가

// import { useColorScheme } from '@/hooks/useColorScheme';
import { useColorScheme } from 'react-native';

const RNR = require('react-native-reanimated');
console.log('typeof useWorkletCallback =', typeof RNR.useWorkletCallback);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
