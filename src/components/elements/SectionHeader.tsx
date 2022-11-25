import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import { appThemes, gradientPrimary } from '@/helpers';

interface ISectionHeaderProps {
  title: string;
}

export function SectionHeader(props: React.PropsWithChildren<ISectionHeaderProps>) {
  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}
      useAngle={true}
      angle={90.78}
      angleCenter={{ x: 0.35, y: 0.25 }}
      colors={gradientPrimary}
      locations={[0.25, 0.85, 1.0]}
    >
      <Text style={styles.title}>
        {props.title}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    color: appThemes.colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 24,
  },
});
