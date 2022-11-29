import React from 'react';
import { StyleSheet, View } from 'react-native';

// import { SVGChevronRight } from '@/assets';

interface IListItemCustomProps {
  readonly hideArrow?: boolean;
}

export function ListItemCustom(props: React.PropsWithChildren<IListItemCustomProps>) {
  return (
    <View
      style={styles.container}
    >
      <View style={styles.containerInner}>
        <View style={styles.contentWrapper}>
          {props.children}
        </View>
        {!props.hideArrow && (
          <View style={styles.arrowWrapper}>
            {/* <SVGChevronRight stroke="#E2DEDF" strokeWidth={1.5} /> */}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    minHeight: 50,
    flex: 1,
    borderBottomColor: 'rgba(226, 222, 223, 0.2)',
    borderBottomWidth: 1,
  },
  containerInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  contentWrapper: {
    flex: 1,
  },
  arrowWrapper: {
    marginRight: 25 - 16,
  },

});
