import axios from 'axios';
import { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  Button,
  Text,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '../../../contexts/AuthContext';
import { MuseumType } from '../../../types';
import { z, string, date } from 'zod';
import BackBtn from '../../../components/BackBtn';

// Define Zod schema for MuseumType
const museumSchema = z.object({
  name: string(),
  address: string(),
  city: string(),
  state: string(),
  postal_code: string(),
  country: string(),
  phone: z.number(),
  url: string(),
});

export default function Page() {
  const { session, isLoading } = useSession();
  const [error, setError] = useState('');
  const router = useRouter();

  const [form, setForm] = useState<MuseumType>({
    name: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    phone: 0,
    url: '',
  });

  if (isLoading) return <Text>Loading...</Text>;

  const handleChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = () => {
    try {
      museumSchema.parse(form); // Use Zod schema to validate the form
      // Continue with the API call if validation succeeds
      axios
        .post(`https://ca-1-paintings.vercel.app/api/museums/`, form, {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          router.push(`/museums/${response.data._id}`);
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
        <BackBtn resource="museums" />
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChange={handleChange}
          value={form.name}
          id="name"
        />

        <Text>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          onChange={handleChange}
          value={form.address}
          id="address"
        />

        <Text>City</Text>
        <TextInput
          style={styles.input}
          placeholder="City"
          onChange={handleChange}
          value={form.city}
          id="city"
        />

        <Text>State</Text>
        <TextInput
          style={styles.input}
          placeholder="State"
          onChange={handleChange}
          value={form.state}
          id="state"
        />

        <Text>Postal Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          onChange={handleChange}
          value={form.postal_code}
          id="postal_code"
        />

        <Text>Country</Text>
        <TextInput
          style={styles.input}
          placeholder="Country"
          onChange={handleChange}
          value={form.country}
          id="country"
        />

        <Text>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="numeric"
          onChange={handleChange}
          value={form.phone.toString()}
          id="phone"
        />

        <Text>URL</Text>
        <TextInput
          style={styles.input}
          placeholder="Url"
          onChange={handleChange}
          value={form.url}
          id="url"
        />

        <Text>{error}</Text>

        <Button
          onPress={handleClick}
          title="Submit"
          color="#BF6C3B"
          accessibilityLabel="Learn more about this purple button"
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
