import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    marginLeft: 10,
    color: colors.darker,
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
  },
};
