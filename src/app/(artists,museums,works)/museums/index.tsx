import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, FlatList, Button, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import MuseumItem from '../../../components/MuseumItem';
import { StyleSheet } from 'react-native';
import CreateBtn from '../../../components/CreateBtn';

export default function MuseumPage() {
  const [museums, setMuseums] = useState([]);

  useEffect(() => {
    axios
      .get('https://ca-1-paintings.vercel.app/api/museums')
      .then((response) => {
        console.log(response.data);
        setMuseums(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const onDelete = (id?: string) => {
    let newMuseums = museums.filter((museum: any) => museum._id !== id);
    setMuseums(newMuseums);
  };

  let museumsList = museums.map((museum: any) => {
    return <MuseumItem key={museum._id} museum={museum} onDelete={onDelete} />;
  });

  return (
    <>
      <>
        <CreateBtn resource="museums" />
        <View style={styles.container}>{museumsList}</View>
      </>
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
});
