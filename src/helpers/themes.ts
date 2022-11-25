import { Theme } from '@react-navigation/native';

export const appColors = {
  whitePrimary: '#FFF', //white
  whiteDark: '#DFDEDE',
  bluePrimary: '#6290F2', //blue
  blueLight: '#EFF4FE',
  greenPrimary: '#06C755', //green
  redPrimary: '#F21D1D', //red
  blackPrimary: '#1A1D28', //black
  blackDark: '#0B0E1F',
  grayPrimary: '#83858B', //gray
  grayLight: '#C6C7C9',
  grayDark: '#DFE0E2',
  yellowPrimary: '#E4A72F', //yellow
  yellowLight: '#FFF2D9',
  pinkPrimary: '#FC69B8', //pink
  pinkLight: '#FFEBF6',
};

export const gradientPrimary = ['#6290F2', '#6290F2', '#06C755'];

export interface IImicsAppTheme extends Theme { }

export const navigationTheme = (): IImicsAppTheme => ({
  dark: false,
  colors: {
    primary: appColors.whitePrimary,
    background: appColors.whiteDark,
    border: appColors.grayDark,
    card: appColors.blackPrimary,
    notification: appColors.blackPrimary,
    text: appColors.blackPrimary,
  },
});

export const appThemes = {
  colors: {
    white: appColors.whitePrimary,
    black: appColors.blackDark,
    gradients: {
      primaryColor: '',
      foreignColor: '',
    },
    text: {
      textPrimary: appColors.blackPrimary,
      textTitle: appColors.blackDark,
      textPlaceholder: appColors.grayLight,
      textError: appColors.redPrimary,
      textLink: appColors.bluePrimary,
    },
    background: {
      backgroundPrimary: appColors.whiteDark,
      backgroundWhite: appColors.whitePrimary,
    },
    border: {
      borderPrimary: appColors.grayDark,
      borderError: appColors.redPrimary,
    },
    shadow: '#',
  },
  border: {
    defaultRadius: 5,
  },
  layout: {
    smallSpacing: 8,
    defaultSpacing: 16,
    largeSpacing: 20,
  },
  fonts: {
    regular: 'NotoSansJP-Regular',
    medium: 'NotoSansJP-Medium',
    bold: 'NotoSansJP-Bold',
  },
};
