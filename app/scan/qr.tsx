import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import { BarcodeScanner } from 'expo-camera';  // --- තාවකාලිකව අක්‍රිය කර ඇත ---
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '@/store/cartStore'; 
export default function BarcodeScannerScreen() {
  const { t } = useTranslation();
  // --- Camera වලට අදාළ සියලුම කේත තාවකාලිකව අක්‍රිය කර ඇත ---
  const router = useRouter();
  const { addToCart } = useCartStore();

  return (
    <View style={styles.container}>
      <Text>Camera functionality is temporarily disabled for testing.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});