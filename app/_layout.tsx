// app/_layout.tsx
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { LanguageProvider } from '../contexts/LanguageContext';
//import mobileAds from 'react-native-google-mobile-ads';

export default function RootLayout() {
  useEffect(() => {
    // Initialize Google Mobile Ads SDK
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('✅ AdMob SDK initialized successfully');
        console.log('Adapter statuses:', adapterStatuses);
      })
      .catch(error => {
        console.error('❌ AdMob initialization failed:', error);
      });
  }, []);

  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LanguageProvider>
  );
}