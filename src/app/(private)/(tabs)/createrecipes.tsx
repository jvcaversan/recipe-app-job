import { Button } from "@/src/components/Button";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { useCreateRecipe } from "@/src/api/createRecipe";

export default function CreateRecipe() {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [recipeName, setRecipeName] = useState<string>("");
  const [prepTime, setPrepTime] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [steps, setSteps] = useState<string>("");

  const { mutate: createRecipe, error } = useCreateRecipe();

  const removeIngredient = () => {
    setIngredients("");
  };

  const removeStep = (index: number) => {
    setSteps("");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("Você não selecionou uma imagem");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.backButton}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButtonContent}
          >
            <Ionicons name="arrow-back" size={30} color="black" />
            <Text style={styles.backButtonText}>Voltar</Text>
          </Pressable>
        </View>
        <View style={styles.imageContainer}>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
            />
          )}
          <Button title="Escolha uma foto" onPress={pickImage} />
        </View>
        <Text style={styles.label}>Nome da Receita:</Text>
        <TextInput
          style={styles.input}
          value={recipeName}
          onChangeText={setRecipeName}
          placeholder="Digite o nome da receita"
        />

        <Text style={styles.label}>Tempo de Preparo:</Text>
        <TextInput
          style={styles.input}
          value={prepTime}
          onChangeText={setPrepTime}
          placeholder="Tempo em minutos"
        />

        <Text style={styles.label}>Ingredientes:</Text>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flexInput]}
            value={ingredients}
            onChangeText={setIngredients}
            placeholder={"Ingredientes"}
          />

          <TouchableOpacity
            onPress={() => removeIngredient}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Passo a Passo:</Text>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flexInput]}
            value={steps}
            onChangeText={setSteps}
            placeholder={"Descrição da Receita"}
          />
          <TouchableOpacity
            onPress={() => removeStep}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.saveButton}>
          <Button
            title="Salvar Receita"
            style={{
              width: "auto",
              alignSelf: "center",
            }}
            onPress={() => console.log("uepa")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollContent: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    height: 50, // Altura fixa para uniformidade
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  flexInput: {
    flex: 1,
    height: 150,
  },
  removeButton: {
    marginLeft: 8,
    backgroundColor: "#ff6b6b",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
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
  saveButton: {
    marginTop: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  selectedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});
