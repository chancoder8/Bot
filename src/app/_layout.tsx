import { Stack } from 'expo-router';
import '../../global.css';
import { Image } from 'react-native';
import AuthProvider from '../providers/AuthProvider';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitle: () => (
            <Image
              source={require('assets/logo.png')}
              style={{ width: 18, height: 28 }}
            />
          ),
          headerTintColor: 'black',
          headerBackTitle: 'ㅤ',
        }}
      >
        <Stack.Screen name="[post]" options={{ headerShown: true }} />
      </Stack>
    </AuthProvider>
  );
}
