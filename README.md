# CasePython - Custom Phone Case E-Commerce Platform

CasePython is a modern, full-stack e-commerce platform that allows users to create and order custom phone cases with their own images. Built with Next.js 14, TypeScript, and a comprehensive admin panel for order management.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Key Functionality](#key-functionality)

## 🎯 Overview

CasePython is a custom phone case e-commerce platform where users can:
- Upload their favorite images
- Customize phone case designs with real-time preview
- Select phone models (iPhone 12, 13, 14, 15)
- Choose case materials and finishes
- Place orders with secure payment processing
- Track order status
- Manage their account and order history

The platform includes a comprehensive admin dashboard for managing orders, customers, coupons, and customer support tickets.

## ✨ Features

### Customer Features
- **Image Upload**: Drag-and-drop or click to upload images (PNG, JPG, JPEG)
- **Real-time Preview**: See your custom case design before ordering
- **Customization Options**:
  - Phone model selection (iPhone 12, 13, 14, 15)
  - Case material (Silicone, Polycarbonate)
  - Case finish (Smooth, Textured)
  - Case color options
- **Secure Checkout**: Stripe payment integration
- **Coupon System**: Apply discount codes at checkout
- **Order Tracking**: Track order status and history
- **User Dashboard**: Manage orders, view pending orders, and access support
- **Support System**: Create and manage support tickets
- **Email Notifications**: Receive order confirmations and status updates

### Admin Features
- **Order Management**: View, update, and manage all orders
- **Customer Management**: View customer information and order history
- **Coupon Management**: Create, edit, and manage discount coupons
- **Support Ticket System**: Handle customer support requests
- **Order Status Updates**: Update order status (awaiting_shipment, shipped, fulfilled)
- **PDF Generation**: Download order details as PDF

### Additional Features
- **Dark Mode**: Full dark/light theme support
- **Responsive Design**: Mobile-first, fully responsive UI
- **Authentication**: Clerk-based authentication system
- **File Upload**: UploadThing integration for image storage
- **Email Service**: Resend integration for transactional emails

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Dropzone** - File upload component
- **React Query (TanStack Query)** - Data fetching and caching

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Database
- **Stripe** - Payment processing
- **Clerk** - Authentication and user management
- **UploadThing** - File upload service
- **Resend** - Email service

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Prisma Studio** - Database management

## 📁 Project Structure

```
casepython_dup/
├── prisma/
│   └── schema.prisma          # Database schema definitions
├── public/                     # Static assets (images, icons)
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # About page
│   │   ├── admin/              # Admin dashboard
│   │   │   ├── orders/         # Order management
│   │   │   ├── customers/      # Customer management
│   │   │   ├── coupons/        # Coupon management
│   │   │   └── support/        # Support ticket management
│   │   ├── api/                # API routes
│   │   │   ├── admin/          # Admin API endpoints
│   │   │   ├── uploadthing/    # File upload endpoints
│   │   │   ├── webhooks/       # Stripe webhooks
│   │   │   └── support/        # Support API endpoints
│   │   ├── configure/          # Case configuration flow
│   │   │   ├── upload/         # Image upload page
│   │   │   ├── design/         # Design customization
│   │   │   └── preview/        # Order preview and checkout
│   │   ├── contact/            # Contact page
│   │   ├── dashboard/          # User dashboard
│   │   │   ├── order-history/  # Order history
│   │   │   ├── pending-orders/ # Pending orders
│   │   │   └── help-support/   # Support tickets
│   │   ├── faq/                # FAQ page
│   │   ├── thank-you/          # Order confirmation page
│   │   ├── track/              # Order tracking page
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components
│   │   ├── emails/             # Email templates
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Footer.tsx          # Footer component
│   │   ├── Phone.tsx           # Phone case preview component
│   │   └── Reviews.tsx         # Customer reviews component
│   ├── config/
│   │   └── products.ts         # Product pricing configuration
│   ├── db/
│   │   └── index.ts            # Prisma client instance
│   ├── lib/
│   │   ├── stripe.ts           # Stripe configuration
│   │   ├── uploadthing.ts      # UploadThing configuration
│   │   └── utils.ts            # Utility functions
│   └── validators/
│       └── option-validator.ts # Form validation schemas
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🔄 How It Works

### User Flow

1. **Homepage** → User lands on the homepage showcasing custom phone cases
2. **Upload Image** (`/configure/upload`)
   - User uploads an image (PNG, JPG, JPEG)
   - Image is uploaded to UploadThing
   - Configuration record is created in database
3. **Design Customization** (`/configure/design`)
   - User selects phone model (iPhone 12, 13, 14, 15)
   - Chooses case material (Silicone, Polycarbonate)
   - Selects case finish (Smooth, Textured)
   - Chooses case color
   - Adjusts image position and size
   - Real-time preview of the case
4. **Preview & Checkout** (`/configure/preview`)
   - User reviews their custom case
   - Can apply coupon codes
   - Proceeds to Stripe checkout
   - Order is created in database (status: awaiting_shipment, isPaid: false)
5. **Payment Processing**
   - Stripe handles payment
   - Webhook updates order status (isPaid: true)
   - Shipping and billing addresses are saved
   - Order confirmation email is sent via Resend
6. **Order Confirmation** (`/thank-you`)
   - User sees order confirmation
   - Can track order status
7. **User Dashboard** (`/dashboard`)
   - View order history
   - Track pending orders
   - Access support tickets
   - Manage account

### Admin Flow

1. **Admin Dashboard** (`/admin`)
   - Overview of orders, customers, and support tickets
2. **Order Management** (`/admin/orders`)
   - View all orders with filters
   - Update order status (awaiting_shipment → shipped → fulfilled)
   - View order details
   - Download order PDF
   - Email notifications sent on status changes
3. **Customer Management** (`/admin/customers`)
   - View all customers
   - See customer order history
4. **Coupon Management** (`/admin/coupons`)
   - Create new coupons
   - Set discount percentage
   - Configure validity dates
   - Set usage limits
   - Activate/deactivate coupons
5. **Support Management** (`/admin/support`)
   - View support tickets
   - Respond to customer inquiries
   - Update ticket status (open → in_progress → resolved)

### Payment Flow

1. User completes design and proceeds to checkout
2. `createCheckoutSession` server action is called
3. Order is created/updated in database
4. Stripe Checkout Session is created with order metadata
5. User completes payment on Stripe
6. Stripe webhook (`/api/webhooks/route.ts`) is triggered
7. Order is updated:
   - `isPaid` set to `true`
   - Shipping and billing addresses saved
   - Order confirmation email sent

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Clerk account (for authentication)
- Stripe account (for payments)
- UploadThing account (for file uploads)
- Resend account (for emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd casepython_dup
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory (see [Environment Variables](#environment-variables))

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   # or
   npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/casepython?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# UploadThing
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="..."

# Resend (Email Service)
RESEND_API_KEY="re_..."

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🗄 Database Schema

### Key Models

- **User**: Stores user information (linked to Clerk)
- **Configuration**: Stores case design configurations (image, model, material, finish, color)
- **Order**: Stores order information (status, payment, addresses)
- **ShippingAddress**: Shipping address details
- **BillingAddress**: Billing address details
- **Coupon**: Discount coupon codes
- **SupportTicket**: Customer support tickets
- **SupportMessage**: Messages within support tickets

### Enums

- **OrderStatus**: `awaiting_shipment`, `shipped`, `fulfilled`
- **PhoneModel**: `iphone12`, `iphone13`, `iphone14`, `iphone15`
- **CaseMaterial**: `silicone`, `polycarbonate`
- **CaseFinish**: `smooth`, `textured`
- **CaseColor**: `black`, `blue`, `rose`, `pink`, `green`, `yellow`
- **SupportTicketStatus**: `open`, `in_progress`, `resolved`

## 🎨 Key Functionality

### Pricing System

Base price: $14.99
- Silicone material: $0 (default)
- Polycarbonate material: +$5.00
- Smooth finish: $0 (default)
- Textured finish: +$3.00

Coupon discounts are applied as percentages and can have:
- Validity dates
- Usage limits
- Minimum order amounts

### Image Processing

- Images are uploaded via UploadThing
- Supported formats: PNG, JPG, JPEG
- Images are stored and referenced via URLs
- Real-time preview using phone case templates

### Email System

- **Order Received**: Sent when payment is confirmed
- **Order Status Update**: Sent when admin updates order status
- Built with React Email components

### Authentication

- Clerk handles all authentication
- Users are automatically synced to database
- Protected routes using middleware
- Admin role checking for admin routes

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.

## 📄 License

Private project - All rights reserved.

---

**CasePython** - Protect your memories, not just your phone case.

