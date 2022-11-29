import React from 'react';

import { width } from '@/helpers';

import { ButtonCustom } from '../buttons';
import { TextStyled, ViewStyled } from '../elements';
import { closeSecondaryModal, showSecondaryModal } from './GlobalModal';

interface IGlobalNotification {
  title?: string;
  content: string;
  okTitle?: string;
  onClose?: () => void;
}

export const showGlobalNotification = (props: IGlobalNotification) => {
  const defaultTitle = 'お知らせ';
  const defaultOkTitle = '閉じる';

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
      <ViewStyled justifyContent="center" alignItems="center">
        <ViewStyled marginBottom={22.67} alignItems="center">
          <TextStyled textAlign="center">
            {props.content}
          </TextStyled>
        </ViewStyled>
        <ViewStyled width={120}>
          <ButtonCustom
            onPress={() => {
              closeSecondaryModal();
            }}
            size="small"
            title={props.title ?? defaultOkTitle}
            color={'primary'}
          />
        </ViewStyled>
      </ViewStyled>
    ),
  });
};

export const closeGlobalNotification = () => {
  closeSecondaryModal();
};
