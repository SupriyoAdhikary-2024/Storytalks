import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://rqyrsflkedlkulddsimc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxeXJzZmxrZWRsa3VsZGRzaW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NTM4ODUsImV4cCI6MjA5NzMyOTg4NX0.MnKN_Em4INRR_TMely2claIjmHq3qYieQUyzOvyO2sA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});