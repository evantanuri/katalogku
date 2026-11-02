import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

/**
 * Komponen CustomInput Reusable (Modul 3)
 * Props:
 * - label: string (opsional, label di atas kolom input)
 * - error: string (opsional, pesan error di bawah input, mengubah border jadi COLORS.danger)
 * - icon: string (opsional, nama ikon Ionicons di sebelah kiri teks input - Latihan 2 WAJIB)
 * - ...rest: props bawaan TextInput (placeholder, value, onChangeText, secureTextEntry, dll.)
 */
export default function CustomInput({ label, error, icon, ...rest }) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        {icon ? (
          <Ionicons
            name={icon}
            size={20}
            color={error ? COLORS.danger : COLORS.muted}
            style={styles.icon}
          />
        ) : null}
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.muted}
          {...rest}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: COLORS.text,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.text,
  },
  icon: {
    marginRight: 8,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  error: {
    marginTop: 4,
    color: COLORS.danger,
    fontSize: 12,
  },
});
