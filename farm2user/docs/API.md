# Farm2Door API Documentation

## Overview
The Farm2Door API provides endpoints for managing farmers, products, reservations, and orders within the platform. This document outlines the key endpoints and their specifications.

## Base URL
```
http://localhost:3000/api
```

## Authentication
All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

Tokens are obtained via the `/auth/login` endpoint and expire after 24 hours.

## Content Type
All requests and responses use JSON:
```
Content-Type: application/json
```

## Error Responses
Standard error format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error"
    }
  ]
}
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user (customer or farmer).

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "userType": "customer|farmer"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "userType": "customer",
    "createdAt": "2024-01-15T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:** Same as registration

#### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Farmers

#### POST /farmers/profile
Create or update farmer profile (requires authentication).

**Request Body:**
```json
{
  "farmName": "Green Valley Farm",
  "bio": "Organic farming since 2010",
  "location": "California, USA",
  "certifications": ["organic", "fair-trade"],
  "phone": "+1-555-0123"
}
```

#### GET /farmers/:id/profile
Get farmer profile by ID.

#### GET /farmers/top-rated
Get top-rated farmers (public endpoint).

**Query Parameters:**
- `limit`: Number of results (default: 10)
- `offset`: Pagination offset (default: 0)

### Products

#### POST /products
Create new product (farmer only).

**Request Body:**
```json
{
  "name": "Organic Tomatoes",
  "description": "Fresh, locally grown tomatoes",
  "basePrice": 5.99,
  "unit": "kg",
  "category": "vegetables",
  "images": ["url1", "url2"],
  "farmId": "uuid"
}
```

#### GET /products
List all available products.

**Query Parameters:**
- `category`: Filter by category
- `farmerIds`: Comma-separated farmer IDs
- `searchTerm`: Search by name/description
- `limit`: Number of results (default: 20)
- `offset`: Pagination offset (default: 0)

#### GET /products/:id
Get product details by ID.

### Reservations

#### POST /reservations
Create a new reservation (customer only).

**Request Body:**
```json
{
  "productId": "uuid",
  "quantity": 5,
  "reservationDate": "2024-02-15T10:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "productId": "uuid",
    "quantity": 5,
    "deposit": 14.975,
    "status": "pending_payment",
    "expiresAt": "2024-02-15T18:00:00Z",
    "createdAt": "2024-02-15T10:00:00Z"
  }
}
```

#### GET /reservations
Get user's reservations (requires authentication).

#### PATCH /reservations/:id
Update reservation status (farmer only).

**Request Body:**
```json
{
  "status": "confirmed|cancelled|completed"
}
```

### Orders

#### POST /orders
Create order from reservations (customer only).

**Request Body:**
```json
{
  "reservationIds": ["uuid1", "uuid2"],
  "shippingMethod": "pickup|delivery"
}
```

#### GET /orders
Get user's orders (requires authentication).

#### GET /orders/:id
Get order details by ID.

### Reviews

#### POST /reviews
Create review for completed order (customer only).

**Request Body:**
```json
{
  "orderId": "uuid",
  "rating": 5,
  "title": "Excellent fresh produce",
  "comment": "Best tomatoes I've had in years!",
  "categories": {
    "quality": 5,
    "freshness": 5,
    "packaging": 4,
    "delivery": 5
  }
}
```

#### GET /reviews
List reviews with filters.

**Query Parameters:**
- `farmerId`: Filter by farmer
- `productId`: Filter by product
- `minRating`: Filter by minimum rating
- `limit`: Number of results (default: 20)

## Status Codes

- **200 OK**: Successful request
- **201 Created**: Resource created
- **400 Bad Request**: Invalid request parameters
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource conflict (e.g., duplicate email)
- **500 Internal Server Error**: Server error

## Rate Limiting

API rate limits are enforced:
- 100 requests per minute for authenticated users
- 30 requests per minute for unauthenticated users

Rate limit information is returned in response headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1234567890
```

## Pagination

List endpoints support pagination:
- `limit`: Results per page (default: 20, max: 100)
- `offset`: Number of results to skip (default: 0)

Response includes:
```json
{
  "data": [...],
  "pagination": {
    "total": 250,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

## Versioning

Current API version: **v1**

Future versions will be available at:
```
http://localhost:3000/api/v2
```

## Webhooks

Webhooks can be configured to receive events for:
- `reservation.created`
- `order.completed`
- `payment.completed`
- `review.created`

See configuration in admin panel.
