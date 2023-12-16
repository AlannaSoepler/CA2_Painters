import axios from 'axios';
import { useEffect, useState } from 'react';
import { TextInput, StyleSheet, Button, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext';
import { ArtistType } from '../../../../types';

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

  if (!artist) return <Text>{error}</Text>;

  const handleChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = () => {
    console.log(form);

    axios
      .put(`https://ca-1-paintings.vercel.app/api/artists/${id}`, form, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        router.push(`/artists/${id}`);
      })
      .catch((e) => {
        console.error(e);
        setError(e.response.data.message);
      });

    // axios.put(`https://ca-1-paintings.vercel.app/api/artists/${id}`, form, {
    //     headers: {
    //         Authorization: `Bearer ${session}`
    //     }
    // })
    //     .then(response => {
    //         console.log(response.data);
    //         setArtist(response.data);
    //     })
    //     .catch(e => {
    //         console.error(e);
    //         setError(e.response.data.message);
    //     });
  };

  return (
    <>
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
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
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