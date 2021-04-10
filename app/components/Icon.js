import React from 'react';
import { View } from 'react-native';
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Feather,
} from '@expo/vector-icons';
import AppText from './AppText';

function Icon({
  name,
  size = 40,
  backgroundColor = 'black',
  iconColor = 'white',
  iconPack = 'material',
  isCircle = true,
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: isCircle ? size / 2 : 0,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {getIconFromPack({ name, iconPack, size, iconColor })}
    </View>
  );
}

const getIconFromPack = ({ name, iconPack, size, iconColor }) => {
  if (iconPack === 'material') {
    return (
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
    );
  }
  if (iconPack === 'fontawesome') {
    return <FontAwesome name={name} color={iconColor} size={size * 0.5} />;
  }
  if (iconPack === 'fa5') {
    return <FontAwesome5 name={name} color={iconColor} size={size * 0.5} />;
  }
  if (iconPack === 'feather') {
    return <Feather name={name} color={iconColor} size={size * 0.5} />;
  } else {
    return (
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
    );
  }
};

export default Icon;
