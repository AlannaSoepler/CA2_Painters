import React from 'react';
import { Text, Pressable, View, SafeAreaView } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { useSession } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';
import { StyleSheet } from 'react-native';
//This is the home page
export default function Page() {
  //To use the session context, we need to import the useSession hook.
  //The useSession hook returns an object containing session and isLoading.
  const { session, signOut } = useSession();
  const router = useRouter();
  //If there is not session token, then the user is not logged in
  //and if the user tries to access any other page, they will be redirected to the login page. 
  //I needed to update the header to include a sign out button.
  //However, when the user is sent to the login page, the header needed to be changed
  //The safeareaview is used to make sure the header is not hidden by the phone's status bar. So was not needed for web idealy.
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
        <View style={{ flex: 1, padding: 20 }}>
          {!session ? (
            <>
              <Stack.Screen
                options={{
                  headerStyle: { backgroundColor: '#B9BFAA' },
                  headerShadowVisible: false,
                  headerRight: () => null,
                }}
              />
              <LoginForm />
            </>
          ) : (
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

              <View style={styles.container}>
                <Link href={'/artists'} asChild>
                  <Pressable style={styles.Button}>
                    <Text style={styles.pressableText}>All Artists</Text>
                  </Pressable>
                </Link>
                <Link href={'/museums'} asChild>
                  <Pressable style={styles.Button}>
                    <Text style={styles.pressableText}>All Museums</Text>
                  </Pressable>
                </Link>
                <Link href={'/works'} asChild>
                  <Pressable style={styles.Button}>
                    <Text style={styles.pressableText}>All Works</Text>
                  </Pressable>
                </Link>
              </View>
            </>
          )}
        </View>
        <Footer />
      </SafeAreaView>
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
