import { useLocalSearchParams } from 'expo-router/build/hooks';
import { Image, StyleSheet, Text, View } from 'react-native';
import { cld } from '../lib/cloudinary';

export default function Post() {
  const { postTitle, postCaption, postImage, postUser, postTime } =
    useLocalSearchParams<{
      postTitle: string;
      postCaption: string;
      postImage?: string;
      postUser: string;
      postTime: string;
    }>();

  const myImage = cld.image(postImage).toURL();

  return (
    <View className="bg-white flex-1">
      <View className="m-5 gap-3 items-baseline">
        <Text className="font-bold text-3xl">{postTitle}</Text>
        <Text className="font-normal text-xs text-slate-600 -mb-2">
          작성자: {postUser || '봇유저'}ㅣ작성일:{' '}
          {postTime.substring(0, postTime.indexOf('T'))}
        </Text>
      </View>
      <View className=" w-100% h-0.5 bg-slate-200 mb-3" />
      <View className="m-5">
        <Image source={{ uri: myImage }} className="mb-2 w-full aspect-[4/3]" />
        <Text className="font-medium text-lg">{postCaption}</Text>
      </View>
    </View>
  );
}
