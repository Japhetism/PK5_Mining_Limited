import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
// import { HardHat, Fingerprint } from 'lucide-react-native';
import { router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import AppLayout from "./components/AppLayout";

export default function LoginScreen() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", employeeId);
    router.replace("/(tabs)");
  };

  const handleBiometricLogin = () => {
    console.log("Triggering Biometrics...");
  };

  return (
    <AppLayout>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Logo and Branding */}
            <View style={styles.headerSection}>
              <View style={styles.iconContainer}>
                <Feather name="hexagon" size={40} color="white" />
              </View>
              <Text style={styles.title}>PK5 Mining</Text>
              <Text style={styles.subtitle}>Worker Management System</Text>
            </View>

            {/* Login Form */}
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Employee ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="PK5-XXX"
                  placeholderTextColor="#666"
                  value={employeeId}
                  onChangeText={setEmployeeId}
                  autoCapitalize="characters"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#666"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>

            {/* Biometric Option */}
            <View style={styles.dividerSection}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              style={styles.biometricButton}
              onPress={handleBiometricLogin}
            >
              <Ionicons name="finger-print" size={24} color="white" />
              <Text style={styles.biometricButtonText}>
                Use Biometric Login
              </Text>
            </TouchableOpacity>

            {/* Role Info */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Demo accounts: Worker • Supervisor • Admin
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#F57C00",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#9E9E9E",
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#2E2E2E",
    borderWidth: 1,
    borderColor: "#424242",
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 16,
    color: "white",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#F57C00",
    height: 56,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  dividerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#424242",
  },
  dividerText: {
    color: "#9E9E9E",
    paddingHorizontal: 10,
    fontSize: 14,
  },
  biometricButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#424242",
    height: 56,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  biometricButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    color: "#757575",
    fontSize: 14,
  },
});
