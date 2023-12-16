import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, FlatList, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import ArtistItem from '../../../components/ArtistItem';

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios
      .get('https://ca-1-paintings.vercel.app/api/artists')
      .then((response) => {
        console.log(response.data);
        setArtists(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const onDelete = (id?: string) => {
    let newArtists = artists.filter((artist: any) => artist._id !== id);
    setArtists(newArtists);
  };

  let artistsList = artists.map((artist: any) => {
    return <ArtistItem key={artist._id} artist={artist} onDelete={onDelete} />;
  });

  return (
    <>
      {/* <Text>This is the view all artists page</Text> */}

      {artistsList}

      {/* <FlatList
        data={artists}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      /> */}
    </>
  );
}
