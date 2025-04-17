import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useRooms } from '../contexts';
import { COLORS, SIZES } from '../styles/theme';
import { ROOM_STATUS } from '../models/types';
import { Card, Text, Button } from '../components/common';
import { formatCurrency } from '../utils/helpers';

const RoomDetailsScreen = ({ route, navigation }) => {
  const { roomId } = route.params;
  const { getRoomById, removeRoom, setRoomStatus } = useRooms();
  
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        if (roomData) {
          setRoom(roomData);
        } else {
          Alert.alert(
            'Lỗi',
            'Không tìm thấy thông tin phòng',
            [{ text: 'OK', onPress: () => navigation.goBack() }]
          );
        }
      } catch (error) {
        console.error('Error loading room:', error);
        Alert.alert(
          'Lỗi',
          'Không thể tải thông tin phòng',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [roomId, getRoomById, navigation]);

  const getStatusColor = () => {
    switch (room?.status) {
      case ROOM_STATUS.EMPTY:
        return COLORS.roomEmpty;
      case ROOM_STATUS.OCCUPIED:
        return COLORS.roomOccupied;
      case ROOM_STATUS.CLEANING:
        return COLORS.roomCleaning;
      default:
        return COLORS.gray;
    }
  };

  const getStatusText = () => {
    switch (room?.status) {
      case ROOM_STATUS.EMPTY:
        return 'Trống';
      case ROOM_STATUS.OCCUPIED:
        return 'Đang ở';
      case ROOM_STATUS.CLEANING:
        return 'Cần dọn dẹp';
      default:
        return 'Không xác định';
    }
  };

  const handleStatusChange = () => {
    const statusOptions = [
      { label: 'Trống', value: ROOM_STATUS.EMPTY },
      { label: 'Đang ở', value: ROOM_STATUS.OCCUPIED },
      { label: 'Cần dọn dẹp', value: ROOM_STATUS.CLEANING },
    ];

    Alert.alert(
      'Thay đổi trạng thái',
      'Chọn trạng thái mới cho phòng',
      [
        ...statusOptions.map(option => ({
          text: option.label,
          onPress: () => setRoomStatus(roomId, option.value),
        })),
        { text: 'Hủy', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteRoom = () => {
    Alert.alert(
      'Xóa phòng',
      `Bạn có chắc chắn muốn xóa phòng ${room?.roomNumber}?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Xóa', 
          style: 'destructive',
          onPress: async () => {
            try {
              await removeRoom(roomId);
              navigation.goBack();
            } catch (error) {
              Alert.alert(
                'Lỗi',
                'Không thể xóa phòng. Vui lòng thử lại.',
                [{ text: 'OK' }]
              );
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditRoom = () => {
    navigation.navigate('EditRoom', { roomId });
  };

  if (loading || !room) {
    return (
      <View style={styles.centerContainer}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text variant="h2">Phòng {room.roomNumber}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="subtitle" style={styles.sectionTitle}>Thông tin cơ bản</Text>
          <View style={styles.infoRow}>
            <Text variant="body" style={styles.label}>Giá phòng:</Text>
            <Text variant="body">{formatCurrency(room.price)}/tháng</Text>
          </View>
          {room.description && (
            <View style={styles.infoRow}>
              <Text variant="body" style={styles.label}>Mô tả:</Text>
              <Text variant="body">{room.description}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text variant="subtitle" style={styles.sectionTitle}>Người thuê hiện tại</Text>
          {room.currentTenantId ? (
            <Text variant="body">Có người thuê</Text>
          ) : (
            <Text variant="body" style={styles.emptyText}>Chưa có người thuê</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Thay đổi trạng thái"
            onPress={handleStatusChange}
            variant="outline"
            style={styles.button}
          />
          <Button
            title="Chỉnh sửa"
            onPress={handleEditRoom}
            variant="outline"
            style={styles.button}
          />
          <Button
            title="Xóa phòng"
            onPress={handleDeleteRoom}
            variant="outline"
            style={[styles.button, styles.deleteButton]}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

RoomDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      roomId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  card: {
    margin: SIZES.padding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  statusBadge: {
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  statusText: {
    color: COLORS.white,
    fontSize: SIZES.small,
  },
  section: {
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    marginBottom: SIZES.base,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: SIZES.base,
  },
  label: {
    width: 100,
    color: COLORS.textSecondary,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: SIZES.padding,
  },
  button: {
    marginBottom: SIZES.base,
  },
  deleteButton: {
    borderColor: COLORS.error,
    color: "red",
  },
});

export default RoomDetailsScreen; 