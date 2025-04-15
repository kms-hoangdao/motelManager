import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useRooms } from '../contexts';
import { COLORS, SIZES } from '../styles/theme';
import { ROOM_STATUS } from '../models/types';
import { Card, Text, Button, Input } from '../components/common';

const EditRoomScreen = ({ route, navigation }) => {
  const { roomId } = route.params;
  const { getRoomById, updateRoom } = useRooms();
  
  const [room, setRoom] = useState(null);
  const [roomNumber, setRoomNumber] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        if (roomData) {
          setRoom(roomData);
          setRoomNumber(roomData.roomNumber);
          setPrice(roomData.price.toString());
          setDescription(roomData.description || '');
        } else {
          Alert.alert(
            'Lỗi',
            'Không tìm thấy thông tin phòng',
            [{ text: 'OK', onPress: () => navigation.goBack() }]
          );
        }
      } catch (error) {
        Alert.alert(
          'Lỗi',
          'Không thể tải thông tin phòng',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
    };

    loadRoom();
  }, [roomId, getRoomById, navigation]);

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

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      await updateRoom(roomId, {
        roomNumber: roomNumber.trim(),
        price: Number(price),
        description: description.trim(),
      });
      
      Alert.alert(
        'Thành công',
        'Thông tin phòng đã được cập nhật',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.goBack() 
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Lỗi',
        'Không thể cập nhật thông tin phòng. Vui lòng thử lại.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  if (!room) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text variant="h2" style={styles.title}>Chỉnh sửa thông tin phòng</Text>
        
        <Input
          label="Số phòng"
          value={roomNumber}
          onChangeText={setRoomNumber}
          placeholder="Nhập số phòng"
          error={errors.roomNumber}
          keyboardType="default"
        />
        
        <Input
          label="Giá phòng (VNĐ/tháng)"
          value={price}
          onChangeText={setPrice}
          placeholder="Nhập giá phòng"
          error={errors.price}
          keyboardType="numeric"
        />
        
        <Input
          label="Mô tả (tùy chọn)"
          value={description}
          onChangeText={setDescription}
          placeholder="Nhập mô tả phòng"
          multiline
          numberOfLines={3}
        />
        
        <View style={styles.buttonContainer}>
          <Button
            title="Hủy"
            onPress={() => navigation.goBack()}
            variant="outline"
            style={styles.cancelButton}
          />
          <Button
            title="Lưu thay đổi"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

EditRoomScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      roomId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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

export default EditRoomScreen; 