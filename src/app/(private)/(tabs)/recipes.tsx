import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SectionTitle } from "../../../components/SectionTitle";
import { useState } from "react";
// import { RecipesList } from "@/src/components/Recipes";
import { router } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/contexts/authContext";

export default function MyRecipes() {
  const [search, setSearch] = useState("");

  const { setAuth } = useAuth();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    setAuth(null);

    if (error) {
      Alert.alert("Error", "Error ao Sair da Aplicação");
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>
            {/* Olá, Chef {user?.firstName}! 👨‍🍳 */}
          </Text>
          <Text style={styles.subtitle}>O que vamos cozinhar hoje?</Text>
        </View>
        <Pressable style={styles.logoutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={24} color="#666" />
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearch}
          placeholder="Digite o nome da receita"
          placeholderTextColor="#999"
        />
      </View>

      <View>
        <SectionTitle>Minhas Receitas</SectionTitle>
      </View>

      {/* <FlatList
          data={recipes}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View>
              <RecipesList
                data={item}
                onPress={() => router.navigate(`/details/${item.id}`)}
              />
            </View>
          )}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
        /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    fontSize: 16,
    color: "#333",
  },
  sectionDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  flatListContainer: {
    alignItems: "center",
  },
});
