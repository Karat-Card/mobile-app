import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, ScrollView, Button, Text, TouchableOpacity } from 'react-native';
import Header from './components/Header';
import MainContent from './components/MainContent';
import CheckInsSection from './components/CheckInsSection';
import { supabase } from './lib/supabase';
import { Feather } from '@expo/vector-icons';
import ProfileScreen from './components/ProfileScreen';


export default function HomeScreen({ onLogout }) {
  const [email, setEmail] = useState('');
  const [activeScreen, setActiveScreen] = useState('home'); // 'home' or 'profile'

  useEffect(() => {
    async function fetchUserEmail() {
      const { data: session, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session", error);
        return;
      }
      if (session?.user?.email) {
        setEmail(session.user.email);
      }
    }
    fetchUserEmail();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    onLogout();
  }

  return (
    <>
      <Header name={email || "Katherine"} points={242} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollView style={styles.content}>
          {activeScreen === 'home' ? (
            <>
              <MainContent />
              <CheckInsSection />
            </>
          ) : (
            <ProfileScreen onLogout={handleLogout} />
          )}
        </ScrollView>
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveScreen('home')}>
            <View style={activeScreen === 'home' ? styles.activeTab : styles.tabIconContainer}>
              <Feather name="home" size={20} color={activeScreen === 'home' ? "#8065E0" : "#AAAAAA"} />
            </View>
            <Text style={activeScreen === 'home' ? styles.activeTabLabel : styles.tabLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem}>
            <View style={styles.tabIconContainer}>
              <Feather name="briefcase" size={20} color="#AAAAAA" />
            </View>
            <Text style={styles.tabLabel}>Settlement</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem}>
            <View style={styles.tabIconContainer}>
              <Feather name="gift" size={20} color="#AAAAAA" />
            </View>
            <Text style={styles.tabLabel}>Redeem</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveScreen('profile')}>
            <View style={activeScreen === 'profile' ? styles.activeTab : styles.tabIconContainer}>
              <Feather name="user" size={20} color={activeScreen === 'profile' ? "#8065E0" : "#AAAAAA"} />
            </View>
            <Text style={activeScreen === 'profile' ? styles.activeTabLabel : styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0E6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  tabIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: '#999999',
  },
  activeTabLabel: {
    fontSize: 12,
    color: '#8065E0',
    fontWeight: '500',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 20,
    marginBottom: 20,
  },
});
