import { StyleSheet, Text, TextProps } from "react-native";

interface SectionTitleProps extends TextProps {
  children: React.ReactNode;
}

export function SectionTitle({ children, style, ...props }: SectionTitleProps) {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#D32F2F",
    marginBottom: 20,
  },
});
