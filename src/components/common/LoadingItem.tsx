import React from 'react';
import { ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';

import { pixelToDpiH, pixelToDpiW } from '@/helpers';
import { appColors } from '@/helpers/themes';

import { ViewStyled } from '../elements';

interface ILoadingItemCompProps {
  containerStyle?: ViewStyle;
  size?: 'large' | 'small';
}

const LoadingItemComp = (props: ILoadingItemCompProps) => {

  return (
    <>
      <ViewStyled style={[styles.container, props.containerStyle]}>
        <ViewStyled style={[styles.wrapLoad, props.size === 'small' && styles.wrapLoadSmall]}>
          <ActivityIndicator size={props.size} color={appColors.bluePrimary} />
        </ViewStyled>
      </ViewStyled>
    </>
  );
};

export const LoadingItem = React.memo(LoadingItemComp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.bluePrimary,
    width: '100%',
  },
  wrapLoad: {
    width: pixelToDpiW(60),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.whitePrimary,
    borderRadius: 100,
    marginVertical: pixelToDpiH(2),
  },
  wrapLoadSmall: {
    width: pixelToDpiW(32),
    aspectRatio: 1,
  },
});
