import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import PostListItem from '~/src/components/PostListItem';
import { supabase } from '~/src/lib/supabase';

interface Props {
  data: any;
  error: any;
}

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let { data, error }: Props = await supabase
      .from('posts')
      .select('*, user:profiles(*)');
    if (error) {
      Alert.alert('오류가 발생하였습니다.');
    }
    setPosts(data);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Refresh indicator will be visible for at least 1 second
  };

  return (
    <FlatList
      data={posts.slice().reverse()}
      renderItem={({ item }) => <PostListItem post={item} />}
      contentContainerStyle={{
        alignSelf: 'center',
        gap: 2,
        width: '100%',
        flex: 1,
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}
