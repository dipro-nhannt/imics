import { StyleSheet } from 'react-native';
import { normalize } from 'react-native-elements';

import { appThemes, pixelToDpiH, pixelToDpiW } from '@/helpers';

export const buttonStyles = StyleSheet.create({
  buttonShadow: {
    shadowColor: appThemes.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 2.718,
    elevation: 1.5,
    borderRadius: 5,
  },
  iconButton: {
    width: normalize(36),
    height: normalize(36),
    tintColor: appThemes.colors.white,
  },
  styleWrapIconButton: {
    position: 'absolute',
    left: pixelToDpiW(25),
    top: pixelToDpiH(30),
    zIndex: 10,
  },
  buttonDefault: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: appThemes.border.defaultRadius,
  },
  buttonPrimary: {
    backgroundColor: appThemes.colors.background.buttonPrimary,
  },
  buttonColorDefault: {
    backgroundColor: appThemes.colors.white,
    color: appThemes.colors.text.textPrimary,
  },
  buttonSolidDefault: {
    borderWidth: 1,
    borderColor: appThemes.colors.text.textPrimary,
    color: appThemes.colors.text.textPrimary,
    paddingHorizontal: 10,
  },
  buttonSizeTiny: {
    height: pixelToDpiH(32),
  },
  buttonSizeDefault: {
    height: pixelToDpiH(48),
  },
  buttonSizeSmall: {
    height: pixelToDpiH(40),
  },
  buttonSizeMedium: {
    height: pixelToDpiH(56),
  },
  buttonSizeLarge: {
    height: pixelToDpiH(68),
  },
  txtButtonSizeLarge: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '700',
  },
  shadowButtonDefault: {
    height: pixelToDpiH(50),
    shadowColor: 'rgba(77, 70, 70, 0.2)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    paddingTop: 2,
    shadowOpacity: 0.06,
    shadowRadius: 2.718,
    elevation: 1.5,
    borderRadius: 5,
  },
  shadowButtonMedium: {
    height: pixelToDpiH(58),
    shadowColor: 'rgba(77, 70, 70, 0.2)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    paddingTop: 2,
    shadowOpacity: 0.06,
    shadowRadius: 2.718,
    elevation: 1.5,
    borderRadius: 5,
  },
  shadowButtonLarge: {
    height: pixelToDpiH(70),
    shadowColor: 'rgba(77, 70, 70, 0.2)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    paddingTop: 2,
    paddingLeft: 0.5,
    shadowOpacity: 0.06,
    shadowRadius: 2.718,
    elevation: 1.5,
    borderRadius: 5,
  },
  buttonTextDefault: {
    color: appThemes.colors.text.textPrimary,
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
  },
  buttonTextOutline: {
    color: appThemes.colors.text.textPrimary,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
