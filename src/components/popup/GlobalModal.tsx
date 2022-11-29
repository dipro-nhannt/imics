import EventEmitter from 'eventemitter3';
import React, { useCallback, useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  ImageStyle,
  Modal,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { ic_close_popup } from '@/assets';
import {
  appThemes,
  height,
  IDimension,
  normalize,
  pixelToDpiH,
  pixelToDpiW,
  width,
} from '@/helpers';

// import { IDimension } from '@/utils';
import { ButtonCustom } from '../buttons';
import { ScrollViewCustom, TextStyled, ViewStyled } from '../elements';

const events = new EventEmitter();

interface IGlobalModalProps {
  showEventKey: string;
  closeEventKey: string;
}

export function GlobalModal(props: IGlobalModalProps) {
  const [prevVisible, setPrevVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalProps, setModalProps] = useState<IShowModalProps>({});
  const [dimension, setDimension] = useState<IDimension>({
    height: 100,
  });
  const backAction = useCallback(() => true, []);

  useEffect(
    () => {
      if (props.showEventKey === 'SHOW_SECONDARY_MODAL') {
        BackHandler.addEventListener('hardwareBackPress', closeSecondaryModal);
      }
      else {
        BackHandler.addEventListener('hardwareBackPress', closeGlobalModal);
      }

      if (!visible) {
        if (props.closeEventKey === 'CLOSE_SECONDARY_MODAL') {
          BackHandler.removeEventListener('hardwareBackPress', closeSecondaryModal);
        }
        else {
          BackHandler.removeEventListener('hardwareBackPress', closeGlobalModal);
        }

      }

      return () => {
        if (!visible) {
          if (props.closeEventKey === 'CLOSE_SECONDARY_MODAL') {
            BackHandler.removeEventListener('hardwareBackPress', closeSecondaryModal);
          }
          else {
            BackHandler.removeEventListener('hardwareBackPress', closeGlobalModal);
          }
        }
      };
    },
    [backAction, props.closeEventKey, props.showEventKey, visible]
  );

  const toggleVisible = useCallback(
    () => {
      const nextVisible = !visible;
      setPrevVisible(visible);
      setVisible(nextVisible);
    },
    [visible]
  );

  useEffect(
    () => {
      if (prevVisible && !visible) {
        modalProps.onClose && modalProps.onClose();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visible, modalProps.onClose, prevVisible]
  );

  useEffect(
    () => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const onShowModal = (props: IShowModalProps) => {
        setPrevVisible(false);
        setVisible(true);
        setModalProps(props);
      };

      const onCloseModal = () => {
        setPrevVisible(true);
        setVisible(false);
        setTimeout(() => {
          setModalProps({});
        }, 300);
      };

      events.addListener(props.showEventKey, onShowModal);
      events.addListener(props.closeEventKey, onCloseModal);

      return () => {
        events.removeAllListeners(props.showEventKey);
        events.removeAllListeners(props.closeEventKey);
      };
    },
    [props.showEventKey, props.closeEventKey]
  );

  return (
    <>
      <Modal
        visible={visible}
        onRequestClose={toggleVisible}
        animationType="fade"
        transparent={true}
      >
        <ScrollViewCustom
          keyboardVerticalOffsetIOS={0}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => toggleVisible()}
            style={styles.overflow}
          />
          <ViewStyled
            style={[
              styles.wrapperContainer,
              dimension.height < height * 0.6
                // eslint-disable-next-line react-native/no-inline-styles
                ? {
                  position: 'absolute',
                  top: modalProps.top ? modalProps.top : pixelToDpiH(100),
                }
                : {},
            ]}
          >
            <View onLayout={(event) => setDimension(event.nativeEvent.layout)} style={[styles.centeredView]}>
              <ViewStyled style={styles.modalContent} width={modalProps.width ?? 300}>
                <ViewStyled style={[!modalProps.title && styles.headerNoTitle, modalProps.headerStyle]}>
                  {modalProps.styleWrapIcon && (
                    <ViewStyled style={[styles.closeContainer, modalProps.styleWrapIcon]}>
                      <TouchableOpacity onPress={toggleVisible}>
                        <Image
                          source={modalProps.isSlideDown ? ic_close_popup : ic_close_popup}
                          style={[styles.closeIcon, modalProps.styleIcon]} />
                      </TouchableOpacity>
                    </ViewStyled>
                  )}
                  {
                    modalProps.title && (
                      <ViewStyled alignItems="center">
                        <TextStyled
                          presets={['big', modalProps.colorTitle === 'primary' ? 'primary' : 'default']}
                        // {...(modalProps.titleStyle ?? styles.defaultTitle)}
                        >
                          {modalProps.title}
                        </TextStyled>
                      </ViewStyled>
                    )
                  }
                </ViewStyled>
                <ViewStyled>
                  {modalProps.body}
                </ViewStyled>
                <ViewStyled style={modalProps.textButtonBack ?? modalProps.textButtonOke ? styles.wrapPopup : {}}>
                  {modalProps.textButtonBack && (
                    <ViewStyled width={120} height={40}>
                      <ButtonCustom
                        title={modalProps.textButtonBack}
                        onPress={toggleVisible}
                        textStyle={styles.txtButtonSolid}
                      />
                    </ViewStyled>
                  )}
                  {modalProps.textButtonOke && (
                    <ViewStyled width={120} height={40}>
                      <ButtonCustom
                        title={modalProps.textButtonOke}
                        onPress={modalProps.handleButtonOke}
                        color={'primary'}
                      />
                    </ViewStyled>
                  )}
                </ViewStyled>
              </ViewStyled>
            </View>
          </ViewStyled>
        </ScrollViewCustom>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperContainer: {
    marginTop: pixelToDpiH(80),
    marginBottom: pixelToDpiH(80),
    marginHorizontal: pixelToDpiW(20),
    backgroundColor: 'white',
    borderRadius: 10,
  },
  overflow: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: -1,
  },
  modalContent: {
    paddingTop: 30,
    paddingBottom: 25,
    paddingHorizontal: pixelToDpiW(16),
    borderRadius: 10,
    maxWidth: width * 0.9,
  },
  txtButtonSolid: {
    marginHorizontal: 12,
    fontWeight: '500',
    color: appThemes.colors.text.textPrimary,
    fontSize: normalize(14),
  },
  closeContainer: {
    padding: 8,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
  headerNoTitle: {
    borderBottomColor: 'blue',
    borderBottomWidth: 0,
  },
  wrapPopup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: pixelToDpiH(8),
    marginBottom: pixelToDpiH(8),
  },
  defaultTitle: {
    marginBottom: 35,
  },
});


GlobalModal.defaultProps = {
  width: 300,
  borderRadius: 5,
  onClose: () => { },
  body: <></>,
} as IShowModalProps;

interface IShowModalProps {
  top?: number;
  width?: number;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  headerStyle?: ViewStyle;
  borderRadius?: number;
  body?: JSX.Element | React.ReactNode;
  onClose?: () => void;
  styleIcon?: ImageStyle;
  colorTitle?: 'primary' | 'default';
  styleWrapIcon?: ViewStyle;
  textButtonBack?: string;
  textButtonOke?: string;
  isSlideDown?: boolean;
  handleButtonOke?: () => void;
  scrollEnable?: boolean;
}

export const showGlobalModal = (props: IShowModalProps) => {
  events.emit('SHOW_PRIMARY_MODAL', props);
};

export const closeGlobalModal = () => {
  events.emit('CLOSE_PRIMARY_MODAL');
  return true;
};

export const showSecondaryModal = (props: IShowModalProps) => {
  events.emit('SHOW_SECONDARY_MODAL', props);
};

export const closeSecondaryModal = () => {
  events.emit('CLOSE_SECONDARY_MODAL');
  return true;
};
