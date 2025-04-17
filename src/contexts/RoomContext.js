import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  getAllRooms, 
  createRoom, 
  updateRoom, 
  deleteRoom, 
  changeRoomStatus,
  assignTenantToRoom,
  removeTenantFromRoom,
  getRoomById
} from '../services/roomService';
import { ROOM_STATUS } from '../models/types';

// Create context
const RoomContext = createContext();

// Custom hook to use the room context
export const useRooms = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRooms must be used within a RoomProvider');
  }
  return context;
};

// Provider component
export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load rooms on mount
  useEffect(() => {
    loadRooms();
  }, []);

  // Load all rooms
  const loadRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllRooms();
      setRooms(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new room
  const addRoom = async (roomData) => {
    try {
      setError(null);
      const newRoom = await createRoom(roomData);
      setRooms(prevRooms => [...prevRooms, newRoom]);
      return newRoom;
    } catch (err) {
      setError(err.message);
      console.error('Error adding room:', err);
      throw err;
    }
  };

  // Update a room
  const editRoom = async (id, updates) => {
    try {
      setError(null);
      const updatedRoom = await updateRoom(id, updates);
      if (updatedRoom) {
        setRooms(prevRooms => 
          prevRooms.map(room => room.id === id ? updatedRoom : room)
        );
      }
      return updatedRoom;
    } catch (err) {
      setError(err.message);
      console.error('Error updating room:', err);
      throw err;
    }
  };

  // Delete a room
  const removeRoom = async (id) => {
    try {
      setError(null);
      const success = await deleteRoom(id);
      if (success) {
        setRooms(prevRooms => prevRooms.filter(room => room.id !== id));
      }
      return success;
    } catch (err) {
      setError(err.message);
      console.error('Error deleting room:', err);
      throw err;
    }
  };

  // Change room status
  const setRoomStatus = async (id, status) => {
    try {
      setError(null);
      const updatedRoom = await changeRoomStatus(id, status);
      if (updatedRoom) {
        setRooms(prevRooms => 
          prevRooms.map(room => room.id === id ? updatedRoom : room)
        );
      }
      return updatedRoom;
    } catch (err) {
      setError(err.message);
      console.error('Error changing room status:', err);
      throw err;
    }
  };

  // Assign tenant to room
  const assignTenant = async (roomId, tenantId) => {
    try {
      setError(null);
      const updatedRoom = await assignTenantToRoom(roomId, tenantId);
      if (updatedRoom) {
        setRooms(prevRooms => 
          prevRooms.map(room => room.id === roomId ? updatedRoom : room)
        );
      }
      return updatedRoom;
    } catch (err) {
      setError(err.message);
      console.error('Error assigning tenant to room:', err);
      throw err;
    }
  };

  // Remove tenant from room
  const removeTenant = async (roomId) => {
    try {
      setError(null);
      const updatedRoom = await removeTenantFromRoom(roomId);
      if (updatedRoom) {
        setRooms(prevRooms => 
          prevRooms.map(room => room.id === roomId ? updatedRoom : room)
        );
      }
      return updatedRoom;
    } catch (err) {
      setError(err.message);
      console.error('Error removing tenant from room:', err);
      throw err;
    }
  };

  // Get rooms by status
  const getRoomsByStatus = (status) => {
    return rooms.filter(room => room.status === status);
  };

  // Get empty rooms
  const getEmptyRooms = () => {
    return getRoomsByStatus(ROOM_STATUS.EMPTY);
  };

  // Get occupied rooms
  const getOccupiedRooms = () => {
    return getRoomsByStatus(ROOM_STATUS.OCCUPIED);
  };

  // Get rooms needing cleaning
  const getCleaningRooms = () => {
    return getRoomsByStatus(ROOM_STATUS.CLEANING);
  };

  // Get a room by ID
  const getRoom = async (id) => {
    try {
      setError(null);
      const room = await getRoomById(id);
      return room;
    } catch (err) {
      setError(err.message);
      console.error('Error getting room:', err);
      throw err;
    }
  };

  // Context value
  const value = {
    rooms,
    loading,
    error,
    loadRooms,
    addRoom,
    editRoom,
    removeRoom,
    setRoomStatus,
    assignTenant,
    removeTenant,
    getRoomsByStatus,
    getEmptyRooms,
    getOccupiedRooms,
    getCleaningRooms,
    getRoomById: getRoom,
  };

  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  );
}; 