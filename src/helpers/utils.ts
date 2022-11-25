import { Platform } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import { height, width } from './normalize';

export const isValidPostalCode = (str: string) => /^[0-9]{7}$/.test(str);

export const getPlatformAndroid = () => {
  if (Platform.OS === 'android') {
    return true;
  }

  return false;
};

const STANDARD_WIDTH = 375;
const STANDARD_HEIGHT = 680;
export const windowWidth = width;
export const windowHeight = height;

const hp =
  windowHeight > windowWidth ? heightPercentageToDP : widthPercentageToDP;
const wp =
  windowHeight > windowWidth ? widthPercentageToDP : heightPercentageToDP;

export const pixelToDpiW = (pixel: number) =>
  wp((pixel * 100) / STANDARD_WIDTH);
export const pixelToDpiH = (pixel: number) =>
  hp((pixel * 100) / STANDARD_HEIGHT);
