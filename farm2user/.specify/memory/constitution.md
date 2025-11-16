# Farm2Door Platform Constitution

## Project Overview
**Farm2Door** is a mini-platform that directly connects local farmers with customers seeking organic/bio products. The platform enables farmers to publish current and future yields (with expected quantities) and allows buyers to reserve desired quantities in advance with a 30% deposit, creating a secure sales channel for farmers and quality assurance for customers.

## Core Principles

### I. User-Centric Design & Simplicity
Clear, intuitive interfaces for both farmers and customers. The UI must be straightforward with minimal friction in critical workflows (listing products, reserving quantities, managing inventory). Complexity is justified only when it enhances core functionality—avoiding unnecessary features in initial release.

### II. Security & Data Protection (NON-NEGOTIABLE)
- Secure authentication with password hashing (bcrypt minimum)
- Role-based access control (RBAC) enforced at both API and UI levels
- Input validation and sanitization across all entry points
- HTTPS for all communications
- PII protection: Farmer contact details protected from casual buyer access
- Transaction security: 30% deposit payments must be processed securely

### III. Clean Architecture & Separation of Concerns
- **Frontend**: React with component-based structure; clear separation of UI, state management, and API communication
- **Backend**: Node.js with layered architecture (controllers → services → repositories → database)
- **Database**: PostgreSQL for relational data; schema versioning for migrations
- Each domain (products, reservations, users, payments) maintains independent business logic

### IV. Test-First Development (Required)
- Unit tests for business logic (services, utilities)
- Integration tests for API endpoints and database interactions
- E2E tests for critical user workflows (registration, product reservation, payment)
- Minimum coverage: 70% for core functionality
- TDD preferred: Tests written first, approval obtained, implementation follows

### V. Theme Flexibility & Accessibility
Support for light and dark interface themes with persistent user preference storage. Theming must be CSS/design-token based and non-intrusive to business logic. Ensure WCAG AA accessibility standards for color contrast and navigation.

## Functional Requirements

### User Management
- **Registration**: Farmers and customers can self-register with role selection
- **Login**: Secure authentication with JWT tokens (or equivalent)
- **User Profiles**: Farmer profiles include bio, location, farm details; customer profiles include preferences, reservation history
- **Role-Based Access**: Distinct UI/API permissions for farmer and customer roles
- **Account Management**: Password reset, profile updates, account preferences

### Product Catalog & Inventory Management
- **Product Listing**: Farmers can publish products with:
  - Product name, description, category (produce type)
  - Quantity available (current yield)
  - Expected future yields (e.g., "Carrots - expected 100kg in 3 weeks")
  - Price per unit
  - Unit type (kg, bundles, pieces, etc.)
  - Estimated harvest/delivery date
- **Product Search & Filtering**: Customers can search by product name, category, availability date, price range
- **Product Reviews**: Customers can rate and review products/farmers (future expansion feature)

### Reservation & Booking System
- **Reserve Products**: Customers can reserve quantities with:
  - Quantity selection with validation against available stock
  - 30% deposit calculation and payment trigger
  - Reservation date and fulfillment date
  - Reservation status tracking (pending, confirmed, paid, fulfilled, cancelled)
- **Farmer Reservations Dashboard**: View all active reservations, track quantities, confirm fulfillment
- **Reservation History**: Both parties can view past transactions

### Payment & Deposit Management
- **Deposit Collection**: 30% of reservation value collected upfront
- **Payment Processing**: Secure payment gateway integration (future expansion)
- **Refund Handling**: Clear refund policies for cancelled reservations
- **Payment Status Tracking**: Real-time updates on payment state

### User Experience & Interface
- **Light/Dark Theme Toggle**: Persistent theme preference per user
- **Responsive Design**: Works on mobile, tablet, desktop
- **Navigation**: Intuitive menu structure, clear call-to-action buttons
- **Notifications**: Order confirmations, reservation updates, delivery notifications

## Technology Stack

### Frontend
- **Framework**: React (latest stable version)
- **State Management**: Context API, Redux, or Zustand (consistent pattern required)
- **Styling**: CSS Modules, Tailwind CSS, or styled-components
- **HTTP Client**: Axios or Fetch API with interceptors for auth tokens
- **Routing**: React Router v6+
- **Build Tool**: Create React App, Vite, or Next.js

### Backend
- **Runtime**: Node.js (LTS version)
- **Framework**: Express.js or similar REST API framework
- **Middleware**: Authentication (JWT), CORS, request validation
- **Error Handling**: Centralized error handling with meaningful HTTP status codes
- **Logging**: Structured logging (Winston, Pino, or similar)
- **Environment Config**: .env files for environment-specific settings

### Database
- **System**: PostgreSQL (version 12+)
- **ORM/Query Builder**: Sequelize, TypeORM, or Knex.js
- **Migrations**: Versioned schema migrations for reproducible deployments
- **Backup**: Automated backup strategy required for production

### Authentication & Security
- **Token-Based Auth**: JWT or similar stateless authentication
- **Password Hashing**: bcrypt (minimum 10 rounds)
- **CORS**: Properly configured for frontend origin
- **Rate Limiting**: API rate limiting to prevent abuse

## Data Model & Entities

### Core Entities
1. **User**: id, email, password_hash, full_name, role (farmer/customer), profile_data, theme_preference, created_at, updated_at
2. **FarmProfile**: user_id, farm_name, location, description, contact_phone, bio, created_at
3. **Product**: id, farmer_id, name, category, description, unit_type, current_quantity, price_per_unit, harvest_date, is_active, created_at, updated_at
4. **FutureYield**: id, product_id, expected_quantity, expected_date, status (planned/confirmed/harvested)
5. **Reservation**: id, customer_id, product_id, quantity_reserved, total_price, deposit_paid (30%), reservation_status, created_at, fulfilled_at
6. **Payment**: id, reservation_id, amount, payment_method, status (pending/completed/failed), transaction_id, created_at
7. **Review**: id, product_id, customer_id, rating (1-5), comment, created_at
8. **Theme**: user_id, theme_preference (light/dark), updated_at

## Non-Functional Requirements

### Performance
- API response time: < 200ms for standard queries (95th percentile)
- Database queries: Indexed for common searches (product search, reservation lookup)
- Frontend page load: < 3 seconds (3G network)

### Security
- All passwords hashed with bcrypt (minimum rounds: 10)
- Sensitive data (payment info) logged only in anonymized format
- HTTPS enforced in production
- SQL injection prevention via parameterized queries
- CSRF tokens for state-changing operations
- Rate limiting on authentication endpoints (max 5 attempts per 15 minutes)

### Scalability
- Stateless backend for horizontal scaling
- Database connection pooling (20-50 connections)
- Caching strategy for frequently accessed data (product listings, farmer profiles)
- CDN ready for static assets

### Reliability
- Graceful error handling with user-friendly error messages
- Automated database backups (daily minimum)
- Health check endpoints for monitoring
- Transaction rollback on payment failures

## Development Standards

### Code Quality
- Language: JavaScript/TypeScript (TypeScript strongly recommended for backend)
- Linting: ESLint with standardized config
- Formatting: Prettier with consistent settings
- Code Review: All PRs reviewed by at least one team member
- Complexity: Cyclomatic complexity < 10 for functions; max nesting 3 levels

### Git & Version Control
- Feature branches: `feature/feature-name`
- Bug fixes: `bugfix/issue-description`
- Releases: Semantic versioning (MAJOR.MINOR.PATCH)
- Commit messages: Clear, descriptive (not "fix bug")
- Main branch: Protected; requires PR and tests passing

### Testing Requirements
- Unit tests: Jest or Vitest for frontend/backend
- Integration tests: Supertest for API endpoints
- Database tests: Real test database with fixtures
- Minimum coverage: 70% for critical paths
- E2E tests: Cypress or Playwright for user workflows

### Documentation
- README with setup instructions
- API documentation: Swagger/OpenAPI for backend endpoints
- Database schema documentation
- Environment setup guide
- Deployment procedure

## Constraints & Limitations

### MVP Phase (Current)
- No online payment gateway integration (30% deposit calculated, future payment integration)
- No admin panel (single tenant for MVP)
- No advanced analytics or reporting
- No mobile native app (web responsive design only)
- No real-time notifications (polling or simple email)

### Future Expansion Features
- Online payment processing (Stripe/PayPal integration)
- Admin dashboard for platform management
- Rating and review system
- Ratings-based farmer ranking
- Delivery/logistics coordination
- In-app messaging between farmers and customers
- Subscription models for regular purchases
- Multiple language support

## Governance & Amendment Process

### Constitution Authority
This constitution defines the non-negotiable principles and requirements for the Farm2Door platform. All development, design, and deployment decisions must align with these principles.

### Amendment Process
- Proposed amendments must document: current rule, proposed change, rationale, impact
- Amendments require unanimous stakeholder approval before implementation
- All approved amendments must be logged with version update and ratification date
- Breaking changes require migration plan for existing data/workflows

### Compliance Verification
- Code review process ensures architecture compliance
- Automated linting and testing prevent standard violations
- Security audit required before production deployment
- Database schema changes reviewed for GDPR compliance (if applicable)

### Dispute Resolution
In case of conflicting requirements between principles, priority order:
1. Security & Data Protection (always highest)
2. User Experience & Simplicity
3. Performance & Scalability
4. Code Quality & Maintainability

---

**Version**: 1.0.0 | **Ratified**: 2025-11-16 | **Last Amended**: 2025-11-16

**Status**: ACTIVE | **Phase**: MVP Development
