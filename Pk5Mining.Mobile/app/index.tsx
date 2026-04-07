import { Redirect } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Index() {
  // Logic: If not authenticated, redirect to login immediately.
  // In a real app, you'd check a global state or token here.
  const isAuthenticated = false; 

  if (!isAuthenticated) {
    // replace ensures the user can't "Go Back" to this empty index screen
    return <Redirect href="/login" />;
  }

  // This part only renders if authenticated (e.g., redirecting to home/tabs)
  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});