import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';
import { COLORS } from '../theme/colors';

export default function CartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBar title="Keranjang" subtitle="Daftar produk belanjaan Anda" />
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="cart-outline" size={48} color={COLORS.muted} />
        </View>
        <Text style={styles.emptyTitle}>Keranjang Masih Kosong</Text>
        <Text style={styles.emptySubtitle}>
          Belum ada produk yang ditambahkan ke keranjang belanja Anda.
        </Text>
        <View style={styles.buttonWrapper}>
          <Button
            title="Mulai Belanja"
            onPress={() => navigation?.navigate('Beranda')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  buttonWrapper: {
    width: 180,
  },
});
