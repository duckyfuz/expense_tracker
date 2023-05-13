import { View, Text, StyleSheet, Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../constants/styles";

export const AddExpenseButton = (props) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.centerButton, styles.shadow]}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={() => navigation.navigate("ManageExpense")}
      >
        <Ionicons name="cube-outline" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  centerButton: {
    justifyContent: "center",
    alignItems: "center",
    top: -20,
    backgroundColor: GlobalStyles.colors.primaryVariant,
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.75,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
