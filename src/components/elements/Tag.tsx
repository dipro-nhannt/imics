import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { pixelToDpiH } from '@/helpers';

interface ITagProps {
}

export function Tag(props: React.PropsWithChildren<ITagProps>) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {props.children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    backgroundColor: '#EE8595',
    paddingLeft: 8,
    paddingRight: 8,
    alignSelf: 'baseline',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: pixelToDpiH(24),
  },
  label: {
    fontSize: 12,
    lineHeight: 20,
    color: '#fff',
  },
});
