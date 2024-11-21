import { Pressable, Text } from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => void;
};

export default function WhiteButton({ title, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white w-full p-4 items-center rounded-md border-gray-950 border-2"
    >
      <Text className="text-black font-semibold">{title}</Text>
    </Pressable>
  );
}
