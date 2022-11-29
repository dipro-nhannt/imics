import React from 'react';
import { Animated } from 'react-native';

import { Theme } from '@react-navigation/native';
import {
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
  StackNavigationOptions,
} from '@react-navigation/stack';

import { appFonts } from '@/constants';

import { BackButtonCustom } from '../components';

export {
  BackButtonCustom,
};

const { multiply } = Animated;

export const stackStyleInterpolator = ({
  current,
  next,
  inverted,
  layouts: { screen },
}: StackCardInterpolationProps): StackCardInterpolatedStyle => {
  const translateFocused = multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.width, 0],
      extrapolate: 'clamp',
    }),
    inverted
  );

  const translateUnfocused = next
    ? multiply(
      next.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, screen.width * -1],
        extrapolate: 'clamp',
      }),
      inverted
    )
    : 0;

  const overlayOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.0],
    extrapolate: 'clamp',
  });

  const shadowOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
    extrapolate: 'clamp',
  });

  return {
    cardStyle: {
      transform: [
        // Translation for the animation of the current card
        { translateX: translateFocused },
        // Translation for the animation of the card on top of this
        { translateX: translateUnfocused },
      ],
    },
    overlayStyle: { opacity: overlayOpacity },
    shadowStyle: { shadowOpacity: shadowOpacity },
  };
};

export const getScreenOptions = (theme: Theme): StackNavigationOptions => ({
  cardStyleInterpolator: stackStyleInterpolator,
  headerBackTitleVisible: false,
  headerLeft: () => <BackButtonCustom />,
  headerTitleStyle: {
    color: theme.colors.primary,
    alignSelf: 'center',
    fontFamily: appFonts.bold,
    fontSize: 16,
    lineHeight: 23.17,
  },
  headerTitleAlign: 'center',
  cardStyle: {
    backgroundColor: 'transparent',
  },
});
