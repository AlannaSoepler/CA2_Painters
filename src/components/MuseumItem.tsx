import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteBtn from './deleteBtn';
import EditBtn from './EditBtn';
import ViewBtn from './ViewBtn';
import { Avatar, Card } from 'react-native-paper';
import type { PropsWithChildren } from 'react';

interface MyProps {
  museum: {
    _id: string;
    name: string;
    address: string;
  };
  onDelete?: (id?: string) => void;
}

export default function MuseumItem({ museum, onDelete }: MyProps) {
  const router = useRouter();
  return (
    <Card style={styles.cards}>
      <Link href={`/museums/${museum._id}`}>
        <Card.Title
          title={museum.name}
          subtitle={museum.address}
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
        <ViewBtn resource="museums" id={museum._id} />
        <EditBtn resource="museums" id={museum._id} />
        <DeleteBtn
          resource="museums"
          id={museum._id}
          deleteCallback={onDelete}
        />
      </Card.Actions>
    </Card>
  );
}

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
