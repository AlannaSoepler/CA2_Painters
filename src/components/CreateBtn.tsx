import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
//This is the create button component.
//Works the same as the back button except it takes you to the create page instead of the main page.
interface CreateBtnProps {
  resource: string;
}

export default function CreateBtn({ resource }: CreateBtnProps) {
  const router = useRouter();

  const handleCreate = () => {
    router.push(`/${resource}/create`);
  };

  return (
    <Pressable style={styles.pressable} onPress={handleCreate}>
      <Text style={styles.pressableText}>Create</Text>
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
