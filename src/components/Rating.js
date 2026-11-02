import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

/**
 * Komponen Rating Reusable (Modul 3 - Latihan 4 TANTANGAN)
 * Props:
 * - rating: number (nilai rating 0 - 5, misal 4.8)
 * - maxRating: number (jumlah bintang, default 5)
 * - size: number (ukuran ikon bintang, default 14)
 * - showScore: boolean (tampilkan angka rating di samping bintang, default true)
 */
export default function Rating({
  rating = 0,
  maxRating = 5,
  size = 14,
  showScore = true,
}) {
  const stars = [];
  const validRating = Math.max(0, Math.min(Number(rating) || 0, maxRating));

  for (let i = 1; i <= maxRating; i++) {
    let iconName = 'star-outline';
    if (validRating >= i) {
      iconName = 'star';
    } else if (validRating >= i - 0.5) {
      iconName = 'star-half';
    }

    stars.push(
      <Ionicons
        key={i}
        name={iconName}
        size={size}
        color={COLORS.star}
        style={styles.starIcon}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.starsRow}>{stars}</View>
      {showScore && validRating > 0 ? (
        <Text style={styles.score}>{validRating.toFixed(1)}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 1,
  },
  score: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
    marginLeft: 3,
  },
});
