# Feature Specification: Farm2Door - Complete Platform

**Feature Branch**: `feature/farm2door-complete-platform`  
**Created**: 2025-11-16  
**Status**: Active  
**Input**: User description: "Modern, fully responsive app with elegant design. Login, landing page, responsive layout, side menu. Different UI for users vs farmers. Users see farmers catalog with ratings, product stages, farm badges. Farmers manage products, planting stages, orders, shipping options. Admin panel for full control."

## Platform Architecture Overview

### User Roles
1. **Customer** - Browses farmers, views products, makes reservations, manages orders
2. **Farmer** - Publishes products, manages yields, tracks orders, ships products
3. **Super Admin** - Controls all users, farmers, platform management, analytics

### Design Philosophy
- **Modern & Elegant**: Sleek, contemporary design that stands out
- **Fully Responsive**: Works flawlessly on mobile, tablet, desktop
- **Consistent Theme Support**: Light/dark mode for all interfaces
- **Intuitive Navigation**: Different UIs for customer, farmer, and admin roles

---

## User Scenarios & Testing *(mandatory)*

### Customer Journey

#### User Story 1 - Customer Registration & Profile Setup (Priority: P1)

Customer registers on the platform with email/password, sets up profile, and selects role as "Customer/Buyer".

**Why this priority**: Foundation for platform access. Without registration, no transactions can occur.

**Independent Test**: Can fully test by completing registration flow, verifying email confirmation, and confirming user can access dashboard.

**Acceptance Scenarios**:

1. **Given** new customer visits the app, **When** clicks "Sign Up", **Then** registration form displays with email, password, full name, phone fields
2. **Given** customer fills registration form, **When** submits, **Then** validation occurs (email format, password strength minimum 8 chars, 1 uppercase, 1 number)
3. **Given** registration succeeds, **When** customer logs in, **Then** redirects to customer dashboard with empty cart/wishlist
4. **Given** customer already exists, **When** attempts same email signup, **Then** shows "Email already registered" error
5. **Given** customer forgot password, **When** clicks "Forgot Password", **Then** receives reset link via email with 24-hour expiry

---

#### User Story 2 - Browse Farmer Catalog & Discover Products (Priority: P1)

Customer lands on homepage and discovers available farmers with their products, ratings, farm badges, and planting stages.

**Why this priority**: Core value proposition. Customers must discover farmers and products to make purchases.

**Independent Test**: Can test by viewing farmer cards without login, filtering products, and verifying all information displays correctly.

**Acceptance Scenarios**:

1. **Given** customer visits homepage, **When** page loads, **Then** displays card-based grid of all active farmers
2. **Given** farmer card displays, **Then** shows: farmer name, profile photo, overall rating (1-5 stars), farm badge (registered/private), product count
3. **Given** customer hovers over farmer card, **When** clicks "View Products", **Then** displays farmer's product list with images, prices, quantities, descriptions
4. **Given** product is displayed, **Then** shows: product name, current quantity available, expected future yields with dates, category, price per unit, unit type (kg/bundles/pieces)
5. **Given** product shows future yield, **Then** displays planting stage badge: "Just Planted", "Growing", "Ready Soon", "Ready Now", "Harvesting", "Finished"
6. **Given** customer searches products, **When** enters "carrots", **Then** filters to show only carrots from all farmers with results count
7. **Given** customer filters by category/price range/delivery date, **Then** results update in real-time showing matching products
8. **Given** no products match filter, **Then** displays "No products found" message with "Clear filters" button

---

#### User Story 3 - Reserve Products with 30% Deposit (Priority: P1)

Customer reserves specific quantities from farmer products with 30% upfront deposit.

**Why this priority**: Revenue generation and order fulfillment. Core business model.

**Independent Test**: Can test complete reservation flow including cart, deposit calculation, and confirmation without payment processing.

**Acceptance Scenarios**:

1. **Given** customer views product, **When** clicks "Reserve", **Then** shows quantity selector (1-available quantity maximum)
2. **Given** customer selects quantity, **When** clicks "Add to Cart", **Then** product added to cart with quantity and price calculation
3. **Given** customer views cart, **Then** displays: product details, quantity, unit price, subtotal, deposit amount (30%), total with deposit
4. **Given** cart displays, **When** customer clicks "Proceed to Checkout", **Then** shows summary with delivery date selection and shipping method options
5. **Given** customer confirms checkout, **When** clicks "Reserve", **Then** creates reservation with status "Pending Payment" and displays confirmation number
6. **Given** reservation created, **Then** sends confirmation email to customer with: order summary, deposit amount due, payment link, farmer contact info
7. **Given** farmer receives order, **Then** farmer dashboard updates in real-time showing new order
8. **Given** customer abandons cart after 1 hour, **Then** cart persists but shows expiration warning

---

#### User Story 4 - Track Reservation Status & Farmer Communication (Priority: P2)

Customer tracks active and past reservations, sees order status updates, and contacts farmer if needed.

**Why this priority**: Customer confidence and support. Reduces uncertainty about orders.

**Independent Test**: Can test order tracking dashboard and status history display independently.

**Acceptance Scenarios**:

1. **Given** customer has active reservations, **When** navigates to "My Orders", **Then** displays active orders with status: "Payment Pending", "Confirmed", "In Production", "Ready for Pickup", "Shipped", "Delivered"
2. **Given** customer views order, **Then** shows: order number, farmer name, product details, quantity, total, deposit paid amount, estimated delivery date
3. **Given** order status changes, **When** farmer updates it, **Then** customer receives real-time notification (bell icon + email)
4. **Given** customer clicks order, **When** clicks "Contact Farmer", **Then** shows farmer contact options: phone, email, or in-app messaging
5. **Given** customer views past orders, **Then** displays completed orders with option to leave review and reorder

---

#### User Story 5 - Leave Product & Farmer Reviews (Priority: P2)

Customer rates and reviews products and farmers after purchase completion.

**Why this priority**: Social proof builds trust. Reviews help other customers decide and farmers improve.

**Independent Test**: Can test review submission and display independently on completed orders.

**Acceptance Scenarios**:

1. **Given** customer has delivered order, **When** clicks "Leave Review", **Then** shows review form with: product rating (1-5 stars), farmer rating (1-5 stars), comment text field (max 500 chars)
2. **Given** customer submits review, **When** review published, **Then** displays on farmer profile and product page immediately
3. **Given** customer views farmer profile, **Then** shows: average rating, total reviews count, individual reviews with customer names, ratings, dates, comments
4. **Given** multiple reviews exist, **When** customer views profile, **Then** reviews sorted by most recent with oldest visible via pagination

---

### Farmer Journey

#### User Story 6 - Farmer Registration & Farm Profile Setup (Priority: P1)

Farmer registers with email/password, sets up farm profile with name, location, type, and optional certification details.

**Why this priority**: Foundation for farmer participation. Without profiles, no product listings possible.

**Independent Test**: Can fully test by completing farmer registration and profile setup without requiring approval.

**Acceptance Scenarios**:

1. **Given** farmer visits signup, **When** selects "I'm a Farmer", **Then** displays farmer registration form with additional fields: farm name, location, farm type (registered/private), description, contact phone
2. **Given** registered farm option selected, **When** farmer provides agricultural registration number, **Then** system validates format and stores for verification badge
3. **Given** farmer completes form, **When** submits, **Then** account created and farmer redirected to product management dashboard
4. **Given** farmer profile created, **Then** generates unique farmer profile URL accessible to customers
5. **Given** farmer logs in first time, **When** dashboard loads, **Then** shows welcome tutorial highlighting key features: add products, manage orders, track ratings

---

#### User Story 7 - Create & Manage Product Listings with Yield Planning (Priority: P1)

Farmer publishes products with current quantities and future yield schedules.

**Why this priority**: Core farmer functionality. Without products, business model doesn't work.

**Independent Test**: Can test product creation and yield planning independently. Farmers can list products without customer interaction.

**Acceptance Scenarios**:

1. **Given** farmer in dashboard, **When** clicks "Add New Product", **Then** displays product creation form with: product name, category, description (min 20 chars), unit type selector (kg/bundles/pieces/other)
2. **Given** farmer fills product details, **When** enters current quantity available, **Then** displays live preview of "X units available now"
3. **Given** farmer adds current yield, **When** clicks "Add Future Yield", **Then** shows form for: expected quantity, expected harvest date, planting stage selector
4. **Given** farmer creates future yield, **Then** displays on product card as: "Carrots - Expected 100kg ready 2025-12-15 (Just Planted)" with visual stage indicator
5. **Given** farmer sets planting stage, **When** selects stage, **Then** shows visual badge: "🌱 Just Planted" / "🌿 Growing" / "⏰ Ready Soon" / "✅ Ready Now" / "🔥 Harvesting" / "✅ Finished"
6. **Given** product listed, **When** customer makes reservation, **Then** reserved quantity deducted from "current available" in real-time
7. **Given** harvest date arrives, **When** farmer confirms harvest, **Then** system updates future yield to current quantity automatically
8. **Given** farmer edits product, **When** changes quantity, **Then** validation prevents quantity going below current reservations

---

#### User Story 8 - Track Customer Orders & Manage Reservations (Priority: P1)

Farmer views all incoming orders, tracks what customers ordered, quantities, and total revenue.

**Why this priority**: Order fulfillment is essential. Farmers need visibility into demand.

**Independent Test**: Can test order dashboard display independently with sample orders.

**Acceptance Scenarios**:

1. **Given** farmer dashboard loads, **When** clicks "My Orders", **Then** displays table with: order number, customer name, product name, quantity ordered, unit price, subtotal, order date, status
2. **Given** new customer order received, **When** enters system, **Then** farmer receives notification (bell + email) with: "New order from [Customer] - [Quantity] [Product]"
3. **Given** farmer views order, **Then** shows: full customer contact info, delivery address, special instructions, shipping method selected
4. **Given** farmer in orders view, **When** filters by status, **Then** shows: Pending Payment, Confirmed, In Production, Ready for Pickup, Shipped, Delivered
5. **Given** multiple orders exist, **When** farmer sorts by date/quantity/revenue, **Then** table re-sorts with sorted indicator showing current sort
6. **Given** order displayed, **When** farmer clicks order, **Then** shows order detail: customer name, phone, email, address, items, deposit paid confirmation
7. **Given** farmer receives order, **When** confirms production start, **Then** status updates to "In Production" and customer notified
8. **Given** product ready, **When** farmer clicks "Ready for Pickup/Shipping", **Then** displays shipping options to select

---

#### User Story 9 - Manage Shipping Options & Logistics (Priority: P2)

Farmer selects shipping methods (DHL, local pickup, courier options) and provides tracking.

**Why this priority**: Critical for fulfillment. Without shipping clarity, customers won't reserve.

**Independent Test**: Can test shipping configuration and selection independently.

**Acceptance Scenarios**:

1. **Given** farmer in settings, **When** clicks "Shipping Methods", **Then** displays available shipping options: "Local Pickup", "DHL", "Courier Service A", "Courier Service B", "Other"
2. **Given** farmer enables shipping method, **When** selects method, **Then** shows configuration options: pickup address, courier account info, rate or fixed fee
3. **Given** order ready, **When** farmer clicks "Ship Order", **Then** displays dropdown to select shipping method for this order
4. **Given** farmer selects shipping method, **When** confirms, **Then** shows tracking number field and shipping label generation option
5. **Given** farmer provides tracking number, **When** saves, **Then** customer receives notification with tracking link and delivery estimate
6. **Given** customer clicks tracking link, **Then** shows real-time shipping status (if integrated) or "Contact farmer for tracking details"

---

#### User Story 10 - View Farm Analytics & Sales Dashboard (Priority: P2)

Farmer views sales metrics, revenue, most popular products, and ratings.

**Why this priority**: Helps farmers understand performance and make business decisions.

**Independent Test**: Can test analytics dashboard display independently.

**Acceptance Scenarios**:

1. **Given** farmer in dashboard, **When** clicks "Analytics", **Then** shows: total sales (this month/all time), total revenue (this month/all time), average order value, total customers
2. **Given** analytics displayed, **Then** shows: top 3 products by orders, most popular product by revenue, peak order times (day of week), seasonal trends
3. **Given** analytics shown, **When** farmer views time period selector, **Then** can filter by: This Week, This Month, Last 3 Months, This Year, Custom Range
4. **Given** farmer reviews metrics, **Then** sees: average customer rating, total reviews count, top reviews display
5. **Given** analytics displayed, **When** farmer exports data, **Then** downloads CSV with sales history for accounting

---

### Super Admin Journey

#### User Story 11 - Admin Dashboard Overview & System Health (Priority: P1)

Super admin accesses comprehensive dashboard showing platform health, user statistics, revenue metrics, and system status.

**Why this priority**: Admin needs bird's-eye view for platform management and decision making.

**Independent Test**: Can test admin dashboard independently.

**Acceptance Scenarios**:

1. **Given** super admin logs in, **When** navigates to admin dashboard, **Then** displays: total users (customers/farmers), total products listed, total active orders, platform revenue (deposits collected), system status
2. **Given** admin dashboard loads, **Then** shows widgets: New Users Today, Orders Today, Revenue This Month, System Health Status
3. **Given** admin dashboard, **Then** displays charts: user growth trend, daily order volume, revenue trend, top performing farmers
4. **Given** system has issues, **When** admin views dashboard, **Then** shows health alerts: "Database Performance Degraded", "High API Error Rate", "Storage Nearly Full"
5. **Given** admin clicks system alert, **When** investigates, **Then** shows detailed metrics and recommended actions

---

#### User Story 12 - Manage All Users (Customers & Farmers) (Priority: P1)

Super admin views and manages all users: suspend/activate accounts, view user details, reset passwords, resolve disputes.

**Why this priority**: Critical for platform integrity. Admin needs user management control.

**Independent Test**: Can test user management interface independently.

**Acceptance Scenarios**:

1. **Given** admin in user management, **When** loads user list, **Then** displays: user name, email, role (customer/farmer), join date, status (active/suspended), actions menu
2. **Given** admin views user list, **When** searches by name/email, **Then** filters results in real-time
3. **Given** admin filters users, **When** selects role filter, **Then** shows only: All, Customers, Farmers, Super Admins
4. **Given** admin clicks user row, **When** views user detail, **Then** shows: profile info, created date, last login, order history (if customer) or product listings (if farmer), payment info
5. **Given** admin has user detail open, **When** clicks "Suspend Account", **Then** displays confirmation dialog with suspension reason selector and temporary/permanent option
6. **Given** admin suspends account, **When** confirms, **Then** user immediately logged out and cannot login; receives suspension notification
7. **Given** suspended user, **When** admin clicks "Reactivate", **Then** account reactivated and user notified
8. **Given** user account issue, **When** admin clicks "Reset Password", **Then** generates temporary password and sends to user email
9. **Given** user disputes payment, **When** admin reviews order, **Then** can: refund deposit, force order completion, or suspend payment

---

#### User Story 13 - Monitor & Moderate Content (Products, Reviews) (Priority: P2)

Super admin reviews all products and customer reviews to enforce platform standards and remove inappropriate content.

**Why this priority**: Platform reputation depends on content quality and safety.

**Independent Test**: Can test moderation interface independently.

**Acceptance Scenarios**:

1. **Given** admin in moderation, **When** clicks "Products Flagged", **Then** displays products reported by customers with: product name, farmer, reason for flag, reporter count, actions
2. **Given** flagged product shown, **When** admin reviews it, **Then** can: "Approve", "Request Changes", "Remove Product", "Suspend Farmer"
3. **Given** admin clicks "Review Moderation", **When** loads reviews section, **Then** shows: new reviews, flagged reviews, reviews with low quality reports
4. **Given** reviews displayed, **Then** shows: reviewer name, rating, text, product/farmer reviewed, report count, moderation actions
5. **Given** admin identifies spam/offensive review, **When** clicks "Remove Review", **Then** review deleted and reporter notified of action taken

---

#### User Story 14 - Manage Payments & Disputes (Priority: P2)

Super admin monitors payment collections, refunds, chargebacks, and resolves financial disputes.

**Why this priority**: Financial control and fraud prevention critical for platform.

**Independent Test**: Can test payments dashboard independently.

**Acceptance Scenarios**:

1. **Given** admin in payments section, **When** loads dashboard, **Then** displays: total deposits collected, pending refunds, total revenue, chargeback count
2. **Given** admin views transactions, **When** filters by date range/status, **Then** shows filtered list: transaction ID, customer, farmer, amount, deposit %, status (completed/pending/failed/disputed)
3. **Given** transaction displays, **When** clicks transaction, **Then** shows full details: payer, receiver, amount, fee, timestamp, payment method, customer order reference
4. **Given** customer initiates refund, **When** admin reviews, **Then** shows: refund reason, order status, eligibility check, approval/reject options
5. **Given** admin approves refund, **When** confirms, **Then** refund processed and both parties notified
6. **Given** chargeback reported, **When** admin investigates, **Then** shows transaction details, order completion status, shipping proof, customer communications
7. **Given** admin resolves dispute, **When** approves/rejects claim, **Then** notifies both parties of resolution

---

#### User Story 15 - Platform Settings & Configuration (Priority: P2)

Super admin configures platform-wide settings: commission rates, deposit percentages, fee structures, system messages, maintenance mode.

**Why this priority**: Operational control over platform economics and messaging.

**Independent Test**: Can test settings panel independently.

**Acceptance Scenarios**:

1. **Given** admin in settings, **When** clicks "Commission Settings", **Then** displays: commission % charged to farmers, commission % charged to customers, deposit % requirement (default 30%)
2. **Given** admin changes commission rate, **When** updates value, **Then** shows warning: "This affects all new orders from [date]"
3. **Given** admin in settings, **When** clicks "Messages", **Then** can edit: account suspension message, system maintenance alert, terms of service, platform policies
4. **Given** admin needs maintenance, **When** clicks "Maintenance Mode", **Then** can schedule downtime with message shown to all users
5. **Given** admin in settings, **When** clicks "Email Templates", **Then** can customize: order confirmation, shipping notification, review request, promotional emails
6. **Given** admin changes settings, **When** saves, **Then** displays confirmation: "Settings updated successfully"

---

## Clarifications & Decisions

### CR-001: Agricultural Database Validation
**Question**: How should the system validate farm registration numbers for "Registered Agricultural Farm" designation?

**Best-Guess Solution**: Implement flexible validation:
1. Accept registration number format (varies by country/region)
2. Store registration number with verification status: pending/verified/failed
3. Support manual admin review process for verification
4. For MVP: Mark as "Pending Verification" until admin confirms
5. Future: Integrate with official agricultural registry APIs when available

**Decision Ratified**: Use manual admin verification in MVP; plan API integration in Phase 4

---

### CR-002: Payment Processing Integration
**Question**: Since deposit is 30% upfront, how should payment be handled during MVP (no payment gateway)?

**Best-Guess Solution**: Implement payment framework with mock provider:
1. Create reservation with "Pending Payment" status
2. Display deposit amount with placeholder payment button
3. Generate shareable payment invoice/receipt (PDF/email)
4. Admin can manually mark payment as received via admin panel
5. Future Phase 3: Replace mock with Stripe/PayPal integration
6. Payment status tracked in Payment entity with transaction_id for future gateway

**Decision Ratified**: Use mock payment system with manual admin confirmation in MVP; build payment entity structure for future integration

---

### CR-003: In-App Messaging vs. Email/Phone Contact
**Question**: User Story 4 mentions "in-app messaging" but also phone/email - which should MVP support?

**Best-Guess Solution**: MVP supports all three with priority ranking:
1. **Email** (Primary): Reliable, familiar, no real-time requirement
2. **Phone** (Secondary): Display farmer's phone; allow copy-to-call
3. **In-App Messaging** (Future Phase 4): Real-time messaging requires additional infrastructure

**Current Implementation**: Show farmer contact options (phone, email) on order detail page. In-app messaging button deferred to Phase 4.

**Decision Ratified**: Email + phone for MVP; defer real-time messaging to Phase 4

---

### CR-004: Automatic Harvest Date Transition
**Question**: FR-018 mentions automatic transition from "Ready Soon" to "Ready Now" - what triggers this?

**Best-Guess Solution**: Implement scheduled transition system:
1. **Daily Background Job** (runs at 00:00 UTC): Check all FutureYield entries
2. **Trigger Logic**: If current date >= expected_date AND status = "ready_soon", change to "ready_now"
3. **Fallback**: Customer can manually update status during checkout if expected date has passed
4. **Notification**: Farmer receives email when product transitions to "Ready Now"
5. **Real-time Updates**: Dashboard reflects change within 1 minute for active users

**Implementation**: Use Node.js cron job or backend scheduled task; monitor for missed transitions in admin health dashboard.

**Decision Ratified**: Daily scheduled job at midnight UTC with manual override capability

---

## Edge Cases

- **What happens when** multiple farmers have same product and customer needs to compare prices?
  → System sorts by price, availability date, and farmer rating; enables side-by-side comparison
  
- **What happens when** customer reserves product but reservation expires before payment?
  → After 24 hours without payment confirmation, reservation cancelled; inventory returned to farmer; customer notified with option to re-reserve
  
- **What happens when** farmer updates product quantity below current reservations?
  → System prevents update; displays warning showing current reservations; suggests updating harvest date instead
  
- **What happens when** farmer account suspended mid-order?
  → Active orders continue; new orders blocked; customer notified of farmer unavailability; refunds offered if order not yet produced
  
- **What happens when** system cannot reach payment provider?
  → Displays error to customer; reservation enters "payment pending" state; retry available; after 3 failures, refund offered
  
- **What happens when** same email used for multiple accounts?
  → System prevents duplicate registration; suggests password recovery or account merge
  
- **What happens when** customer tries to reserve more than available?
  → Input validation limits max quantity to available amount; shows "Only X units available"
  
- **What happens when** farmer deletes active product with pending orders?
  → System prevents deletion; displays warning with pending order count; suggests archiving instead
  
- **What happens when** admin network connection lost during user suspension?
  → Client-side optimistic update queued; retried when connection restored; confirmation shown once synced
  
- **What happens when** review contains inappropriate content (profanity detected)?
  → Review flagged automatically for admin review; hidden from public display until moderation complete

---

## Requirements *(mandatory)*

### Functional Requirements

#### Authentication & Authorization
- **FR-001**: System MUST support role-based access control (RBAC) with three roles: Customer, Farmer, Super Admin
- **FR-002**: System MUST authenticate users via email/password with JWT tokens, expiring after 24 hours (refresh token for 7 days)
- **FR-003**: System MUST enforce password minimum requirements: 8 characters, 1 uppercase, 1 number, 1 special character
- **FR-004**: System MUST provide password reset via email link with 24-hour expiry
- **FR-005**: System MUST prevent account lockout after 5 failed login attempts; unlock after 30 minutes or via email

#### User Management
- **FR-006**: System MUST allow customers to register with: email, password, full name, phone number
- **FR-007**: System MUST allow farmers to register with: email, password, farm name, location, farm type (registered/private), description
- **FR-008**: System MUST validate farm registration numbers for registered farms against agricultural database
- **FR-009**: System MUST display farm badge (Registered Agricultural Farm / Private Garden) on farmer profiles
- **FR-010**: System MUST allow users to update profile information: name, phone, address, preferences
- **FR-011**: System MUST allow users to delete accounts with 30-day grace period before permanent deletion
- **FR-012**: Super admin MUST be able to suspend/activate any user account with reason logging

#### Product Management
- **FR-013**: System MUST allow farmers to create products with: name, description, category, unit type, price per unit
- **FR-014**: System MUST allow farmers to set current quantity available for each product
- **FR-015**: System MUST allow farmers to add multiple future yields for same product with: expected quantity, expected date, planting stage
- **FR-016**: System MUST display 6 planting stage options: "Just Planted", "Growing", "Ready Soon", "Ready Now", "Harvesting", "Finished"
- **FR-017**: System MUST show planting stage badge with emoji/visual indicator on product cards
- **FR-018**: System MUST automatically transition "Ready Soon" to "Ready Now" on expected harvest date [NEEDS CLARIFICATION: automatic transition requires scheduled job - define frequency (hourly/daily) and fallback approach]
- **FR-019**: System MUST prevent farmer from reducing current quantity below current reservations
- **FR-020**: System MUST show product availability countdown: "X units available", "Last X units", "Out of stock"
- **FR-021**: System MUST prevent deletion of products with active reservations; suggest archiving instead
- **FR-022**: System MUST allow farmers to upload 1-5 product images per product

#### Product Discovery & Browsing
- **FR-023**: System MUST display farmer cards on customer homepage with: name, photo, rating, farm badge, product count
- **FR-024**: System MUST sort farmer cards by: rating (default), closest location, newest, most products
- **FR-025**: System MUST enable customer search by: product name, farmer name, category, location
- **FR-026**: System MUST enable customer filtering by: category, price range, availability date, farm type (registered/private)
- **FR-027**: System MUST show real-time search results with result count and "no results" message
- **FR-028**: System MUST display product cards with: image, name, price, current quantity, next harvest date (if future yield exists), farmer name, farmer rating
- **FR-029**: System MUST highlight "Just Planted" products to enable pre-ordering before planting complete
- **FR-030**: System MUST show product details page with: full description, all images, price history (if available), customer reviews, farmer contact, farmer's other products

#### Reservations & Cart Management
- **FR-031**: System MUST allow customers to add products to cart with quantity selection (1 to available max)
- **FR-032**: System MUST calculate deposit automatically as 30% of order total
- **FR-033**: System MUST allow customers to edit cart quantities before checkout
- **FR-034**: System MUST allow customers to remove items from cart
- **FR-035**: System MUST persist cart for 30 days for logged-in users
- **FR-036**: System MUST show cart summary: items, quantities, unit prices, subtotal, deposit (30%), total with deposit
- **FR-037**: System MUST allow customers to select shipping method before checkout: Local Pickup, DHL, Other Couriers
- **FR-038**: System MUST create reservation on checkout with: customer ID, product ID, quantity, deposit amount, estimated delivery date
- **FR-039**: System MUST assign reservation status: Pending Payment → Confirmed → In Production → Ready for Pickup → Shipped → Delivered
- **FR-040**: System MUST generate unique confirmation number for each reservation
- **FR-041**: System MUST deduct reserved quantity from farmer's available inventory in real-time
- **FR-042**: System MUST cancel reservation if payment not received within 24 hours; return inventory to farmer
- **FR-043**: System MUST allow customer to cancel reservation before production starts with full refund; after production starts with forfeiture of deposit

#### Payments & Financial Management
- **FR-044**: System MUST collect 30% deposit on all reservations upfront (future: integrate payment gateway)
- **FR-045**: System MUST log all payment attempts with timestamp, amount, status, failure reason if applicable
- **FR-046**: System MUST generate deposit invoice for each reservation
- **FR-047**: System MUST track payment status per reservation: Pending, Completed, Failed, Disputed, Refunded
- **FR-048**: System MUST support refund requests with reason selection and refund timeline
- **FR-049**: System MUST process refunds and update customer + farmer notifications
- **FR-050**: System MUST calculate and track commission per transaction (configurable by super admin)
- **FR-051**: System MUST provide farmer with earnings dashboard: total earned, pending payout, next payout date

#### Reviews & Ratings
- **FR-052**: System MUST allow customers to leave reviews for products and farmers after delivery
- **FR-053**: System MUST enable review rating: 1-5 stars for product and farmer separately
- **FR-054**: System MUST limit review text to 500 characters with real-time character count
- **FR-055**: System MUST display reviews on product page and farmer profile with: customer name, rating, date, text, helpful votes
- **FR-056**: System MUST calculate average rating per farmer and per product from all reviews
- **FR-057**: System MUST sort reviews by: most recent, highest rating, lowest rating, most helpful
- **FR-058**: System MUST flag reviews automatically if profanity detected or if manually reported by users
- **FR-059**: System MUST hide flagged reviews from public display pending admin moderation
- **FR-060**: System MUST allow super admin to approve, modify, or delete inappropriate reviews

#### Order Management & Tracking
- **FR-061**: System MUST display farmer order dashboard with: all incoming orders, status, customer info, quantities, revenue
- **FR-062**: System MUST send real-time notification to farmer when new order received
- **FR-063**: System MUST allow farmer to update order status with: Confirmed, In Production, Ready for Pickup, Shipped, Delivered
- **FR-064**: System MUST send customer notification when order status changes
- **FR-065**: System MUST display customer order tracking page with: status timeline, estimated dates, contact farmer option
- **FR-066**: System MUST allow customers to view order history with past orders and reorder option
- **FR-067**: System MUST show farmer a complete order record with: customer name, phone, email, delivery address, special instructions

#### Shipping & Logistics
- **FR-068**: System MUST support configurable shipping methods: Local Pickup, DHL, Courier Service A, Courier Service B, Other
- **FR-069**: System MUST allow farmers to select multiple shipping methods in settings
- **FR-070**: System MUST enable farmers to specify pickup location address if local pickup enabled
- **FR-071**: System MUST allow farmers to input carrier account numbers (encrypted storage for DHL, etc.)
- **FR-072**: System MUST enable farmer to select shipping method when order ready and generate shipping label option
- **FR-073**: System MUST allow farmer to input tracking number for shipped orders
- **FR-074**: System MUST send tracking information to customer with tracking link
- **FR-075**: System MUST display estimated delivery date based on shipping method selected

#### Analytics & Reporting
- **FR-076**: System MUST provide farmer analytics dashboard with: total sales (configurable time period), revenue, avg order value, total customers
- **FR-077**: System MUST display farmer top 3 products by orders and revenue with trend indicators
- **FR-078**: System MUST show farmer peak order times (day of week) and seasonal trends
- **FR-079**: System MUST allow farmer to export sales data to CSV format
- **FR-080**: System MUST provide super admin platform analytics: total users, active orders, revenue, growth trends
- **FR-081**: System MUST display admin system health metrics: API response times, database performance, error rates, storage usage

#### Super Admin Features
- **FR-082**: System MUST provide super admin user management interface with: list all users, search, filter by role, suspend/activate accounts
- **FR-083**: System MUST allow super admin to view detailed user profile with: registration date, last login, order/product history, payment history
- **FR-084**: System MUST allow super admin to reset user passwords and notify user
- **FR-085**: System MUST allow super admin to configure platform settings: commission rates, deposit percentage, fees
- **FR-086**: System MUST provide super admin moderation interface for: flagged products, flagged reviews
- **FR-087**: System MUST allow super admin to remove inappropriate products/reviews with notification to affected parties
- **FR-088**: System MUST provide super admin payment/dispute management interface: view all transactions, refund requests, chargeback claims
- **FR-089**: System MUST allow super admin to approve/reject refund requests with reason notification
- **FR-090**: System MUST provide super admin system configuration: email templates, maintenance mode, system messages, platform policies
- **FR-091**: System MUST support super admin audit log: all admin actions with timestamp, admin user, action type, affected user/product

#### UI/UX & Theming
- **FR-092**: System MUST support light and dark theme across all interfaces with user preference persistence
- **FR-093**: System MUST ensure responsive design for: mobile (320px+), tablet (768px+), desktop (1024px+)
- **FR-094**: System MUST display side navigation menu with: role-based menu items, collapsible on mobile, icons + labels
- **FR-095**: System MUST provide consistent header with: logo, search bar (if applicable), user profile dropdown, notifications badge
- **FR-096**: System MUST show real-time notification badge with new orders, messages, status updates, admin alerts
- **FR-097**: System MUST display elegant, modern design with: smooth animations, micro-interactions, accessibility compliance (WCAG AA)

#### Notifications
- **FR-098**: System MUST send email notifications for: registration, password reset, order confirmation, order status updates, delivery confirmation, review request, suspension notice
- **FR-099**: System MUST send in-app notifications (real-time) for: new orders (farmers), status updates, shipping info, admin alerts
- **FR-100**: System MUST allow users to customize notification preferences: email frequency, notification types, opt-out options
- **FR-101**: System MUST maintain notification history accessible to users in notification center with 90-day retention

---

### Key Entities *(include if feature involves data)*

#### User Entity
**Attributes**: id, email, password_hash, full_name, phone, address, role (customer/farmer/admin), profile_photo_url, theme_preference (light/dark), is_active, is_verified, created_at, updated_at, last_login, suspension_reason (nullable), suspension_date (nullable)

#### FarmProfile Entity
**Attributes**: id, user_id (foreign key to User), farm_name, location, farm_type (registered/private), description, registration_number (nullable), registration_verified (boolean), is_active, created_at, updated_at

#### Product Entity
**Attributes**: id, farmer_id (foreign key to FarmProfile), name, description, category, unit_type, price_per_unit, image_urls (array), is_active, created_at, updated_at, archived_at (nullable)

#### ProductInventory Entity
**Attributes**: id, product_id (foreign key), current_quantity_available, total_reserved_quantity, updated_at

#### FutureYield Entity
**Attributes**: id, product_id (foreign key), expected_quantity, expected_date, planting_stage (enum: just_planted/growing/ready_soon/ready_now/harvesting/finished), status (planned/confirmed/harvested), created_at, updated_at

#### Reservation Entity
**Attributes**: id, customer_id (foreign key), product_id (foreign key), farmer_id (foreign key), quantity_reserved, unit_price, subtotal, deposit_amount (30%), total_with_deposit, status (pending_payment/confirmed/in_production/ready_for_pickup/shipped/delivered), confirmation_number, shipping_method, tracking_number (nullable), estimated_delivery_date, actual_delivery_date (nullable), created_at, fulfilled_at (nullable), cancelled_at (nullable)

#### Payment Entity
**Attributes**: id, reservation_id (foreign key), amount, deposit_percentage, payment_method, status (pending/completed/failed/disputed/refunded), transaction_id (nullable), failure_reason (nullable), refund_request_id (nullable), created_at, completed_at (nullable), refunded_at (nullable)

#### Review Entity
**Attributes**: id, reservation_id (foreign key), customer_id (foreign key), farmer_id (foreign key), product_id (foreign key), product_rating (1-5), farmer_rating (1-5), comment_text (max 500 chars), is_flagged (boolean), flag_reason (nullable), helpful_votes_count, created_at, approved_at (nullable), rejected_at (nullable)

#### ShippingMethod Entity
**Attributes**: id, farmer_id (foreign key), method_type (enum: local_pickup/dhl/courier_a/courier_b/other), is_enabled (boolean), pickup_address (nullable), carrier_account (encrypted, nullable), rate_or_fee, created_at, updated_at

#### AdminAuditLog Entity
**Attributes**: id, admin_id (foreign key), action_type (enum: user_suspended/user_activated/review_removed/product_removed/settings_changed/etc), affected_user_id (nullable), affected_product_id (nullable), details_json, created_at

---

## Non-Functional Requirements Summary

### Performance
- Page load time: < 2 seconds (3G network simulation)
- API response time: < 200ms (95th percentile)
- Database queries: Indexed for searches, reservations, user lookups
- Real-time notifications: < 1 second latency

### Security
- All passwords hashed with bcrypt (minimum 10 rounds)
- HTTPS enforced on all routes
- JWT tokens stored in httpOnly cookies
- PII encryption at rest and in transit
- SQL injection prevention via parameterized queries
- CSRF protection on state-changing operations
- Rate limiting: 100 requests/min per IP, 5 login attempts/15 min

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation throughout
- Screen reader compatible
- Color contrast ratio minimum 4.5:1
- Alt text on all images

### Scalability
- Stateless backend for horizontal scaling
- Database connection pooling (25-50 connections)
- Caching strategy: product listings (5 min), farmer profiles (10 min), ratings (30 min)
- CDN for static assets and product images

### Reliability
- 99.5% uptime SLA target
- Automated daily database backups with 30-day retention
- Health check endpoints for monitoring
- Graceful error handling with user-friendly messages
- Transaction rollback on payment failures

---

## Phase & Deployment Strategy

### MVP Phase 1 (Weeks 1-4): Core Platform
- User registration (customer/farmer), login, profile management
- Basic product listing and browsing
- Shopping cart and checkout (deposit calculated, no payment processing yet)
- Basic order tracking
- Responsive design for mobile/tablet/desktop

### Phase 2 (Weeks 5-8): Farmer & Order Management
- Farmer dashboard with product management
- Farmer order management and status updates
- Shipping method configuration and tracking number input
- Farmer analytics dashboard
- Review system

### Phase 3 (Weeks 9-12): Admin & Advanced Features
- Super admin panel with user management
- Admin moderation for content and reviews
- Platform settings and configuration
- Payment gateway integration
- Advanced analytics and reporting

### Phase 4+: Future Enhancements
- Real payment processing (Stripe/PayPal)
- In-app messaging between customers and farmers
- Mobile native apps
- Admin approval workflow for new farmers
- Subscription models
- API for third-party integrations

---

**Document Status**: COMPLETE | **Version**: 1.0.0 | **Last Updated**: 2025-11-16
