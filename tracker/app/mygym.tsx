import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MyGym = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Gym</Text>
                    <Text style={styles.headerSubtitle}>İstatistikler ve Gelişim</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <MaterialCommunityIcons name="calendar-check" size={32} color="#2563EB" />
                        <Text style={styles.statValue}>0</Text>
                        <Text style={styles.statLabel}>Toplam Antrenman</Text>
                    </View>

                    <View style={styles.statCard}>
                        <MaterialCommunityIcons name="weight-lifter" size={32} color="#2563EB" />
                        <Text style={styles.statValue}>0</Text>
                        <Text style={styles.statLabel}>Toplam Set</Text>
                    </View>

                    <View style={styles.statCard}>
                        <MaterialCommunityIcons name="timer-outline" size={32} color="#2563EB" />
                        <Text style={styles.statValue}>0 dk</Text>
                        <Text style={styles.statLabel}>Toplam Süre</Text>
                    </View>
                </View>

                <View style={styles.comingSoon}>
                    <MaterialCommunityIcons name="tools" size={48} color="#94A3B8" />
                    <Text style={styles.comingSoonText}>Yakında Daha Fazlası</Text>
                    <Text style={styles.comingSoonSubtext}>
                        Detaylı istatistikler ve grafikler eklenecek
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#64748B',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 4,
        alignItems: 'center',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 4,
    },
    comingSoon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        padding: 24,
    },
    comingSoonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#0F172A',
        marginTop: 16,
        marginBottom: 8,
    },
    comingSoonSubtext: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
    },
});

export default MyGym; 