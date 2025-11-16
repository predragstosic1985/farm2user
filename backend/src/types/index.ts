// Global type definitions

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: ApiError[];
    pagination?: {
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
    };
}

export interface ApiError {
    field?: string;
    message: string;
    code?: string;
}

export interface PaginationParams {
    limit?: number;
    offset?: number;
    page?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}

export interface AuthPayload {
    userId: string;
    email: string;
    userType: 'customer' | 'farmer' | 'admin';
    iat: number;
    exp: number;
}

export interface RefreshPayload {
    userId: string;
    iat: number;
    exp: number;
}

export type UserRole = 'customer' | 'farmer' | 'admin';

export type FarmType = 'registered' | 'private';

export type PlantingStage =
    | 'just_planted'
    | 'growing'
    | 'ready_soon'
    | 'ready_now'
    | 'harvesting'
    | 'finished';

export type ReservationStatus =
    | 'pending_payment'
    | 'confirmed'
    | 'ready_for_pickup'
    | 'picked_up'
    | 'delivered'
    | 'cancelled'
    | 'refunded';

export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'ready'
    | 'in_transit'
    | 'delivered'
    | 'cancelled';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export type NotificationType =
    | 'order_confirmation'
    | 'order_status_update'
    | 'reservation_created'
    | 'reservation_cancelled'
    | 'payment_received'
    | 'review_received'
    | 'product_available';
