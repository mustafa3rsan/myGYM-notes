import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Program, Hareket } from './Navigator';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

type ProgramDetayRouteProp = RouteProp<RootStackParamList, 'ProgramDetay'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProgramDetay = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<ProgramDetayRouteProp>();
    const { program } = route.params;

    if (!program) {
        Alert.alert('Hata', 'Program bilgisi yüklenemedi.');
        navigation.goBack();
        return null;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    style={styles.backButton}
                >
                    <MaterialIcons name="arrow-back-ios" size={24} color="#0F172A" />
                    <Text style={styles.backButtonText}>Geri</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{program.adi}</Text>
            </View>

            <ScrollView 
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.statsCard}>
                    <View style={styles.statItem}>
                        <MaterialCommunityIcons name="dumbbell" size={24} color="#2563EB" />
                        <Text style={styles.statValue}>{program.hareketler.length}</Text>
                        <Text style={styles.statLabel}>Hareket</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <MaterialCommunityIcons name="repeat" size={24} color="#2563EB" />
                        <Text style={styles.statValue}>
                            {program.hareketler.reduce((total, hareket) => total + hareket.setSayisi, 0)}
                        </Text>
                        <Text style={styles.statLabel}>Toplam Set</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Hareketler</Text>
                
                {program.hareketler.map((hareket: Hareket, index: number) => (
                    <View 
                        key={index} 
                        style={styles.hareketItem}
                    >
                        <View style={styles.hareketIconContainer}>
                            <MaterialCommunityIcons name="weight-lifter" size={24} color="#2563EB" />
                        </View>
                        <View style={styles.hareketContent}>
                            <Text style={styles.hareketAdi}>{hareket.isim}</Text>
                            <Text style={styles.setSayisi}>{hareket.setSayisi} Set</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingTop: 8,
        paddingBottom: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#0F172A',
        textAlign: 'center',
        marginTop: 8,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    backButtonText: {
        fontSize: 16,
        color: '#0F172A',
        marginLeft: 4,
        fontWeight: '500',
    },
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    contentContainer: {
        padding: 16,
    },
    statsCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#E2E8F0',
        marginHorizontal: 16,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 16,
    },
    hareketItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 12,
        padding: 16,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 1,
    },
    hareketIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    hareketContent: {
        flex: 1,
    },
    hareketAdi: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 4,
    },
    setSayisi: {
        fontSize: 14,
        color: '#64748B',
    },
});

export default ProgramDetay;
