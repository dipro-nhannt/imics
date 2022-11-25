import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { pixelToDpiH, pixelToDpiW } from '@/helpers';

type ViewStylePreset = 'flex-center' | 'flex-direction-row';

type IViewStyledProps = StyleProp<ViewStyle> & {
  style: StyleProp<ViewStyle>;
  presets?: ViewStylePreset | ViewStylePreset[];
};

const getPresetStyle = (
  presets?: ViewStylePreset | ViewStylePreset[]
): StyleProp<ViewStyle> => {
  if (!presets) {
    return {};
  }

  let style = {} as StyleProp<ViewStyle>;
  const presetList = Array.isArray(presets) ? presets : [presets];

  for (const preset of presetList) {
    if (preset === 'flex-center') {
      style = {
        ...(style as any),
        alignItems: 'center',
        justifyContent: 'center',
      };
    }
    else if (preset === 'flex-direction-row') {
      style = {
        ...(style as any),
        flexDirection: 'row',
        flexWrap: 'wrap',
      };
    }
  }

  return style;
};

export function ViewStyled(props: React.PropsWithChildren<IViewStyledProps>) {
  const { children, presets, style, ...styles } = props as any;

  const customStyles = {};
  const customStylesKeys = Object.keys(styles);

  for (const customStylesKey of customStylesKeys) {
    if ([
      'width',
      'paddingLeft', 'paddingRight', 'paddingHorizontal',
      'marginLeft', 'marginRight', 'marginHorizontal',
    ].includes(customStylesKey) && typeof styles[customStylesKey] === 'number') {
      customStyles[customStylesKey] = pixelToDpiW(styles[customStylesKey]);
    }
    else if ([
      'height',
      'paddingTop', 'padding-bottom', 'paddingVertical',
      'marginTop', 'marginBottom', 'marginVertical',
    ].includes(customStylesKey) && typeof styles[customStylesKey] === 'number') {
      customStyles[customStylesKey] = pixelToDpiH(styles[customStylesKey]);
    }
    else {
      customStyles[customStylesKey] = styles[customStylesKey];
    }
  }

  const presetStyle = getPresetStyle(presets);

  return <View style={[style, presetStyle, customStyles]}>{children}</View>;
}

ViewStyled.defaultProps = {} as IViewStyledProps;
