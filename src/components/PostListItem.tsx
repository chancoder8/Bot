import { router } from 'expo-router';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

export default function PostListItem(props: { post: any }) {
  const post = props.post;
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/[post]',
          params: {
            postTitle: post.title,
            postCaption: post.caption,
            postImage: post.image,
            postUser: post.user.username,
            postTime: post.created_at,
          },
        })
      }
    >
      <View className="bg-white p-6">
        <Text className="mb-2 font-bold">{post.title}</Text>
        <Text className="-mb-1 font-normal color-slate-600">
          {post.user.username || '봇유저'}ㅣ
          {post.created_at.substring(0, post.created_at.indexOf('T'))}
        </Text>
      </View>
    </Pressable>
  );
}
