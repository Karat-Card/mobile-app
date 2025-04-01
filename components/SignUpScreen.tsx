import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // Check for authentication status
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        navigation.replace("Onboarding"); // Redirect to onboarding
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        navigation.replace("Onboarding");
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  async function handleSignUp() {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return Alert.alert('Error', error.message);

    // If email confirmation is required, notify the user
    if (!data.session) {
      Alert.alert('Success', 'Please check your email to confirm your account.');
    } else {
      setUser(data.session.user);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text onPress={() => navigation.navigate('SignIn')} style={styles.link}>
        Already have an account? Sign In
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  link: { color: 'blue', marginTop: 10, textAlign: 'center' },
});
