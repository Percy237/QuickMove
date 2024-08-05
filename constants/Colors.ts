const primaryColorLight = '#4CAF50'; // Green for light mode
const secondaryColorLight = '#8BC34A'; // Light Green for light mode
const accentColorLight = '#FF9800'; // Orange for light mode

const primaryColorDark = '#66BB6A'; // Light Green for dark mode
const secondaryColorDark = '#81C784'; // Medium Green for dark mode
const accentColorDark = '#FF9800'; // Orange for dark mode

export default {
  light: {
    text: '#212121', // Very Dark Gray
    background: '#FFFFFF', // Pure White
    tint: primaryColorLight,
    tabIconDefault: '#BDBDBD', // Light Gray
    tabIconSelected: primaryColorLight,
    buttonPrimary: primaryColorLight,
    buttonSecondary: secondaryColorLight,
    buttonAccent: accentColorLight,
    buttonDisabled: '#BDBDBD', // Light Gray
    buttonTextPrimary: '#FFFFFF', // Pure White
    buttonTextSecondary: '#212121', // Very Dark Gray
    buttonTextAccent: '#FFFFFF', // Pure White
    border: '#E0E0E0', // Light Gray
  },
  dark: {
    text: '#FFFFFF', // Pure White
    background: '#121212', // Almost Black
    tint: primaryColorDark,
    tabIconDefault: '#B0B0B0', // Light Gray
    tabIconSelected: primaryColorDark,
    buttonPrimary: primaryColorDark,
    buttonSecondary: secondaryColorDark,
    buttonAccent: accentColorDark,
    buttonDisabled: '#424242', // Dark Gray
    buttonTextPrimary: '#FFFFFF', // Pure White
    buttonTextSecondary: '#FFFFFF', // Pure White
    buttonTextAccent: '#212121', // Very Dark Gray
    border: '#333333', // Dark Gray
  },
};
