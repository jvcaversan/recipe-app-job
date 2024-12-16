import { Redirect, router } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../contexts/authContext";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Index() {
  const { setAuth } = useAuth();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth(session.user);
        router.replace("/(private)/(tabs)/recipes");
        return;
      }

      setAuth(null);
      router.replace("/(public)/signin");
    });
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={44} color="green" />
    </View>
  );
}
