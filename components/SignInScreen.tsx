import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';

export default function SignInScreen({ navigation, onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return Alert.alert('Error', error.message);
    onAuthSuccess();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
  style={styles.input}
  placeholder="Email"
  autoCapitalize="none"  // Prevents automatic capitalization
  keyboardType="email-address" // Improves keyboard for email input
  onChangeText={setEmail}
/>

      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Sign In" onPress={handleSignIn} />
      <Text onPress={() => navigation.navigate('SignUp')} style={styles.link}>
        Don't have an account? Sign Up
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
