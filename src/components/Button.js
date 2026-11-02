import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

/**
 * Komponen Button Reusable (Modul 3)
 * Props:
 * - title: string (label tombol)
 * - onPress: function (callback saat ditekan)
 * - variant: 'primary' (default) | 'outline' | 'danger' (Latihan 1 WAJIB)
 * - disabled: boolean (opsional, nonaktifkan tombol)
 * - icon: string (opsional, nama ikon Ionicons di sebelah kiri label)
 */
export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  icon,
}) {
  const isOutline = variant === 'outline';
  const isDanger = variant === 'danger';

  const getVariantStyle = () => {
    if (isOutline) return styles.outline;
    if (isDanger) return styles.danger;
    return styles.primary;
  };

  const getTextStyle = () => {
    if (isOutline) return styles.textOutline;
    return styles.text;
  };

  const iconColor = isOutline ? COLORS.primary : '#FFFFFF';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        getVariantStyle(),
        (pressed || disabled) && styles.dim,
      ]}
    >
      {icon ? (
        <Ionicons
          name={icon}
          size={18}
          color={iconColor}
          style={styles.icon}
        />
      ) : null}
      <Text style={[styles.text, getTextStyle()]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: COLORS.danger,
  },
  dim: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textOutline: {
    color: COLORS.primary,
  },
});
