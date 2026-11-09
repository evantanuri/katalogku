import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import Rating from './Rating';

export default function Card({
  title,
  price,
  image,
  onPress,
  discount,
  rating,
  category,
}) {
  const displayPrice =
    typeof price === 'number' ? `Rp ${price.toLocaleString('id-ID')}` : price;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
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
        <View style={styles.priceRow}>
          <Text style={styles.price}>{displayPrice}</Text>
          {rating !== undefined ? <Rating rating={rating} /> : null}
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
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    elevation: 2, // bayangan Android
    shadowColor: '#000',
    shadowOpacity: 0.08, // bayangan iOS
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1.2,
    backgroundColor: '#EEF2FF',
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
    color: '#fff',
    fontSize: 10,
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
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    minHeight: 32,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  price: {
    fontWeight: 'bold',
    color: COLORS.accent,
    fontSize: 13,
  },
});
