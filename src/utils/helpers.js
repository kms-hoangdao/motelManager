/**
 * Generates a unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Creates a new record with timestamps
 * @param {Object} data - The data for the record
 * @returns {Object} Record with timestamps
 */
export const createRecord = (data) => {
  const now = new Date();
  return {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
};

/**
 * Updates an existing record with new timestamp
 * @param {Object} record - The existing record
 * @param {Object} updates - The updates to apply
 * @returns {Object} Updated record
 */
export const updateRecord = (record, updates) => {
  return {
    ...record,
    ...updates,
    updatedAt: new Date(),
  };
};

/**
 * Formats a date to a readable string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formats a currency amount
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}; 