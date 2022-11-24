import React, { useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
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
    primary: themeColors.black,
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
        <View>
          <Text>abc</Text>
        </View>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
