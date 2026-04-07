import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AppLayout from '../components/AppLayout';

// --- Types ---
type LeaveStatus = 'pending' | 'approved' | 'rejected';
type LeaveType = 'annual' | 'sick' | 'casual' | 'other';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  appliedAt: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export default function LeaveScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | LeaveStatus>('all');

  // Mocking global state/context
  const currentUser = { id: 'u1', role: 'worker' }; // Change to 'supervisor' to see approver view
  const leaveRequests: LeaveRequest[] = []; // In a real app, fetch from your store

  const canApproveLeave = ['supervisor', 'hod', 'director'].includes(currentUser.role);

  // Logic Helpers
  const filteredRequests = useMemo(() => {
    let requests = leaveRequests;
    if (currentUser.role === 'worker') {
      requests = requests.filter(r => r.employeeId === currentUser.id);
    }
    if (activeTab !== 'all') {
      return requests.filter(r => r.status === activeTab);
    }
    return requests;
  }, [activeTab, leaveRequests]);

  const pendingCount = leaveRequests.filter(r => {
    const isOwner = currentUser.role === 'worker' ? r.employeeId === currentUser.id : true;
    return isOwner && r.status === 'pending';
  }).length;

  const calculateDays = (startStr: string, endStr: string) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <AppLayout>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Leave Management</Text>
            <Text style={styles.headerSub}>
              {canApproveLeave ? 'Review and manage requests' : 'Track your leave requests'}
            </Text>
          </View>
          {pendingCount > 0 && (
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>{pendingCount}</Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Apply Leave Button */}
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => router.push('/leave/apply')}
        >
          <Feather name="plus" color="white" size={24} />
          <Text style={styles.applyButtonText}>Apply for Leave</Text>
        </TouchableOpacity>

        {/* Custom Tabs */}
        <View style={styles.tabContainer}>
          {['all', 'pending', 'approved', 'rejected'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab as any)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
              {tab === 'pending' && pendingCount > 0 && (
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{pendingCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* List Content */}
        {filteredRequests.length === 0 ? (
          <View style={styles.emptyCard}>
            <Feather name="calendar" size={48} color="#d1d5db" />
            <Text style={styles.emptyText}>No leave requests found</Text>
          </View>
        ) : (
          filteredRequests.map((request) => (
            <Pressable 
              key={request.id} 
              style={styles.card}
              onPress={() => router.push(`/leave/${request.id}`)}
            >
              <View style={styles.cardHeader}>
                {canApproveLeave ? (
                  <View>
                    <Text style={styles.empName}>{request.employeeName}</Text>
                    <Text style={styles.empId}>ID: PK5-{request.employeeId.padStart(3, '0')}</Text>
                  </View>
                ) : (
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeBadgeText}>
                      {request.leaveType.toUpperCase()}
                    </Text>
                  </View>
                )}
                <StatusBadge status={request.status} />
              </View>

              {canApproveLeave && (
                <View style={[styles.typeBadge, { alignSelf: 'flex-start', marginBottom: 12 }]}>
                  <Text style={styles.typeBadgeText}>{request.leaveType.toUpperCase()}</Text>
                </View>
              )}

              <View style={styles.dateRow}>
                <Feather name="calendar" size={16} color="#6b7280" />
                <Text style={styles.dateText}>
                  {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                  <Text style={{ color: '#9ca3af' }}> ({calculateDays(request.startDate, request.endDate)} days)</Text>
                </Text>
              </View>

              <Text style={styles.reason} numberOfLines={2}>{request.reason}</Text>

              <View style={styles.appliedRow}>
                <Feather name="clock" size={12} color="#9ca3af" />
                <Text style={styles.appliedText}>Applied: {new Date(request.appliedAt).toLocaleDateString()}</Text>
              </View>

              {request.reviewedAt && (
                <View style={styles.reviewSection}>
                  <Text style={styles.reviewText}>
                    {request.status === 'approved' ? 'Approved' : 'Rejected'} on {new Date(request.reviewedAt).toLocaleDateString()}
                  </Text>
                  {request.reviewNotes && (
                    <Text style={styles.reviewNote}>Note: {request.reviewNotes}</Text>
                  )}
                </View>
              )}
            </Pressable>
          ))
        )}
      </ScrollView>
    </AppLayout>
  );
}

// Sub-component for Status Badge
const StatusBadge = ({ status }: { status: LeaveStatus }) => {
  const config = {
    pending: { color: '#b45309', bg: '#fef3c7', icon: <Feather name="clock" size={12} color="#b45309" /> },
    approved: { color: '#15803d', bg: '#dcfce7', icon: <Feather name="check-circle" size={12} color="#15803d" /> },
    rejected: { color: '#b91c1c', bg: '#fee2e2', icon: <Feather name="x-circle" size={12} color="#b91c1c" /> },
  };

  const { color, bg, icon } = config[status];

  return (
    <View style={[styles.statusBadge, { backgroundColor: bg }]}>
      {icon}
      <Text style={[styles.statusBadgeText, { color }]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { backgroundColor: '#1E1E1E', padding: 24, paddingBottom: 30 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  headerSub: { color: '#9ca3af', fontSize: 14, marginTop: 4 },
  headerBadge: { backgroundColor: '#F57C00', height: 32, minWidth: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8 },
  headerBadgeText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  scrollContent: { padding: 20 },
  applyButton: { 
    backgroundColor: '#F57C00', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 16, 
    borderRadius: 12, 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 24 
  },
  applyButtonText: { color: 'white', fontSize: 18, fontWeight: '600', marginLeft: 12 },
  tabContainer: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb', overflow: 'hidden' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  activeTab: { backgroundColor: '#F57C00' },
  tabText: { color: '#6b7280', fontSize: 12, fontWeight: '500' },
  activeTabText: { color: 'white' },
  countBadge: { backgroundColor: '#F57C00', borderRadius: 10, height: 18, minWidth: 18, marginLeft: 4, justifyContent: 'center', alignItems: 'center' },
  countBadgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginTop: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  empName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  empId: { fontSize: 12, color: '#9ca3af' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  statusBadgeText: { fontSize: 12, fontWeight: '600' },
  typeBadge: { borderWidth: 1, borderColor: '#F57C00', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  typeBadgeText: { color: '#F57C00', fontSize: 10, fontWeight: 'bold' },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  dateText: { fontSize: 14, color: '#4b5563' },
  reason: { fontSize: 14, color: '#6b7280', marginBottom: 12 },
  appliedRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  appliedText: { fontSize: 11, color: '#9ca3af' },
  reviewSection: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  reviewText: { fontSize: 11, color: '#9ca3af' },
  reviewNote: { fontSize: 11, color: '#4b5563', marginTop: 2 },
  emptyCard: { backgroundColor: 'white', padding: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#e5e7eb' },
  emptyText: { color: '#9ca3af', marginTop: 12, fontSize: 14 }
});