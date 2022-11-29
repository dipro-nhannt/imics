import React, { useEffect } from 'react';

import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AppScreenNames } from '@/constants';
import { IScreenProps } from '@/helpers';
import { HomeScreen } from '@/screens';

import { getScreenOptions } from './_share';

const Stack = createStackNavigator();

export function AppNavigator(props: IScreenProps) {
  const theme = useTheme();

  useEffect(
    () => {
      props.navigation.setOptions({
      });
    },
    [props.navigation]
  );

  return (
    <Stack.Navigator
      initialRouteName={AppScreenNames.HOME_SCREEN}
      screenOptions={getScreenOptions(theme)}
    >
      <Stack.Screen
        name={AppScreenNames.HOME_SCREEN}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
