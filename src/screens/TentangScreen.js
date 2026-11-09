import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/colors';

export default function TentangScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBar
        title="Tentang Pengembang"
        subtitle="Informasi aplikasi dan pengembang"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="school-outline" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.appName}>KatalogKu</Text>
          <Text style={styles.appVersion}>Versi 1.0.0 — Modul 5</Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Nama Pengembang</Text>
            <Text style={styles.value}>Evan</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>NIM</Text>
            <Text style={styles.value}>18224019</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Mata Kuliah</Text>
            <Text style={styles.value}>
              Pengembangan Aplikasi Web & Mobile (PAWM)
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Institusi</Text>
            <Text style={styles.value}>Institut Teknologi Bandung</Text>
          </View>
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
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  appVersion: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 13,
    color: COLORS.muted,
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
});
