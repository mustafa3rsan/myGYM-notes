import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Program } from '../Navigator';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [programlar, setProgramlar] = React.useState<Program[]>([]);

  const verileriYukle = async () => {
    try {
      const kaydedilenProgramlar = await AsyncStorage.getItem('savedPrograms');
      if (kaydedilenProgramlar !== null) {
        setProgramlar(JSON.parse(kaydedilenProgramlar));
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to load programs. Please try again later.');
    }
  };

  React.useEffect(() => {
    verileriYukle();
  }, []);

  const silProgram = async (programAdi: string) => {
    // Önce kullanıcıdan onay al
    Alert.alert(
      'Programı Sil',
      `"${programAdi}" programını silmek istediğinizden emin misiniz?`,
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              // Önce state'i güncelle
              const yeniProgramlar = programlar.filter(p => p.adi !== programAdi);
              setProgramlar(yeniProgramlar);

              // Sonra AsyncStorage'ı güncelle
              await AsyncStorage.setItem('savedPrograms', JSON.stringify(yeniProgramlar));
            } catch (error) {
              Alert.alert('Hata', 'Program silinirken bir hata oluştu.');
              // Hata durumunda verileri tekrar yükle
              verileriYukle();
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: Program }) => (
    <TouchableOpacity
      style={styles.programCard}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('ProgramDetay', { program: item })}
      accessible
      accessibilityLabel={`Open program details for ${item.adi}`}
    >
      <View style={styles.programInfo}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="weight-lifter" size={32} color="#2563eb" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.programAdi}>{item.adi}</Text>
          <Text style={styles.exerciseCount}>
            {item.hareketler.length} {item.hareketler.length === 1 ? 'exercise' : 'exercises'}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => silProgram(item.adi)}
        style={styles.silButon}
        accessible
        accessibilityLabel={`Delete program ${item.adi}`}
      >
        <MaterialIcons name="delete-outline" size={24} color="#DC2626" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Programs</Text>
        <Text style={styles.headerSubText}>Track your workout progress</Text>
      </View>
      {programlar.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="fitness-center" size={80} color="#94a3b8" />
          <Text style={styles.emptyText}>No programs yet</Text>
          <Text style={styles.emptySubText}>Create your first workout program</Text>
        </View>
      ) : (
        <FlatList
          data={programlar}
          keyExtractor={(item) => item.adi}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  headerSubText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '400',
  },
  listContent: {
    padding: 16,
  },
  programCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  programInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  programAdi: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  exerciseCount: {
    fontSize: 14,
    color: '#64748B',
  },
  silButon: {
    padding: 8,
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 16,
    marginBottom: 4,
  },
  emptySubText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
});
