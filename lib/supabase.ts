import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aqimudntqdcknxzdtror.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaW11ZG50cWRja254emR0cm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0OTA1NzYsImV4cCI6MjA1MDA2NjU3Nn0.BQL9oiUdY9JHHnHjHP50y1IG8tt-vGUP38e8wgOXYeU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
