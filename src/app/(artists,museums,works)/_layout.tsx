import { Text, Pressable, StyleSheet } from 'react-native';
import { Slot, Redirect, Stack } from 'expo-router';
import Footer from '../../components/Footer';
import { useSession } from '../../contexts/AuthContext';

//This is the general layout for the pages that require authentication
//It checks if the user is logged in, if not, they are redirected to the login page
//If they are logged in, they can access the page
export default function AuthLayout() {
  const { session, isLoading, signOut } = useSession();
  //Checks if the user is logged in
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  //Checks if the user is logged in
  if (!session) {
    return <Redirect href="/" />;
  }
  //If all is good, this is the structure of the pages that require authentication
  //Slot is used to render the content of the page
  //I have also imported my lovely footer
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#B9BFAA' },
          headerShadowVisible: false,
          headerRight: () => (
            <Pressable onPress={signOut} style={styles.pressable}>
              <Text style={styles.pressableText}>Sign Out</Text>
            </Pressable>
          ),
        }}
      />
      <Slot />
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 8,
    maxHeight: 200,
  },
  pressable: {
    backgroundColor: '#35401A',
    borderRadius: 5,
    padding: 15,
    margin: 10,
    width: 100,
    alignItems: 'center',
  },
  pressableText: {
    color: '#FFFFFF',
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
