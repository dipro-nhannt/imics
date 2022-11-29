import { NavigationProp, Route } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

import { APP_SCREEN } from '@/constants';

export type INavigation<T = Record<string, any>> = NavigationProp<T>;

export type IRoute<T extends Record<string, any> = Record<string, any>> = Route<string, T>;

export const goBackToScreen = (navigation, screenName: string) => {
  const { routes } = navigation.getState();

  const indexToBack = [...routes].reverse().findIndex(o => o.name === screenName);
  navigation.dispatch(StackActions.pop(indexToBack));
};

export const goBackToBeforeScreen = (navigation, screenName: string) => {
  const { routes } = navigation.getState();

  const indexToBack = [...routes].reverse().findIndex(o => o.name === screenName) + 1;
  navigation.dispatch(StackActions.pop(indexToBack));
};

export const goBackToTop = (navigation) => {
  navigation.dispatch(StackActions.popToTop());
};

export const navigateHome = (navigation) => {
  navigation.reset({
    index: 0,
    routes: [{
      name: APP_SCREEN,
    }]
  });
};
