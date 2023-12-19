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
import { ArtistType } from '../../../types';
import { z, string, date } from 'zod';
import BackBtn from '../../../components/BackBtn';

// Define Zod schema for ArtistType
//It is used to validate the form
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
  const [error, setError] = useState('');
  const router = useRouter();

  // Define form state
  //It is used to store the form data
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
//If the session is loading, display a loading message
  if (isLoading) return <Text>Loading...</Text>;
//This function is called when the user changes the value of an input field
//prevState is the previous state of the form and e.target.id is the id of the input field
//If the user changes the value of the input field with id "full_name", then e.target.id will be "full_name"
  const handleChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
//This function is called when the user clicks the submit button
  const handleClick = () => {
    //This try and catch block is used to validate the form
    try {
      artistSchema.parse(form); // Use Zod schema to validate the form
      // Continue with the API call if validation succeeds
      //Post request to create a new artist
      //the form data is sent in the body of the request
      //headers are used to send the session token
      axios
        .post(`https://ca-1-paintings.vercel.app/api/artists/`, form, {
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
        //If the form is not valid, then display the error message
    } catch (validationError) {
      setError((validationError as Error).message || 'Validation error');
    }
  };
//These are the input fields for the form
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
          placeholder="nationality"
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
