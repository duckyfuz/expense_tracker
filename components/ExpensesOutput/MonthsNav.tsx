import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";

const monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function MonthsNav({
  previousMonth,
  nextMonth,
  month,
}: {
  previousMonth: any;
  nextMonth: any;
  month: any;
}) {
  const Direction = ({ back }: { back: boolean }) => {
    const icon = back
      ? "arrow-left-drop-circle-outline"
      : "arrow-right-drop-circle-outline";
    const navDir = back ? previousMonth : nextMonth;
    return (
      <IconButton
        icon={icon}
        size={24}
        onPress={navDir}
        style={{ margin: -10 }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Direction back={true} />
      <Card style={{ margin: 6, padding: 10 }}>
        <View style={styles.monthContainer}>
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            {monthList[Number(month) - 1]}
          </Text>
        </View>
      </Card>
      <Direction back={false} />
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
    minWidth: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
