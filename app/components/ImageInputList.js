import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import defaultStyles from '../config/styles';
import ImageInput from './ImageInput';

function ImageInputList({
  imageUris = [],
  onRemoveImage,
  onAddImage,
  hideInputAfterAdd,
}) {
  const scrollView = useRef();
  const showInput = !hideInputAfterAdd
    ? true
    : imageUris.length <= 0
    ? true
    : false;
  return (
    <View>
      <ScrollView
        horizontal
        ref={scrollView}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          {showInput ? (
            <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
