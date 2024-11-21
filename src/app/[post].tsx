import { useLocalSearchParams } from 'expo-router/build/hooks';
import { Image, Text, View } from 'react-native';
import { cld } from '../lib/cloudinary';

export default function Post() {
  const { postTitle, postCaption, postImage } = useLocalSearchParams<{
    postTitle: string;
    postCaption: string;
    postImage?: string;
  }>();

  const myImage = cld.image(postImage).toURL();

  return (
    <View className="p-3">
      <Text>{postTitle}</Text>
      <Text>{postCaption}</Text>
      <Image source={{ uri: myImage }} className="w-full aspect-[4/3]" />
    </View>
  );
}
