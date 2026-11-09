import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { FavoritProvider } from './src/context/FavoritContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritProvider>
        <AppNavigator />
        <StatusBar style="light" />
      </FavoritProvider>
    </SafeAreaProvider>
  );
}
