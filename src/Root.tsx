import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Orientation from 'react-native-orientation';
import { useScreenUtils } from 'react-native-screenutils';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { appColors, setHeight, setWidth } from '@/helpers';
import { AppNavigator, AuthNavigator } from '@/navigation';

import { APP_SCREEN, AUTH_SCREEN } from './constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
    primary: appColors.blackPrimary,
  },
};

const Stack = createStackNavigator();

export function Root() {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  const { width, height } = useScreenUtils();
  useEffect(() => {
    setWidth(width);
    setHeight(height);
  }, [width, height]);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          translucent
          backgroundColor="transparent"
        />
        <NavigationContainer theme={navigationTheme} independent>
          <Stack.Navigator
            initialRouteName={AUTH_SCREEN}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name={AUTH_SCREEN} component={AuthNavigator} />
            <Stack.Screen name={APP_SCREEN} component={AppNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
