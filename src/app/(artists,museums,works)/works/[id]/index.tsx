import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext';
import axios from 'axios';
import BackBtn from '../../../../components/BackBtn';
import EditBtn from '../../../../components/EditBtn';

export default function WorkIndexPage() {
  const { session, isLoading } = useSession();
  const [work, setWork] = useState<any>(null);
  const [error, setError] = useState('');
  const { id } = useLocalSearchParams();

  useEffect(() => {
    axios
      .get(`https://ca-1-paintings.vercel.app/api/works/${id}`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setWork(response.data);
      })
      .catch((e) => {
        console.error(e);
        setError(e.response.data.message);
      });
  }, []);

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;

  if (!work) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <>
      <SafeAreaView>
        <View style={styles.button_actions}>
          <BackBtn resource="works" />
          <EditBtn resource="works" id={work._id} />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>{work.title}</Text>
          {work.museum && (
            <View style={styles.worksContainer}>
              <Text style={styles.sectionTitle}>Museum:</Text>
              <View style={styles.workItem}>
                <Link href={`/museums/${work.museum._id}`}>
                  <Text>{work.museum.name}</Text>
                </Link>
              </View>
            </View>
          )}
          {work.artist && (
            <View style={styles.worksContainer}>
              <Text style={styles.sectionTitle}>Artist:</Text>
              <View style={styles.workItem}>
                <Link href={`/artists/${work.artist._id}`}>
                  <Text>{work.artist.full_name}</Text>
                </Link>
              </View>
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
