import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { MonthContext } from "../../../store/month-context";

import MiddlePicker from "./MiddlePicker";

export default function MonthsNav({}: {}) {
  const { month, setMonth, year, setYear } = useContext(MonthContext);

  function previousMonth() {
    if (month === "01") {
      setMonth("12");
      setYear(year - 1);
    } else {
      setMonth((Number(month) - 1).toString().padStart(2, "0"));
    }
  }
  function nextMonth() {
    if (month === "12") {
      setMonth("01");
      setYear(year + 1);
    } else {
      setMonth((Number(month) + 1).toString().padStart(2, "0"));
    }
  }

  let leftView = (
    <View
      style={[style.sideContainer, { justifyContent: "flex-start" }]}
    ></View>
  );

  let yearNav = (
    <View style={[style.sideContainer, { justifyContent: "flex-end" }]}>
      <Card style={style.monthYearContainer}>
        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
          {year}
        </Text>
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
        styleSheet={style}
      />
      {yearNav}
    </View>
  );
}

const style = StyleSheet.create({
  sideContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  monthYearContainer: {
    minWidth: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
