import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, FlatList, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import MuseumItem from '../../../components/MuseumItem';

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

  return <>{museumsList}</>;
}
