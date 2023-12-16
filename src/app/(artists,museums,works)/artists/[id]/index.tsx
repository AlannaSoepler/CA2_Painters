import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext';

export default function Page() {
  const { session, isLoading } = useSession();
  const [artist, setArtist] = useState<any>(null);
  const [error, setError] = useState('');
  const { id } = useLocalSearchParams();

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

  if (isLoading) return <Text>Loading...</Text>;

  if (!artist) return <Text>{error}</Text>;

  return (
    <>
      <Text>{artist.full_name}</Text>
      <Text>{artist.first_name}</Text>
      <Text>{artist.last_name}</Text>
      <Text>{artist.works}</Text>
      <Text>{error}</Text>
    </>
  );
}
