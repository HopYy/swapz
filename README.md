# SWAPZ

![swapz](https://raw.githubusercontent.com/HopYy/swapz/main/swapz.jpg)

# Features

- [x] Authentication with Clerk
- [x] Product creation and management
- [x] Search and filtering products
- [x] Liking product
- [x] Add/remove product from cart
- [x] Payment
- [x] Orders info

## Technologies

- Next.js
- Prisma
- Tailwind CSS
- MySQL
- Cloudinary
- Clerk
- Stripe

## Getting Started

1. Clone the repository:

```bash
   git clone https://github.com/HopYy/swapz.git
```

2. Go to the project directory and install dependencies

```bash
   cd swapz
   npm install
```

3. Start

```bash
   npm run dev
```

## Configuration

# MySQL Database Setup

Set up your MySQL database.
<br />
Update the connection details in the .env file with your MySQL database information.

```bash
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
```

# Stripe Integration

Obtain your Stripe API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys).
<br />
Add your Stripe API keys to the .env file.

```bash
STRIPE_API_KEY=your_stripe_api_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

# Cloudinary Configuration

Obtain your Cloudinary credentials from the [Cloudinary](https://cloudinary.com).
<br />
Add your Cloudinary cloud name to the .env file.

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

# Clerk Authentication

Obtain your Clerk authentication keys from the [Clerk](https://clerk.com).
<br />
Add your Clerk authentication keys to the .env file.

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

# SWAPZ Application URL

```bash
SWAPZ_URL=http://localhost:3000
```

Make sure to replace your\_\* placeholders with your actual credentials.
