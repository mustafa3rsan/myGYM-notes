import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Hareket, Program } from './types';
import { styles } from './styles/eklesayfasi.styles';

const Eklesayfasi = () => {
  const navigation = useNavigation();
  const [hareketEkle, setHareketEkle] = useState<string>('');
  const [setSayisiEkle, setSetSayisiEkle] = useState<number | string>('');
  const [items, setItems] = useState<Hareket[]>([]);
  const [programAdi, setProgramAdi] = useState<string>('');
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!unsavedChanges) return;

      e.preventDefault();
    });

    return unsubscribe;
  }, [unsavedChanges, navigation]);

  const ekleme = () => {
    const parsedSetSayisi = Number(setSayisiEkle);
    if (hareketEkle.trim() !== '' && parsedSetSayisi > 0 && parsedSetSayisi <= 5) {
      const yeniHareket: Hareket = { isim: hareketEkle, setSayisi: parsedSetSayisi };
      setItems([yeniHareket, ...items]);
      setHareketEkle('');
      setSetSayisiEkle('');
      setUnsavedChanges(true);
    }
  };

  const kaydet = async () => {
    try {
      if (programAdi.trim() === '') {
        return;
      }

      const newProgram: Program = {
        adi: programAdi,
        hareketler: items,
      };

      const existingPrograms = await AsyncStorage.getItem('savedPrograms');
      const programsArray = existingPrograms ? JSON.parse(existingPrograms) : [];

      programsArray.push(newProgram);
      await AsyncStorage.setItem('savedPrograms', JSON.stringify(programsArray));

      setItems([]);
      setProgramAdi('');
      setHareketEkle('');
      setSetSayisiEkle('');
      setUnsavedChanges(false);
      navigation.goBack();
    } catch (error) {
      console.error('Save Error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        accessible
        accessibilityLabel="Go back to the previous screen"
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Enter Program Name"
        style={[styles.titleInput, styles.textInputStyle]}
        value={programAdi}
        onChangeText={(text) => {
          setProgramAdi(text);
          setUnsavedChanges(true);
        }}
        placeholderTextColor="#A1A1A1"
        accessibilityLabel="Program Name Input Field"
      />

      <ScrollView style={styles.scrollView}>
        {items.length === 0 ? (
          <View style={styles.emptyList}>
            <Text style={styles.emptyText}>No movements added yet.</Text>
          </View>
        ) : (
          items.map((item, index) => (
            <View key={index} style={styles.programItem}>
              <View style={styles.movementInfo}>
                <Text style={styles.movementName}>{item.isim}</Text>
                <Text style={styles.setText}>{item.setSayisi} Set</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setItems(items.filter((_, i) => i !== index));
                  setUnsavedChanges(true);
                }}
                style={styles.deleteButton}
                accessible
                accessibilityLabel={`Delete movement ${item.isim}`}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={kaydet}
        accessible
        accessibilityLabel="Save the program"
      >
        <Text style={styles.saveButtonText}>Save Program</Text>
      </TouchableOpacity>

      <View style={styles.addMovementContainer}>
        <TextInput
          style={[styles.movementInput, styles.textInputStyle]}
          placeholder="Movement Name"
          value={hareketEkle}
          onChangeText={setHareketEkle}
          placeholderTextColor="#A1A1A1"
          accessibilityLabel="Movement Name Input Field"
        />
        <TextInput
          style={[styles.setInput, styles.textInputStyle]}
          placeholder="Sets"
          keyboardType="numeric"
          value={setSayisiEkle.toString()}
          onChangeText={(text) => {
            const value = Number(text);
            if (!isNaN(value) || text === '') {
              setSetSayisiEkle(text);
            }
          }}
          placeholderTextColor="#A1A1A1"
          accessibilityLabel="Set Count Input Field"
        />
        <TouchableOpacity
          onPress={ekleme}
          style={styles.addButton}
          accessible
          accessibilityLabel="Add a new movement"
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Eklesayfasi;
