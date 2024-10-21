import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Ensure the environment variables are defined, or throw an error
// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseUrl = "https://ebumsucnzhxdkclkisam.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidW1zdWNuemh4ZGtjbGtpc2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzOTk0OTIsImV4cCI6MjA0NDk3NTQ5Mn0.a7xl2T-nzuqhX8uqp0FzUlEH3rkM5qsMln-lZ2h5ju8";
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase URL or Anonymous Key in environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
