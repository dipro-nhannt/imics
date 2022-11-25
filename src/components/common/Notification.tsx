import React from 'react';
import { StyleSheet } from 'react-native';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';

import { appThemes } from '@/helpers/themes';

const createBaseToast = (color: string) => {
  return function NewToast({ text2, ...props }: BaseToastProps) {
    return (
      <BaseToast
        {...props}
        style={{ borderLeftColor: color }}
        contentContainerStyle={styles.paddingElement}
        text2Style={styles.txtElement}
        text1={undefined}
        text2={text2}
      />
    );
  };
};

const SuccessToast = createBaseToast('green');
const ErrorToast = createBaseToast('red');
const InfoToast = createBaseToast('orange');

const toastConfig = {
  success: ({ ...rest }) => (
    <SuccessToast {...rest} />
  ),
  error: ({ ...rest }) => (
    <ErrorToast {...rest} />
  ),
  info: ({ ...rest }) => (
    <InfoToast {...rest} />
  ),
};

interface INotificationProps {
  //
}

export function Notification({ children }: React.PropsWithChildren<INotificationProps>) {
  return (
    <>
      {children}
      <Toast config={toastConfig} />
    </>
  );
}

const styles = StyleSheet.create({
  paddingElement: {
    paddingLeft: 15,
  },
  txtElement: {
    fontFamily: appThemes.fonts.regular,
    flexDirection: 'column',
    color: appThemes.colors.text.textPrimary,
  },
});
