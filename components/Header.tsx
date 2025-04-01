import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AchievementsDrawer from './AchievementsDrawer';
import { supabase } from '../lib/supabase';
import axios from 'axios';

interface HeaderProps {
  name: string;
  points: number;
}

const Header: React.FC<HeaderProps> = ({ name, points }) => {
  const [showAchievements, setShowAchievements] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // Final image URL (base64) OR the draft avatar ID from DB
  const [userId, setUserId] = useState<string | null>(null); // Authenticated user ID

  // UUID format regex
  const isUUID = (id: string | null): boolean => {
    if (!id) return false;
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  };

  // Fetch authenticated user session and set userId
  useEffect(() => {
    const fetchUserSession = async () => {
      const session = await supabase.auth.getSession();
      const user = session.data?.session?.user;
      console.log('Fetched session:', session);
      if (user) {
        setUserId(user.id);
      } else {
        console.log('No authenticated user');
      }
    };

    fetchUserSession();
  }, []);

  // Fetch avatar URL (avatar token/ID) from Supabase
  useEffect(() => {
    if (!userId) {
      console.log('No userId available yet');
      return;
    }

    if (!isUUID(userId)) {
      console.error('Invalid userId format:', userId);
      return;
    }

    const fetchAvatarUrl = async () => {
      try {
        const { data, error } = await supabase
          .from('avatar')
          .select('url')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching avatar URL:', error);
          return;
        }

        if (data && data.url) {
          console.log('Fetched avatar URL from DB:', data.url);
          setAvatarUrl(data.url); // This URL is the avatar ID/token saved in your DB
        } else {
          console.log('No avatar URL found');
        }
      } catch (error) {
        console.error('Error fetching avatar URL:', error);
      }
    };

    fetchAvatarUrl();
  }, [userId]);

  // Fetch avatar image from ReadyPlayer.me API
  useEffect(() => {
    // Avoid re-fetching if avatarUrl is already a base64 string
    if (!avatarUrl || avatarUrl.startsWith('data:')) {
      console.log('No avatar URL to fetch image or already in base64 format');
      return;
    }

    const fetchAvatarImageFromUrl = async () => {
      try {
        const url = `https://models.readyplayer.me/${avatarUrl}.png`;
        console.log('Fetching avatar image from URL:', url);
        const response = await axios.get(url, {
          responseType: 'blob',
        });
        console.log('Response headers:', response.headers);
        console.log('Response data:', response.data);

        if (response.data instanceof Blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            console.log('Base64 avatar data:', base64data);
            setAvatarUrl(base64data);
          };
          reader.readAsDataURL(response.data);
        } else {
          throw new Error("Response is not a valid Blob.");
        }
      } catch (error) {
        console.error("Error fetching avatar image:", error);
      }
    };

    fetchAvatarImageFromUrl();
  }, [avatarUrl]);

  const openAchievements = () => {
    setShowAchievements(true);
  };

  const closeAchievements = () => {
    setShowAchievements(false);
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <View style={styles.profileImageContainer}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.profileImage} />
            ) : (
              <Ionicons name="person" size={24} color="white" />
            )}
          </View>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>Hey {name}</Text>
              <Text style={styles.waveEmoji}>👋</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={openAchievements} style={styles.pointsContainer}>
          <View style={styles.trophyContainer}>
            <Ionicons name="trophy" size={14} color="white" />
          </View>
          <Text style={styles.pointsText}>{points}</Text>
        </TouchableOpacity>
      </View>
      <AchievementsDrawer
        visible={showAchievements}
        onClose={closeAchievements}
        points={points}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight || 50,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7B61FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeTextContainer: {
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  waveEmoji: {
    fontSize: 16,
    marginLeft: 4,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0EAFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  trophyContainer: {
    marginRight: 8,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default Header;
