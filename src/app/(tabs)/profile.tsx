import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import Button from '~/src/components/Button';
import WhiteButton from '~/src/components/WhiteButton';
import { supabase } from '~/src/lib/supabase';
import { useAuth } from '~/src/providers/AuthProvider';

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      getProfile();
    }, [])
  );

  const getProfile = async () => {
    if (!user) {
      return;
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single();

    if (error) {
      Alert.alert('프로필을 불러오는데 실패했습니다.');
    }

    setUsername(data.username);
  };

  const updateProfile = async () => {
    if (!user) {
      return;
    }
    const { data, error } = await supabase
      .from('profiles')
      .update({
        id: user.id,
        username,
      })
      .eq('id', user?.id)
      .select();

    if (error) {
      Alert.alert('프로필을 저장하는데 실패했습니다.');
    } else {
      Alert.alert('프로필이 저장되었습니다.');
    }
  };

  return (
    <View className="p-3 flex-1 content-center">
      <Text className="mb-2 text-gray-700 font-semibold">이름</Text>
      <TextInput
        placeholder="이름을 입력하세요"
        value={username}
        onChangeText={setUsername}
        className="border border-gray-300 p-4 rounded-md"
      />

      <View className="mt-auto gap-2">
        <Button onPress={updateProfile} title="프로필 저장" />
        <WhiteButton title="로그아웃" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}
