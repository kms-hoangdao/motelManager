import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RoomsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý phòng</Text>
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

export default RoomsScreen; 