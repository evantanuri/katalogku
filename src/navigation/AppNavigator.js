import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritScreen from '../screens/FavoritScreen';
import ProfilScreen from '../screens/ProfilScreen';
import CartScreen from '../screens/CartScreen';
import TentangScreen from '../screens/TentangScreen';
import { useFavorit } from '../context/FavoritContext';
import { COLORS } from '../theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Peta ikon tab (Slide 71 & Latihan 1: Tab Keranjang)
const ICONS = {
  Beranda: 'home',
  Favorit: 'heart',
  Keranjang: 'cart',
  Profil: 'person',
};

// Tab bawah: Beranda | Favorit | Keranjang | Profil (Slide 72)
function TabNavigator() {
  const favoritContext = useFavorit();
  const count = favoritContext?.favorit?.length || 0;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        tabBarIcon: ({ color, size, focused }) => {
          const iconBase = ICONS[route.name] || 'square';
          const iconName = focused ? iconBase : `${iconBase}-outline`;
          return <Ionicons name={iconName} size={size || 22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Beranda" component={HomeScreen} />
      {/* Slide 86 Latihan 2 WAJIB: Badge jumlah favorit */}
      <Tab.Screen
        name="Favorit"
        component={FavoritScreen}
        options={{
          tabBarBadge: count > 0 ? count : undefined,
          tabBarBadgeStyle: {
            backgroundColor: COLORS.accent,
            color: '#fff',
            fontSize: 10,
          },
        }}
      />
      <Tab.Screen name="Keranjang" component={CartScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}

// Stack utama: Tab (Main) -> Detail -> Tentang (Slide 73 & Latihan 3)
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Tentang" component={TentangScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
