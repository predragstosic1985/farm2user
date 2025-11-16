// Business Constants

export const DEPOSIT_PERCENTAGE = 0.3; // 30% deposit requirement

export const BCRYPT_ROUNDS = 10; // Password hashing rounds

export const USER_ROLES = {
    CUSTOMER: 'customer',
    FARMER: 'farmer',
    ADMIN: 'admin',
} as const;

export const FARM_TYPES = {
    REGISTERED: 'registered', // Verified agricultural farm
    PRIVATE: 'private', // Private garden/small farm
} as const;

export const PLANTING_STAGES = {
    JUST_PLANTED: 'just_planted',
    GROWING: 'growing',
    READY_SOON: 'ready_soon',
    READY_NOW: 'ready_now',
    HARVESTING: 'harvesting',
    FINISHED: 'finished',
} as const;

export const RESERVATION_STATUS = {
    PENDING_PAYMENT: 'pending_payment',
    CONFIRMED: 'confirmed',
    READY_FOR_PICKUP: 'ready_for_pickup',
    PICKED_UP: 'picked_up',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
} as const;

export const ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    READY: 'ready',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
} as const;

export const PAYMENT_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
} as const;

export const NOTIFICATION_TYPES = {
    ORDER_CONFIRMATION: 'order_confirmation',
    ORDER_STATUS_UPDATE: 'order_status_update',
    RESERVATION_CREATED: 'reservation_created',
    RESERVATION_CANCELLED: 'reservation_cancelled',
    PAYMENT_RECEIVED: 'payment_received',
    REVIEW_RECEIVED: 'review_received',
    PRODUCT_AVAILABLE: 'product_available',
} as const;

export const ERROR_CODES = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    CONFLICT: 'CONFLICT',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    INVALID_TOKEN: 'INVALID_TOKEN',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
    PRODUCT_OUT_OF_STOCK: 'PRODUCT_OUT_OF_STOCK',
} as const;

export const API_LIMITS = {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_PRODUCTS_PER_PAGE: 100,
    DEFAULT_PAGE_SIZE: 20,
    MAX_SEARCH_RESULTS: 1000,
} as const;
