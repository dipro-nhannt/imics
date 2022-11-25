import React from 'react';

import { width } from '@/helpers';

import { CustomButton } from '../common';
import { StyledText, StyledView } from '../display';
import { closeSecondaryModal, showSecondaryModal } from './GlobalModal';

interface IGlobalNotification {
  title?: string;
  content: string;
  okTitle?: string;
  onClose?: () => void;
}

export const showGlobalNotification = (props: IGlobalNotification) => {
  const defaultTitle = translate('modal.notification.title');
  const defaultOkTitle = translate('modal.notification.button');

  showSecondaryModal({
    top: 0,
    width: width * 0.90,
    title: props.title ?? defaultTitle,
    isSlideDown: true,
    handleButtonOke: () => {
      closeSecondaryModal();
    },
    onClose: props.onClose,
    body: (
      <StyledView justifyContent="center" alignItems="center">
        <StyledView marginBottom={22.67} alignItems="center">
          <StyledText textAlign="center">
            {props.content}
          </StyledText>
        </StyledView>
        <StyledView width={120}>
          <CustomButton
            onPress={() => {
              closeSecondaryModal();
            }}
            size="small"
            title={props.title ?? defaultOkTitle}
            color={'primary'}
          />
        </StyledView>
      </StyledView>
    ),
  });
};

export const closeGlobalNotification = () => {
  closeSecondaryModal();
};
