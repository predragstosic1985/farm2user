# Farm2Door Repository Structure

```
farm2door/
├── package.json                    # Root workspace configuration
├── .eslintrc.json                 # Shared ESLint configuration
├── .prettierrc.json               # Shared Prettier configuration
├── PROGRESS.md                    # Implementation progress tracker
├── README.md                      # Project overview
│
├── backend/                       # Express.js backend
│   ├── package.json
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   ├── .env.example
│   │
│   ├── src/
│   │   ├── index.ts                      # Application entry point
│   │   ├── types/                        # Global TypeScript types
│   │   │   ├── index.ts
│   │   │   ├── auth.ts
│   │   │   ├── entities.ts
│   │   │   └── api.ts
│   │   │
│   │   ├── config/                       # Configuration files
│   │   │   ├── database.ts               # Sequelize connection
│   │   │   ├── logger.ts                 # Winston logging
│   │   │   ├── env.ts                    # Environment variables
│   │   │   └── constants.ts              # App constants
│   │   │
│   │   ├── models/                       # Sequelize models
│   │   │   ├── User.ts
│   │   │   ├── FarmProfile.ts
│   │   │   ├── Product.ts
│   │   │   ├── ProductInventory.ts
│   │   │   ├── FutureYield.ts
│   │   │   ├── Reservation.ts
│   │   │   ├── Payment.ts
│   │   │   ├── Review.ts
│   │   │   ├── ShippingMethod.ts
│   │   │   ├── Order.ts
│   │   │   ├── OrderItem.ts
│   │   │   ├── Notification.ts
│   │   │   └── AdminAuditLog.ts
│   │   │
│   │   ├── middleware/                   # Express middleware
│   │   │   ├── auth.ts                   # JWT verification
│   │   │   ├── errorHandler.ts           # Global error handler
│   │   │   ├── validation.ts             # Input validation (Joi)
│   │   │   ├── cors.ts                   # CORS configuration
│   │   │   ├── logging.ts                # Request logging
│   │   │   └── roleCheck.ts              # Role-based access control
│   │   │
│   │   ├── routes/                       # API route handlers
│   │   │   ├── index.ts                  # Route registration
│   │   │   ├── auth.ts                   # Auth routes
│   │   │   ├── users.ts                  # User routes
│   │   │   ├── farmers.ts                # Farmer profile routes
│   │   │   ├── products.ts               # Product routes
│   │   │   ├── reservations.ts           # Reservation routes
│   │   │   ├── orders.ts                 # Order routes
│   │   │   ├── reviews.ts                # Review routes
│   │   │   ├── payments.ts               # Payment routes
│   │   │   ├── notifications.ts          # Notification routes
│   │   │   └── admin.ts                  # Admin routes
│   │   │
│   │   ├── controllers/                  # Route controllers
│   │   │   ├── authController.ts
│   │   │   ├── productController.ts
│   │   │   ├── reservationController.ts
│   │   │   ├── orderController.ts
│   │   │   └── ... (more controllers)
│   │   │
│   │   ├── services/                     # Business logic layer
│   │   │   ├── authService.ts
│   │   │   ├── userService.ts
│   │   │   ├── farmerService.ts
│   │   │   ├── productService.ts
│   │   │   ├── reservationService.ts
│   │   │   ├── orderService.ts
│   │   │   ├── paymentService.ts
│   │   │   ├── reviewService.ts
│   │   │   ├── emailService.ts
│   │   │   └── analyticsService.ts
│   │   │
│   │   ├── repositories/                 # Data access layer
│   │   │   ├── userRepository.ts
│   │   │   ├── productRepository.ts
│   │   │   ├── reservationRepository.ts
│   │   │   ├── orderRepository.ts
│   │   │   └── ... (more repositories)
│   │   │
│   │   ├── utils/                        # Utility functions
│   │   │   ├── jwt.ts                    # JWT generation/verification
│   │   │   ├── password.ts               # Password hashing/comparison
│   │   │   ├── validators.ts             # Validation helpers
│   │   │   ├── formatters.ts             # Response formatting
│   │   │   ├── calculations.ts           # Business calculations (30% deposit)
│   │   │   └── errors.ts                 # Custom error classes
│   │   │
│   │   └── templates/                    # Email templates
│   │       ├── welcome.html
│   │       ├── resetPassword.html
│   │       ├── orderConfirmation.html
│   │       └── ... (more templates)
│   │
│   ├── migrations/                       # Database migrations
│   │   ├── 001_create_users_table.ts
│   │   ├── 002_create_farm_profiles.ts
│   │   ├── 003_create_products.ts
│   │   └── ... (more migrations)
│   │
│   ├── seeds/                            # Database seed data
│   │   ├── users.ts
│   │   ├── products.ts
│   │   └── farmProfiles.ts
│   │
│   └── tests/                            # Test files
│       ├── unit/
│       │   ├── services/
│       │   │   ├── authService.test.ts
│       │   │   ├── productService.test.ts
│       │   │   └── ... (more unit tests)
│       │   ├── utils/
│       │   │   ├── jwt.test.ts
│       │   │   ├── password.test.ts
│       │   │   └── ... (more unit tests)
│       │   └── models/
│       │       ├── user.test.ts
│       │       └── ... (more model tests)
│       │
│       └── integration/
│           ├── auth.integration.test.ts
│           ├── products.integration.test.ts
│           ├── orders.integration.test.ts
│           └── ... (more integration tests)
│
├── frontend/                       # React frontend
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── vitest.config.ts
│   ├── .env.example
│   ├── index.html
│   │
│   ├── public/                           # Static assets
│   │   ├── logo.svg
│   │   ├── favicon.ico
│   │   └── ... (more assets)
│   │
│   ├── src/
│   │   ├── main.tsx                      # App entry point
│   │   ├── App.tsx                       # Root component
│   │   ├── vite-env.d.ts
│   │   │
│   │   ├── types/                        # TypeScript type definitions
│   │   │   ├── index.ts
│   │   │   ├── entities.ts
│   │   │   ├── api.ts
│   │   │   ├── store.ts
│   │   │   └── ui.ts
│   │   │
│   │   ├── theme/                        # Material-UI theme
│   │   │   ├── index.ts                  # Theme configuration
│   │   │   ├── colors.ts                 # Color palette
│   │   │   ├── typography.ts             # Typography settings
│   │   │   └── components.ts             # Component overrides
│   │   │
│   │   ├── styles/                       # Global styles
│   │   │   ├── index.scss                # Global SCSS
│   │   │   ├── variables.scss            # SCSS variables
│   │   │   └── mixins.scss               # SCSS mixins
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── MainLayout.tsx
│   │   │   │
│   │   │   └── common/
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Modal.tsx
│   │   │       ├── Loading.tsx
│   │   │       ├── ErrorBoundary.tsx
│   │   │       ├── Pagination.tsx
│   │   │       ├── SearchBar.tsx
│   │   │       └── ... (more common components)
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── RegisterPage.tsx
│   │   │   │   └── ForgotPasswordPage.tsx
│   │   │   │
│   │   │   ├── customer/
│   │   │   │   ├── HomePage.tsx
│   │   │   │   ├── ProductsPage.tsx
│   │   │   │   ├── ProductDetailPage.tsx
│   │   │   │   ├── CartPage.tsx
│   │   │   │   ├── CheckoutPage.tsx
│   │   │   │   ├── OrdersPage.tsx
│   │   │   │   ├── OrderDetailPage.tsx
│   │   │   │   ├── FarmerProfilePage.tsx
│   │   │   │   └── ReviewPage.tsx
│   │   │   │
│   │   │   ├── farmer/
│   │   │   │   ├── DashboardPage.tsx
│   │   │   │   ├── ProfilePage.tsx
│   │   │   │   ├── ProductsPage.tsx
│   │   │   │   ├── AddProductPage.tsx
│   │   │   │   ├── ReservationsPage.tsx
│   │   │   │   ├── SalesPage.tsx
│   │   │   │   ├── AnalyticsPage.tsx
│   │   │   │   └── ReviewsPage.tsx
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── DashboardPage.tsx
│   │   │   │   ├── UsersPage.tsx
│   │   │   │   ├── FarmsPage.tsx
│   │   │   │   ├── ReportsPage.tsx
│   │   │   │   └── SettingsPage.tsx
│   │   │   │
│   │   │   ├── shared/
│   │   │   │   ├── NotFoundPage.tsx
│   │   │   │   ├── UnauthorizedPage.tsx
│   │   │   │   └── ErrorPage.tsx
│   │   │   │
│   │   │   └── common/
│   │   │       └── LandingPage.tsx
│   │   │
│   │   ├── hooks/                        # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useApi.ts
│   │   │   ├── useFetch.ts
│   │   │   ├── useForm.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   └── useTheme.ts
│   │   │
│   │   ├── services/
│   │   │   └── api/                      # API client services
│   │   │       ├── axiosClient.ts        # Axios instance
│   │   │       ├── authApi.ts
│   │   │       ├── userApi.ts
│   │   │       ├── productApi.ts
│   │   │       ├── reservationApi.ts
│   │   │       ├── orderApi.ts
│   │   │       ├── reviewApi.ts
│   │   │       └── farmerApi.ts
│   │   │
│   │   ├── store/                        # Zustand store
│   │   │   ├── index.ts
│   │   │   ├── authStore.ts
│   │   │   ├── productStore.ts
│   │   │   ├── cartStore.ts
│   │   │   ├── userStore.ts
│   │   │   └── notificationStore.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── formatters.ts             # Number, date formatters
│   │   │   ├── validators.ts             # Client-side validation
│   │   │   ├── constants.ts              # App constants
│   │   │   └── helpers.ts                # General helpers
│   │   │
│   │   └── routes/                       # React Router configuration
│   │       ├── index.tsx
│   │       ├── ProtectedRoute.tsx
│   │       └── roleRoutes.tsx
│   │
│   ├── tests/
│   │   ├── setup.ts                      # Vitest setup
│   │   │
│   │   ├── unit/
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.test.ts
│   │   │   │   ├── useApi.test.ts
│   │   │   │   └── ... (more hook tests)
│   │   │   │
│   │   │   ├── utils/
│   │   │   │   ├── formatters.test.ts
│   │   │   │   ├── validators.test.ts
│   │   │   │   └── ... (more utility tests)
│   │   │   │
│   │   │   └── store/
│   │   │       ├── authStore.test.ts
│   │   │       ├── cartStore.test.ts
│   │   │       └── ... (more store tests)
│   │   │
│   │   └── components/
│   │       ├── Button.test.tsx
│   │       ├── Modal.test.tsx
│   │       ├── Header.test.tsx
│   │       └── ... (more component tests)
│   │
│   └── dist/                             # Built output (generated)
│
├── .github/
│   └── workflows/
│       ├── test.yml                      # Automated test pipeline
│       └── lint.yml                      # Linting pipeline
│
├── docs/
│   ├── README.md                         # Documentation index
│   ├── API.md                            # API documentation
│   ├── SETUP.md                          # Setup guide
│   ├── ARCHITECTURE.md                   # Architecture guide (pending)
│   ├── DATABASE.md                       # Database schema (pending)
│   └── CONTRIBUTING.md                   # Contribution guidelines (pending)
│
├── README.md                             # Project README
├── PROGRESS.md                           # Implementation tracker
├── .gitignore                            # Git ignore rules
└── LICENSE                               # MIT License

```

## File Count Summary

```
Total Directories: 35+
Total Files: 150+ (including generated code)

Breakdown:
- Backend source: 40+ files
- Frontend source: 60+ files
- Tests: 30+ files
- Configuration: 15+ files
- Documentation: 5+ files
```

## Key Paths for Development

### Backend Development
- Models: `backend/src/models/`
- Services: `backend/src/services/`
- Routes: `backend/src/routes/`
- Tests: `backend/tests/`

### Frontend Development
- Pages: `frontend/src/pages/`
- Components: `frontend/src/components/`
- Hooks: `frontend/src/hooks/`
- Tests: `frontend/tests/`

### Configuration
- Environment: `.env.example` files in each package
- ESLint: `.eslintrc.json` at root
- Prettier: `.prettierrc.json` at root
- TypeScript: `tsconfig.json` in each package

### Documentation
- API docs: `docs/API.md`
- Setup: `docs/SETUP.md`
- Progress: `PROGRESS.md`
