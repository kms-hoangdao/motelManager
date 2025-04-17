import { STORAGE_KEYS, saveData, loadData } from '../utils/storage';
import { createRecord, updateRecord } from '../utils/helpers';
import { ROOM_STATUS } from '../models/types';

/**
 * Get all rooms
 * @returns {Promise<Array>} List of rooms
 */
export const getAllRooms = async () => {
  const rooms = await loadData(STORAGE_KEYS.ROOMS) || [];
  return rooms;
};

/**
 * Get a room by ID
 * @param {string} id - Room ID
 * @returns {Promise<Object|null>} Room object or null if not found
 */
export const getRoomById = async (id) => {
  const rooms = await getAllRooms();
  return rooms.find(room => room.id === id) || null;
};

/**
 * Create a new room
 * @param {Object} roomData - Room data
 * @returns {Promise<Object>} Created room
 */
export const createRoom = async (roomData) => {
  const rooms = await getAllRooms();
  
  // Set default values
  const newRoom = {
    status: ROOM_STATUS.EMPTY,
    currentTenantId: null,
    amenities: [],
    ...roomData,
  };
  
  // Create record with timestamps
  const room = createRecord(newRoom);
  
  // Save to storage
  await saveData(STORAGE_KEYS.ROOMS, [...rooms, room]);
  
  return room;
};

/**
 * Update a room
 * @param {string} id - Room ID
 * @param {Object} updates - Updates to apply
 * @returns {Promise<Object|null>} Updated room or null if not found
 */
export const updateRoom = async (id, updates) => {
  const rooms = await getAllRooms();
  const roomIndex = rooms.findIndex(room => room.id === id);
  
  if (roomIndex === -1) {
    return null;
  }
  
  // Update record with timestamps
  const updatedRoom = updateRecord(rooms[roomIndex], updates);
  
  // Save to storage
  rooms[roomIndex] = updatedRoom;
  await saveData(STORAGE_KEYS.ROOMS, rooms);
  
  return updatedRoom;
};

/**
 * Delete a room
 * @param {string} id - Room ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
export const deleteRoom = async (id) => {
  const rooms = await getAllRooms();
  const filteredRooms = rooms.filter(room => room.id !== id);
  
  if (filteredRooms.length === rooms.length) {
    return false; // No room was deleted
  }
  
  // Save to storage
  await saveData(STORAGE_KEYS.ROOMS, filteredRooms);
  
  return true;
};

/**
 * Change room status
 * @param {string} id - Room ID
 * @param {string} status - New status
 * @returns {Promise<Object|null>} Updated room or null if not found
 */
export const changeRoomStatus = async (id, status) => {
  if (!Object.values(ROOM_STATUS).includes(status)) {
    throw new Error('Invalid room status');
  }
  
  return updateRoom(id, { status });
};

/**
 * Assign tenant to room
 * @param {string} roomId - Room ID
 * @param {string} tenantId - Tenant ID
 * @returns {Promise<Object|null>} Updated room or null if not found
 */
export const assignTenantToRoom = async (roomId, tenantId) => {
  return updateRoom(roomId, {
    currentTenantId: tenantId,
    status: ROOM_STATUS.OCCUPIED,
  });
};

/**
 * Remove tenant from room
 * @param {string} roomId - Room ID
 * @returns {Promise<Object|null>} Updated room or null if not found
 */
export const removeTenantFromRoom = async (roomId) => {
  return updateRoom(roomId, {
    currentTenantId: null,
    status: ROOM_STATUS.CLEANING,
  });
}; 