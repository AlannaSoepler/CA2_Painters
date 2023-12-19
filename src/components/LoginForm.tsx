import { TextInput, StyleSheet, Button, Text } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { useSession } from '../contexts/AuthContext';
import { LoginFormType } from '../types';
//this is the login form
//It is a component that is used in the login page
//It is also used in the header component
export default function LoginForm() {
  const { signIn } = useSession();
  //signIn is a function that is used to set the session token

  //This is the form state
  //it is an object with two properties: email and password
  const [form, setForm] = useState<LoginFormType>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  //This gets called when the user types in the form
  //it updates the form
  const handleChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
//This gets called when the user clicks the submit button
//Makes a POST request to the login endpoint
//If the request is successful, the session token is set
  const handleClick = () => {
    axios
      .post('https://ca-1-paintings.vercel.app/api/users/login', form)
      .then((response) => {
        console.log(response.data);
        signIn(response.data.token);
      })
      //If not the error message is set
      .catch((e) => {
        setError(e.response.data.message);
      });
  };
//This is the form
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChange={handleChange}
        value={form.email}
        id="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChange={handleChange}
        value={form.password}
        id="password"
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
