import { View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NullComponent() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text variant="displayMedium" style={{ textAlign: "center" }}>
          This page is being worked on! Check again in a week :)
        </Text>
      </View>
    </SafeAreaView>
  );
}
