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
          },
        })
      }
    >
      <View className="bg-white p-6">
        <Text className="mb-1 font-bold">{post.title}</Text>
        <Text className="-mb-1 font-normal color-slate-600">
          {post.user.username || '봇유저'}
        </Text>
      </View>
    </Pressable>
  );
}
