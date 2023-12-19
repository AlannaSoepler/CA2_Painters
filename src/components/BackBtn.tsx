import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
//This is the back button component.
//It is used to go back to the main page of whatever resource you are on.
//The other buttons work similarly except for the deleteBtn

interface BackBtnProps {
  resource: string;
}

//This is the back button component. It expects a resource parameter. The value is either artists, museums, or works.
export default function EditBtn({ resource }: BackBtnProps) {
  const router = useRouter();
  //This is the handleBack function. It is used to go back to the main page of whatever resource you are on.
  const handleBack = () => {
    router.push(`/${resource}/`);
  };

  return (
    //This is the back button. It is a pressable button that says back.
    //The main reason i used Pressable instead of Button is because i wanted to style it.
    <Pressable style={styles.pressable} onPress={handleBack}>
      <Text style={styles.pressableText}>Back</Text>
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
