import { useState } from 'react';
import { ScrollView, View, Alert, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import HeaderBar from './src/components/HeaderBar';
import Button from './src/components/Button';
import Card from './src/components/Card';
import CustomInput from './src/components/CustomInput';
import { COLORS } from './src/theme/colors';

// URL gambar contoh resolusi tinggi untuk pengujian Card
const FOTO_BATIK = 'https://picsum.photos/id/1025/400/400';
const FOTO_KOPI = 'https://picsum.photos/id/425/400/400';

export default function App() {
  const [nama, setNama] = useState('');
  const [pencarian, setPencarian] = useState('');

  const handleSapa = () => {
    if (!nama.trim()) {
      Alert.alert('Peringatan', 'Silakan isi nama terlebih dahulu!');
      return;
    }
    Alert.alert('Halo', `Selamat datang di KatalogKu, ${nama}!`);
  };

  const handleReset = () => {
    setNama('');
    setPencarian('');
  };

  const handleHapus = () => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus data pengujian?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: handleReset },
      ]
    );
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <HeaderBar
        title="KatalogKu"
        subtitle="Uji Coba Komponen Reusable (Modul 3)"
        onBack={() => Alert.alert('Navigasi', 'Kembali ke layar sebelumnya')}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Section 1: Uji Coba CustomInput dengan Live Validation */}
        <Text style={styles.sectionTitle}>1. Pengujian Input & Form</Text>
        <CustomInput
          label="Nama Lengkap"
          placeholder="Tulis nama lengkap Anda..."
          value={nama}
          onChangeText={setNama}
          error={nama === '' ? 'Nama wajib diisi' : null}
        />

        {/* Latihan 2 WAJIB: CustomInput dengan props icon */}
        <CustomInput
          label="Pencarian Produk (Latihan 2 WAJIB)"
          placeholder="Cari produk di KatalogKu..."
          icon="search"
          value={pencarian}
          onChangeText={setPencarian}
        />

        {/* Section 2: Uji Coba Variasi Button */}
        <Text style={styles.sectionTitle}>2. Pengujian Variasi Tombol (Button)</Text>
        <Button
          title="Sapa Pengguna"
          variant="primary"
          onPress={handleSapa}
        />

        <View style={styles.gap} />

        <Button
          title="Reset Form"
          variant="outline"
          onPress={handleReset}
        />

        <View style={styles.gap} />

        {/* Latihan 1 WAJIB: Button variant="danger" */}
        <Button
          title="Hapus Data (Latihan 1 WAJIB)"
          variant="danger"
          icon="trash-outline"
          onPress={handleHapus}
        />

        {/* Section 3: Uji Coba Card Produk (dengan Badge Diskon & Rating) */}
        <Text style={styles.sectionTitle}>
          3. Pengujian Grid Card (Latihan 3 & 4)
        </Text>
        <Text style={styles.sectionSubtitle}>
          Menampilkan badge diskon absolut & komponen bintang Rating
        </Text>

        <View style={styles.row}>
          {/* Card 1 dengan Latihan 3 (discount) dan Latihan 4 (rating) */}
          <Card
            title="Kemeja Batik Parang"
            price={149000}
            image={FOTO_BATIK}
            category="FASHION"
            discount="-20%"
            rating={4.6}
            onPress={() => Alert.alert('Produk', 'Kemeja Batik dipilih')}
          />

          {/* Card 2 dengan rating dan kategori */}
          <Card
            title="Kopi Gayo Arabika 250gr"
            price={45000}
            image={FOTO_KOPI}
            category="GROCERIES"
            discount="-10%"
            rating={4.8}
            onPress={() => Alert.alert('Produk', 'Kopi Gayo dipilih')}
          />
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    backgroundColor: COLORS.background,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 14,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 10,
  },
  gap: {
    height: 10,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -6,
    marginTop: 4,
  },
  bottomSpace: {
    height: 32,
  },
});
