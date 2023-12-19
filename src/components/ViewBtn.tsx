import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
//This is the view button component.
//Works the same as the back button except it takes you to the view page instead of the main page.
interface ViewBtnProps {
  id: string;
  resource: string;
}

export default function ViewBtn({ id, resource }: ViewBtnProps) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/${resource}/${id}`);
  };

  return (
    <>
      <Pressable style={styles.pressable} onPress={handleView}>
        <Text style={styles.pressableText}>View</Text>
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
    marginLeft: 10,
    alignItems: 'center',
  },
  pressableText: {
    color: '#FFFFFF',
  },
});
