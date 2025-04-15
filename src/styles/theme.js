import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0056B3',
  primaryLight: '#4DA3FF',

  // Secondary colors
  secondary: '#34C759',
  secondaryDark: '#248A3D',
  secondaryLight: '#5CDB95',

  // Status colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5856D6',

  // Room status colors
  roomEmpty: '#34C759',
  roomOccupied: '#FF3B30',
  roomCleaning: '#FF9500',

  // Grayscale
  white: '#FFFFFF',
  background: '#F2F2F7',
  lightGray: '#E5E5EA',
  gray: '#8E8E93',
  darkGray: '#636366',
  black: '#000000',

  // Text colors
  textPrimary: '#000000',
  textSecondary: '#636366',
  textLight: '#8E8E93',
};

export const SIZES = {
  // Global sizes
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  xlarge: 24,
  xxlarge: 32,

  // Screen dimensions
  width,
  height,

  // Spacing
  padding: 16,
  margin: 16,
  radius: 8,
};

export const FONTS = {
  regular: {
    fontFamily: 'System',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500',
  },
  bold: {
    fontFamily: 'System',
    fontWeight: '700',
  },
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 6,
  },
};

const theme = {
  COLORS,
  SIZES,
  FONTS,
  SHADOWS,
};

export default theme; 