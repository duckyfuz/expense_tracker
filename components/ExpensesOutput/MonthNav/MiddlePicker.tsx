import { View } from "react-native";
import { IconButton, Card, Text } from "react-native-paper";

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

const MiddlePicker = ({
  previousMonth,
  nextMonth,
  month,
  styleSheet,
}: {
  previousMonth: Function;
  nextMonth: Function;
  month: string;
  styleSheet: any;
}) => {
  const Direction = ({ back }: { back: boolean }) => {
    const icon = back
      ? "arrow-left-drop-circle-outline"
      : "arrow-right-drop-circle-outline";
    const navDir = back ? previousMonth : nextMonth;
    return (
      <IconButton
        icon={icon}
        size={24}
        onPress={() => navDir()}
        style={{ margin: -10 }}
      />
    );
  };

  return (
    <View style={[styleSheet.sideContainer, { justifyContent: "center" }]}>
      <Direction back={true} />
      <Card style={{ margin: 6, paddingHorizontal: 12, paddingVertical: 6 }}>
        <View
          style={{
            minWidth: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            {monthList[Number(month) - 1]}
          </Text>
        </View>
      </Card>
      <Direction back={false} />
    </View>
  );
};

export default MiddlePicker;
