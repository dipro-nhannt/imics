import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const STATUS_BAR_HEIGHT = getStatusBarHeight();

const windowScreen = Dimensions.get('window');

const [shortDimension, longDimension] = [
  Math.min(windowScreen.width, windowScreen.width),
  Math.max(windowScreen.width, windowScreen.height),
];

export let width = windowScreen.width;
export let height = windowScreen.height;

export const setWidth = (_width: number) => {
  width = _width;
};

export const setHeight = (_height: number) => {
  height = _height;
};

// Default guideline sizes are based on iPhone X
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

type CustomNumberStyle = number | any;

export const scale = (size: CustomNumberStyle) => (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: CustomNumberStyle) =>
  (longDimension / guidelineBaseHeight) * size;
export const normalizeHorizontal = (size: CustomNumberStyle, factor = 0.5) =>
  Math.floor(size + (scale(size) - size) * factor);
export const normalize = (size: CustomNumberStyle, factor = 0.5) =>
  Math.round(size + (verticalScale(size) - size) * factor);

export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 812 || width === 812 || height === 896 || width === 896)
  );
}

export function extraHight(number: CustomNumberStyle) {
  const newNumber =
    Platform.OS === 'ios' ? normalize(number) : normalize(number / 2);
  return newNumber;
}
