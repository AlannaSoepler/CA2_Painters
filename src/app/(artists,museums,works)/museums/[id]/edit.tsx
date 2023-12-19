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
import { MuseumType } from '../../../../types';
import EditBtn from '../../../../components/EditBtn';
import BackBtn from '../../../../components/BackBtn';
import { z, string, date } from 'zod';
import PhoneInput from 'react-native-phone-input';

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
  const [museum, setMuseum] = useState<any>(null);
  const [error, setError] = useState('');
  const { id } = useLocalSearchParams();
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

  useEffect(() => {
    axios
      .get(`https://ca-1-paintings.vercel.app/api/museums/${id}`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMuseum(response.data);
        setForm(response.data);
      })
      .catch((e) => {
        console.error(e);
        setError(e.response.data.message);
      });
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  if (!museum) return <Text>{error}</Text>;

  const handleChange = (event: any) => {
    const { id, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [id]: id === 'phone' ? Number(value) : value,
    }));
  };

  const handleClick = () => {
    try {
      museumSchema.parse(form); // Use Zod schema to validate the form
      // Continue with the API call if validation succeeds
      axios
        .patch(`https://ca-1-paintings.vercel.app/api/museums/${id}`, form, {
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
