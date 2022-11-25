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

import { NetworkStatusNotify, Notification } from '@/components/common';
import { GlobalModal } from '@/components/popup';
import {
  ACCEPT_INVITE,
  APP_SCREEN,
  AUTH_SCREEN,
  setHeight,
  setWidth,
  SPLASH_SCREEN,
  themeColors,
} from '@/helpers';
import {
  AppNavigator,
  AuthNavigator,
  stackStyleInterpolator,
} from '@/navigations';

import { linking } from './linking';
import { SetupNotification } from './notification/SetupNotification';
import { InvitationForMe } from './screens/s-screen/share-settings';
import { SplashScreen } from './screens/splash-screen';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
});

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
    primary: themeColors.black,
  },
};

const Stack = createStackNavigator();

// eslint-disable-next-line no-restricted-syntax
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
          <NavigationContainer theme={navigationTheme} linking={linking} independent>
            <SetupNotification />
            <Stack.Navigator
              initialRouteName={SPLASH_SCREEN}
              screenOptions={{
                headerShown: false,
                cardOverlayEnabled: true,
                cardStyleInterpolator: stackStyleInterpolator
              }}
            >
              <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} />
              <Stack.Screen name={AUTH_SCREEN} component={AuthNavigator} />
              <Stack.Screen name={APP_SCREEN} component={AppNavigator} />
              <Stack.Screen
                name={ACCEPT_INVITE}
                component={InvitationForMe}
                options={{
                  headerShown: true,
                  headerLeft: () => <></>,
                  title: ""
                }}
              />
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