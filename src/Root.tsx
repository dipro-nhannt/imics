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

import { NetworkStatusNotify, Notification } from '@/components';
import { GlobalModal } from '@/components/popup';
import { appColors, setHeight, setWidth } from '@/helpers';
import { AppNavigator, AuthNavigator } from '@/navigation';

import { APP_SCREEN, AUTH_SCREEN, SPLASH_SCREEN } from './constants';
import { SplashScreen } from './screens/splash-screen';

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
        <Notification>
          <NavigationContainer theme={navigationTheme} independent>
            <Stack.Navigator
              initialRouteName={SPLASH_SCREEN}
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} />
              <Stack.Screen name={AUTH_SCREEN} component={AuthNavigator} />
              <Stack.Screen name={APP_SCREEN} component={AppNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </Notification>
        <GlobalModal showEventKey="SHOW_PRIMARY_MODAL" closeEventKey="CLOSE_PRIMARY_MODAL" />
        <GlobalModal showEventKey="SHOW_SECONDARY_MODAL" closeEventKey="CLOSE_SECONDARY_MODAL" />
        <NetworkStatusNotify />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
