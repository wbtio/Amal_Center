# Al-Amal Center Admin Dashboard

This is the admin dashboard for the Al-Amal Center application, built with **Next.js 14**, **Tailwind CSS**, and **Supabase**.

## Features

- **Dashboard Overview**: View real-time statistics, sales charts, and recent orders.
- **Products Management**:
  - List all products with search and filtering.
  - Add new products with Arabic/English details, prices, and images.
  - Edit and delete existing products.
  - Manage inventory levels.
- **Orders Management**:
  - View all orders with status filtering (Pending, Processing, Delivered, etc.).
  - View order details including customer info and ordered items.
  - Update order status.
  - Print order invoices.
- **Categories Management**:
  - Manage product categories (Add/Delete).
- **Users**:
  - View list of active customers.

## Getting Started

### Prerequisites

- Node.js installed.
- Supabase project URL and Anon Key.

### Installation

1. Navigate to the admin directory:
   ```bash
   cd admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root of the `admin` directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `src/app`: App Router pages and layouts.
- `src/components`: Reusable UI components.
- `src/lib`: Utility functions and Supabase client.
- `src/types`: TypeScript type definitions.

## Deployment

The application is ready for deployment on Vercel or Netlify. Ensure environment variables are set in the deployment platform.
