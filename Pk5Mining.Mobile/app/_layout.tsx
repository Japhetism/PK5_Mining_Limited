import { useState } from "react";
import { Stack } from "expo-router";
import CustomSplashScreen from "./components/CustomSplashScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";

export default function RootLayout() {
  const [isSplashDone, setSplashDone] = useState(false);

  if (!isSplashDone) {
    return <CustomSplashScreen onFinish={() => setSplashDone(true)} />;
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: "#1E1E1E" }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#1E1E1E" },
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}
