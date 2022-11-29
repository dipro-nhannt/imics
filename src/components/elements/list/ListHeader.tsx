import React from 'react';
import { ImageRequireSource, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Image } from 'react-native-elements/dist/image/Image';

interface IListHeaderProps {
  icon?: ImageRequireSource;
  title?: string;
}

export function ListHeader(props: React.PropsWithChildren<IListHeaderProps>) {
  return (
    <View style={styles.container}>
      {
        props.icon && (
          <Image style={styles.icon} source={props.icon} />
        )
      }
      <Text style={styles.title}>
        {props.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#838282',
    fontSize: 14,
    lineHeight: 22,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 16,
  },
});
