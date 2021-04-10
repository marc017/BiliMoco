// 14.8387114,120.2816007
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';
import MapView, { Marker } from 'react-native-maps';

function AppMap({ location, title, pinColor, onPinToMap }) {
  // const [location, setLocation] = useState();
  const [userCoord, setUserCoord] = useState();

  const initRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  useEffect(() => {
    setUserCoord(location);
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initRegion}>
        {userCoord ? (
          <Marker
            draggable
            coordinate={userCoord}
            pinColor={pinColor} // any color
            title={title}
            onDragEnd={(e) => {
              const coord = { x: e.nativeEvent.coordinate }.x;
              setUserCoord(coord);
              onPinToMap(coord);
            }}
          />
        ) : (
          <></>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default AppMap;
