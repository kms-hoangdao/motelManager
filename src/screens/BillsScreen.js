import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BillsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ghi chỉ số & hóa đơn</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default BillsScreen; 