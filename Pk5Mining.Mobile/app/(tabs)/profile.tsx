import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState, ReactNode } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLayout from "../components/AppLayout";

interface User {
  id: string;
  name: string;
  employeeId: string;
  role: "worker" | "supervisor" | "admin";
}

interface ContactItemProps {
  icon: ReactNode;
  bgColor: string;
  label: string;
  value: string;
  isLast?: boolean;
}

interface SettingRowProps {
  label: string;
  subLabel: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
  borderTop?: boolean;
}

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  onPress: () => void;
  borderTop?: boolean;
}

// --- Main Component ---

export default function ProfileScreen() {
  // Mocking the user data - in a real app, this comes from your Store/Context
  const currentUser: User = {
    name: "John Doe",
    employeeId: "PK5-9921",
    role: "admin",
    id: "123",
  };

  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(true);
  const [safetyAlertsEnabled, setSafetyAlertsEnabled] = useState<boolean>(true);
  const [taskAlertsEnabled, setTaskAlertsEnabled] = useState<boolean>(true);

  const handleLogoutPress = (): void => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => console.log("Logout"),
      },
    ]);
  };

  return (
    <AppLayout>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons
              name="person-circle"
              size={80}
              color="rgba(255,255,255,0.6)"
            />
          </View>
          <Text style={styles.userName}>{currentUser.name}</Text>
          <Text style={styles.userId}>{currentUser.employeeId}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {currentUser.role.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Contact Information */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Contact Information</Text>

            <ContactItem
              icon={<Ionicons name="mail-outline" size={20} color="#2563eb" />}
              bgColor="#dbeafe"
              label="Email"
              value={`${currentUser.name.toLowerCase().replace(" ", ".")}@pk5mining.com`}
            />
            <ContactItem
              icon={<Feather name="phone" size={20} color="#16a34a" />}
              bgColor="#dcfce7"
              label="Phone"
              value={`+1 (555) 000-${currentUser.id.padStart(4, "0")}`}
            />
            <ContactItem
              icon={<Feather name="map-pin" size={20} color="#9333ea" />}
              bgColor="#f3e8ff"
              label="Location"
              value="PK5 Mining Site - Main Complex"
              isLast
            />
          </View>

          {/* Notification Settings */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Feather name="bell" size={20} color="#F57C00" />
              <Text style={styles.cardTitleInline}>
                Notification Preferences
              </Text>
            </View>

            <SettingRow
              label="All Notifications"
              subLabel="Enable or disable all notifications"
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
            <SettingRow
              label="Safety Alerts"
              subLabel="Critical safety notifications"
              value={safetyAlertsEnabled}
              onValueChange={setSafetyAlertsEnabled}
              disabled={!notificationsEnabled}
              borderTop
            />
            <SettingRow
              label="Task Updates"
              subLabel="New tasks and assignments"
              value={taskAlertsEnabled}
              onValueChange={setTaskAlertsEnabled}
              disabled={!notificationsEnabled}
            />
          </View>

          {/* Account Actions */}
          <View style={[styles.card, { padding: 8 }]}>
            <ActionButton
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#4b5563"
                />
              }
              label="Change Password"
              onPress={() => Alert.alert("Notice", "Feature coming soon")}
            />
            {currentUser.role === "admin" && (
              <ActionButton
                icon={
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={20}
                    color="#4b5563"
                  />
                }
                label="Admin Settings"
                onPress={() =>
                  Alert.alert("Notice", "Admin settings coming soon")
                }
                borderTop
              />
            )}
          </View>

          <View style={styles.cardVersion}>
            <Text style={styles.mainText}>PK5 Mining Worker Management</Text>
            <Text style={styles.subText}>Version 1.0.0</Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogoutPress}
          >
            <Ionicons
              name="log-out-outline"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppLayout>
  );
}

// --- Typed Helper Components ---

const ContactItem = ({
  icon,
  bgColor,
  label,
  value,
  isLast = false,
}: ContactItemProps) => (
  <View style={[styles.contactItem, !isLast && styles.mb4]}>
    <View style={[styles.iconBox, { backgroundColor: bgColor }]}>{icon}</View>
    <View>
      <Text style={styles.contactLabel}>{label}</Text>
      <Text style={styles.contactValue}>{value}</Text>
    </View>
  </View>
);

const SettingRow = ({
  label,
  subLabel,
  value,
  onValueChange,
  disabled,
  borderTop,
}: SettingRowProps) => (
  <View style={[styles.settingRow, borderTop && styles.borderTop]}>
    <View style={{ flex: 1 }}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Text style={styles.settingSubLabel}>{subLabel}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: "#e5e7eb", true: "#F57C00" }}
    />
  </View>
);

const ActionButton = ({
  icon,
  label,
  onPress,
  borderTop,
}: ActionButtonProps) => (
  <TouchableOpacity
    style={[styles.actionBtn, borderTop && styles.borderTopAction]}
    onPress={onPress}
  >
    <View style={styles.row}>
      {icon}
      <Text style={styles.actionBtnText}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward-outline" size={20} color="#9ca3af" />
  </TouchableOpacity>
);

// --- Styles ---

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  scrollContent: { paddingBottom: 40 },
  header: {
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 48,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  userId: { fontSize: 16, color: "#d1d5db", marginBottom: 12 },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#F57C00",
    backgroundColor: "rgba(245, 124, 0, 0.2)",
  },
  badgeText: { color: "#F57C00", fontSize: 12, fontWeight: "bold" },
  body: { paddingHorizontal: 20, marginTop: -24 },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 16,
    color: "#111827",
  },
  cardTitleInline: { fontSize: 15, fontWeight: "600", color: "#111827" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  contactItem: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBox: { padding: 8, borderRadius: 8 },
  contactLabel: { fontSize: 12, color: "#6b7280", marginBottom: 2 },
  contactValue: { fontSize: 14, color: "#1f2937" },
  mb4: { marginBottom: 16 },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  settingLabel: { fontSize: 14, color: "#111827" },
  settingSubLabel: { fontSize: 11, color: "#6b7280" },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    marginTop: 8,
    paddingTop: 16,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  actionBtnText: { fontSize: 14, color: "#374151" },
  borderTopAction: {
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: "#dc2626",
    height: 56,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  logoutText: { color: "white", fontSize: 16, fontWeight: "600" },
  cardVersion: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center", // text-center
    justifyContent: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 2,
    marginVertical: 10,
    height: 130,
  },
  mainText: {
    fontSize: 14, // text-sm
    color: "#4B5563", // text-gray-600
    marginBottom: 8, // mb-2
  },
  subText: {
    fontSize: 12, // text-xs
    color: "#6B7280", // text-gray-500
  },
});
