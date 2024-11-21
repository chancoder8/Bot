import { Redirect, Stack } from 'expo-router';
import { Image } from 'react-native';
import { useAuth } from '~/src/providers/AuthProvider';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerTitle: () => (
          <Image
            source={require('assets/logo.png')}
            style={{ width: 18, height: 28 }}
          />
        ),
        headerTintColor: 'black',
      }}
    />
  );
}
