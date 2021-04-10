import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

import defaultStyles from "../config/styles";
import colors from "../config/colors";
import AppText from "../components/AppText";

function OfflineNotice(props) {
  const netinfo = useNetInfo();

  if (netinfo.type !== "unknown" && netinfo.isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>No Internet Connection</AppText>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    height: 50,
    position: "absolute",
    top: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    zIndex: 1,
  },
  text: {
    color: colors.white,
  },
});

export default OfflineNotice;
