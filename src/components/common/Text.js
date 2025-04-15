import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, FONTS, SIZES } from '../../styles/theme';

const Text = ({ 
  children, 
  style, 
  variant = 'body',
  color = 'textPrimary',
  ...props 
}) => {
  const getTextStyle = () => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'subtitle':
        return styles.subtitle;
      case 'caption':
        return styles.caption;
      default:
        return styles.body;
    }
  };

  return (
    <RNText
      style={[
        getTextStyle(),
        { color: COLORS[color] },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'subtitle', 'body', 'caption']),
  color: PropTypes.string,
};

Text.defaultProps = {
  variant: 'body',
  color: 'textPrimary',
};

const styles = StyleSheet.create({
  h1: {
    ...FONTS.bold,
    fontSize: SIZES.xxlarge,
    lineHeight: SIZES.xxlarge * 1.4,
  },
  h2: {
    ...FONTS.bold,
    fontSize: SIZES.xlarge,
    lineHeight: SIZES.xlarge * 1.4,
  },
  h3: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    lineHeight: SIZES.large * 1.4,
  },
  subtitle: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    lineHeight: SIZES.medium * 1.4,
  },
  body: {
    ...FONTS.regular,
    fontSize: SIZES.font,
    lineHeight: SIZES.font * 1.4,
  },
  caption: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    lineHeight: SIZES.small * 1.4,
  },
});

export default Text; 