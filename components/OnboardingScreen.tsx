import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, FlatList, StyleSheet, Image } from 'react-native';
import { createAnonymousUser, fetchAvatarTemplates, createDraftAvatar } from '../lib/ReadyPlayerMeService';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen({ navigation, onCompleteOnboarding }) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function initializeUser() {
      try {
        // Fetch session from Supabase
        const { data: session, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session.session) {
          Alert.alert('Error', 'User not authenticated');
          navigation.replace('SignIn'); // Redirect to SignIn if no active session
          return;
        }
        setUserId(session.session.user.id);

        // Create an anonymous user
        const user = await createAnonymousUser();
        if (!user?.data?.token) throw new Error('Failed to generate token');
        
        setToken(user.data.token);

        // Fetch avatar templates
        const fetchedTemplates = await fetchAvatarTemplates(user.data.token);
        if (!Array.isArray(fetchedTemplates)) throw new Error('Invalid templates response');

        setTemplates(fetchedTemplates);
      } catch (error) {
        console.error('Error during onboarding:', error);
        Alert.alert('Error', error.message || 'Failed to initialize onboarding.');
      } finally {
        setLoading(false);
      }
    }

    initializeUser();
  }, []);

  async function handleCreateAvatar() {
    if (!selectedTemplate) return Alert.alert('Error', 'Please select a template.');
    if (!userId) return Alert.alert('Error', 'User ID not found.');
    if (!token) return Alert.alert('Error', 'Authentication token missing.');

    setLoading(true);
    try {
      // Create the avatar
      const avatar = await createDraftAvatar(selectedTemplate.id, token);
      if (!avatar?.data?.id) throw new Error('Failed to retrieve avatar ID');
      
      // Log the avatar ID for debugging purposes
      console.log('Draft Avatar Created, Avatar ID:', avatar.data.id);

      const avatarId = avatar.data.id; // Assuming avatar.data.id is the avatar ID

      // Save the avatar permanently with the PUT request
      const response = await fetch(`https://api.readyplayer.me/v2/avatars/${avatarId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // Add the Authorization header with token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to save avatar permanently');
      }

      // Log the successful avatar saving
      console.log('Avatar permanently saved with ID:', avatarId);

      // Store the avatar ID in Supabase
      const { error: insertError } = await supabase.from('avatar').insert([
        { id: userId, url: avatarId } // Store avatar ID or token instead of the URL
      ]);

      if (insertError) throw insertError;

      Alert.alert('Success', 'Avatar saved permanently!');
      onCompleteOnboarding(); // Proceed with the onboarding completion process
    } catch (error) {
      console.error('Error creating avatar:', error);
      Alert.alert('Error', error.message || 'Failed to create avatar.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Avatar Template</Text>
      <FlatList
        data={templates}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.templateItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.avatarImage} />
            <Button
              title={item.gender}
              onPress={() => setSelectedTemplate(item)}
              color={selectedTemplate?.id === item.id ? 'green' : 'blue'}
            />
          </View>
        )}
      />
      <Button title="Create Avatar" onPress={handleCreateAvatar} disabled={!selectedTemplate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  loader: { flex: 1, justifyContent: 'center' },
  templateItem: { alignItems: 'center', marginBottom: 20 },
  avatarImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
});
