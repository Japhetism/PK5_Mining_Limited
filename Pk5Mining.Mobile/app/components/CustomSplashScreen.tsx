import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the native splash from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function CustomSplashScreen({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // 1. Start your custom animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Hide the NATIVE splash screen now that our custom one is visible
    const prepare = async () => {
      await SplashScreen.hideAsync();
      
      // 3. Wait for 2-3 seconds, then tell the app to continue
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => onFinish());
      }, 2500);
    };

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Your hex code
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});