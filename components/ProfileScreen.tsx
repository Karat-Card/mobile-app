import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, FlatList, StyleSheet, Image } from 'react-native';
import { createAnonymousUser, fetchAssets, equipAssetToAvatar } from '../lib/ReadyPlayerMeService';
import { supabase } from '../lib/supabase';

interface ProfileScreenProps {
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const applicationId = '677f15ded5e3587b0437c82b'; // Set your application ID here

  useEffect(() => {
    async function initializeUser() {
      try {
        // Fetch session from Supabase
        const { data: session, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session.session) {
          Alert.alert('Error', 'User not authenticated');
          return; // You can navigate to a login screen if needed
        }
        const supabaseUserId = session.session.user.id;
        console.log('Fetched Supabase User ID:', supabaseUserId);  // Debug: Check Supabase User ID

        setUserId(supabaseUserId);

        // Fetch the API userId (avatar ID) from the 'avatar' table using Supabase user ID
        const { data, error } = await supabase
          .from('avatar')
          .select('url')
          .eq('id', supabaseUserId)
          .single();
        
        if (error) {
          console.error('Error fetching avatar URL:', error);
          return;
        }

        if (data && data.url) {
          const apiUserId = data.url;  // Assuming 'url' contains the API userId (avatar token)
          console.log('Fetched API User ID (from avatar URL):', apiUserId);  // Debug: Check API User ID
          setUserId(apiUserId);  // Update userId state with API userId
        } else {
          console.log('No avatar URL found in database');
        }

        // Fetch authentication token
        const user = await createAnonymousUser();
        if (!user?.data?.token) throw new Error('Failed to generate token');
        setToken(user.data.token);
        
      } catch (error) {
        console.error('Error initializing profile:', error);
        Alert.alert('Error', error.message || 'Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    }

    initializeUser();
  }, []);

  // Fetch assets when the userId and token are set
  useEffect(() => {
    if (userId && token) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const fetchedAssets = await fetchAssets(token, userId, applicationId);
          if (!Array.isArray(fetchedAssets)) throw new Error('Invalid assets response');
          setAssets(fetchedAssets);
        } catch (error) {
          console.error('Error fetching assets:', error);
          Alert.alert('Error', error.message || 'Failed to fetch assets');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [userId, token]);  // This ensures assets are fetched after userId and token are set

  const handleEquipAsset = async () => {
    if (!selectedAsset || !userId || !token) {
      Alert.alert('Error', 'Please select an asset and ensure you are authenticated.');
      return;
    }

    setLoading(true);
    try {
      // Equip the selected asset to the avatar using the userId and assetId
      console.log('Equipping asset to userId:', userId);  // Debug: Check userId before equipping
      const response = await equipAssetToAvatar(userId, selectedAsset.id, token);
      if (response?.status === 200) {
        Alert.alert('Success', 'Asset equipped successfully!');
      } else {
        throw new Error('Failed to equip asset');
      }
    } catch (error) {
      console.error('Error equipping asset:', error);
      Alert.alert('Error', error.message || 'Failed to equip asset.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Button title="Logout" onPress={onLogout} />
      <Text style={styles.subtitle}>Choose an Asset</Text>

      <FlatList
        data={assets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.assetItem}>
            <Image source={{ uri: item.iconUrl }} style={styles.avatarImage} />
            <Button
              title={item.name}
              onPress={() => setSelectedAsset(item)}
              color={selectedAsset?.id === item.id ? 'green' : 'blue'}
            />
          </View>
        )}
      />

      {selectedAsset && (
        <View style={styles.updateContainer}>
          <Text style={styles.selectedAssetText}>
            Selected Asset: {selectedAsset.name}
          </Text>
          <Button title="Equip Asset" onPress={handleEquipAsset} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 18, marginBottom: 10, textAlign: 'center' },
  loader: { flex: 1, justifyContent: 'center' },
  assetItem: { alignItems: 'center', marginBottom: 20 },
  avatarImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  updateContainer: { marginTop: 20, alignItems: 'center' },
  selectedAssetText: { fontSize: 18, marginBottom: 10 },
});

export default ProfileScreen;
