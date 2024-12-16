import { router, Stack } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/authContext";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(public)" options={{ headerShown: false }} />
        <Stack.Screen name="(private)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
