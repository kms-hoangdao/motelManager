import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRooms } from '../contexts';
import { COLORS, SIZES } from '../styles/theme';
import { Card, Text, Button, Input } from '../components/common';

const AddRoomScreen = ({ navigation }) => {
  const { addRoom } = useRooms();
  
  const [roomNumber, setRoomNumber] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!roomNumber.trim()) {
      newErrors.roomNumber = 'Vui lòng nhập số phòng';
    }
    
    if (!price.trim()) {
      newErrors.price = 'Vui lòng nhập giá phòng';
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Giá phòng phải là số dương';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (text, field) => {
    setErrors(prevErrors => ({ ...prevErrors, [field]: null }));
    switch (field) {
      case 'roomNumber':
        setRoomNumber(text);
        break;
      case 'price':
        setPrice(text);
        break;
      case 'description':
        setDescription(text);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      await addRoom({
        roomNumber: roomNumber.trim(),
        price: Number(price),
        description: description.trim(),
      });
      
      Alert.alert(
        'Thành công',
        'Phòng đã được thêm thành công',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.goBack() 
          }
        ]
      );
    } catch (error) {
      console.error('Error adding room:', error);
      Alert.alert(
        'Lỗi',
        `Không thể thêm phòng: ${error.message || 'Vui lòng thử lại.'}`,
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Card style={styles.card}>
            <Text variant="h2" style={styles.title}>Thêm phòng mới</Text>
            
            <Input
              label="Số phòng"
              value={roomNumber}
              onChangeText={(text) => handleInputChange(text, 'roomNumber')}
              placeholder="Nhập số phòng"
              error={errors.roomNumber}
              keyboardType="default"
              returnKeyType="next"
              autoFocus={true}
            />
            
            <Input
              label="Giá phòng (VNĐ/tháng)"
              value={price}
              onChangeText={(text) => handleInputChange(text, 'price')}
              placeholder="Nhập giá phòng"
              error={errors.price}
              keyboardType="numeric"
              returnKeyType="next"
            />
            
            <Input
              label="Mô tả (tùy chọn)"
              value={description}
              onChangeText={(text) => handleInputChange(text, 'description')}
              placeholder="Nhập mô tả phòng"
              multiline
              numberOfLines={4}
              returnKeyType="done"
            />
            
            <View style={styles.buttonContainer}>
              <Button
                title="Hủy"
                onPress={() => navigation.goBack()}
                variant="outline"
                style={styles.cancelButton}
              />
              <Button
                title="Thêm phòng"
                onPress={handleSubmit}
                loading={loading}
                disabled={loading}
              />
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  card: {
    margin: SIZES.padding,
  },
  title: {
    marginBottom: SIZES.padding,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SIZES.padding,
  },
  cancelButton: {
    marginRight: SIZES.base,
  },
});

export default AddRoomScreen; 