import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function Rating({ rating = 0 }) {
  const stars = [];
  const fullStars = Math.floor(rating);

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Ionicons
        key={i}
        name={i <= fullStars ? 'star' : 'star-outline'}
        size={12}
        color={COLORS.star || '#F59E0B'}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.stars}>{stars}</View>
      <Text style={styles.text}>{rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  stars: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 11,
    color: COLORS.muted,
    marginLeft: 4,
  },
});
