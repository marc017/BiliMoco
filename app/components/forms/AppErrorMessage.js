import React from "react";
import { StyleSheet } from "react-native";

import defaultStyles from "../../config/styles";
import AppText from "../AppText";
import colors from "../../config/colors";

function AppErrorMessage({ error, visible }) {
  if (!error || !visible) return null;

  return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.danger,
    fontSize: 17,
  },
});

export default AppErrorMessage;
