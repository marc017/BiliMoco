import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import AppButton from "../components/AppButton";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri: "https://picsum.photos/400/800",
      }}
      style={styles.background}
    >
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://picsum.photos/200",
            height: 200,
            width: 200,
          }}
          style={styles.logo}
        />
        <Text>Your online MarketPlace</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <AppButton
          title="Login"
          color="primary"
          onPress={() => navigation.navigate("Login")}
        ></AppButton>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate("Register")}
        ></AppButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 15,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
    alignContent: "center",
  },
});

export default WelcomeScreen;
