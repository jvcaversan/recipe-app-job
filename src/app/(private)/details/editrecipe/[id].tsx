import { Button } from "@/src/components/Button";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";
import { useEditRecipe } from "@/src/api/recipes";
import { supabase } from "@/src/lib/supabase";

export default function EditRecipe() {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [recipeName, setRecipeName] = useState<string>("");
  const [prepTime, setPrepTime] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id: idString } = useLocalSearchParams();
  const id = typeof idString === "string" ? idString : null;

  const { data: updateRecipe, error } = useEditRecipe();

  const onEditRecipe = async () => {
    setIsSubmitting(true);
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError || !sessionData.session) {
      console.error("Usuário não autenticado"),
        sessionError?.message || "Sessão Inexistente";
      return;
    }

    const userId = sessionData.session?.user.id;
    updateRecipe(
      {
        name: recipeName,
        preptime: prepTime,
        ingredients,
        desc,
        image: selectedImage,
        userId,
      },
      {
        onError: (err: any) => {
          console.error("Erro ao editar receita:", err.message);
          Alert.alert(
            "Erro",
            "Não foi possível editar a receita. Tente novamente."
          );
        },
        onSuccess: () => {
          Alert.alert("Sucesso", "Receita editada com sucesso!");
          router.push("/(private)/(tabs)/recipes");
        },
      }
    );
    setIsSubmitting(false);
  };

  const removeIngredient = () => {
    setIngredients(" ");
  };

  const removeStep = () => {
    setDesc(" ");
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
            onPress={removeIngredient}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Passo a Passo:</Text>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flexInput]}
            value={desc}
            onChangeText={setDesc}
            placeholder={"Descrição da Receita"}
          />
          <TouchableOpacity onPress={removeStep} style={styles.removeButton}>
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
            onPress={onEditRecipe}
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

  saveButton: {
    marginTop: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  selectedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});
