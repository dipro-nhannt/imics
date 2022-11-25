import React from 'react';

import NetInfo from '@react-native-community/netinfo';

import {
  closeGlobalNotification,
  showGlobalNotification,
} from '@/components/popup';

export function NetworkStatusNotify() {

  const isModalShown = React.useRef<boolean>(false);
  const isConnected = React.useRef<boolean>(true);

  React.useEffect(
    () => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        if (state.isConnected === isConnected.current) {
          return;
        }

        isConnected.current = state.isConnected;

        if (!state.isConnected && !isModalShown.current) {
          showGlobalNotification({
            content: '何らかの理由により接続できません。しばらくしてからもう一度お試しください',
            onClose: () => {
              isModalShown.current = false;
            }
          });
          isModalShown.current = true;
        }
        else if (state.isConnected && isModalShown.current) {
          closeGlobalNotification();
          isModalShown.current = false;
        }
      });

      return unsubscribe;
    },
    []
  );

  return (
    <></>
  );
}
