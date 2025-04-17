import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const TenantsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý người thuê</Text>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm người thuê"
      />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
});

export default TenantsScreen; 