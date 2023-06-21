import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BudgetOutput from "../components/BudgetOutput/BudgetOutput";

const Budget = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BudgetOutput />
    </SafeAreaView>
  );
};

export default Budget;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
