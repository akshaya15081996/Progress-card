import React from 'react';
import { View, StyleSheet } from 'react-native';
import BackgroundSVG from '../assets/BackgroundSVG.svg';

const MyComponent = () => {
  return (
    <View style={styles.container}>
      <BackgroundSVG style={styles.svgBackground} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default MyComponent;
