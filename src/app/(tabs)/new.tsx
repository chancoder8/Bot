import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '~/src/components/Button';
import { uploadImage } from '~/src/lib/cloudinary';
import { supabase } from '~/src/lib/supabase';
import { useAuth } from '~/src/providers/AuthProvider';
import { router } from 'expo-router';

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { session } = useAuth();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createPost = async () => {
    if (!image) {
      return;
    }

    setIsLoading(true);
    router.push('/(tabs)');

    const response = await uploadImage(image);
    console.log('image id:', response?.public_id);

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title,
          caption,
          image: response?.public_id,
          user_id: session?.user.id,
        },
      ])
      .select();

    setCaption('');
    setTitle('');
    setImage(null);
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      className="p-3 items-center flex-1"
      behavior="padding"
      keyboardVerticalOffset={110}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-52 aspect-[3/4] bg-slate-500 rounded-lg"
        />
      ) : (
        <View className="w-52 aspect-[3/4] bg-slate-500 rounded-lg" />
      )}

      <Text className=" text-blue-500 font-semibold m-5" onPress={pickImage}>
        사진 선택
      </Text>

      <TextInput
        placeholder="제목을 작성하시오"
        onChangeText={(newValue) => setTitle(newValue)}
        value={title}
        autoCapitalize="none"
        autoComplete="off"
        className="w-full border border-gray-300 p-4 rounded-md mb-5"
      />

      <TextInput
        placeholder="내용을 작성하시오"
        onChangeText={(newValue) => setCaption(newValue)}
        value={caption}
        autoCapitalize="none"
        autoComplete="off"
        multiline={true}
        className="w-full border border-gray-300 p-4 rounded-md"
      />

      <View className="mt-auto w-full">
        <Button onPress={createPost} disabled={isLoading} title="작성완료" />
      </View>
    </KeyboardAvoidingView>
  );
}
