import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Card } from "react-native-paper";

import { LightContext } from "../../store/light-context";
import { CombinedDarkTheme, CombinedLightTheme } from "../../constants/styles";

const ErrorOverlay = ({ message, onConfirm }) => {
  const { light } = useContext(LightContext);

  return (
    <View style={styles.container}>
      <Card style={{ margin: 6, marginBottom: 60, padding: 12, paddingTop: 4 }}>
        <Text
          variant="titleLarge"
          style={[
            styles.title,
            {
              color: light
                ? CombinedLightTheme.colors.error
                : CombinedDarkTheme.colors.error,
            },
          ]}
        >
          An error ocurred!
        </Text>
        <Text
          variant="titleMedium"
          style={{
            color: light
              ? CombinedLightTheme.colors.error
              : CombinedDarkTheme.colors.error,
          }}
        >
          {message}
        </Text>
      </Card>
      <Button
        mode="elevated"
        onPress={onConfirm}
        buttonColor={
          light
            ? CombinedLightTheme.colors.error
            : CombinedDarkTheme.colors.error
        }
        textColor={
          light
            ? CombinedLightTheme.colors.onError
            : CombinedDarkTheme.colors.onError
        }
      >
        Okay
      </Button>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 8,
  },
  title: {
    margin: 8,
    fontWeight: "bold",
  },
});
