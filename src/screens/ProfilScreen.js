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
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';
import useForm from '../hooks/useForm';
import { validateProfil } from '../utils/validators';
import { COLORS } from '../theme/colors';

const AWAL = {
  nama: 'Evan',
  email: 'evan@mahasiswa.itb.ac.id',
  hp: '081234567890',
  password: '',
  confirmPassword: '',
};

export default function ProfilScreen({ navigation }) {
  const { values, errors, handleChange, handleSubmit, reset } = useForm(
    AWAL,
    validateProfil
  );

  const simpan = (data) => {
    Alert.alert('Berhasil', `Profil ${data.nama} berhasil tersimpan!`);
    reset();
  };

  // Slide 86 Latihan 3 WAJIB: Tombol Simpan nonaktif selama ada field yang kosong
  const isFormIncomplete =
    !values.nama?.trim() ||
    !values.email?.trim() ||
    !values.hp?.trim() ||
    !values.password ||
    !values.confirmPassword;

  return (
    <View style={styles.container}>
      <HeaderBar title="Profil Saya" subtitle="Lengkapi dan kelola akunmu" />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
            }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{values.nama || 'Pengguna'}</Text>
            <Text style={styles.profileNim}>NIM: 18224019</Text>
            <Text style={styles.profileProdi}>
              Sistem dan Teknologi Informasi
            </Text>
          </View>
        </View>

        {/* Form Profil & Validasi (Slide 84-85) */}
        <Text style={styles.sectionHeader}>Edit Informasi Akun</Text>
        <View style={styles.formContainer}>
          <CustomInput
            label="Nama Lengkap"
            icon="person-outline"
            placeholder="Masukkan nama lengkap"
            value={values.nama}
            onChangeText={handleChange('nama')}
            error={errors.nama}
          />

          <CustomInput
            label="Email"
            icon="mail-outline"
            placeholder="contoh@domain.com"
            value={values.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={handleChange('email')}
            error={errors.email}
          />

          <CustomInput
            label="No. HP"
            icon="call-outline"
            placeholder="08123456789"
            value={values.hp}
            keyboardType="phone-pad"
            onChangeText={handleChange('hp')}
            error={errors.hp}
          />

          <CustomInput
            label="Password"
            icon="lock-closed-outline"
            placeholder="Minimal 8 karakter"
            value={values.password}
            secureTextEntry
            onChangeText={handleChange('password')}
            error={errors.password}
          />

          {/* Slide 86 Latihan 1 WAJIB: Konfirmasi Password */}
          <CustomInput
            label="Ulangi Password"
            icon="shield-checkmark-outline"
            placeholder="Ulangi password di atas"
            value={values.confirmPassword}
            secureTextEntry
            onChangeText={handleChange('confirmPassword')}
            error={errors.confirmPassword}
          />

          {/* Slide 86 Latihan 3 WAJIB: Tombol Simpan disabled jika belum lengkap */}
          <View style={styles.submitBtnWrapper}>
            <Button
              title="Simpan Profil"
              disabled={isFormIncomplete}
              onPress={handleSubmit(simpan)}
            />
          </View>
        </View>

        {/* Section Navigasi: Tentang Pengembang (Modul 5 Stack) */}
        <Text style={styles.sectionHeader}>Informasi Aplikasi</Text>
        <View style={styles.menuSection}>
          <Pressable
            style={styles.menuAction}
            onPress={() => navigation?.navigate('Tentang')}
          >
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.actionText}>Tentang Pengembang & Aplikasi</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
          </Pressable>
        </View>

        {/* Tombol Logout */}
        <View style={styles.logoutBtn}>
          <Button
            title="Keluar dari Akun"
            variant="outline"
            onPress={() => Alert.alert('Keluar', 'Sesi Anda telah berakhir.')}
          />
        </View>
      </ScrollView>
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
    paddingBottom: 32,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E5E7EB',
  },
  profileInfo: {
    marginLeft: 14,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  profileNim: {
    fontSize: 13,
    color: COLORS.accent,
    fontWeight: '600',
    marginTop: 2,
  },
  profileProdi: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 20,
  },
  submitBtnWrapper: {
    marginTop: 6,
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    overflow: 'hidden',
  },
  menuAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  actionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  logoutBtn: {
    marginTop: 4,
  },
});
