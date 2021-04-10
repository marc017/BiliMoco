import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../IconButton';

function AppDirections(props) {
  return (
    <View style={styles.container}>
      <IconButton 
        iconName='directions'
        iconPack='material'
        backgroundColor={colors.secondary}
        onPress={() => console.log('test')}></IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
})

export default AppDirections;