import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
//This is the edit button component.
//Works the same as the back button except it takes you to the edit page instead of the main page.
interface EditBtnProps {
  id: string;
  resource: string;
}

export default function EditBtn({ id, resource }: EditBtnProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/${resource}/${id}/edit`);
  };

  return (
    <Pressable style={styles.pressable} onPress={handleEdit}>
      <Text style={styles.pressableText}>Edit</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: '#35401A',
    borderRadius: 5,
    padding: 10,
    width: 60,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  pressableText: {
    color: '#FFFFFF',
  },
});
