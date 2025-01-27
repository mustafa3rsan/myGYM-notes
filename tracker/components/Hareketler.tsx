import React from 'react';
import { Text, StyleSheet, View } from 'react-native';


interface HareketlerProps {
  hareketAdi: string;
  setSayisi: number;
}

const Hareketler: React.FC<HareketlerProps> = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.hareketAdi}>
        <Text style={styles.text}>{props.hareketAdi}</Text>
      </View>
      <View style={styles.setBox}>
        <Text style={styles.text}>{props.setSayisi}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hareketAdi: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    height: 50,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setBox: {
    backgroundColor: 'white',
    width: 75,
    height: 50,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
});

export default Hareketler;
