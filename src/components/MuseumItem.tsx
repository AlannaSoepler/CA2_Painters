import { Text, View, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteBtn from './deleteBtn';

interface MyProps {
  museum: {
    _id: string;
    name: string;
    city: string;
  };
  onDelete?: (id?: string) => void;
}

export default function MuseumItem({ museum, onDelete }: MyProps) {
  const router = useRouter();
  return (
    <View>
      <Link
        href={{
          pathname: '/museums/[id]',
          params: { id: museum._id },
        }}
      >
        {museum.name}
      </Link>
      <Text>{museum.city}</Text>
      <Button
        title="Edit"
        onPress={() => router.push(`/museums/${museum._id}/edit`)}
      />
      <DeleteBtn resource="museums" id={museum._id} deleteCallback={onDelete} />
      <Text>_____________</Text>
    </View>
  );
}
