import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';
import Rating from '../components/Rating';
import { COLORS } from '../theme/colors';
import { DUMMY_PRODUCTS } from '../data/dummy';
import { useFavorit } from '../context/FavoritContext';

export default function DetailScreen({
  route,
  navigation,
  product: propProduct,
  onBack: propOnBack,
  onToggleFavorite,
  isFavorite = false,
}) {
  const favoritContext = useFavorit();
  const { id, product: routeProduct } = route?.params || {};
  const product =
    routeProduct ||
    (id ? DUMMY_PRODUCTS.find((p) => p.id === id) : null) ||
    propProduct ||
    DUMMY_PRODUCTS[0];

  const fav = favoritContext
    ? favoritContext.isFavorit(product?.id)
    : isFavorite;

  const handleToggleFav = () => {
    if (favoritContext) {
      favoritContext.toggleFavorit(product);
    } else if (onToggleFavorite) {
      onToggleFavorite(product);
    }
  };

  const handleBack = () => {
    if (navigation?.goBack) {
      navigation.goBack();
    } else if (propOnBack) {
      propOnBack();
    }
  };

  if (!product) return null;

  const displayPrice =
    typeof product.price === 'number'
      ? `Rp ${product.price.toLocaleString('id-ID')}`
      : product.price;

  return (
    <View style={styles.container}>
      {/* Slide 75 Latihan 2: Judul dinamis nama produk di HeaderBar */}
      <HeaderBar
        title={product.title}
        subtitle={product.category}
        onBack={handleBack}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.body}>
          <View style={styles.headerRow}>
            <View style={styles.titleArea}>
              {product.category ? (
                <Text style={styles.category}>
                  {product.category.toUpperCase()}
                </Text>
              ) : null}
              <Text style={styles.title}>{product.title}</Text>
            </View>
            <Pressable
              onPress={handleToggleFav}
              style={styles.favButton}
              hitSlop={10}
            >
              <Ionicons
                name={fav ? 'heart' : 'heart-outline'}
                size={26}
                color={fav ? COLORS.accent : COLORS.muted}
              />
            </Pressable>
          </View>

          <View style={styles.ratingRow}>
            <Rating rating={product.rating} />
            <Text style={styles.reviewsText}>
              ({product.reviewsCount || 45} ulasan)
            </Text>
          </View>

          <Text style={styles.price}>{displayPrice}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Deskripsi Produk</Text>
          <Text style={styles.description}>{product.description}</Text>

          {product.specs && product.specs.length > 0 ? (
            <View style={styles.specsBox}>
              <Text style={styles.sectionTitle}>Spesifikasi</Text>
              {product.specs.map((item, index) => (
                <Text key={index} style={styles.specItem}>
                  {item}
                </Text>
              ))}
            </View>
          ) : null}
          {/* Tombol Favorit (Slide 79) */}
          <View style={styles.favActionWrapper}>
            <Button
              title={fav ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
              variant={fav ? 'outline' : 'primary'}
              onPress={handleToggleFav}
            />
          </View>
        </View>
      </ScrollView>

      {/* Floating Action / Bottom Bar */}
      <View style={styles.bottomBar}>
        <Button
          title="Tambah ke Keranjang"
          onPress={() =>
            Alert.alert(
              'Berhasil',
              `${product.title} ditambahkan ke keranjang.`
            )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingBottom: 24,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1.25,
    backgroundColor: '#EEF2FF',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleArea: {
    flex: 1,
    paddingRight: 12,
  },
  category: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  favButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  reviewsText: {
    fontSize: 12,
    color: COLORS.muted,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
  },
  specsBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: COLORS.background,
    borderRadius: 8,
  },
  favActionWrapper: {
    marginTop: 20,
    marginBottom: 8,
  },
  specItem: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 4,
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: '#fff',
  },
});
