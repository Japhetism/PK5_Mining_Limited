import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router"; // Or useNavigation from @react-navigation/native
import { Feather } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import AppLayout from "../components/AppLayout";

// --- Types ---
type ComplaintType = "safety" | "equipment" | "workplace" | "other";

interface Complaint {
  id: string;
  type: ComplaintType;
  title: string;
  description: string;
  location: string;
  status: "submitted" | "in-review" | "resolved";
  createdAt: string;
  updatedAt: string;
  reportedBy: string;
}

const dropdownData = [
  { label: "⚠️ Safety Concern", value: "safety" },
  { label: "🔧 Equipment Issue", value: "equipment" },
  { label: "🏢 Workplace Condition", value: "workplace" },
  { label: "📝 Other", value: "other" },
];

export default function ReportScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"new" | "my-reports">("new");

  // Form state
  const [issueType, setIssueType] = useState<ComplaintType>("safety");
  const [isFocus, setIsFocus] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  // Mock Data
  const currentUser = { id: "u1" };
  const complaints: Complaint[] = []; // In a real app, fetch from store
  const userComplaints = complaints.filter(
    (c) => c.reportedBy === currentUser.id,
  );

  const handleSubmit = () => {
    if (!title || !description || !location) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }
    Alert.alert("Success", "Report submitted successfully!");
    setTitle("");
    setDescription("");
    setLocation("");
    setActiveTab("my-reports");
  };

  const handleUploadImage = () => {
    Alert.alert("Camera", "In a real app, this would open expo-image-picker");
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "submitted":
        return { bg: "#dbeafe", text: "#1d4ed8" };
      case "in-review":
        return { bg: "#ffedd5", text: "#c2410c" };
      case "resolved":
        return { bg: "#dcfce7", text: "#15803d" };
      default:
        return { bg: "#f3f4f6", text: "#374151" };
    }
  };

  const getTypeIcon = (type: ComplaintType) => {
    switch (type) {
      case "safety":
        return "⚠️";
      case "equipment":
        return "🔧";
      case "workplace":
        return "🏢";
      default:
        return "📝";
    }
  };

  return (
    <AppLayout>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="chevron-left" color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Issue</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Custom Tabs */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "new" && styles.activeTab]}
            onPress={() => setActiveTab("new")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "new" && styles.activeTabText,
              ]}
            >
              New Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "my-reports" && styles.activeTab]}
            onPress={() => setActiveTab("my-reports")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "my-reports" && styles.activeTabText,
              ]}
            >
              My Reports ({userComplaints.length})
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {activeTab === "new" ? (
            <View style={styles.formContainer}>
              <View style={styles.card}>
                <Text style={styles.label}>Issue Type *</Text>
                {/* Simplified Type Picker for Mobile */}
                {/* <View style={styles.typePicker}>
                  {(
                    [
                      "safety",
                      "equipment",
                      "workplace",
                      "other",
                    ] as ComplaintType[]
                  ).map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeOption,
                        issueType === type && styles.typeOptionSelected,
                      ]}
                      onPress={() => setIssueType(type)}
                    >
                      <Text style={styles.typeIcon}>{getTypeIcon(type)}</Text>
                      <Text
                        style={[
                          styles.typeText,
                          issueType === type && styles.typeTextSelected,
                        ]}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View> */}
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && { borderColor: "#F57C00" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={dropdownData}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select issue type" : "..."}
                  value={issueType}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setIssueType(item.value);
                    setIsFocus(false);
                  }}
                />
                <Text style={styles.label}>Title *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Brief description"
                  value={title}
                  onChangeText={setTitle}
                />

                <Text style={styles.label}>Location *</Text>
                <View style={styles.inputWithIcon}>
                  <Feather
                    name="map-pin"
                    size={18}
                    color="#9ca3af"
                    style={styles.leftIcon}
                  />
                  <TextInput
                    style={[styles.input, { paddingLeft: 40 }]}
                    placeholder="e.g., Tunnel B - Section 4"
                    value={location}
                    onChangeText={setLocation}
                  />
                </View>

                <Text style={styles.label}>Description *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Provide detailed information..."
                  multiline
                  numberOfLines={4}
                  value={description}
                  onChangeText={setDescription}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity style={styles.card} onPress={handleUploadImage}>
                <Text style={styles.label}>
                  Upload Photos/Videos (Optional)
                </Text>
                <View style={styles.uploadBox}>
                  <Feather name="camera" size={32} color="#9ca3af" />
                  <Text style={styles.uploadMainText}>
                    Take Photo or Upload
                  </Text>
                  <Text style={styles.uploadSubText}>
                    Help us understand the issue
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Submit Report</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.listContainer}>
              {userComplaints.length === 0 ? (
                <View style={[styles.card, styles.emptyCard]}>
                  <Feather name="alert-circle" size={48} color="#9ca3af" />
                  <Text style={styles.emptyTitle}>
                    No reports submitted yet
                  </Text>
                  <Text style={styles.emptySub}>
                    Your safety reports will appear here
                  </Text>
                </View>
              ) : (
                userComplaints.map((complaint) => {
                  const status = getStatusStyles(complaint.status);
                  return (
                    <View key={complaint.id} style={styles.card}>
                      <View style={styles.cardHeader}>
                        <Text style={styles.typeIconLarge}>
                          {getTypeIcon(complaint.type)}
                        </Text>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                          <Text style={styles.complaintTitle}>
                            {complaint.title}
                          </Text>
                          <Text style={styles.complaintDesc} numberOfLines={2}>
                            {complaint.description}
                          </Text>
                        </View>
                        <View
                          style={[styles.badge, { backgroundColor: status.bg }]}
                        >
                          <Text
                            style={[styles.badgeText, { color: status.text }]}
                          >
                            {complaint.status.toUpperCase()}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.cardFooter}>
                        <View style={styles.footerRow}>
                          <Feather name="map-pin" size={14} color="#9ca3af" />
                          <Text style={styles.footerText}>
                            {complaint.location}
                          </Text>
                        </View>
                        <View style={styles.footerRow}>
                          <Feather name="clock" size={14} color="#9ca3af" />
                          <Text style={styles.footerText}>
                            Submitted{" "}
                            {new Date(complaint.createdAt).toLocaleDateString()}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E1E1E" },
  header: {
    backgroundColor: "#1E1E1E",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: { padding: 8, marginRight: 8 },
  headerTitle: { color: "white", fontSize: 20, fontWeight: "600" },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center" },
  activeTab: { backgroundColor: "#F57C00" },
  tabText: { color: "#4b5563", fontWeight: "500" },
  activeTabText: { color: "white" },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 32 },
  formContainer: { gap: 16 },
  listContainer: { gap: 12 },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  label: { fontSize: 14, fontWeight: "500", color: "#374151", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: { height: 120, paddingTop: 12 },
  inputWithIcon: { position: "relative" },
  leftIcon: { position: "absolute", left: 12, top: 15, zIndex: 1 },
  typePicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  typeOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  typeOptionSelected: { borderColor: "#F57C00", backgroundColor: "#fff7ed" },
  typeIcon: { marginRight: 4 },
  typeText: { fontSize: 13, color: "#4b5563" },
  typeTextSelected: { color: "#F57C00", fontWeight: "600" },
  uploadBox: {
    height: 120,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#d1d5db",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  uploadMainText: { color: "#4b5563", marginTop: 8 },
  uploadSubText: { color: "#9ca3af", fontSize: 12 },
  submitButton: {
    backgroundColor: "#F57C00",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: { color: "white", fontSize: 18, fontWeight: "600" },
  emptyCard: { alignItems: "center", paddingVertical: 40 },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginTop: 12,
  },
  emptySub: { color: "#6b7280", fontSize: 14 },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  typeIconLarge: { fontSize: 28 },
  complaintTitle: { fontSize: 16, fontWeight: "600", color: "#111827" },
  complaintDesc: { color: "#6b7280", fontSize: 14, marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  badgeText: { fontSize: 10, fontWeight: "700" },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 12,
    gap: 4,
  },
  footerRow: { flexDirection: "row", alignItems: "center" },
  footerText: { color: "#6b7280", fontSize: 12, marginLeft: 8 },
  dropdown: {
    height: 50,
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#9ca3af",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#111827",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
