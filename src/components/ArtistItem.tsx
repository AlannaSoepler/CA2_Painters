import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteBtn from './deleteBtn';
import EditBtn from './EditBtn';
import ViewBtn from './ViewBtn';
import { Avatar, Card } from 'react-native-paper';
import type { PropsWithChildren } from 'react';
//This is the ArtistItem component. 
//It is used to display the artist information on the artists page. 

//The artist information is passed in as a prop.
//These are the properties of the artist object:
interface MyProps {
  artist: {
    _id: string;
    full_name: string;
    style: string;
  };
  //This is the onDelete function.
  //When it is called, it will delete the artist from the database.
  onDelete?: (id?: string) => void;
}

export default function ArtistItem({ artist, onDelete }: MyProps) {
  //The router is used to navigate to the artist page.
  const router = useRouter();
  //This sets up the artist item card.
  //This is how the artists are displayed on the artists page.
  //When someone clicks on the artist item card, it will take them to the artist page.
  //I have also created a view button, edit button, and delete button.
  //They are imported from the components folder.
  return (
    <Card style={styles.cards}>
      <Link href={`/artists/${artist._id}`}>
        <Card.Title
          title={artist.full_name}
          subtitle={artist.style}
          left={(props) => (
            <Avatar.Image
              {...props}
              source={{
                uri: 'https://picsum.photos/700',
              }}
            />
          )}
        />
      </Link>
      <Card.Actions style={styles.cards_actions}>
        <ViewBtn resource="artists" id={artist._id} />
        <EditBtn resource="artists" id={artist._id} />
        <DeleteBtn
          resource="artists"
          id={artist._id}
          deleteCallback={onDelete}
        />
      </Card.Actions>
    </Card>
  );
}
//This is the styling for the artist item card.
const styles = StyleSheet.create({
  cards: {
    backgroundColor: '#F2F2F2',
    borderColor: '#B9BFAA',
    borderRadius: 0,
    borderWidth: 3,
    padding: 10,
    margin: 10,
    width: 300,
    height: 150,
  },
  cards_actions: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: 300,
  },
});
