import React from 'react';
import { StyleSheet } from 'react-native';

import { pixelToDpiH, themeColors, width } from '@/helpers';

import { StyledText } from '../display';
import { closeSecondaryModal, showSecondaryModal } from './GlobalModal';

interface IGlobalMessage {
  width?: number;
  title?: string;
  body: React.ReactNode | string;
  scrollEnable?: boolean;
  top?: number;

}

export const showGlobalMessage = (props: IGlobalMessage) => {
  const { scrollEnable = false, top = 0 } = props;
  const defaultWidth = width * 0.9;
  showSecondaryModal({
    top: top,
    width: props.width ?? defaultWidth,
    isSlideDown: true,
    styleIcon: styles.iconClose,
    styleWrapIcon: styles.wrapIconClose,
    headerStyle: styles.headerStyle,
    titleStyle: { marginBottom: 0 },
    title: props.title,
    scrollEnable: scrollEnable,
    colorTitle: 'primary',
    handleButtonOke: () => {
      closeSecondaryModal();
    },
    body: typeof props.body === 'string'
      ? <StyledText>{props.body}</StyledText>
      : props.body,
  });
};

export const hideGlobalMessage = () => {
  closeSecondaryModal();
};

const styles = StyleSheet.create({
  iconClose: {
    tintColor: themeColors.white,
  },
  wrapIconClose: {
    backgroundColor: themeColors.txtPrimary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  headerStyle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginBottom: pixelToDpiH(16),
  },
});
