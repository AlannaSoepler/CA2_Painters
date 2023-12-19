import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, FlatList, Button, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import WorkItem from '../../../components/WorkItem';
import { StyleSheet } from 'react-native';
import CreateBtn from '../../../components/CreateBtn';

export default function WorkPage() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    axios
      .get('https://ca-1-paintings.vercel.app/api/works')
      .then((response) => {
        console.log(response.data);
        setWorks(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const onDelete = (id?: string) => {
    let newWorks = works.filter((work: any) => work._id !== id);
    setWorks(newWorks);
  };

  let worksList = works.map((work: any) => {
    return <WorkItem key={work._id} work={work} onDelete={onDelete} />;
  });

  return (
    <>
      <>
        <CreateBtn resource="works" />
        <View style={styles.container}>{worksList}</View>
      </>
    </>
  );
}

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
