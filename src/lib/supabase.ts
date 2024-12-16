import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

import { AppState } from "react-native";

const supabaseUrl = "https://drojwzvqobjogpmisvvl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyb2p3enZxb2Jqb2dwbWlzdnZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzNTQ3MzgsImV4cCI6MjA0OTkzMDczOH0.OKTYGInyrkVmjk2zy683G57FBKfiVXKV9QKtS1pEPoY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
