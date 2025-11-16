# Implementation Plan: Farm2Door - Complete Platform

**Branch**: `feature/farm2door-complete-platform` | **Date**: 2025-11-16 | **Spec**: `application-specification.md`

**Input**: Complete platform specification with customer/farmer/admin journeys, 101 functional requirements, and 4 clarified decisions

---

## Summary

**Farm2Door** is a full-stack, fully responsive web application connecting local farmers with bio-product customers. The platform enables:
- **Customers**: Browse farmers, reserve products with 30% deposits, track orders, leave reviews
- **Farmers**: Manage products/yields, track orders, configure shipping, view analytics
- **Super Admin**: Control all users/content, manage payments, configure platform

**Technical Approach**: Modern, fully-typed TypeScript stack with responsive React frontend (Material-UI), Express backend, PostgreSQL database, and comprehensive test coverage using Vitest + RTL. Frontend architected for easy mobile app repackaging.

---

## Technical Context

**Language/Version**: TypeScript 5.x (all layers)  
**Frontend Framework**: React 18.x with Material-UI (MUI) v6.x  
**Frontend Styling**: SCSS (optional) + MUI sx prop system for theming  
**Mobile Strategy**: React Native Web or Electron wrapper for easy iOS/Android repackaging  
**Backend Runtime**: Node.js 20 LTS  
**Backend Framework**: Express.js 4.x  
**API Architecture**: RESTful with JSON payloads, future GraphQL-ready  
**Database**: PostgreSQL 15+ with Sequelize ORM or TypeORM  
**Authentication**: JWT tokens (24h expiry) + refresh tokens (7d expiry)  
**Unit Testing**: Vitest 1.x + React Testing Library (RTL)  
**Integration Testing**: Supertest for API endpoints  
**E2E Testing**: Cypress (future phase)  
**Code Quality**: ESLint + Prettier + TypeScript strict mode  
**Build Tool**: Vite for frontend, Node.js native for backend  
**Package Manager**: npm or yarn (choose one)  
**Deployment Target**: Docker containers (future phase)

**Storage**: PostgreSQL 15+ with automated backups, connection pooling (25-50 connections)  
**Caching**: Redis for session management (future phase), in-memory for MVP  
**File Storage**: Cloudinary or local filesystem for product images (MVP uses local with CDN readiness)

**Target Platform**: 
- Frontend: Web (responsive mobile/tablet/desktop)
- Backend: Linux server (Docker-ready)
- Mobile: React Native or Capacitor wrapper for iOS/Android repackaging

**Project Type**: Full-stack web + mobile-ready (monorepo structure recommended)

**Performance Goals**:
- API Response Time: < 200ms (95th percentile)
- Frontend Page Load: < 2 seconds (3G network)
- Database Queries: Indexed for product search/reservations
- Real-time Notifications: < 1 second latency (WebSocket ready in Phase 3)

**Constraints**:
- Responsive design: Mobile 320px+, Tablet 768px+, Desktop 1024px+
- WCAG 2.1 AA accessibility compliance
- Security: HTTPS, JWT auth, bcrypt hashing (10+ rounds), SQL injection prevention
- Uptime SLA: 99.5% target
- Load capacity: Horizontal scaling ready (stateless backend)

**Scale/Scope**:
- **MVP Phase 1**: Core registration, products, checkout (2-3 weeks)
- **Phase 2**: Farmer dashboards, order management, reviews (2-3 weeks)
- **Phase 3**: Admin panel, payment gateway, analytics (2-3 weeks)
- **Phase 4+**: Mobile apps, messaging, subscriptions
- **Estimated LOC**: 50-70k (frontend 30k, backend 20k, tests 15-20k)
- **UI Screens**: ~25-30 distinct routes/pages

---

## Constitution Check

**✓ PASS - Architecture Alignment**

Specification adheres to platform constitution on all critical principles:

- **Security & Data Protection**: ✓ JWT auth, bcrypt hashing, RBAC enforced at API + UI levels
- **Clean Architecture**: ✓ Layered structure (controllers → services → repositories → database)
- **Test-First Development**: ✓ Vitest + RTL with 70% coverage minimum mandate
- **User-Centric Design**: ✓ Responsive Material-UI with light/dark themes
- **Theme Flexibility**: ✓ Dark/light mode built into MUI theming system

**Gate Status**: PASS - Proceed to Phase 0 Research

---

## Technical Stack Deep Dive

### Frontend Stack
```
React 18.x
├── Material-UI (MUI) v6.x - Component library
├── MUI System (sx prop) - Responsive styling
├── SCSS (optional) - Advanced styling needs
├── React Router v6+ - Navigation
├── Axios - HTTP client with interceptors
├── Zustand or Context API - State management
├── Vite - Build tool (faster than CRA)
├── TypeScript 5.x (strict mode)
└── Vitest + RTL - Component testing
```

**Theme System**:
- MUI createTheme() for light/dark modes
- CSS variables for custom colors
- Persistent theme preference in localStorage
- WCAG AA color contrast enforcement

**Responsive Design**:
- MUI breakpoints (xs, sm, md, lg, xl)
- Mobile-first CSS approach
- Flexbox/Grid layouts
- Touch-friendly UI (48px minimum targets)

**Mobile Readiness**:
- React Native Web - Share code with React Native apps
- OR Capacitor wrapper - Package web app as native mobile
- Images optimized for mobile (WebP + fallbacks)
- Touch events and gesture handling
- Native dialogs/alerts compatibility

### Backend Stack
```
Node.js 20 LTS
├── Express.js 4.x - Framework
├── TypeScript 5.x (strict mode) - Language
├── Sequelize or TypeORM - ORM
├── PostgreSQL 15+ - Database
├── bcryptjs - Password hashing
├── jsonwebtoken - JWT handling
├── dotenv - Environment config
├── Vitest 1.x - Unit tests
├── Supertest - Integration tests
└── Winston or Pino - Structured logging
```

**API Structure**:
```
src/
├── config/
│   ├── database.ts - DB connection & pooling
│   ├── auth.ts - JWT config
│   └── env.ts - Environment validation
├── models/
│   ├── User.ts
│   ├── Product.ts
│   ├── Reservation.ts
│   ├── Payment.ts
│   ├── Review.ts
│   ├── ShippingMethod.ts
│   └── FarmProfile.ts
├── services/
│   ├── UserService.ts
│   ├── ProductService.ts
│   ├── ReservationService.ts
│   ├── PaymentService.ts
│   ├── ReviewService.ts
│   └── AnalyticsService.ts
├── controllers/
│   ├── AuthController.ts
│   ├── ProductController.ts
│   ├── ReservationController.ts
│   ├── UserController.ts
│   ├── AdminController.ts
│   └── ReviewController.ts
├── middleware/
│   ├── auth.ts - JWT verification
│   ├── rbac.ts - Role-based access control
│   ├── validation.ts - Request validation
│   ├── errorHandler.ts - Centralized error handling
│   └── logging.ts - Request/response logging
├── routes/
│   ├── auth.ts
│   ├── products.ts
│   ├── reservations.ts
│   ├── users.ts
│   ├── admin.ts
│   └── reviews.ts
├── utils/
│   ├── hash.ts - bcrypt utilities
│   ├── jwt.ts - JWT utilities
│   ├── validators.ts - Input validation
│   └── emails.ts - Email helpers
├── types/
│   ├── index.ts - Global types
│   └── express.d.ts - Express type augmentation
└── index.ts - Entry point
```

### Database Schema (Sequelize/TypeORM)
```
User
├── id (PK)
├── email (UNIQUE)
├── password_hash
├── full_name
├── phone
├── address
├── role (enum: customer|farmer|admin)
├── theme_preference
├── is_active
├── is_verified
├── created_at
├── updated_at
└── suspension_reason (nullable)

FarmProfile (1-to-1 with User where role=farmer)
├── id (PK)
├── user_id (FK)
├── farm_name
├── location
├── farm_type (enum: registered|private)
├── description
├── registration_number (nullable)
├── registration_verified
└── is_active

Product
├── id (PK)
├── farmer_id (FK to FarmProfile)
├── name
├── description
├── category
├── unit_type
├── price_per_unit
├── image_urls (array/JSON)
├── is_active
├── created_at
└── archived_at (nullable)

ProductInventory (1-to-1 with Product)
├── id (PK)
├── product_id (FK)
├── current_quantity_available
├── total_reserved_quantity
└── updated_at

FutureYield (1-to-many with Product)
├── id (PK)
├── product_id (FK)
├── expected_quantity
├── expected_date
├── planting_stage (enum)
├── status (enum: planned|confirmed|harvested)
└── created_at

Reservation
├── id (PK)
├── customer_id (FK)
├── product_id (FK)
├── farmer_id (FK)
├── quantity_reserved
├── unit_price
├── subtotal
├── deposit_amount
├── total_with_deposit
├── status (enum)
├── confirmation_number (UNIQUE)
├── shipping_method
├── tracking_number (nullable)
├── estimated_delivery_date
├── actual_delivery_date (nullable)
├── created_at
└── fulfilled_at (nullable)

Payment
├── id (PK)
├── reservation_id (FK)
├── amount
├── deposit_percentage (30%)
├── payment_method
├── status (enum)
├── transaction_id (nullable)
├── failure_reason (nullable)
├── created_at
└── refunded_at (nullable)

Review
├── id (PK)
├── reservation_id (FK)
├── customer_id (FK)
├── farmer_id (FK)
├── product_id (FK)
├── product_rating (1-5)
├── farmer_rating (1-5)
├── comment_text
├── is_flagged
├── flag_reason (nullable)
├── helpful_votes_count
├── created_at
└── approved_at (nullable)

ShippingMethod
├── id (PK)
├── farmer_id (FK)
├── method_type (enum)
├── is_enabled
├── pickup_address (nullable)
├── carrier_account (encrypted)
├── rate_or_fee
├── created_at
└── updated_at
```

### Testing Strategy

**Unit Tests** (Vitest + RTL):
- Services: Business logic isolation, mocking repositories
- Utilities: Validators, formatters, helpers
- Components: Props, state changes, event handling
- Target: 70% coverage minimum

**Integration Tests** (Supertest):
- API endpoints: Happy path + error cases
- Authentication: JWT validation, RBAC enforcement
- Database: Create, read, update, delete operations
- Reservation flow: Full cart → checkout → order

**E2E Tests** (Cypress - Phase 3):
- Complete user journeys
- Cross-browser testing
- Mobile responsiveness validation

**Example Test Structure**:
```
tests/
├── unit/
│   ├── services/
│   │   ├── UserService.test.ts
│   │   ├── ProductService.test.ts
│   │   ├── ReservationService.test.ts
│   │   └── PaymentService.test.ts
│   ├── controllers/
│   │   └── AuthController.test.ts
│   └── utils/
│       ├── validators.test.ts
│       └── jwt.test.ts
├── integration/
│   ├── auth.test.ts
│   ├── products.test.ts
│   ├── reservations.test.ts
│   ├── admin.test.ts
│   └── payments.test.ts
├── components/
│   ├── ProductCard.test.tsx
│   ├── Cart.test.tsx
│   └── OrderTracking.test.tsx
└── fixtures/
    ├── users.ts
    ├── products.ts
    └── reservations.ts
```

---

## Project Structure

### Repository Layout (Monorepo)

```text
farm2user/
├── .github/
│   └── workflows/           # CI/CD pipelines
├── docs/
│   ├── API.md               # API documentation (Swagger/OpenAPI)
│   ├── ARCHITECTURE.md      # System architecture
│   ├── DEPLOYMENT.md        # Deployment guide
│   └── SETUP.md             # Local development setup
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── services/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── types/
│   │   └── index.ts
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── fixtures/
│   ├── migrations/          # Database migrations
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/      # Reusable components
│   │   │   ├── layout/      # Layout components
│   │   │   ├── pages/       # Page components
│   │   │   └── forms/       # Form components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service layer
│   │   ├── store/           # State management
│   │   ├── styles/          # Global styles + SCSS
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   ├── theme/           # MUI theme config
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   ├── components/
│   │   └── fixtures/
│   ├── public/
│   │   ├── index.html
│   │   ├── images/
│   │   └── fonts/
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   ├── vite.config.ts
│   └── README.md
├── .gitignore
├── .env.example
├── README.md
└── package.json             # Root workspace config
```

### Frontend Component Architecture

```
Frontend Structure:
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── ForgotPasswordPage.tsx
│   ├── customer/
│   │   ├── HomePage.tsx
│   │   ├── FarmerCatalogPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── OrderDetailPage.tsx
│   │   └── ReviewPage.tsx
│   ├── farmer/
│   │   ├── DashboardPage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── AddProductPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── OrderDetailPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   └── SettingsPage.tsx
│   └── admin/
│       ├── DashboardPage.tsx
│       ├── UsersPage.tsx
│       ├── ProductsPage.tsx
│       ├── ReviewsPage.tsx
│       ├── PaymentsPage.tsx
│       └── SettingsPage.tsx
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── SideMenu.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── LoadingSpinner.tsx
│   ├── layout/
│   │   ├── MainLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   ├── AdminLayout.tsx
│   │   └── FarmerLayout.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductFilter.tsx
│   │   └── ProductSearch.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartActions.tsx
│   ├── forms/
│   │   ├── ProductForm.tsx
│   │   ├── ReservationForm.tsx
│   │   └── UserProfileForm.tsx
│   └── dashboard/
│       ├── StatsCard.tsx
│       ├── Chart.tsx
│       └── Table.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useNotifications.ts
│   ├── useFetch.ts
│   └── useTheme.ts
├── services/
│   ├── api/
│   │   ├── authApi.ts
│   │   ├── productsApi.ts
│   │   ├── reservationsApi.ts
│   │   ├── usersApi.ts
│   │   ├── adminApi.ts
│   │   └── client.ts (Axios instance)
│   └── localStorage.ts
├── store/
│   ├── authStore.ts
│   ├── cartStore.ts
│   ├── uiStore.ts
│   └── index.ts
├── theme/
│   ├── theme.ts
│   ├── lightTheme.ts
│   └── darkTheme.ts
└── types/
    ├── index.ts
    ├── models.ts
    ├── api.ts
    └── ui.ts
```

---

## Development Workflow

### Local Development Setup

**Prerequisites**:
- Node.js 20 LTS or higher
- PostgreSQL 15+ running locally
- Git for version control

**Backend Setup**:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with local DB credentials
npm run migrate        # Run database migrations
npm run seed          # Seed development data (optional)
npm run dev           # Start dev server (localhost:3000)
npm run test          # Run tests with coverage
npm run lint          # Check code quality
```

**Frontend Setup**:
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with API URL
npm run dev           # Start dev server (localhost:5173 with Vite)
npm run test          # Run component tests
npm run build         # Build production bundle
npm run preview       # Preview production build
```

### Git Workflow

**Branch Naming**:
- Features: `feature/FR-001-user-description`
- Bugs: `bugfix/BR-001-issue-description`
- Hotfixes: `hotfix/issue-description`
- Releases: `release/v1.0.0`

**Commit Messages**:
- Use conventional commits: `feat(auth): add JWT token refresh`
- Keep messages descriptive and concise

**Pull Request Process**:
1. Create feature branch from `main`
2. Implement feature with tests
3. Ensure all tests pass locally
4. Create PR with description
5. Code review (require 1 approval)
6. Merge to main

---

## Phase Breakdown

### Phase 0: Research & Setup (Days 1-2)
- [ ] Repository initialization
- [ ] Database schema validation with team
- [ ] API specification finalization (Swagger/OpenAPI)
- [ ] Frontend component design review
- [ ] Development environment setup for all team members
- [ ] CI/CD pipeline configuration

### Phase 1: MVP Core (Days 3-14) - ~2 weeks
**Backend**:
- [ ] User registration/login (customer)
- [ ] JWT authentication & RBAC
- [ ] User profile management
- [ ] Product model & CRUD operations
- [ ] Basic product listing API
- [ ] Cart/reservation creation
- [ ] Payment entity (mock system)
- [ ] Database migrations & seeding

**Frontend**:
- [ ] Project setup with Vite + React + MUI
- [ ] Theme system (light/dark) setup
- [ ] Authentication flows (login, register, password reset)
- [ ] Responsive layout & navigation
- [ ] Product browsing & search
- [ ] Shopping cart functionality
- [ ] Checkout flow (non-payment)

**Tests**:
- [ ] Core service unit tests
- [ ] Authentication integration tests
- [ ] Component tests for key pages
- [ ] API endpoint tests

### Phase 2: Farmer & Order Management (Days 15-28) - ~2 weeks
**Backend**:
- [ ] Farmer registration & profile
- [ ] Product creation by farmers
- [ ] Future yield management
- [ ] Order tracking & status updates
- [ ] Shipping method configuration
- [ ] Order notifications system
- [ ] Review & rating system
- [ ] Farmer analytics endpoints

**Frontend**:
- [ ] Farmer dashboard layout
- [ ] Product management interface
- [ ] Order management views
- [ ] Shipping configuration
- [ ] Analytics dashboard
- [ ] Review & rating UI
- [ ] Responsive mobile optimization

**Tests**:
- [ ] Farmer service tests
- [ ] Product management tests
- [ ] Order workflow integration tests
- [ ] Review system tests

### Phase 3: Admin & Payment (Days 29-42) - ~2 weeks
**Backend**:
- [ ] Super admin authentication
- [ ] User management (suspend/activate)
- [ ] Content moderation system
- [ ] Payment processing framework
- [ ] Refund handling
- [ ] Admin analytics endpoints
- [ ] Audit logging
- [ ] Email notification system

**Frontend**:
- [ ] Admin dashboard
- [ ] User management interface
- [ ] Content moderation views
- [ ] Payment/dispute management
- [ ] System configuration panel
- [ ] Analytics & reporting

**Tests**:
- [ ] Admin authorization tests
- [ ] Moderation workflow tests
- [ ] Payment system tests
- [ ] Admin dashboard tests

### Phase 4+: Polish & Extensions (Future)
- [ ] Real payment gateway integration (Stripe/PayPal)
- [ ] In-app messaging system
- [ ] Mobile app repackaging (React Native/Capacitor)
- [ ] Advanced analytics
- [ ] API rate limiting & caching
- [ ] Email verification workflow
- [ ] Email template customization
- [ ] Subscription models

---

## Technical Decisions & Rationale

### Why TypeScript Everywhere?
- Type safety reduces runtime errors
- Better IDE support and autocomplete
- Self-documenting code with interfaces
- Easier refactoring and maintenance at scale

### Why Material-UI?
- Pre-built responsive components
- Excellent theme customization (light/dark built-in)
- WCAG accessibility compliance
- Active community and documentation
- Works great with React Native Web for mobile

### Why Vite for Frontend?
- 10-100x faster than Create React App
- Instant hot module replacement (HMR)
- Smaller bundle size
- Built-in TypeScript support
- Better for monorepo setup

### Why Express + Sequelize/TypeORM?
- Express: Lightweight, flexible, mature ecosystem
- Sequelize/TypeORM: Strong TypeScript support, migrations, associations
- Standard Node.js stack with broad team familiarity

### Why Vitest + RTL?
- Vitest: Fast unit testing with Vite integration
- RTL: Tests user behavior, not implementation details
- Both encourage testing practices aligned with constitution

### Mobile-First Architecture
- Frontend structured for easy React Native Web sharing
- Images/assets optimized for mobile
- Touch-friendly UI components (48px targets)
- Plan Capacitor or React Native wrapper for native apps

---

## Success Criteria

### MVP Phase 1 Complete When:
- [ ] All 15 user stories from spec testable (P1 minimum)
- [ ] 70% code coverage (unit + integration tests)
- [ ] All CI/CD checks passing
- [ ] Responsive on mobile/tablet/desktop
- [ ] Dark/light theme fully functional
- [ ] No critical security issues
- [ ] Performance benchmarks met (<2s page load, <200ms API)
- [ ] Documentation complete (README, API docs, setup guide)

### Launch Readiness:
- [ ] Full test coverage pass
- [ ] Security audit complete
- [ ] Performance profiling & optimization
- [ ] Admin panel fully functional
- [ ] Payment mock system working
- [ ] Deployment documentation complete
- [ ] Team training/runbook prepared

---

## Dependencies & Tooling

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "typescript": "^5.3.3",
  "sequelize": "^6.35.1",
  "pg": "^8.11.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.1.2",
  "dotenv": "^16.3.1",
  "winston": "^3.11.0"
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@mui/material": "^5.14.19",
  "@mui/icons-material": "^5.14.19",
  "react-router-dom": "^6.20.1",
  "axios": "^1.6.5",
  "zustand": "^4.4.4",
  "@emotion/react": "^11.11.1",
  "@emotion/styled": "^11.11.0"
}
```

### Dev Dependencies (Shared)
```json
{
  "vitest": "^1.1.0",
  "@testing-library/react": "^14.1.2",
  "@testing-library/jest-dom": "^6.1.5",
  "eslint": "^8.56.0",
  "prettier": "^3.1.1",
  "supertest": "^6.3.3"
}
```

---

**Document Status**: COMPLETE | **Version**: 1.0.0 | **Last Updated**: 2025-11-16

**Gate Status**: ✓ PASS - Ready for Phase 0 Research and team alignment
