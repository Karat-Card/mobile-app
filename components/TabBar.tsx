// TabBar.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

const TabBar = ({ onLogout, onProfileClick }: { onLogout: () => void, onProfileClick: () => void }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout(); // Callback to update authentication state
  };

  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabItem}>
        <View style={styles.activeTab}>
          <Feather name="home" size={20} color="#8065E0" />
        </View>
        <Text style={styles.activeTabLabel}>Home</Text>
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
      
      {/* Profile Button - Logs Out */}
      <TouchableOpacity style={styles.tabItem} onPress={onProfileClick}>
        <View style={styles.tabIconContainer}>
          <Feather name="user" size={20} color="#AAAAAA" />
        </View>
        <Text style={styles.tabLabel}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default TabBar;
