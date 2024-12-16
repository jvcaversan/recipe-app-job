import { Link, router } from "expo-router";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { supabase } from "@/src/lib/supabase";

export default function SigIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);

    router.replace("/(private)/(tabs)/recipes");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          loop
          style={styles.lottieAnimation}
          source={require("@/assets/images/cooking.json")}
        />
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Bem-vindo ao CookApp!</Text>
        <Text style={styles.subtitle}>Sua jornada culinária começa aqui</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={email}
          placeholder="Digite seu email"
          placeholderTextColor="#8B8B8B"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Digite sua senha"
          placeholderTextColor="#8B8B8B"
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={signInWithEmail}
        >
          <Text style={styles.buttonText}>
            {loading ? "Carregando" : "Entrar"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Ainda não tem uma conta?</Text>
        <Link href="/(public)/signup" asChild>
          <Pressable>
            <Text style={styles.linkText}>Cadastre-se</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F2",
    padding: 24,
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2C1810",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B4F4F",
    textAlign: "center",
  },
  formContainer: {
    gap: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E8D5C4",
    color: "#2C1810",
  },
  button: {
    backgroundColor: "#FF6B6B",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    gap: 8,
  },
  footerText: {
    color: "#6B4F4F",
    fontSize: 15,
  },
  linkText: {
    color: "#FF6B6B",
    fontSize: 15,
    fontWeight: "600",
  },
  animationContainer: {
    width: "100%",
    height: 220,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  lottieAnimation: {
    width: "100%",
    height: "100%",
  },
});
