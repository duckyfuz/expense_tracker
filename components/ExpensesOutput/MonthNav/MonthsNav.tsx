import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import MiddlePicker from "./MiddlePicker";

function MonthsNav({
  previousMonth,
  nextMonth,
  month,
  year,
}: {
  previousMonth: Function;
  nextMonth: Function;
  month: string;
  year: number;
}) {
  let leftView = (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    ></View>
  );

  let yearNav = (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Card style={{ margin: 6, paddingHorizontal: 12, paddingVertical: 6 }}>
        <View
          style={{
            minWidth: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            {year}
          </Text>
        </View>
      </Card>
    </View>
  );

  return (
    <View style={{ flexDirection: "row" }}>
      {leftView}
      <MiddlePicker
        previousMonth={previousMonth}
        nextMonth={nextMonth}
        month={month}
      />
      {yearNav}
    </View>
  );
}

export default MonthsNav;
