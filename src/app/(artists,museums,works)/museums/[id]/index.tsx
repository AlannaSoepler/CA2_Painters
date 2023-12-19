import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext';
import axios from 'axios';
import BackBtn from '../../../../components/BackBtn';
import EditBtn from '../../../../components/EditBtn';

export default function MuseumIndexPage() {
  const { session, isLoading } = useSession();
  const [museum, setMuseum] = useState<any>(null);
  const [error, setError] = useState('');
  const { id } = useLocalSearchParams();

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
      })
      .catch((e) => {
        console.error(e);
        setError(e.response.data.message);
      });
  }, []);

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;

  if (!museum) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <>
      <SafeAreaView>
        <View style={styles.button_actions}>
          <BackBtn resource="museums" />
          <EditBtn resource="museums" id={museum._id} />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>{museum.name}</Text>
          <Text>{museum.name}</Text>
          <Text>{museum.last_name}</Text>
          {museum.works && museum.works.length > 0 && (
            <View style={styles.worksContainer}>
              <Text style={styles.sectionTitle}>Works:</Text>
              {museum.works.map((work: any) => (
                <View key={work._id} style={styles.workItem}>
                  <Link href={`/works/${work._id}`}>
                    <Text>{work.title}</Text>
                  </Link>
                  {work.artist && (
                    <View style={styles.artistContainer}>
                      <Text style={styles.sectionTitle}>Artist:</Text>
                      <Link href={`/artists/${work.artist._id}`}>
                        <Text>{work.artist.full_name}</Text>
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
  artistContainer: {
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
