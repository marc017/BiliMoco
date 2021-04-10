import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import defaultStyles from '../config/styles';
import colors from '../config/colors';

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require('../assets/animations/loader-small-v4.json')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
  },
  overlay: {
    backgroundColor: colors.white,
    height: '100%',
    width: '100%',
    opacity: 0.5,
    zIndex: 1,
  },
});
export default ActivityIndicator;
