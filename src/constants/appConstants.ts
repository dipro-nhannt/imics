import { Platform } from 'react-native';
import Config, { NativeConfig } from 'react-native-config';

import { NavigationProp } from '@react-navigation/native';

export const LOCAL_STORAGE = {
  PUSH_NOTIFICATION_KEY: 'push_notification_key',
};

export const behavior = Platform.OS === 'ios' ? 'padding' : undefined;

const envConfig: NativeConfig = {
  ...Config,
};

export const env = {
  // GOOGLE
  GOOGLE_WEB_CLIENT_ID: envConfig.GOOGLE_WEB_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID: envConfig.GOOGLE_IOS_CLIENT_ID,
  // ANDROID
  ANDROID_CHANNEL_ID: envConfig.ANDROID_CHANNEL_ID,
  ANDROID_CHANNEL_NAME: envConfig.ANDROID_CHANNEL_NAME,
  // APP
  API_URL: envConfig.API_URL,
  BUILD_ENVIRONMENT: envConfig.BUILD_ENVIRONMENT,
  // AWS Configuration
  AWS_REGION: envConfig.AWS_REGION,
  AWS_PHOTOS_BUCKET_NAME: envConfig.AWS_PHOTOS_BUCKET_NAME,
};

export const APP_SCREEN = 'APP_SCREEN';
export const AUTH_SCREEN = 'AUTH_SCREEN';
export const SPLASH_SCREEN = 'SPLASH_SCREEN';

export enum AuthScreenNames {
  SIGN_UP_SCREEN = 'SIGN_UP_SCREEN',
  SIGN_IN_SCREEN = 'SIGN_IN_SCREEN',
}

export enum AppScreenNames {
  APP_TABS = 'APP_TABS',
  APP_MAIN = 'APP_MAIN',

  /**
   * [H] Home screens
   */
  HOME_SCREEN = 'HOME_SCREEN',
}
export interface IDeviceToken {
  token: string;
  os: string; // android, ios
}

export type IAppScreens = {
  [key in AppScreenNames]: any;
};

export const appFonts = {
  bold: 'NotoSansJP-Bold',
  medium: 'NotoSansJP-Medium',
  regular: 'NotoSansJP-Regular',
};

export type AppNavigationProp = NavigationProp<IAppScreens>;
