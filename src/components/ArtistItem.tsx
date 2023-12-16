import { Text, View, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteBtn from './deleteBtn';

interface MyProps {
  artist: {
    _id: string;
    full_name: string;
    style: string;
  };
  onDelete?: (id?: string) => void;
}

export default function ArtistItem({ artist, onDelete }: MyProps) {
  const router = useRouter();
  return (
    <View>
      <Link
        href={{
          pathname: '/artists/[id]',
          params: { id: artist._id },
        }}
      >
        {artist.full_name}
      </Link>
      <Text>{artist.style}</Text>
      <Button
        title="Edit"
        onPress={() => router.push(`/artists/${artist._id}/edit`)}
      />
      <DeleteBtn resource="artists" id={artist._id} deleteCallback={onDelete} />
      <Text>_____________</Text>
    </View>
  );
}
