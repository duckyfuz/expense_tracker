import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const CustButton = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <View style={[styles.buttton, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CustButton;

const styles = StyleSheet.create({
  buttton: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.error,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: GlobalStyles.colors.onBackground,
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primaryVariant,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.card,
    borderRadius: 4,
  },
});
