import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ButtonProps,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import { TextStyled, ViewStyled } from '@/components/elements';
import { appColors, appThemes, normalize } from '@/helpers';

import { FormGroupContext } from '../fields';
import { buttonStyles } from './_shared';

interface ICustomButtonProps extends ButtonProps {
  name?: string;
  onPress?: () => (void | Promise<void> | boolean);
  disabled?: boolean;
  iconLeft?: ImageSourcePropType;
  dropShadow?: boolean;
  textStyle?: StyleProp<TextStyle>;
  size?: 'default' | 'large' | 'medium' | 'small' | 'tiny';
  gradient?: boolean;
  disableOnPress?: boolean;
  type?: 'submit';
  color?: 'primary';
  isLoading?: boolean;
  isValid?: boolean;
  containerBtnStyle?: object;
}

// eslint-disable-next-line max-lines-per-function
export const CustomButtonComp = (props: React.PropsWithChildren<ICustomButtonProps>) => {
  const {
    title,
    onPress,
    iconLeft,
    textStyle,
    isLoading = false,
    containerBtnStyle = {},
  } = props;
  const [disabled, setDisabled] = useState(props.disabled);
  const { onSubmit, values } = React.useContext(FormGroupContext);

  const handlePress = React.useCallback(
    () => {
      if (disabled) {
        return;
      }

      if (props.disableOnPress) {
        setDisabled(true);
      }

      if (props.type === 'submit') {
        onSubmit?.(values);
        return;
      }

      onPress?.();


      if (props.disableOnPress) {
        setDisabled(false);
      }
    },
    [disabled, onPress, onSubmit, props.disableOnPress, props.type, values]
  );

  useEffect(
    () => {
      setDisabled(props.disabled);
    },
    [props.disabled]
  );

  const buttonContent = useMemo(
    () => {
      const colorStyle = props.color === 'primary'
        ? buttonStyles.buttonTextPrimary
        : props.gradient
          ? {}
          : buttonStyles.buttonTextDefault;

      return (
        <>
          <ViewStyled
            flexDirection="row" alignItems={'center'}
            justifyContent={iconLeft ? 'flex-start' : 'center'}
          >
            {iconLeft && (
              <>
                <ViewStyled marginLeft={32} marginRight={16}>
                  <FastImage width={50} height={50} source={iconLeft} style={buttonStyles.iconButton} />
                </ViewStyled>

                <ViewStyled flex={1}>
                  <TextStyled
                    fontWeight={props.size === 'large' || props.size === 'medium' ? 'bold' : '500'}
                    style={[
                      textStyle,
                      colorStyle,
                    ]}>
                    {title}
                  </TextStyled>
                </ViewStyled>
              </>
            )}
            {
              !iconLeft && (
                <ViewStyled alignItems="center">
                  <TextStyled
                    fontWeight={props.size === 'large' || props.size === 'medium' ? 'bold' : '500'}
                    style={[
                      textStyle,
                      colorStyle,
                    ]}>
                    {title}
                  </TextStyled>
                </ViewStyled>
              )
            }
          </ViewStyled>
        </>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [iconLeft, props.color, props.size, textStyle, title]
  );

  const renderGradient = useCallback(
    () => {
      const gradientProps = {
        colors: disabled ? appThemes.colors.gradients.disable : appThemes.colors.gradients.primary,
        locations: disabled ? appThemes.colors.gradients.noneLocation : appThemes.colors.gradients.primaryLocation,
      };

      const sizeStyle = props.size === 'large'
        ? buttonStyles.buttonSizeLarge
        : props.size === 'medium'
          ? buttonStyles.buttonSizeMedium
          : props.size === 'small'
            ? buttonStyles.buttonSizeSmall
            : props.size === 'tiny'
              ? buttonStyles.buttonSizeTiny
              : buttonStyles.buttonSizeDefault;

      return (
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          useAngle={true}
          angle={90.78}
          angleCenter={{ x: 0.35, y: 0.25 }}
          {...gradientProps}
          style={[
            buttonStyles.buttonDefault,
            sizeStyle,
            props.dropShadow && buttonStyles.buttonShadow,
            props.disabled && buttonStyles.buttonDisabled,
            containerBtnStyle,
          ]}
        >
          {
            isLoading
              ? <Loading
                color={appColors.whitePrimary}
              />
              :
              buttonContent
          }
        </LinearGradient>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, props.size, props.dropShadow, props.disabled, containerBtnStyle, isLoading, buttonContent]
  );

  const Loading = React.useCallback(({
    color = appColors.whitePrimary,
  }) => (
    <View style={styles.wrapLoading}>
      <ActivityIndicator
        size="small"
        color={color}
      />
    </View>
  ), []);

  const renderSolid = useCallback(
    () => {
      const colorStyle = props.color === 'primary'
        ? buttonStyles.buttonPrimary
        : buttonStyles.buttonColorDefault;

      const sizeStyle = props.size === 'large'
        ? buttonStyles.buttonSizeLarge
        : props.size === 'medium'
          ? buttonStyles.buttonSizeMedium
          : props.size === 'default'
            ? buttonStyles.buttonSizeDefault
            : props.size === 'tiny'
              ? buttonStyles.buttonSizeTiny
              : buttonStyles.buttonSizeSmall;

      return (
        <ViewStyled
          style={[
            buttonStyles.buttonDefault,
            colorStyle,
            sizeStyle,
            buttonStyles.buttonSolidDefault,
            props.disabled && buttonStyles.buttonDisabled,
          ]}
        >
          {
            isLoading
              ? <Loading
                color={props.color !== 'primary' ? appColors.primary : appColors.white}
              />
              : buttonContent
          }
        </ViewStyled>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [buttonContent, props.color, props.disabled, isLoading]
  );

  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      onPress={handlePress}
      activeOpacity={0.6}
    >
      {
        props.gradient
          ? renderGradient()
          : renderSolid()
      }
    </TouchableOpacity>
  );
};

export const CustomButton = React.memo(CustomButtonComp);

const styles = StyleSheet.create({
  wrapLoading: {
    paddingVertical: normalize(16),
    alignContent: 'center',
    justifyContent: 'center',
  },
});
