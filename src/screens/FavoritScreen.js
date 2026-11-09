import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useFavorit } from '../context/FavoritContext';
import { COLORS } from '../theme/colors';

export default function FavoritScreen({
  navigation,
  favorites: propFavorites,
  onSelectProduct,
  onExplore,
}) {
  const favoritContext = useFavorit();
  const favorites = favoritContext ? favoritContext.favorit : (propFavorites || []);

  const { width } = useWindowDimensions();
  const cols = width >= 768 ? 4 : width >= 500 ? 3 : 2;

  const handleExplore = () => {
    if (navigation?.navigate) {
      navigation.navigate('Beranda');
    } else if (onExplore) {
      onExplore();
    }
  };

  const handleSelect = (item) => {
    if (navigation?.navigate) {
      navigation.navigate('Detail', { id: item.id, product: item });
    } else if (onSelectProduct) {
      onSelectProduct(item);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title="Favorit Saya"
        subtitle={`${favorites.length} produk tersimpan`}
      />
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="heart-outline" size={48} color={COLORS.muted} />
          </View>
          <Text style={styles.emptyTitle}>Belum Ada Favorit</Text>
          <Text style={styles.emptySubtitle}>
            Simpan produk yang Anda sukai dengan menekan ikon hati pada detail
            produk.
          </Text>
          <View style={styles.exploreBtn}>
            <Button title="Jelajahi Katalog" onPress={handleExplore} />
          </View>
        </View>
      ) : (
        <FlatList
          key={cols}
          numColumns={cols}
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              price={item.price}
              image={item.thumbnail}
              discount={item.discount}
              rating={item.rating}
              category={item.category}
              onPress={() => handleSelect(item)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: 10,
    paddingBottom: 24,
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
  exploreBtn: {
    width: 180,
  },
});
