import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { COLORS } from "./src/theme/colors";

export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0F172A" : COLORS.background },
      ]}
    >
      <Text
        style={[styles.title, { color: isDark ? "#60A5FA" : COLORS.primary }]}
      >
        KatalogKu
      </Text>
      <Text style={[styles.sub, { color: isDark ? "#94A3B8" : COLORS.muted }]}>
        Setup berhasil! ({isDark ? "Dark Mode" : "Light Mode"})
      </Text>
      <StatusBar style={isDark ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  sub: {
    marginTop: 8,
  },
});
