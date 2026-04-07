import React, { useState } from 'react';
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
import { Feather, Ionicons } from '@expo/vector-icons';
import AppLayout from '../components/AppLayout';
// --- Types ---
type TaskStatus = 'pending' | 'in-progress' | 'completed';
type Priority = 'high' | 'medium' | 'low';

interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  deadline: string;
  status: TaskStatus;
  priority: Priority;
  assignedTo: string;
}

export default function TasksScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | TaskStatus>('all');

  // Mock Data (Replace with your actual data source/context)
  const currentUser = { id: 'u1' };
  const tasks: Task[] = []; 
  
  const userTasks = tasks.filter(t => t.assignedTo === currentUser.id);
  const filteredTasks = filter === 'all' 
    ? userTasks 
    : userTasks.filter(t => t.status === filter);

  // Helper Functions for Styling
  const getStatusStyles = (status: TaskStatus) => {
    switch (status) {
      case 'pending': return { bg: '#fef3c7', text: '#b45309' };
      case 'in-progress': return { bg: '#dbeafe', text: '#1d4ed8' };
      case 'completed': return { bg: '#dcfce7', text: '#15803d' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const getPriorityStyles = (priority: Priority) => {
    switch (priority) {
      case 'high': return { bg: '#fee2e2', text: '#b91c1c', border: '#fecaca' };
      case 'medium': return { bg: '#ffedd5', text: '#c2410c', border: '#fed7aa' };
      case 'low': return { bg: '#f3f4f6', text: '#374151', border: '#e5e7eb' };
    }
  };

  return (
    <AppLayout>
      {/* Dark Header & Stats */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="chevron-left" color="white" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Tasks</Text>
        </View>

        <View style={styles.statsGrid}>
          <StatBox 
            count={userTasks.filter(t => t.status === 'pending').length} 
            label="Pending" 
          />
          <StatBox 
            count={userTasks.filter(t => t.status === 'in-progress').length} 
            label="Active" 
          />
          <StatBox 
            count={userTasks.filter(t => t.status === 'completed').length} 
            label="Done" 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Custom Tab Bar */}
        <View style={styles.tabBar}>
          {(['all', 'pending', 'in-progress', 'completed'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setFilter(tab)}
              style={[styles.tab, filter === tab && styles.activeTab]}
            >
              <Text style={[styles.tabText, filter === tab && styles.activeTabText]}>
                {tab === 'in-progress' ? 'Active' : tab === 'completed' ? 'Done' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tasks List */}
        <View style={styles.listContainer}>
          {filteredTasks.length === 0 ? (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconCircle}>
                <Feather name="alert-circle" size={32} color="#9ca3af" />
              </View>
              <Text style={styles.emptyText}>No tasks found</Text>
            </View>
          ) : (
            filteredTasks.map(task => {
              const pStyles = getPriorityStyles(task.priority);
              const sStyles = getStatusStyles(task.status);
              
              return (
                <Pressable 
                  key={task.id} 
                  style={styles.taskCard}
                  onPress={() => router.push(`/tasks/${task.id}`)}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <View style={[styles.priorityBadge, { backgroundColor: pStyles.bg, borderColor: pStyles.border }]}>
                      <Text style={[styles.priorityText, { color: pStyles.text }]}>
                        {task.priority.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.taskDesc} numberOfLines={2}>
                    {task.description}
                  </Text>

                  <View style={styles.infoRow}>
                    <Feather name="map-pin" size={14} color="#9ca3af" />
                    <Text style={styles.infoText}>{task.location}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Feather name="clock" size={14} color="#9ca3af" />
                    <Text style={styles.infoText}>
                      Due: {new Date(task.deadline).toLocaleDateString()} {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>

                  <View style={styles.cardFooter}>
                    <View style={[styles.statusBadge, { backgroundColor: sStyles.bg }]}>
                      <Text style={[styles.statusText, { color: sStyles.text }]}>
                        {task.status.replace('-', ' ').toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      </ScrollView>
    </AppLayout>
  );
}

// Sub-component for Stats
const StatBox = ({ count, label }: { count: number; label: string }) => (
  <View style={styles.statBox}>
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { backgroundColor: '#1E1E1E', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backBtn: { padding: 8, marginLeft: -12 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold', marginLeft: 8 },
  statsGrid: { flexDirection: 'row', gap: 12 },
  statBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 10, alignItems: 'center' },
  statCount: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 2 },
  statLabel: { color: '#d1d5db', fontSize: 11 },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 24 },
  tabBar: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 20, overflow: 'hidden' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  activeTab: { backgroundColor: '#F57C00' },
  tabText: { fontSize: 12, color: '#6b7280', fontWeight: '600' },
  activeTabText: { color: 'white' },
  listContainer: { gap: 16 },
  taskCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e5e7eb', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  taskTitle: { fontSize: 16, fontWeight: '600', color: '#111827', flex: 1, marginRight: 8 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, borderWidth: 1 },
  priorityText: { fontSize: 10, fontWeight: 'bold' },
  taskDesc: { fontSize: 14, color: '#4b5563', marginBottom: 12, lineHeight: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  infoText: { fontSize: 13, color: '#6b7280' },
  cardFooter: { marginTop: 4, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: '700' },
  emptyCard: { backgroundColor: 'white', borderRadius: 12, padding: 40, alignItems: 'center', borderWidth: 1, borderColor: '#e5e7eb' },
  emptyIconCircle: { width: 64, height: 64, backgroundColor: '#f3f4f6', borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  emptyText: { color: '#6b7280', fontSize: 15 },
});