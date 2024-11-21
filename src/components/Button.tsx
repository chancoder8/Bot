import { Pressable, Text } from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

export default function Button({ title, onPress, disabled }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-black w-full p-4 items-center rounded-md"
      disabled={disabled}
    >
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  );
}
