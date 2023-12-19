import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSession } from '../../../contexts/AuthContext';
import BackBtn from '../../../components/BackBtn';
import { ArtistType, MuseumType, WorkType } from '../../../types';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function WorkEditPage() {
  const { session, isLoading } = useSession();
  const [work, setWork] = useState<WorkType | null>(null);
  const [error, setError] = useState('');
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState<WorkType>({
    title: '',
    artist_id: null,
    museum_id: null,
  });

  const handleChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = () => {
    console.log(form);
    axios
      .post(`https://ca-1-paintings.vercel.app/api/works/`, form, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        router.push(`/works/${response.data._id}`);
      })
      .catch((e) => {
        console.error(e);
        setError(e.response?.data?.message || 'An error occurred');
      });
  };

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;

  return (
    <SafeAreaView>
      <View style={styles.button_actions}>
        <BackBtn resource="works" />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Work</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChange={handleChange}
          value={form.title}
          id="title"
        />
        <Text>Artist</Text>
        <TextInput
          style={styles.input}
          placeholder="Artist id"
          onChange={handleChange}
          id="artist_id"
        />
        <Text>Museum</Text>
        <TextInput
          style={styles.input}
          placeholder="Museum id"
          onChange={handleChange}
          id="museum_id"
        />
        <Button onPress={handleClick} title="Save" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loadingText: {
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 16,
  },
  button_actions: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: 300,
  },
});
