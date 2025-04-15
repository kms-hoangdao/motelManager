import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useRooms } from '../contexts';
import { COLORS, SIZES } from '../styles/theme';
import { ROOM_STATUS } from '../models/types';
import { Card, Text, Button } from '../components/common';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../utils/helpers';

const RoomCard = ({ room, onPress, onStatusChange }) => {
  const getStatusColor = () => {
    switch (room.status) {
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
    switch (room.status) {
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

  return (
    <Card style={styles.roomCard}>
      <TouchableOpacity onPress={onPress} style={styles.roomContent}>
        <View style={styles.roomHeader}>
          <Text variant="h3">Phòng {room.roomNumber}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>
        </View>
        
        <View style={styles.roomDetails}>
          <Text variant="body">Giá: {formatCurrency(room.price)}/tháng</Text>
          {room.description && (
            <Text variant="body" style={styles.description}>
              {room.description}
            </Text>
          )}
        </View>
        
        <View style={styles.roomActions}>
          <Button 
            title="Thay đổi trạng thái" 
            onPress={onStatusChange}
            variant="outline"
            style={styles.actionButton}
          />
        </View>
      </TouchableOpacity>
    </Card>
  );
};

RoomCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    roomNumber: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.values(ROOM_STATUS)).isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

const RoomsScreen = ({ navigation }) => {
  const { 
    rooms, 
    loading, 
    error, 
    loadRooms, 
    removeRoom, 
    setRoomStatus 
  } = useRooms();
  
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredRooms = selectedStatus === 'all' 
    ? rooms 
    : rooms.filter(room => room.status === selectedStatus);

  const handleRoomPress = (room) => {
    navigation.navigate('RoomDetails', { roomId: room.id });
  };

  const handleStatusChange = (room) => {
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
          onPress: () => setRoomStatus(room.id, option.value),
        })),
        { text: 'Hủy', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteRoom = (room) => {
    Alert.alert(
      'Xóa phòng',
      `Bạn có chắc chắn muốn xóa phòng ${room.roomNumber}?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Xóa', 
          style: 'destructive',
          onPress: () => removeRoom(room.id),
        },
      ],
      { cancelable: true }
    );
  };

  const handleAddRoom = () => {
    navigation.navigate('AddRoom');
  };

  const renderStatusFilter = () => (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedStatus === 'all' && styles.filterButtonActive,
        ]}
        onPress={() => setSelectedStatus('all')}
      >
        <Text 
          style={[
            styles.filterText,
            selectedStatus === 'all' && styles.filterTextActive,
          ]}
        >
          Tất cả
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedStatus === ROOM_STATUS.EMPTY && styles.filterButtonActive,
        ]}
        onPress={() => setSelectedStatus(ROOM_STATUS.EMPTY)}
      >
        <Text 
          style={[
            styles.filterText,
            selectedStatus === ROOM_STATUS.EMPTY && styles.filterTextActive,
          ]}
        >
          Trống
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedStatus === ROOM_STATUS.OCCUPIED && styles.filterButtonActive,
        ]}
        onPress={() => setSelectedStatus(ROOM_STATUS.OCCUPIED)}
      >
        <Text 
          style={[
            styles.filterText,
            selectedStatus === ROOM_STATUS.OCCUPIED && styles.filterTextActive,
          ]}
        >
          Đang ở
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedStatus === ROOM_STATUS.CLEANING && styles.filterButtonActive,
        ]}
        onPress={() => setSelectedStatus(ROOM_STATUS.CLEANING)}
      >
        <Text 
          style={[
            styles.filterText,
            selectedStatus === ROOM_STATUS.CLEANING && styles.filterTextActive,
          ]}
        >
          Cần dọn dẹp
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text color="error">Lỗi: {error}</Text>
        <Button title="Thử lại" onPress={loadRooms} style={styles.retryButton} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2">Danh sách phòng</Text>
        <TouchableOpacity onPress={handleAddRoom} style={styles.addButton}>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      {renderStatusFilter()}
      
      {filteredRooms.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>Không có phòng nào</Text>
          <Button 
            title="Thêm phòng mới" 
            onPress={handleAddRoom} 
            style={styles.addRoomButton}
          />
        </View>
      ) : (
        <FlatList
          data={filteredRooms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RoomCard
              room={item}
              onPress={() => handleRoomPress(item)}
              onStatusChange={() => handleStatusChange(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

RoomsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  addButton: {
    padding: SIZES.base,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
  },
  filterButton: {
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    marginRight: SIZES.base,
    backgroundColor: COLORS.lightGray,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  listContent: {
    paddingBottom: SIZES.padding,
  },
  roomCard: {
    marginBottom: SIZES.padding,
  },
  roomContent: {
    width: '100%',
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base,
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
  roomDetails: {
    marginBottom: SIZES.padding,
  },
  description: {
    marginTop: SIZES.base,
  },
  roomActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: SIZES.base,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addRoomButton: {
    marginTop: SIZES.padding,
  },
  retryButton: {
    marginTop: SIZES.padding,
  },
});

export default RoomsScreen; 