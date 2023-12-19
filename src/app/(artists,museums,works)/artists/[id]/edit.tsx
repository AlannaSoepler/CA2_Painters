import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  Button,
  Text,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext';
import { ArtistType } from '../../../../types';
import BackBtn from '../../../../components/BackBtn';
import { z, string, date } from 'zod';
//This works quite similar to the create file
const artistSchema = z.object({
  full_name: string(),
  first_name: string(),
  middle_name: string(),
  last_name: string(),
  nationality: string(),
  style: string(),
  birth: date(),
  death: date(),
});

export default function Page() {
  const { session, isLoading } = useSession();
  const [artist, setArtist] = useState<any>(null);
  const [error, setError] = useState('');
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState<ArtistType>({
    full_name: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    nationality: '',
    style: '',
    birth: '',
    death: '',
  });
  //just here i need to get the data assosicated with the artist
  useEffect(() => {
    axios
      .get(`https://ca-1-paintings.vercel.app/api/artists/${id}`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setArtist(response.data);
        setForm(response.data);
      })
      .catch((e) => {
        console.error(e);
        setError(e.response.data.message);
      });
  }, []);

  if (isLoading) return <Text>Loading...</Text>;
  //If there is no artist, display an error message
  if (!artist) return <Text>{error}</Text>;
  //If there is a change in the form, update the form state
  const handleChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  //After clicking the submit button, the form is validated
  //If the form is valid, the put request is sent to update the artist
  const handleClick = () => {
    try {
      artistSchema.parse(form); // Use Zod schema to validate the form
      // Continue with the API call if validation succeeds
      axios
        .put(`https://ca-1-paintings.vercel.app/api/artists/${id}`, form, {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          router.push(`/artists/${response.data._id}`);
        })
        .catch((e) => {
          console.error(e);
          setError(e.response.data.message);
        });
    } catch (validationError) {
      setError((validationError as Error).message || 'Validation error');
    }
  };

  return (
    <>
      <SafeAreaView>
        <BackBtn resource="artists" />
        <Text>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChange={handleChange}
          value={form.full_name}
          id="full_name"
        />

        <Text>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Fist Name"
          onChange={handleChange}
          value={form.first_name}
          id="first_name"
        />

        <Text>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChange={handleChange}
          value={form.last_name}
          id="last_name"
        />

        <Text>Nationality</Text>
        <TextInput
          style={styles.input}
          placeholder="Nationality"
          onChange={handleChange}
          value={form.nationality}
          id="nationality"
        />

        <Text>Style</Text>
        <TextInput
          style={styles.input}
          placeholder="Style"
          onChange={handleChange}
          value={form.style}
          id="style"
        />

        <Text>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          onChange={handleChange}
          value={form.birth}
          id="birth"
        />

        <Text>Date of Passing</Text>
        <TextInput
          style={styles.input}
          placeholder="Date of Passing"
          onChange={handleChange}
          value={form.death}
          id="death"
        />

        <Text>{error}</Text>

        <Button
          onPress={handleClick}
          title="Submit"
          color="#BF6C3B"
          accessibilityLabel="Learn more about this orange button"
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
