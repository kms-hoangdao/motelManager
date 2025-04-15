/**
 * @typedef {Object} Room
 * @property {string} id - Unique identifier for the room
 * @property {string} roomNumber - Room number/identifier
 * @property {RoomStatus} status - Current status of the room
 * @property {number} price - Price per month
 * @property {string|null} currentTenantId - ID of current tenant (if occupied)
 * @property {string} description - Room description
 * @property {string[]} amenities - List of room amenities
 * @property {Date} createdAt - When the room was created
 * @property {Date} updatedAt - When the room was last updated
 */

/**
 * @typedef {('empty'|'occupied'|'cleaning')} RoomStatus
 */

/**
 * @typedef {Object} Tenant
 * @property {string} id - Unique identifier for the tenant
 * @property {string} name - Full name of the tenant
 * @property {string} phone - Phone number
 * @property {string} idCard - ID card number (CCCD)
 * @property {string} roomId - ID of the room they're staying in
 * @property {Date} checkInDate - When they checked in
 * @property {Date|null} checkOutDate - When they checked out (if applicable)
 * @property {number} balance - Current balance/outstanding amount
 * @property {Date} createdAt - When the tenant record was created
 * @property {Date} updatedAt - When the tenant record was last updated
 */

/**
 * @typedef {Object} UtilityBill
 * @property {string} id - Unique identifier for the bill
 * @property {string} roomId - ID of the room
 * @property {string} tenantId - ID of the tenant
 * @property {number} month - Month of the bill (1-12)
 * @property {number} year - Year of the bill
 * @property {number} electricityReading - Current electricity reading
 * @property {number} waterReading - Current water reading
 * @property {number} electricityRate - Rate per unit for electricity
 * @property {number} waterRate - Rate per unit for water
 * @property {number} totalAmount - Total amount for the bill
 * @property {boolean} isPaid - Whether the bill has been paid
 * @property {Date|null} paidDate - When the bill was paid
 * @property {Date} createdAt - When the bill was created
 * @property {Date} updatedAt - When the bill was last updated
 */

/**
 * @typedef {Object} Payment
 * @property {string} id - Unique identifier for the payment
 * @property {string} tenantId - ID of the tenant
 * @property {string} roomId - ID of the room
 * @property {number} amount - Amount paid
 * @property {PaymentType} type - Type of payment
 * @property {string} description - Payment description
 * @property {Date} date - When the payment was made
 * @property {Date} createdAt - When the payment record was created
 * @property {Date} updatedAt - When the payment record was last updated
 */

/**
 * @typedef {('room'|'utility')} PaymentType
 */

export const ROOM_STATUS = {
  EMPTY: 'empty',
  OCCUPIED: 'occupied',
  CLEANING: 'cleaning',
};

export const PAYMENT_TYPE = {
  ROOM: 'room',
  UTILITY: 'utility',
}; 