import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthNavigator from './components/AuthNavigator';
import HomeScreen from './Homescreen';
import OnboardingScreen from './components/OnboardingScreen'; 
import { supabase } from './lib/supabase';

export default function App() {
  const [user, setUser] = useState(null);
  const [onboarded, setOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkOnboardingStatus = async (userId) => {
    if (!userId) return;

    console.log("Checking onboarding status for user:", userId);
    const { data, error } = await supabase
      .from('avatar')
      .select('url')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error checking avatar:', error.message);
      setOnboarded(false);
      return;
    }

    if (data?.url) {
      console.log("Onboarding complete. Avatar exists.");
      setOnboarded(true);
    } else {
      console.log("Onboarding incomplete. No avatar found.");
      setOnboarded(false);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      console.log("Checking user session...");
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        console.log("User logged in:", session.user.id);
        await checkOnboardingStatus(session.user.id);
      } else {
        console.log("No user session found.");
      }

      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      setUser(session?.user ?? null);

      if (session?.user) {
        await checkOnboardingStatus(session.user.id); // 🔥 Re-check onboarding status on auth change
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  if (loading) {
    console.log("App is loading...");
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (user && !onboarded) {
    console.log("Navigating to OnboardingScreen...");
    return <OnboardingScreen onCompleteOnboarding={() => checkOnboardingStatus(user.id)} />;
  }

  if (user && onboarded) {
    console.log('User is logged in and onboarding is completed. Showing HomeScreen.');
    return <HomeScreen onLogout={() => { 
      setUser(null); 
      setOnboarded(false); 
    }} />;
  }

  console.log("Navigating to AuthNavigator...");
  return <AuthNavigator onAuthSuccess={() => setUser(true)} />;
}
