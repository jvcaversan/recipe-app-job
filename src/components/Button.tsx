import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  icon?: keyof typeof AntDesign.glyphMap;
  iconSize?: number;
  iconColor?: string;
}

export function Button({
  onPress,
  title,
  icon,
  iconSize = 16,
  iconColor = "white",
  style,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      {...rest}
    >
      {icon && <AntDesign name={icon} size={iconSize} color={iconColor} />}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});
