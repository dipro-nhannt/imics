import React, { useCallback, useEffect } from 'react';
import {
  BackHandler,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {
  StackActions,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';

import { ic_back_header } from '@/assets';
import { DelayRender } from '@/components/common';
import { ViewStyled } from '@/components/elements';
import { pixelToDpiH, pixelToDpiW } from '@/helpers';
import { navigateHome } from '@/helpers';

interface IBackButtonCustomProps {
  backTo?: string;
  backToTop?: boolean;
  resetToHome?: boolean;
  onBeforeBack?: () => Promise<void>;
}

export function BackButtonCustom(props: IBackButtonCustomProps) {
  // const theme = useTheme();
  const navigation = useNavigation();
  const routes = useNavigationState(o => o.routes);

  const indexToBack = props.backTo
    ? [...routes].reverse().findIndex(o => o.name === props.backTo)
    : -1;

  const customBackAction = useCallback(
    () => {
      const backFn = () => {
        if (props.resetToHome) {
          navigateHome(navigation);
        }
        else if (props.backToTop) {
          navigation.dispatch(StackActions.popToTop());
        }
        else if (indexToBack >= 0) {
          navigation.dispatch(StackActions.pop(indexToBack));
        }
        else {
          navigation.goBack();
        }

        Keyboard.dismiss();
      };

      if (props.onBeforeBack) {
        props.onBeforeBack().then(() => backFn());
      }
      else {
        backFn();
      }

      return true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.resetToHome, props.backToTop, props.onBeforeBack, indexToBack, navigation]
  );

  useEffect(
    () => {
      BackHandler.addEventListener('hardwareBackPress', customBackAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', customBackAction);
      };
    },
    [customBackAction]
  );

  if (navigation.canGoBack() === false) {
    return <></>;
  }

  return (
    <DelayRender delayMs={100}>
      <TouchableOpacity
        onPress={customBackAction}
        hitSlop={{
          top: pixelToDpiH(20),
          right: pixelToDpiW(20),
          left: pixelToDpiW(20),
          bottom: pixelToDpiH(20),
        }}
      >
        <ViewStyled marginLeft={15}>
          <FastImage source={ic_back_header} style={styles.container} />
        </ViewStyled>
      </TouchableOpacity>
    </DelayRender>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1 / 1,
    height: 24,
  },
});
