import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { LoadingItem } from './LoadingItem';

interface IDelayRenderProps {
  delayMs: number;
  isLoading?: boolean;
}

export function DelayRender(props: React.PropsWithChildren<IDelayRenderProps>) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, props.delayMs);
    return () => clearTimeout(timer);
  }, [props.delayMs]);

  if (!isShown && props?.isLoading) {
    return <LoadingItem containerStyle={styles.loadingStyle} />;
  }

  if (!isShown) {
    return null;
  }

  return typeof props.children === 'function' ? props.children() : props.children;
}

const styles = StyleSheet.create({
  loadingStyle: {
    backgroundColor: 'transparent',
  },
});
