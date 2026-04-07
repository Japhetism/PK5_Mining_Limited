import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.section}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E1E1E" },
  section: { flex: 1, backgroundColor: "#f9fafb" },
});
