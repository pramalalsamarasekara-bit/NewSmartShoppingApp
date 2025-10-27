import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";
import analytics from "@react-native-firebase/analytics";
import AdBanner from '../components/AdBanner';

 export default function App() {
     return <AdMobDemo />;

  return (
    <View style={styles.container}>
      <Slot />
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
