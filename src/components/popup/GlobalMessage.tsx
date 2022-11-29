import React from 'react';
import { StyleSheet } from 'react-native';

import { appColors, appThemes, pixelToDpiH, width } from '@/helpers';

import { TextStyled } from '../elements';
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
      ? <TextStyled>{props.body}</TextStyled>
      : props.body,
  });
};

export const hideGlobalMessage = () => {
  closeSecondaryModal();
};

const styles = StyleSheet.create({
  iconClose: {
    tintColor: appColors.whitePrimary,
  },
  wrapIconClose: {
    backgroundColor: appThemes.colors.background.backgroundPrimary,
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
