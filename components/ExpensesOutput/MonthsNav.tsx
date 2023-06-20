import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";

function MonthsNav({
  previousMonth,
  nextMonth,
}: {
  previousMonth: any;
  nextMonth: any;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.monthContainer}>
        <IconButton
          icon="arrow-left-drop-circle-outline"
          size={24}
          onPress={previousMonth}
          style={{ margin: -10 }}
        />
        <Card style={{ margin: 6, padding: 10 }}>
          <View
            style={{
              minWidth: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text variant="titleSmall" style={{ fontWeight: "bold" }}>
              Month
            </Text>
          </View>
        </Card>
        <IconButton
          icon="arrow-right-drop-circle-outline"
          size={24}
          onPress={nextMonth}
          style={{ margin: -10 }}
        />
      </View>
    </View>
  );
}

export default MonthsNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  monthContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
