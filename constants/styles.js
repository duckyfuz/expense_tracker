import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
export const { CombinedLightTheme, CombinedDarkTheme } = {
  CombinedLightTheme: merge(MD3LightTheme, LightTheme),
  CombinedDarkTheme: merge(MD3DarkTheme, DarkTheme),
};

export const GlobalStyles = {
  colors: {
    primary: "#7a44bb",
    primaryVariant: "#3700B3",
    secondary: "#03DAC6",
    base: "#060606",
    background: "#121212",
    card: "#181818",
    error: "#CF6679",
    onPrimary: "#000000",
    onBackground: "#FFFFFF",
    onError: "#000000",
  },
};
