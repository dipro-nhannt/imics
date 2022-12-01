import React, { useEffect } from 'react';

import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScreenNames } from '@/constants';
import { IScreenProps } from '@/helpers';
import { SignInScreen, SignUpScreen } from '@/screens';

import { getScreenOptions } from './_share';

const screenStackNavigator = createStackNavigator();
export interface IAuthNavigatorProps {
  navigation: any;
}

export function AuthNavigator(props: IScreenProps) {
  const theme = useTheme();

  useEffect(
    () => {
      props.navigation.setOptions({
      });
    },
    [props.navigation]
  );

  return (
    <screenStackNavigator.Navigator
      screenOptions={getScreenOptions(theme)}
      initialRouteName={AuthScreenNames.SIGN_IN_SCREEN}
    >
      <screenStackNavigator.Screen
        name={AuthScreenNames.SIGN_IN_SCREEN}
        component={SignInScreen}
        options={{ title: 'SignIn' }}
      />
      <screenStackNavigator.Screen
        name={AuthScreenNames.SIGN_UP_SCREEN}
        component={SignUpScreen}
        options={{ title: 'SignUp' }}
      />
    </screenStackNavigator.Navigator>
  );
}
