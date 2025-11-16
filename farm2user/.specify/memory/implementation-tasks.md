# Tasks: Farm2Door - Complete Platform

**Input**: specification.md, development-plan.md, constitution.md  
**Prerequisites**: Development plan (required), specification (required for user stories)  
**Testing**: Vitest + RTL for all features (test-first approach per constitution)

**Organization**: Tasks grouped by user story and phase. MVP tasks clearly marked. Each user story can be implemented independently.

---

## Task Format: `[ID] [P?] [Phase] [Story] [Priority] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **Phase**: Which phase this belongs to (MVP, Phase 2, Phase 3)
- **Story**: User story reference (US1, US2, etc.)
- **Priority**: P1, P2, P3 from specification
- **Exact file paths** included for backend and frontend

---

## PHASE 0: Research & Setup (Days 1-2)

### Foundational Infrastructure

- [ ] T001 [P] Create monorepo structure: `/backend`, `/frontend` directories with separate package.json files
- [ ] T002 [P] Initialize backend: `backend/package.json`, `backend/tsconfig.json`, `backend/vitest.config.ts`
- [ ] T003 [P] Initialize frontend: `frontend/package.json`, `frontend/tsconfig.json`, `frontend/vite.config.ts`, `frontend/vitest.config.ts`
- [ ] T004 [P] Configure ESLint + Prettier (shared config at root `.eslintrc.json`, `.prettierrc.json`)
- [ ] T005 Setup database connection pool: `backend/src/config/database.ts` (Sequelize/TypeORM with pg driver)
- [ ] T006 [P] Setup database migrations framework: `backend/migrations/` directory structure
- [ ] T007 [P] Create development environment files: `.env.example` for both backend/frontend
- [ ] T008 Setup CI/CD pipeline: `.github/workflows/` for test automation on PR
- [ ] T009 Create API specification document: `docs/API.md` (Swagger/OpenAPI template)
- [ ] T010 Create development README: `docs/SETUP.md` with local environment setup instructions

**Checkpoint**: Project structure ready, all dependencies installed, team can start development

---

## PHASE MVP (Days 3-14): Core Platform MVP - 2 Weeks

### Foundational Backend Infrastructure (BLOCKING - Must complete first)

- [ ] T011 [P] Create database models directory structure: `backend/src/models/`
- [ ] T012 [P] Create Express app entry point: `backend/src/index.ts` with middleware setup
- [ ] T013 [P] Setup error handling middleware: `backend/src/middleware/errorHandler.ts` with centralized error catching
- [ ] T014 [P] Setup request logging middleware: `backend/src/middleware/logging.ts` with Winston/Pino
- [ ] T015 [P] Setup request validation middleware: `backend/src/middleware/validation.ts` with joi/zod
- [ ] T016 [P] Create authentication middleware: `backend/src/middleware/auth.ts` (JWT verification)
- [ ] T017 [P] Create RBAC middleware: `backend/src/middleware/rbac.ts` (role-based access control)
- [ ] T018 [P] Create JWT utilities: `backend/src/utils/jwt.ts` (sign, verify, refresh)
- [ ] T019 [P] Create bcrypt utilities: `backend/src/utils/hash.ts` (hash, compare passwords)
- [ ] T020 [P] Create type definitions: `backend/src/types/index.ts`, `backend/src/types/express.d.ts`
- [ ] T021 [P] Create database migrations runner: `backend/src/config/migrations.ts`

**Checkpoint**: Backend foundation ready, can now build API endpoints

### Foundational Frontend Infrastructure (BLOCKING - Must complete first)

- [ ] T022 [P] Setup React app with Vite: `frontend/src/main.tsx`, `frontend/src/App.tsx`
- [ ] T023 [P] Setup Material-UI theme system: `frontend/src/theme/theme.ts`, `frontend/src/theme/lightTheme.ts`, `frontend/src/theme/darkTheme.ts`
- [ ] T024 [P] Create theme context & toggle: `frontend/src/theme/ThemeProvider.tsx`, `frontend/src/hooks/useTheme.ts`
- [ ] T025 [P] Setup React Router structure: `frontend/src/routes/` with route definitions
- [ ] T026 [P] Create main layout: `frontend/src/components/layout/MainLayout.tsx` with header, nav, footer
- [ ] T027 [P] Create navigation/menu: `frontend/src/components/common/Navigation.tsx`, `frontend/src/components/common/SideMenu.tsx`
- [ ] T028 [P] Create API client (Axios): `frontend/src/services/api/client.ts` with interceptors for JWT
- [ ] T029 [P] Setup state management store: `frontend/src/store/` directory with Zustand/Context
- [ ] T030 [P] Create authentication hook: `frontend/src/hooks/useAuth.ts`
- [ ] T031 [P] Create type definitions: `frontend/src/types/` (models.ts, api.ts, ui.ts)
- [ ] T032 [P] Setup responsive grid system: `frontend/src/styles/globals.scss` with breakpoints

**Checkpoint**: Frontend foundation ready, can now build pages and components

---

## PHASE MVP: USER STORY 1 - Customer Registration & Profile Setup (Priority: P1) 🎯 MVP

**Goal**: Customer can register, login, and access dashboard. Foundation for all customer features.

**Independent Test**: Complete registration flow → login → access customer dashboard

### Database & Backend Services (Tests First)

- [ ] T033 [P] [MVP] [US1-P1] Write integration tests: `backend/tests/integration/auth.test.ts` (register, login, refresh token scenarios - RED)
- [ ] T034 [P] [MVP] [US1-P1] Write unit tests: `backend/tests/unit/services/UserService.test.ts` (createUser, findByEmail - RED)
- [ ] T035 [P] [MVP] [US1-P1] Create User model: `backend/src/models/User.ts` with email, password_hash, full_name, phone, role, theme_preference
- [ ] T036 [P] [MVP] [US1-P1] Create database migration: `backend/migrations/001_create_users_table.ts`
- [ ] T037 [MVP] [US1-P1] Implement UserService: `backend/src/services/UserService.ts` with createUser, findByEmail, updateUser methods
- [ ] T038 [MVP] [US1-P1] Create validators: `backend/src/utils/validators.ts` (email, password strength, phone format)

### Backend API Endpoints

- [ ] T039 [MVP] [US1-P1] Create auth routes: `backend/src/routes/auth.ts`
  - POST `/api/auth/register` - Register new customer (validate email/password, hash password, return user)
  - POST `/api/auth/login` - Login (verify email/password, issue JWT + refresh token)
  - POST `/api/auth/refresh` - Refresh access token (verify refresh token, issue new access token)
  - POST `/api/auth/logout` - Logout (invalidate refresh token)
  - POST `/api/auth/forgot-password` - Request password reset (send email link)
  - POST `/api/auth/reset-password` - Reset password (validate token, update password)
- [ ] T040 [MVP] [US1-P1] Create user routes: `backend/src/routes/users.ts`
  - GET `/api/users/profile` - Get current user profile (auth required)
  - PUT `/api/users/profile` - Update profile (name, phone, address, theme_preference)
  - DELETE `/api/users/account` - Soft delete account (30-day grace)

### Backend Tests (Make them PASS)

- [ ] T041 [MVP] [US1-P1] Make integration tests pass: `backend/tests/integration/auth.test.ts` - Test registration, login, refresh flows
- [ ] T042 [MVP] [US1-P1] Make unit tests pass: `backend/tests/unit/services/UserService.test.ts` - Test service methods

### Frontend Pages & Components

- [ ] T043 [P] [MVP] [US1-P1] Write component tests: `frontend/tests/components/LoginForm.test.tsx` (form submission, validation - RED)
- [ ] T044 [P] [MVP] [US1-P1] Write component tests: `frontend/tests/components/RegisterForm.test.tsx` (role selection, validation - RED)
- [ ] T045 [P] [MVP] [US1-P1] Create LoginPage: `frontend/src/pages/auth/LoginPage.tsx` with email/password inputs, login button, forgot password link
- [ ] T046 [P] [MVP] [US1-P1] Create RegisterPage: `frontend/src/pages/auth/RegisterPage.tsx` with role selector (Customer/Farmer), registration form, validation
- [ ] T047 [P] [MVP] [US1-P1] Create ForgotPasswordPage: `frontend/src/pages/auth/ForgotPasswordPage.tsx` with email input, reset link flow
- [ ] T048 [P] [MVP] [US1-P1] Create ResetPasswordPage: `frontend/src/pages/auth/ResetPasswordPage.tsx` with new password input, confirmation
- [ ] T049 [MVP] [US1-P1] Create auth API service: `frontend/src/services/api/authApi.ts` (register, login, refresh, logout, resetPassword)
- [ ] T050 [MVP] [US1-P1] Implement useAuth hook: `frontend/src/hooks/useAuth.ts` (login, register, logout, isAuthenticated)
- [ ] T051 [MVP] [US1-P1] Create ProtectedRoute component: `frontend/src/components/common/ProtectedRoute.tsx` (redirect to login if not auth)
- [ ] T052 [P] [MVP] [US1-P1] Create CustomerDashboard: `frontend/src/pages/customer/HomePage.tsx` (welcome message, navigation to products)

### Frontend Tests (Make them PASS)

- [ ] T053 [MVP] [US1-P1] Make component tests pass: `frontend/tests/components/LoginForm.test.tsx`
- [ ] T054 [MVP] [US1-P1] Make component tests pass: `frontend/tests/components/RegisterForm.test.tsx`

**Checkpoint**: User Story 1 complete. Customers can register, login, and access dashboard.

---

## PHASE MVP: USER STORY 2 - Browse Farmer Catalog & Discover Products (Priority: P1) 🎯 MVP

**Goal**: Customers see all farmers with products, can search and filter. Core discovery feature.

**Independent Test**: View farmer cards → search for product → filter by category → see results

### Database & Backend Services (Tests First)

- [ ] T055 [P] [MVP] [US2-P1] Write integration tests: `backend/tests/integration/products.test.ts` (list farmers, search, filter - RED)
- [ ] T056 [P] [MVP] [US2-P1] Write unit tests: `backend/tests/unit/services/ProductService.test.ts` (findByCategory, searchProducts - RED)
- [ ] T057 [P] [MVP] [US2-P1] Create FarmProfile model: `backend/src/models/FarmProfile.ts` (farm_name, location, farm_type, description, registration_number, registration_verified)
- [ ] T058 [P] [MVP] [US2-P1] Create Product model: `backend/src/models/Product.ts` (name, description, category, unit_type, price_per_unit, image_urls, farmer_id)
- [ ] T059 [P] [MVP] [US2-P1] Create FutureYield model: `backend/src/models/FutureYield.ts` (product_id, expected_quantity, expected_date, planting_stage, status)
- [ ] T060 [P] [MVP] [US2-P1] Create database migrations: `backend/migrations/002_create_farm_profile.ts`, `backend/migrations/003_create_products.ts`, `backend/migrations/004_create_future_yields.ts`
- [ ] T061 [MVP] [US2-P1] Implement ProductService: `backend/src/services/ProductService.ts` with findAllFarmers, searchProducts, filterByCategory, getProductDetails
- [ ] T062 [MVP] [US2-P1] Add product validators: `backend/src/utils/validators.ts` (product name, price, quantity)

### Backend API Endpoints

- [ ] T063 [MVP] [US2-P1] Create products routes: `backend/src/routes/products.ts`
  - GET `/api/farmers` - List all active farmers with ratings, farm badge, product count (paginated, sortable)
  - GET `/api/farmers/:farmerId` - Get farmer profile with all products
  - GET `/api/products` - List all products (searchable, filterable by category/price/date)
  - GET `/api/products/search?q=carrots` - Search products by name/category
  - GET `/api/products/filter?category=vegetables&priceMax=100` - Filter products
  - GET `/api/products/:productId` - Get product detail with farmer info, reviews, future yields

### Backend Tests (Make them PASS)

- [ ] T064 [MVP] [US2-P1] Make integration tests pass: `backend/tests/integration/products.test.ts`
- [ ] T065 [MVP] [US2-P1] Make unit tests pass: `backend/tests/unit/services/ProductService.test.ts`

### Frontend Pages & Components

- [ ] T066 [P] [MVP] [US2-P1] Write component tests: `frontend/tests/components/ProductCard.test.tsx` (display product info, farmer rating - RED)
- [ ] T067 [P] [MVP] [US2-P1] Write component tests: `frontend/tests/components/FarmerCard.test.tsx` (display farmer info, badge - RED)
- [ ] T068 [P] [MVP] [US2-P1] Create FarmerCard component: `frontend/src/components/products/FarmerCard.tsx` (name, photo, rating, badge, product count)
- [ ] T069 [P] [MVP] [US2-P1] Create ProductCard component: `frontend/src/components/products/ProductCard.tsx` (image, name, price, quantity, harvest date, stage badge)
- [ ] T070 [P] [MVP] [US2-P1] Create ProductFilter component: `frontend/src/components/products/ProductFilter.tsx` (category select, price range slider, date picker)
- [ ] T071 [P] [MVP] [US2-P1] Create ProductSearch component: `frontend/src/components/products/ProductSearch.tsx` (search input with real-time results)
- [ ] T072 [MVP] [US2-P1] Create products API service: `frontend/src/services/api/productsApi.ts` (getFarmers, searchProducts, filterProducts, getProductDetail)
- [ ] T073 [MVP] [US2-P1] Create HomePage: `frontend/src/pages/customer/HomePage.tsx` (farmer grid with cards, search/filter controls)
- [ ] T074 [MVP] [US2-P1] Create ProductDetailPage: `frontend/src/pages/customer/ProductDetailPage.tsx` (full product info, farmer contact, reviews section)
- [ ] T075 [P] [MVP] [US2-P1] Create stage badge component: `frontend/src/components/common/StageBadge.tsx` (emoji + text for planting stages)

### Frontend Tests (Make them PASS)

- [ ] T076 [MVP] [US2-P1] Make component tests pass: `frontend/tests/components/ProductCard.test.tsx`
- [ ] T077 [MVP] [US2-P1] Make component tests pass: `frontend/tests/components/FarmerCard.test.tsx`

**Checkpoint**: User Story 2 complete. Customers can discover farmers and products with search/filter.

---

## PHASE MVP: USER STORY 3 - Reserve Products with 30% Deposit (Priority: P1) 🎯 MVP

**Goal**: Customers can add to cart, checkout with deposit calculation. Core revenue model.

**Independent Test**: Add product to cart → update quantity → checkout → see deposit amount calculated

### Database & Backend Services (Tests First)

- [ ] T078 [P] [MVP] [US3-P1] Write integration tests: `backend/tests/integration/reservations.test.ts` (add to cart, checkout, create reservation - RED)
- [ ] T079 [P] [MVP] [US3-P1] Write unit tests: `backend/tests/unit/services/ReservationService.test.ts` (calculateDeposit, createReservation - RED)
- [ ] T080 [P] [MVP] [US3-P1] Create Reservation model: `backend/src/models/Reservation.ts` (customer_id, product_id, farmer_id, quantity, unit_price, deposit_amount, status, confirmation_number)
- [ ] T081 [P] [MVP] [US3-P1] Create Payment model: `backend/src/models/Payment.ts` (reservation_id, amount, deposit_percentage, payment_method, status, transaction_id)
- [ ] T082 [P] [MVP] [US3-P1] Create database migrations: `backend/migrations/005_create_reservations.ts`, `backend/migrations/006_create_payments.ts`
- [ ] T083 [MVP] [US3-P1] Implement ReservationService: `backend/src/services/ReservationService.ts` with createReservation, calculateDeposit (30%), updateReservationStatus
- [ ] T084 [MVP] [US3-P1] Implement PaymentService: `backend/src/services/PaymentService.ts` with createPayment, updatePaymentStatus, processRefund (mock)
- [ ] T085 [P] [MVP] [US3-P1] Add inventory management: Update ProductInventory when reservation created/cancelled

### Backend API Endpoints

- [ ] T086 [MVP] [US3-P1] Create reservations routes: `backend/src/routes/reservations.ts`
  - POST `/api/reservations` - Create reservation from cart (auth required, calculate 30% deposit, return confirmation number)
  - GET `/api/reservations/:reservationId` - Get reservation detail
  - PUT `/api/reservations/:reservationId/status` - Update status (farmer only)
  - DELETE `/api/reservations/:reservationId` - Cancel reservation (check if allowed)
- [ ] T087 [MVP] [US3-P1] Create payments routes: `backend/src/routes/payments.ts`
  - POST `/api/payments` - Record payment (mock system, return invoice)
  - GET `/api/payments/:paymentId` - Get payment detail
  - PUT `/api/payments/:paymentId/status` - Update payment status (admin only for MVP)

### Backend Tests (Make them PASS)

- [ ] T088 [MVP] [US3-P1] Make integration tests pass: `backend/tests/integration/reservations.test.ts`
- [ ] T089 [MVP] [US3-P1] Make unit tests pass: `backend/tests/unit/services/ReservationService.test.ts`

### Frontend Pages & Components

- [ ] T090 [P] [MVP] [US3-P1] Write component tests: `frontend/tests/components/CartItem.test.tsx` (quantity update, remove - RED)
- [ ] T091 [P] [MVP] [US3-P1] Write component tests: `frontend/tests/components/CartSummary.test.tsx` (deposit calculation 30% - RED)
- [ ] T092 [P] [MVP] [US3-P1] Create CartItem component: `frontend/src/components/cart/CartItem.tsx` (product info, quantity selector, remove button)
- [ ] T093 [P] [MVP] [US3-P1] Create CartSummary component: `frontend/src/components/cart/CartSummary.tsx` (subtotal, deposit 30%, total with deposit)
- [ ] T094 [MVP] [US3-P1] Create cart store: `frontend/src/store/cartStore.ts` (add item, remove item, update quantity, calculate totals)
- [ ] T095 [MVP] [US3-P1] Create useCart hook: `frontend/src/hooks/useCart.ts` (getCart, addToCart, removeFromCart, updateQuantity)
- [ ] T096 [MVP] [US3-P1] Create CartPage: `frontend/src/pages/customer/CartPage.tsx` (cart items, summary, proceed to checkout button)
- [ ] T097 [MVP] [US3-P1] Create CheckoutPage: `frontend/src/pages/customer/CheckoutPage.tsx` (order summary, delivery date selection, shipping method selector, reserve button)
- [ ] T098 [MVP] [US3-P1] Create reservations API service: `frontend/src/services/api/reservationsApi.ts` (createReservation, getReservation, updateStatus)
- [ ] T099 [P] [MVP] [US3-P1] Create QuantitySelector component: `frontend/src/components/common/QuantitySelector.tsx` (spinner or input)

### Frontend Tests (Make them PASS)

- [ ] T100 [MVP] [US3-P1] Make component tests pass: `frontend/tests/components/CartItem.test.tsx`
- [ ] T101 [MVP] [US3-P1] Make component tests pass: `frontend/tests/components/CartSummary.test.tsx`

**Checkpoint**: User Story 3 complete. Customers can reserve with 30% deposit calculation.

---

## PHASE MVP: USER STORY 4 - Track Reservation Status & Farmer Communication (Priority: P2) 🎯 MVP

**Goal**: Customers track orders, see status updates, contact farmer. Order confidence feature.

**Independent Test**: Create reservation → update status (farmer) → see notification (customer) → view order detail

### Database & Backend Services

- [ ] T102 [MVP] [US4-P2] Write integration tests: `backend/tests/integration/orders.test.ts` (order tracking, status updates - RED)
- [ ] T103 [MVP] [US4-P2] Implement OrderService: `backend/src/services/OrderService.ts` with getCustomerOrders, getOrderDetail, updateStatus
- [ ] T104 [MVP] [US4-P2] Add email notification helpers: `backend/src/utils/emails.ts` (order confirmation, status update emails)

### Backend API Endpoints

- [ ] T105 [MVP] [US4-P2] Create orders routes: `backend/src/routes/orders.ts`
  - GET `/api/orders` - Get all orders for authenticated customer/farmer (paginated)
  - GET `/api/orders/:orderId` - Get order detail with timeline
  - PUT `/api/orders/:orderId/status` - Update order status (farmer only)
  - POST `/api/orders/:orderId/contact-farmer` - Get farmer contact info (email, phone)

### Backend Tests (Make them PASS)

- [ ] T106 [MVP] [US4-P2] Make integration tests pass: `backend/tests/integration/orders.test.ts`

### Frontend Pages & Components

- [ ] T107 [P] [MVP] [US4-P2] Write component tests: `frontend/tests/components/OrderStatus.test.tsx` (status badge display - RED)
- [ ] T108 [MVP] [US4-P2] Create OrdersPage: `frontend/src/pages/customer/OrdersPage.tsx` (active orders, past orders tabs)
- [ ] T109 [MVP] [US4-P2] Create OrderDetailPage: `frontend/src/pages/customer/OrderDetailPage.tsx` (order summary, status timeline, contact farmer button)
- [ ] T110 [P] [MVP] [US4-P2] Create OrderStatus component: `frontend/src/components/common/OrderStatus.tsx` (status badge with timeline visual)
- [ ] T111 [P] [MVP] [US4-P2] Create FarmerContact component: `frontend/src/components/common/FarmerContact.tsx` (email, phone display, contact buttons)
- [ ] T112 [MVP] [US4-P2] Create orders API service: `frontend/src/services/api/ordersApi.ts` (getCustomerOrders, getOrderDetail, contactFarmer)
- [ ] T113 [MVP] [US4-P2] Create useNotifications hook: `frontend/src/hooks/useNotifications.ts` (show toast on status change)

### Frontend Tests (Make them PASS)

- [ ] T114 [MVP] [US4-P2] Make component tests pass: `frontend/tests/components/OrderStatus.test.tsx`

**Checkpoint**: User Story 4 complete. Customers can track orders and contact farmers.

---

## PHASE MVP: USER STORY 6 - Farmer Registration & Farm Profile Setup (Priority: P1) 🎯 MVP

**Goal**: Farmers can register and set up farm profile with badges.

**Independent Test**: Register as farmer → enter farm info → see farm badge on profile

### Database & Backend Services

- [ ] T115 [P] [MVP] [US6-P1] Write integration tests: `backend/tests/integration/farmer-auth.test.ts` (farmer registration - RED)
- [ ] T116 [MVP] [US6-P1] Create farmer registration endpoint in auth routes: POST `/api/auth/register-farmer` (additional farm fields)
- [ ] T117 [MVP] [US6-P1] Implement farm profile logic in UserService: Handle registered vs private farm type

### Backend API Endpoints

- [ ] T118 [MVP] [US6-P1] Extend auth routes for farmer:
  - POST `/api/auth/register-farmer` - Farmer registration with farm type, registration number (if registered)
- [ ] T119 [MVP] [US6-P1] Create farmer routes: `backend/src/routes/farmers.ts`
  - GET `/api/farmers/:farmerId/profile` - Get farmer profile (public)
  - PUT `/api/farmers/profile` - Update own farm profile (auth required, farmer only)
  - GET `/api/farmers/dashboard` - Farmer dashboard (auth required, farmer only)

### Backend Tests (Make them PASS)

- [ ] T120 [MVP] [US6-P1] Make integration tests pass: `backend/tests/integration/farmer-auth.test.ts`

### Frontend Pages & Components

- [ ] T121 [P] [MVP] [US6-P1] Write component tests: `frontend/tests/components/FarmerRegistrationForm.test.tsx` (farm type selection - RED)
- [ ] T122 [P] [MVP] [US6-P1] Create FarmerRegisterPage: `frontend/src/pages/auth/FarmerRegisterPage.tsx` (extends RegisterPage with farm fields)
- [ ] T123 [MVP] [US6-P1] Update RegisterPage: `frontend/src/pages/auth/RegisterPage.tsx` to route to FarmerRegisterPage on farmer selection
- [ ] T124 [P] [MVP] [US6-P1] Create FarmBadge component: `frontend/src/components/common/FarmBadge.tsx` (display registered/private badge)
- [ ] T125 [MVP] [US6-P1] Create FarmerDashboard: `frontend/src/pages/farmer/DashboardPage.tsx` (welcome, quick stats, navigation)

### Frontend Tests (Make them PASS)

- [ ] T126 [MVP] [US6-P1] Make component tests pass: `frontend/tests/components/FarmerRegistrationForm.test.tsx`

**Checkpoint**: User Story 6 complete. Farmers can register and set up profiles.

---

## PHASE MVP: USER STORY 7 - Create & Manage Product Listings (Priority: P1) 🎯 MVP

**Goal**: Farmers can publish products with current and future yields.

**Independent Test**: Farmer creates product → sets quantity → adds future yield → see on customer homepage

### Database & Backend Services

- [ ] T127 [P] [MVP] [US7-P1] Write integration tests: `backend/tests/integration/farmer-products.test.ts` (create product, add future yield - RED)
- [ ] T128 [MVP] [US7-P1] Extend ProductService: Add farmer-specific methods (createProduct, updateProduct, deletProduct, addFutureYield)
- [ ] T129 [MVP] [US7-P1] Create ProductInventory model/management: Track available quantities

### Backend API Endpoints

- [ ] T130 [MVP] [US7-P1] Create farmer products routes: `backend/src/routes/farmers.ts` extend with product management
  - POST `/api/farmers/products` - Create new product (auth required, farmer only)
  - PUT `/api/farmers/products/:productId` - Update product (auth required, farmer only)
  - DELETE `/api/farmers/products/:productId` - Archive product (auth required, farmer only, prevent if active reservations)
  - POST `/api/farmers/products/:productId/yields` - Add future yield (auth required, farmer only)
  - PUT `/api/farmers/products/:productId/yields/:yieldId` - Update yield (auth required, farmer only)

### Backend Tests (Make them PASS)

- [ ] T131 [MVP] [US7-P1] Make integration tests pass: `backend/tests/integration/farmer-products.test.ts`

### Frontend Pages & Components

- [ ] T132 [P] [MVP] [US7-P1] Write component tests: `frontend/tests/components/ProductForm.test.tsx` (product creation form - RED)
- [ ] T133 [P] [MVP] [US7-P1] Write component tests: `frontend/tests/components/FutureYieldForm.test.tsx` (future yield form with stage selector - RED)
- [ ] T134 [MVP] [US7-P1] Create ProductsPage: `frontend/src/pages/farmer/ProductsPage.tsx` (product list, add new button)
- [ ] T135 [MVP] [US7-P1] Create AddProductPage: `frontend/src/pages/farmer/AddProductPage.tsx` (product form)
- [ ] T136 [MVP] [US7-P1] Create EditProductPage: `frontend/src/pages/farmer/EditProductPage.tsx` (product form with edit mode)
- [ ] T137 [P] [MVP] [US7-P1] Create ProductForm component: `frontend/src/components/forms/ProductForm.tsx` (name, description, category, unit_type, price, image upload)
- [ ] T138 [P] [MVP] [US7-P1] Create FutureYieldForm component: `frontend/src/components/forms/FutureYieldForm.tsx` (quantity, date, planting stage selector)
- [ ] T139 [P] [MVP] [US7-P1] Create PlantingStageSelector component: `frontend/src/components/common/PlantingStageSelector.tsx` (6 stage options with emoji)
- [ ] T140 [MVP] [US7-P1] Create farmer products API service: `frontend/src/services/api/farmerApi.ts` (createProduct, updateProduct, deleteProduct, addYield)
- [ ] T141 [P] [MVP] [US7-P1] Create image upload utility: `frontend/src/utils/imageUpload.ts` (handle image files, local storage for MVP)

### Frontend Tests (Make them PASS)

- [ ] T142 [MVP] [US7-P1] Make component tests pass: `frontend/tests/components/ProductForm.test.tsx`
- [ ] T143 [MVP] [US7-P1] Make component tests pass: `frontend/tests/components/FutureYieldForm.test.tsx`

**Checkpoint**: User Story 7 complete. Farmers can manage product listings with yields.

---

## PHASE MVP: USER STORY 8 - Track Customer Orders & Manage Reservations (Priority: P1) 🎯 MVP

**Goal**: Farmers see all incoming orders, track quantities, confirm production status.

**Independent Test**: Customer creates reservation → farmer dashboard shows order → farmer updates status

### Backend API Endpoints

- [ ] T144 [MVP] [US8-P1] Create farmer orders routes: `backend/src/routes/farmers.ts` extend with order management
  - GET `/api/farmers/orders` - Get all farmer's orders (paginated, filterable by status)
  - GET `/api/farmers/orders/:orderId` - Get order detail with customer info
  - PUT `/api/farmers/orders/:orderId/status` - Update order status

### Frontend Pages & Components

- [ ] T145 [MVP] [US8-P1] Create FarmerOrdersPage: `frontend/src/pages/farmer/OrdersPage.tsx` (orders table with filters, status badges)
- [ ] T146 [MVP] [US8-P1] Create FarmerOrderDetailPage: `frontend/src/pages/farmer/OrderDetailPage.tsx` (full order info, status update controls)
- [ ] T147 [P] [MVP] [US8-P1] Create OrdersTable component: `frontend/src/components/dashboard/OrdersTable.tsx` (sortable, filterable table)
- [ ] T148 [P] [MVP] [US8-P1] Create StatusUpdateControl component: `frontend/src/components/common/StatusUpdateControl.tsx` (status dropdown with update button)

**Checkpoint**: User Story 8 complete. Farmers can manage incoming orders.

---

## PHASE MVP: Testing & Quality Assurance

- [ ] T149 [P] Calculate test coverage for backend: `npm run test:coverage` (target: 70% minimum)
- [ ] T150 [P] Calculate test coverage for frontend: `npm run test:coverage` (target: 70% minimum)
- [ ] T151 Run full test suite: `npm run test:all` from root
- [ ] T152 [P] Run ESLint & Prettier: `npm run lint:fix` to fix formatting issues
- [ ] T153 [P] Manual responsive testing: Test on mobile (320px), tablet (768px), desktop (1024px)
- [ ] T154 [P] Manual dark/light theme testing: Verify theme toggle works on all pages
- [ ] T155 Security audit: Review JWT implementation, password hashing, SQL injection prevention
- [ ] T156 Performance profiling: Check API response times (<200ms), page load (<2s)

**Checkpoint**: MVP version complete, ready for testing

---

## PHASE MVP: Documentation

- [ ] T157 [P] Generate API documentation: `docs/API.md` with all endpoints, request/response examples
- [ ] T158 [P] Create database schema diagram: `docs/DATABASE.md` with ER diagram
- [ ] T159 Create user guides: `docs/CUSTOMER_GUIDE.md`, `docs/FARMER_GUIDE.md`
- [ ] T160 [P] Update README: Installation, setup, testing, deployment instructions

**Checkpoint**: MVP documentation complete

---

## PHASE 2 (After MVP): Farmer Analytics & Reviews - 2 Weeks

### User Story 5 - Leave Product & Farmer Reviews (Priority: P2)
### User Story 10 - View Farm Analytics (Priority: P2)

- [ ] T161 [P] [Phase2] Create Review model and database migration
- [ ] T162 [Phase2] Implement ReviewService: createReview, getProductReviews, getFarmerRating
- [ ] T163 [Phase2] Create review API endpoints
- [ ] T164 [Phase2] Create ReviewPage component and form
- [ ] T165 [P] [Phase2] Create FarmerAnalytics model/queries
- [ ] T166 [Phase2] Implement AnalyticsService: getSalesTrend, getTopProducts, getPeakOrderTimes
- [ ] T167 [Phase2] Create analytics API endpoints
- [ ] T168 [Phase2] Create AnalyticsDashboard component with charts

---

## PHASE 3 (After MVP): Admin Panel & Payments - 2 Weeks

### User Story 11-15 - Admin Panel Features (Priority: P2)

- [ ] T169 [Phase3] Create admin authentication and RBAC
- [ ] T170 [Phase3] Implement UserManagement service: suspend/activate users
- [ ] T171 [Phase3] Create admin user management endpoints
- [ ] T172 [Phase3] Create AdminUserListPage, AdminUserDetailPage
- [ ] T173 [Phase3] Implement ContentModeration service: flag/remove products/reviews
- [ ] T174 [Phase3] Create moderation endpoints
- [ ] T175 [Phase3] Create AdminModerationPage
- [ ] T176 [Phase3] Implement PaymentManagement service: refunds, disputes
- [ ] T177 [Phase3] Create payment management endpoints
- [ ] T178 [Phase3] Create AdminPaymentsPage
- [ ] T179 [Phase3] Create platform settings endpoints
- [ ] T180 [Phase3] Create AdminSettingsPage

---

## MVP Task Summary

**Total MVP Tasks**: ~160 tasks (T001-T158)

**Backend**: ~50 tasks (database, services, API endpoints, tests)  
**Frontend**: ~70 tasks (pages, components, services, hooks, tests)  
**Infrastructure/DevOps**: ~20 tasks (setup, config, CI/CD, docs)  
**Testing & QA**: ~15 tasks (coverage, security, performance, manual testing)  
**Documentation**: ~5 tasks (API docs, guides, README)

**Estimated Timeline**: 2-3 weeks for experienced team, 3-4 weeks for 1-2 person team

---

## Task Status Tracking Template

Copy this to track progress:

```markdown
## MVP Progress Tracker

### Phase 0: Setup (Days 1-2)
- [ ] T001-T010: Foundation complete

### MVP Core (Days 3-14)
#### Backend Foundation
- [ ] T011-T021: Backend infrastructure ready

#### Frontend Foundation
- [ ] T022-T032: Frontend infrastructure ready

#### User Story 1 (Auth)
- [ ] T033-T054: User registration/login complete

#### User Story 2 (Products)
- [ ] T055-T077: Product discovery complete

#### User Story 3 (Cart)
- [ ] T078-T101: Shopping cart complete

#### User Story 4 (Orders)
- [ ] T102-T114: Order tracking complete

#### User Story 6 (Farmer Auth)
- [ ] T115-T126: Farmer registration complete

#### User Story 7 (Farmer Products)
- [ ] T127-T143: Farmer product management complete

#### User Story 8 (Farmer Orders)
- [ ] T144-T148: Farmer order management complete

### Testing & Quality
- [ ] T149-T156: Testing & QA complete

### Documentation
- [ ] T157-T160: Documentation complete

**MVP Status**: In Progress / Complete / Ready for Deployment
```

---

**Document Status**: COMPLETE | **Version**: 1.0.0 | **Last Updated**: 2025-11-16

**MVP Scope**: Tasks T001-T158 (160 tasks total)  
**Post-MVP Scope**: Tasks T159+ (Future phases)
