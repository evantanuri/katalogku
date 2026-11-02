import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

/**
 * Komponen HeaderBar Reusable (Modul 3)
 * Props:
 * - title: string (judul utama header)
 * - subtitle: string (opsional, teks keterangan di bawah judul)
 * - onBack: function (opsional, memicu tombol panah kembali di sebelah kiri)
 */
export default function HeaderBar({ title, subtitle, onBack }) {
  const insets = useSafeAreaInsets(); // jarak aman dari notch/status bar HP

  return (
    <View style={[styles.bar, { paddingTop: insets.top + 12 }]}>
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={10} style={styles.back}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
      ) : null}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  back: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sub: {
    color: '#C9D5D6',
    fontSize: 13,
    marginTop: 2,
  },
});
