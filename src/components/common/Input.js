import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../styles/theme';
import Text from './Text';

const Input = ({
  label,
  error,
  style,
  inputStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          inputStyle,
        ]}
        placeholderTextColor={COLORS.gray}
        {...props}
      />
      {error && <Text style={styles.error} color="error">{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.base,
  },
  label: {
    marginBottom: SIZES.base / 2,
    ...FONTS.medium,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    ...FONTS.regular,
    fontSize: SIZES.font,
    color: COLORS.textPrimary,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  error: {
    marginTop: SIZES.base / 2,
    fontSize: SIZES.small,
  },
});

export default Input; 