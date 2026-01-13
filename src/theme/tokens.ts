import { Platform } from "react-native";

export const colors = {
  bg: "#F7F7F9",
  surface: "#FFFFFF",
  text: "#0A0A0A",
  textMuted: "#6B7280",
  border: "#E5E7EB",
  primary: "#111111",
  primaryMuted: "#9CA3AF",
  accent: "#111111",
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
};

export const typography = {
  label: 12,
  body: 14,
  bodyStrong: 16,
  title: 18,
  titleLg: 20,
};

export const shadow = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  android: {
    elevation: 2,
  },
  default: {},
});
