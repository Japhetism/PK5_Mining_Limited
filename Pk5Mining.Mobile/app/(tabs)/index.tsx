import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import AppLayout from "../components/AppLayout";
import { getGreeting } from "../../utils/helper";
import { managerRoles, users } from "../../fixtures/user.fixtures";
import {
  overviewData,
  quickActions,
  recentAlerts,
} from "../../fixtures/home.fixtures";
import { OverviewData, QuickActionData } from "../../types/home.types";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 60) / 2;

export default function HomeScreen() {
  const router = useRouter();

  const currentUser = users[0];
  const isManager = managerRoles.includes(currentUser.role);

  return (
    <AppLayout>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greetingText}>{getGreeting()}</Text>
        <Text style={styles.userName}>{currentUser.name}</Text>
        <View style={styles.headerBadgeRow}>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>
              {currentUser.role.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.idText}>{currentUser.employeeId}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Emergency Alert Button */}
        <TouchableOpacity
          style={styles.emergencyButton}
          activeOpacity={0.8}
          onPress={() => {
            /* Handle Alert */
          }}
        >
          <Feather name="shield" color="white" size={28} strokeWidth={2.5} />
          <Text style={styles.emergencyButtonText}>Emergency Alert</Text>
        </TouchableOpacity>

        {/* Overview Cards Grid */}
        <View style={styles.grid}>
          <>
            {overviewData
              .filter((item) => (item.isManager ? isManager : true))
              .map((item: OverviewData) => (
                <OverviewCard
                  key={item.id}
                  icon={
                    <Feather name={item.icon} color={item.bgcolor} size={20} />
                  }
                  label={item.title}
                  count={item.count}
                  color={item.color}
                  bgcolor={item.bgcolor}
                  badge={item.pending}
                />
              ))}
          </>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionGrid}>
          {quickActions.map((item: QuickActionData) => (
            <QuickAction
              key={item.id}
              icon={<Feather name={item.icon} color={item.color} size={24} />}
              label={item.title}
              bgColor={item.bgcolor}
              onPress={() => router.push(item.route)}
            />
          ))}
        </View>

        {/* Recent Notifications Placeholder */}
        <Text style={styles.sectionTitle}>Recent Alerts</Text>
        <View style={styles.notificationGrid}>
          {recentAlerts.map((alert) => (
            <View key={alert.id} style={styles.notificationCard}>
              <View style={[styles.iconBox, { backgroundColor: alert.color }]}>
                <Feather name={alert.icon} color="white" size={16} />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notifTitle}>{alert.title}</Text>
                <Text style={styles.notifSub}>{alert.sub}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </AppLayout>
  );
}

// Reusable Components
const OverviewCard = ({ icon, label, count, color, bgcolor, badge }: any) => (
  <View style={styles.card}>
    <View style={styles.cardTop}>
      <View style={[styles.iconBox, { backgroundColor: color }]}>{icon}</View>
      {badge > 0 && (
        <View style={[styles.countBadge, { backgroundColor: bgcolor }]}>
          <Text style={styles.countBadgeText}>{badge}</Text>
        </View>
      )}
    </View>
    <Text style={styles.cardCount}>{count}</Text>
    <Text style={styles.cardLabel}>{label}</Text>
  </View>
);

const QuickAction = ({ icon, label, bgColor, onPress }: any) => (
  <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
    <View style={[styles.actionIconBox, { backgroundColor: bgColor }]}>
      {icon}
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: { backgroundColor: "#1E1E1E", padding: 24, paddingBottom: 30 },
  greetingText: { color: "#9ca3af", fontSize: 14, marginBottom: 4 },
  userName: { color: "white", fontSize: 24, fontWeight: "bold" },
  headerBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  roleBadge: {
    backgroundColor: "rgba(245, 124, 0, 0.1)",
    borderWidth: 0.5,
    borderColor: "#F57C00",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  roleBadgeText: { color: "#F57C00", fontSize: 10, fontWeight: "bold" },
  idText: { color: "#9ca3af", fontSize: 14 },
  scrollContent: { padding: 20 },
  emergencyButton: {
    backgroundColor: "#dc2626",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 16,
    gap: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 24,
  },
  emergencyButtonText: { color: "white", fontSize: 20, fontWeight: "bold" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "white",
    width: CARD_WIDTH,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  iconBox: { padding: 8, borderRadius: 10 },
  countBadge: {
    backgroundColor: "#2563eb",
    height: 22,
    minWidth: 22,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  countBadgeText: { color: "white", fontSize: 10, fontWeight: "bold" },
  cardCount: {
    fontSize: 22,
    fontWeight: "normal",
    color: "#111827",
    marginTop: 30,
    marginBottom: 20,
  },
  cardLabel: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 24,
    marginBottom: 16,
  },
  quickActionGrid: { flexDirection: "row", gap: 10 },
  actionBtn: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  actionIconBox: { padding: 12, borderRadius: 12 },
  actionLabel: {
    fontSize: 12,
    textAlign: "center",
    color: "#374151",
    fontWeight: "normal",
    marginBottom: 20,
  },
  notificationGrid: { flexDirection: "column", gap: 12, flexWrap: "wrap" },
  notificationCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  notificationContent: { flex: 1, gap: 5 },
  notifTitle: { fontSize: 14, fontWeight: "normal", color: "#111827" },
  notifSub: { fontSize: 12, color: "#6b7280", marginTop: 2 },
});
