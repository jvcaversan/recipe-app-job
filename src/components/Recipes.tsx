import { Text, Image, Pressable } from "react-native";

type Props = {
  data: {
    image: string;
    name: string;
    preptime: string;
  };
  onPress: () => void;
};

export function RecipesList({ data, ...rest }: Props) {
  return (
    <Pressable
      style={{
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        margin: 8,
      }}
      {...rest}
    >
      <Image
        source={{ uri: data.image }}
        style={{ width: 150, height: 150, borderRadius: 15 }}
      />
      <Text>{data.name}</Text>
    </Pressable>
  );
}
