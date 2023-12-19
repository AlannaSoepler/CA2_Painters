import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext';
import axios from 'axios';
import BackBtn from '../../../../components/BackBtn';
import EditBtn from '../../../../components/EditBtn';
//This looks as an individual page for each artist
export default function ArtistIndexPage() {
  const { session, isLoading } = useSession();
  const [artist, setArtist] = useState<any>(null);
  const [error, setError] = useState('');
  const { id } = useLocalSearchParams();
//Get the data from the api
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
      })
      .catch((e) => {
        console.error(e);
        setError(e.response.data.message);
      });
  }, []);

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;

  if (!artist) return <Text style={styles.errorText}>{error}</Text>;
//This part is cool
//First i check if artist.work exists and if the length of it is grater then 0. 
//if it does i map through it and return a view with the work title and a link to the work page
//Then i check if there is a museum and if there is i return a view with the museum name and a link to the museum page
//Then if there is an error retrieving the data i return the error message
  return (
    <>
      <SafeAreaView>
        <View style={styles.button_actions}>
          <BackBtn resource="artists" />
          <EditBtn resource="artists" id={artist._id} />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>{artist.full_name}</Text>
          <Text>{artist.first_name}</Text>
          <Text>{artist.last_name}</Text>
          {artist.works && artist.works.length > 0 && (
            <View style={styles.worksContainer}>
              <Text style={styles.sectionTitle}>Works:</Text>
              {artist.works.map((work: any) => (
                <View key={work._id} style={styles.workItem}>
                  <Link href={`/works/${work._id}`}>
                    <Text>{work.title}</Text>
                  </Link>
                  {work.museum && (
                    <View style={styles.museumContainer}>
                      <Text style={styles.sectionTitle}>Museum:</Text>
                      <Link href={`/museums/${work.museum._id}`}>
                        <Text>{work.museum.name}</Text>
                      </Link>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    </>
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
  worksContainer: {
    marginTop: 16,
  },
  workItem: {
    marginBottom: 8,
  },
  museumContainer: {
    marginLeft: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
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
