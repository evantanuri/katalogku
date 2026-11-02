import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import Rating from './Rating';

/**
 * Komponen Card Reusable (Modul 3)
 * Props:
 * - title: string (nama produk, dibatasi 2 baris)
 * - price: number | string (harga produk, format angka atau string berformat)
 * - image: string (URL gambar produk)
 * - onPress: function (callback saat kartu ditekan)
 * - discount: string (opsional, misal "-10%" - Latihan 3 WAJIB)
 * - rating: number (opsional, rating 0 - 5 - Latihan 4 TANTANGAN)
 * - category: string (opsional, misal "FASHION", "GROCERIES" sesuai Figma)
 */
export default function Card({
  title,
  price,
  image,
  onPress,
  discount,
  rating,
  category,
}) {
  const formatPrice = (val) => {
    if (typeof val === 'number') {
      // Jika angka kecil (misal 10 atau 25 pada tes slide 51), tampilkan $ val.
      // Jika angka ribuan (standar rupiah Indonesia), format Rp X.XXX.
      return val < 100 ? `$ ${val}` : `Rp ${val.toLocaleString('id-ID')}`;
    }
    if (typeof val === 'string') {
      if (val.startsWith('$') || val.startsWith('Rp')) {
        return val;
      }
      return `Rp ${val}`;
    }
    return val;
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        {discount ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{discount}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        {category ? (
          <Text style={styles.category}>{category.toUpperCase()}</Text>
        ) : null}
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          {rating !== undefined && rating !== null ? (
            <Rating rating={rating} size={11} />
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2, // bayangan Android
    shadowColor: '#000', // bayangan iOS
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#EEEEEE',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  body: {
    padding: 10,
  },
  category: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    color: COLORS.text,
    minHeight: 36,
    fontWeight: '500',
  },
  footer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: 'bold',
    color: COLORS.accent,
    fontSize: 14,
  },
});
