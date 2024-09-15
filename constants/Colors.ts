const primaryColorLight = "#007BFF"; // Bright Blue for light mode
const secondaryColorLight = "#00BFFF"; // Deep Sky Blue for light mode
const accentColorLight = "#FFC107"; // Amber for light mode
const backgroundAccentLight = "#F8F9FA"; // Light Gray for a clean look

const primaryColorDark = "#1E90FF"; // Dodger Blue for dark mode
const secondaryColorDark = "#4682B4"; // Steel Blue for dark mode
const accentColorDark = "#FFC107"; // Amber for dark mode
const backgroundAccentDark = "#1E1E1E"; // Dark Gray for high contrast

export default {
  light: {
    text: "#000000", // Black for text
    background: "#FFFFFF", // White for background
    tint: primaryColorLight,
    tabIconDefault: "#6C757D", // Gray
    tabIconSelected: primaryColorLight,
    buttonPrimary: primaryColorLight,
    buttonSecondary: secondaryColorLight,
    accentColor: accentColorLight,
    buttonDisabled: "#BDC3C7", // Light Gray for disabled
    buttonTextPrimary: "#FFFFFF", // White for button text
    buttonTextSecondary: "#000000", // Black for button text
    buttonTextAccent: "#FFFFFF", // White for accent button text
    border: "#CED4DA", // Light Gray for borders
    titlePrimary: "#003366", // Dark Blue for primary titles
    titleSecondary: "#0056A0", // Medium Blue for secondary titles
    backgroundAccent: backgroundAccentLight, // Light Gray background accent
  },
  dark: {
    text: "#EAEAEA", // Light Gray for text
    background: "#121212", // Almost Black for background
    tint: primaryColorDark,
    tabIconDefault: "#B0B0B0", // Light Gray for default tab icons
    tabIconSelected: primaryColorDark,
    buttonPrimary: primaryColorDark,
    buttonSecondary: secondaryColorDark,
    accentColor: accentColorDark,
    buttonDisabled: "#424242", // Dark Gray for disabled buttons
    buttonTextPrimary: "#FFFFFF", // White for button text
    buttonTextSecondary: "#EAEAEA", // Light Gray for secondary button text
    buttonTextAccent: "#212121", // Very Dark Gray for accent button text
    border: "#333333", // Dark Gray for borders
    titlePrimary: "#66BB6A", // Light Green for primary titles
    titleSecondary: "#81C784", // Medium Green for secondary titles
    backgroundAccent: backgroundAccentDark, // Dark Gray background accent
  },
};
