import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORIT_STORAGE_KEY = '@katalogku_favorit';

const FavoritContext = createContext(null);

export function FavoritProvider({ children }) {
  const [favorit, setFavorit] = useState([]); // daftar produk

  // Slide 86 Tantangan 4: Muat favorit dari AsyncStorage saat pertama kali dibuka
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(FAVORIT_STORAGE_KEY);
        if (stored) {
          setFavorit(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Gagal memuat data favorit:', err);
      }
    })();
  }, []);

  const isFavorit = (id) => favorit.some((p) => p.id === id);

  const toggleFavorit = (produk) => {
    setFavorit((prev) => {
      const baru = prev.some((p) => p.id === produk.id)
        ? prev.filter((p) => p.id !== produk.id) // hapus
        : [...prev, produk]; // tambah

      // Slide 86 Tantangan 4: Simpan ke AsyncStorage setiap kali favorit berubah
      AsyncStorage.setItem(FAVORIT_STORAGE_KEY, JSON.stringify(baru)).catch(
        (err) => console.error('Gagal menyimpan data favorit:', err)
      );

      return baru;
    });
  };

  const value = { favorit, isFavorit, toggleFavorit };

  return (
    <FavoritContext.Provider value={value}>
      {children}
    </FavoritContext.Provider>
  );
}

// Custom hook agar screen cukup memanggil useFavorit()
export function useFavorit() {
  return useContext(FavoritContext);
}
