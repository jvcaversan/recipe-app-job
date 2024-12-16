import { router, Stack } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/authContext";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import QueryProvider from "../contexts/QueryProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(public)" options={{ headerShown: false }} />
          <Stack.Screen name="(private)" options={{ headerShown: false }} />
        </Stack>
      </QueryProvider>
    </AuthProvider>
  );
}
