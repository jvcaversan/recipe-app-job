import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecipeDetails() {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <View style={styles.backButton}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButtonContent}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: -12,
    marginBottom: 15,
  },
  backButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 20,
    marginLeft: 2,
    color: "black",
    fontWeight: "bold",
  },
});
