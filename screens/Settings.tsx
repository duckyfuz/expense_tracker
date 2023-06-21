import { useState, useContext } from "react";
import { View } from "react-native";
import { Switch } from "react-native-paper";
import { LightContext } from "../store/light-context";

const Settings = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    setLight(!light);
  };
  const { light, setLight } = useContext(LightContext);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
    </View>
  );
};

export default Settings;
