import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Button from '~/src/components/Button';
import WhiteButton from '~/src/components/WhiteButton';
import { supabase } from '~/src/lib/supabase';

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
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
        <Button title="프로필 저장" />
        <WhiteButton title="로그아웃" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}
