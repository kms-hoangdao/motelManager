import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  ROOMS: '@motel_manager:rooms',
  TENANTS: '@motel_manager:tenants',
  BILLS: '@motel_manager:bills',
  PAYMENTS: '@motel_manager:payments',
};

/**
 * Saves data to AsyncStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to save
 */
export const saveData = async (key, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

/**
 * Loads data from AsyncStorage
 * @param {string} key - Storage key
 * @returns {Promise<any>} Loaded data
 */
export const loadData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
};

/**
 * Removes data from AsyncStorage
 * @param {string} key - Storage key
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
    throw error;
  }
};

export { STORAGE_KEYS }; 