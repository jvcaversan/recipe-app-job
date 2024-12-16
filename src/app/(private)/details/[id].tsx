import { useDeleteRecipe, useRecipe } from "@/src/api/recipes";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, View, StyleSheet, Image, ScrollView } from "react-native";
import { ActivityIndicator, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecipeDetails() {
  const { id: idString } = useLocalSearchParams();
  const id = typeof idString === "string" ? idString : null;

  const { data: recipe, error, isLoading } = useRecipe(String(id));
  const { mutate: deleteRecipe } = useDeleteRecipe();

  const handleDelete = async () => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta receita?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await deleteRecipe(String(id));
              router.push("/recipes");
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Falha ao excluir a receita");
            }
          },
        },
      ]
    );
  };

  if (!id) {
    return <Text style={styles.errorText}>Erro: ID inválido</Text>;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  }

  if (error) {
    console.log(error);
    return <Text style={styles.errorText}>Falha ao buscar receita</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButtonContainer}
        >
          <Ionicons name="arrow-back" size={30} color="#ff6347" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>

        <View style={styles.actionButtons}>
          <Pressable
            onPress={() => router.push(`/details/editrecipe/${recipe.id}`)}
            style={styles.editButtonContainer}
          >
            <Ionicons name="pencil" size={30} color="#ff6347" />
          </Pressable>

          <Pressable
            onPress={handleDelete}
            style={styles.deleteButtonContainer}
          >
            <Ionicons name="trash" size={30} color="#ff6347" />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />

        <Text style={styles.recipeTitle}>{recipe.name}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            ⏱️ Tempo de Preparação: {recipe.preptime}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Ingredientes</Text>
        <Text style={styles.sectionContent}>{recipe.ingredients}</Text>

        <Text style={styles.sectionTitle}>Modo de Preparo</Text>
        <Text style={styles.sectionContent}>{recipe.desc}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  backButtonText: {
    fontSize: 18,
    color: "#ff6347",
    marginLeft: 8,
    fontWeight: "600",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  editButtonContainer: {
    padding: 15,
  },
  deleteButtonContainer: {
    padding: 15,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    padding: 15,
  },
  recipeImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  recipeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 15,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
