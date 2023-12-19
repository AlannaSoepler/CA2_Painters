import React from 'react';
import axios from 'axios';
import { Button, Pressable, Text, StyleSheet } from 'react-native';
import { useSession } from '../contexts/AuthContext';
import { useState } from 'react';

interface DeleteBtnProps {
  resource: string;
  id: string;
  deleteCallback?: (id?: string) => void;
}
export default function DeleteBtn({
  resource,
  id,
  deleteCallback,
}: DeleteBtnProps) {
  const [deleting, setDeleting] = useState(false);
  const { session } = useSession();
  const handleDelete = () => {
    axios
      .delete(`https://ca-1-paintings.vercel.app/api/${resource}/${id}`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (deleteCallback) {
          deleteCallback(id);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <>
      <Pressable style={styles.pressable} onPress={handleDelete}>
        <Text style={styles.pressableText}>
          {deleting ? 'Deleting...' : 'Delete'}
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: '#35401A',
    borderRadius: 5,
    padding: 10,
    width: 60,
    marginRight: 10,
    alignItems: 'center',
  },
  pressableText: {
    color: '#FFFFFF',
  },
});
