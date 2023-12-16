import { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();
  return (
    <>
      <View>
        <View style={styles.container}></View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  COLORS: {},
  font: {
    fontFamily: 'DMRegular',
    fontSize: 14,
    color: '#35401A',
  },
  btn:{
    backgroundColor: '#35401A',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 300,
    alignItems: 'center',
  }
});
