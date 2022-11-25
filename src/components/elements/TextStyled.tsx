import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { appColors, appThemes } from '@/helpers';
import { appFonts } from '@/utils';

type TextStylePreset = undefined
  | 'default'
  | 'subtitle'
  | 'subtitle2'
  | 'error'
  | 'warning'
  | 'primary'
  | 'primary2'
  | 'smallest'
  | 'bold'
  | 'medium'
  | 'secondary'
  | 'big'
  | 'biggest';

type ITextStyledProps = StyleProp<TextStyle> & {
  style: StyleProp<TextStyle>;
  presets?: TextStylePreset | TextStylePreset[];
  enablePress?: boolean;
};

const getFontMyWeight = (weight?: string | number) => {
  if (weight === 500 || weight === '500' || weight == 'medium') {
    return appFonts.medium;
  }

  if (weight === 700 || weight === '700' || weight == 'bold') {
    return appFonts.bold;
  }

  return appFonts.regular;
};

const getPresetStyle = (presets?: TextStylePreset | TextStylePreset[]): StyleProp<TextStyle> => {
  if (!presets) {
    return {};
  }

  let style = {} as StyleProp<TextStyle>;
  const presetList = Array.isArray(presets) ? presets : [presets];

  for (const preset of presetList) {
    if (preset === 'subtitle') {
      style = {
        ...style as any,
        fontSize: 12,
        lineHeight: 20,
        color: appColors.textColorForeign,
      };
    }
    else if (preset === 'subtitle2') {
      style = {
        ...style as any,
        fontSize: 12,
        lineHeight: 20,
        color: appColors.textColor,
      };
    }
    else if (preset === 'error') {
      style = {
        ...style as any,
        color: appColors.textColorError,
      };
    }
    else if (preset === 'primary') {
      style = {
        ...style as any,
        color: appColors.textColorPrimary,
      };
    }
    else if (preset === 'bold') {
      style = {
        ...style as any,
        fontFamily: appFonts.bold,
      };
    }
    else if (preset === 'biggest') {
      style = {
        ...style as any,
        fontFamily: appFonts.bold,
        fontSize: 20,
        lineHeight: 24,
      };
    }

    else if (preset === 'big') {
      style = {
        ...style as any,
        fontFamily: appFonts.bold,
        fontSize: 16,
      };
    }
    else if (preset === 'smallest') {
      style = {
        ...style as any,
        fontSize: 10,
      };
    }
    else if (preset === 'medium') {
      style = {
        ...style as any,
        fontFamily: appFonts.medium,
      };
    }
    else if (preset === 'secondary') {
      style = {
        ...style as any,
        color: appColors.textColorForeign,
      };
    }
    else if (preset === 'primary2') {
      style = {
        ...style as any,
        color: appColors.textColorPrimary2,
      };
    }
  }

  return style;
};

export function TextStyled(props: React.PropsWithChildren<ITextStyledProps>) {
  const { children, enablePress, style, presets, ...styles } = props as any;

  const fontFamily = getFontMyWeight(styles.fontWeight);

  const fontStyle = {
    fontFamily: fontFamily,
    // fontWeight: "normal"
  };

  const presetStyle = getPresetStyle(presets);

  return (
    <Text
      style={[
        defaultStyle.default,
        ...(Array.isArray(style) ? style : [style]),
        fontStyle,
        presetStyle,
        styles,
      ]}
      selectable={!enablePress ?? true}
      allowFontScaling={false}
    >
      {children}
    </Text>
  );
}

const defaultStyle = StyleSheet.create({
  default: {
    fontSize: 14,
    color: appThemes.colors.text.textPrimary,
    lineHeight: 22,
  },
});

TextStyled.defaultProps = {
} as ITextStyledProps;
