import { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Text,
  Image,
  Pressable,
} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Card from '../components/Card';
import CategoryChips from '../components/CategoryChips';
import CustomInput from '../components/CustomInput';
import { DUMMY_PRODUCTS } from '../data/dummy';
import { COLORS } from '../theme/colors';

export default function HomeScreen({ navigation, onSelectProduct }) {
  const [kategori, setKategori] = useState('Semua');
  const [cari, setCari] = useState('');
  const [urutan, setUrutan] = useState('default'); // 'default' | 'termurah' | 'termahal'
  const { width } = useWindowDimensions();

  // Slide 67 Latihan 3: Responsive columns
  const cols = width >= 768 ? 4 : width >= 500 ? 3 : 2;

  // Kategori dinamis dari data (Slide 61)
  const categories = ['Semua', ...new Set(DUMMY_PRODUCTS.map((p) => p.category))];

  // Filter & sort
  const data = DUMMY_PRODUCTS.filter((item) => {
    const cocokKategori = kategori === 'Semua' || item.category === kategori;
    const cocokCari = item.title.toLowerCase().includes(cari.toLowerCase());
    return cocokKategori && cocokCari;
  }).sort((a, b) => {
    if (urutan === 'termurah') return a.price - b.price;
    if (urutan === 'termahal') return b.price - a.price;
    return 0;
  });

  return (
    <View style={styles.container}>
      <HeaderBar title="KatalogKu" subtitle="Temukan produk pilihan nusantara" />
      <FlatList
        key={cols}
        numColumns={cols}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.headerArea}>
            {/* Input pencarian */}
            <CustomInput
              icon="search"
              placeholder="Cari produk batik, kopi, dll..."
              value={cari}
              onChangeText={setCari}
            />

            {/* Slide 67 Latihan 1: Banner Promo */}
            <View style={styles.bannerContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80',
                }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
              <View style={styles.bannerOverlay}>
                <View style={styles.bannerBadge}>
                  <Text style={styles.bannerBadgeText}>PROMO SPESIAL</Text>
                </View>
                <Text style={styles.bannerTitle}>Diskon Hingga 50%</Text>
                <Text style={styles.bannerSub}>
                  Dapatkan penawaran terbaik produk lokal
                </Text>
              </View>
            </View>

            {/* Filter Kategori (Slide 57-58 & 61) */}
            <Text style={styles.sectionTitle}>Kategori</Text>
            <CategoryChips
              items={categories}
              selected={kategori}
              onSelect={setKategori}
            />

            {/* Slide 67 Latihan 2: Sort Chips */}
            <View style={styles.sortRow}>
              <Text style={styles.sortLabel}>Urutan:</Text>
              {[
                { id: 'default', label: 'Semua' },
                { id: 'termurah', label: 'Termurah' },
                { id: 'termahal', label: 'Termahal' },
              ].map((item) => {
                const aktif = urutan === item.id;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setUrutan(item.id)}
                    style={[styles.sortChip, aktif && styles.sortChipActive]}
                  >
                    <Text
                      style={[styles.sortText, aktif && styles.sortTextActive]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.productHeader}>
              <Text style={styles.sectionTitle}>
                Daftar Produk ({data.length})
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ width: `${100 / cols}%` }}>
            <Card
              title={item.title}
              price={item.price}
              image={item.thumbnail}
              discount={item.discount}
              rating={item.rating}
              category={item.category}
              onPress={() => {
                if (navigation) {
                  navigation.navigate('Detail', { id: item.id, product: item });
                } else if (onSelectProduct) {
                  onSelectProduct(item);
                }
              }}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Produk tidak ditemukan</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
  headerArea: {
    paddingHorizontal: 6,
    paddingTop: 12,
  },
  bannerContainer: {
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.primary,
    marginBottom: 16,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.35,
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: 'center',
  },
  bannerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  bannerBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerSub: {
    color: '#E0E7FF',
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 6,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 12,
    gap: 8,
  },
  sortLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
  },
  sortChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sortChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sortText: {
    fontSize: 12,
    color: COLORS.text,
  },
  sortTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productHeader: {
    marginTop: 4,
    marginBottom: 6,
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 14,
  },
});
