import {
  Text,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import React from 'react';
import { Link, Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import LoginForm from '../components/LoginForm';
//import { Nearbyjobs, Pupularjobs, ScreenHeaderBtn, Welcome } from '../components/';
import { useSession } from '../contexts/AuthContext';

export default function Page() {
  const { session, signOut } = useSession();
  const router = useRouter();

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: '#B9BFAA' },
            headerShadowVisible: false,
            headerRight: () => (
              <TouchableOpacity onPress={signOut}>
                <Text>Logout</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <View
          style={{
            flex: 1,
            padding: 20,
          }}
        >
          {!session ? (
            <LoginForm />
          ) : (
            <>
              <Link href={'/artists'} asChild>
                <Button title="All Artists" />
              </Link>
              <Link href={'/museums'} asChild>
                <Button title="All Museums" />
              </Link>
              <Text>You are logged in</Text>
            </>
          )}
        </View>
      </SafeAreaView>
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
  Button: {
    backgroundColor: '#35401A',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 300,
    alignItems: 'center',
  },
});
