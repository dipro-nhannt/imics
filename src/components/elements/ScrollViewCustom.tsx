import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
} from 'react-native';

import { height, pixelToDpiH } from '@/helpers';

import { ViewStyled } from './ViewStyled';

interface IScrollViewCustomProps {
  scrollViewProps?: ScrollViewProps & React.RefAttributes<ScrollView>;
  keyboardVerticalOffsetIOS?: number;
}

export function ScrollViewCustom(props: React.PropsWithChildren<IScrollViewCustomProps>) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? props.keyboardVerticalOffsetIOS : 0}
    >
      <ScrollView
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        {...props.scrollViewProps}
      >
        <ViewStyled minHeight={height}>
          {props.children}
        </ViewStyled>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

ScrollViewCustom.defaultProps = {
  keyboardVerticalOffsetIOS: pixelToDpiH(74),
};
