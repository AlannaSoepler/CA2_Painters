import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, FlatList, Button, View, SafeAreaView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import ArtistItem from '../../../components/ArtistItem';
import { StyleSheet } from 'react-native';
import React from 'react';
import { useSession } from '../../../contexts/AuthContext';
import LoginForm from '../../../components/LoginForm';
import CreateBtn from '../../../components/CreateBtn';
//This is the page that displays all the artists it works similar to the works and museums page
export default function ArtistsPage() {
  //The setArtists is used to set the artists and the useState is used to set the state of the artists
  //Which means that the artists can be changed
  const [artists, setArtists] = useState([]);
  //useEffect is used to get the artists from the api
  //axios is used to get the artists from the api, by using the get method
  //the date is stored in the response and then the artists are set to the response data
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
  //onDelete is used to delete the artists
  const onDelete = (id?: string) => {
    //It is needed to filter the artists because the artists are stored in an array
    let newArtists = artists.filter((artist: any) => artist._id !== id);
    setArtists(newArtists);
  };
  //This is used to map the artists and display them
  let artistsList = artists.map((artist: any) => {
    //The artistItem is used to display the artist
    return <ArtistItem key={artist._id} artist={artist} onDelete={onDelete} />;
  });
  //This is used to display the artists and the create button send users to the create page
  return (
    <>
      <CreateBtn resource="artists" />
      <View style={styles.container}>{artistsList}</View>
    </>
  );
}
//To make my card flexable I used flexbox
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
