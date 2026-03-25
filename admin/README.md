# Al-Amal Center

This repository contains two applications that share the same Supabase backend:

| Application | Name in code | Purpose | Target users | Platforms |
| --- | --- | --- | --- | --- |
| Mobile storefront | `الأمل سنتر` in `app.json`, `Al-Amal Hypermarket` fallback in `app.config.ts` | Browse products, manage cart/wishlist/addresses, place orders, track orders, and receive notifications | Retail customers in Iraq | iOS, Android, Web |
| Admin panel | `Al-Amal Center Admin` | Manage products, categories, orders, offers, coupons, homepage content, notifications, favorites analytics, and users | Admins and `products_manager` staff | Web |

## Project Overview

The codebase implements a bilingual Arabic/English hypermarket shopping platform backed by Supabase. The mobile app is customer-facing and includes catalog browsing, search, cart, checkout, order tracking, wishlist, saved addresses, profile management, and in-app notifications. The `admin/` application is a separate Next.js dashboard used to operate the same catalog and order system.

## Tech Stack

### Architecture Summary

| Concern | Mobile app | Admin panel |
| --- | --- | --- |
| Framework | Expo 54, React 19.1, React Native 0.81.5 | Next.js 16.1, React 19.2 |
| Navigation | Expo Router | Next.js App Router |
| State management | React Context, Zustand, TanStack React Query | Local React state |
| Backend | Supabase Auth, Database, Storage, Realtime | Supabase SSR client, Supabase JS, shared Supabase tables |
| UI layer | NativeWind, Expo/React Native components, custom UI components | Tailwind CSS, Lucide icons, Recharts |
| Forms and validation | React Hook Form, Zod | Native forms + React state |
| AI / media services | Expo Image Picker, Expo Location, WebView map picker | OpenRouter API, Replicate API, XLSX import, image proxy/upload |

### Mobile App Packages

| Category | Packages |
| --- | --- |
| Core runtime | `expo`, `react`, `react-dom`, `react-native`, `expo-router`, `react-native-web` |
| Data and backend | `@supabase/supabase-js`, `@tanstack/react-query`, `react-native-url-polyfill` |
| State and persistence | `zustand`, `@react-native-async-storage/async-storage`, `expo-secure-store` |
| Forms and validation | `react-hook-form`, `@hookform/resolvers`, `zod` |
| Localization | `i18n-js`, `expo-localization`, `@expo-google-fonts/ibm-plex-sans-arabic` |
| UI, device, and media | `nativewind`, `@expo/vector-icons`, `react-native-heroicons`, `react-native-iconify`, `expo-blur`, `expo-constants`, `expo-font`, `expo-image`, `expo-image-picker`, `expo-linear-gradient`, `expo-linking`, `expo-location`, `expo-splash-screen`, `expo-status-bar`, `react-native-keyboard-controller`, `react-native-reanimated`, `react-native-safe-area-context`, `react-native-screens`, `react-native-svg`, `react-native-webview`, `react-native-worklets`, `react-native-worklets-core`, `@react-native-community/slider` |
| Utilities | `lodash` |
| Tooling | `typescript`, `tailwindcss`, `@babel/core`, `babel-preset-expo`, `@types/react` |

### Admin Panel Packages

| Category | Packages |
| --- | --- |
| Core runtime | `next`, `react`, `react-dom` |
| Supabase and auth | `@supabase/ssr`, `@supabase/supabase-js` |
| UI and utilities | `lucide-react`, `clsx`, `tailwind-merge`, `next-themes` |
| Charts, dates, and import | `recharts`, `date-fns`, `xlsx` |
| AI and image processing | `replicate`, `@google/generative-ai` |
| Tooling | `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `eslint`, `eslint-config-next`, `babel-plugin-react-compiler`, `@types/node`, `@types/react`, `@types/react-dom` |

### External Services Used in Code

- Supabase for auth, Postgres tables, storage buckets, and realtime order updates.
- OpenRouter in `admin/src/app/api/ai/analyze-product/route.ts` for AI product analysis.
- Replicate in `admin/src/app/api/ai/remove-background/route.ts` for background removal.

## Feature List

### Mobile Navigation Shells

| File | Purpose |
| --- | --- |
| `app/_layout.tsx` | Root providers, font loading, splash handling, toast provider, keyboard provider, and main stack registration |
| `app/(tabs)/_layout.tsx` | Bottom-tab shell for Home, Categories, Cart, and Profile, with a custom header and cart badge |

### Mobile Screens

| Route file | Route | Purpose |
| --- | --- | --- |
| `app/(tabs)/index.tsx` | `/` | Home feed driven by `banners`, `home_sections`, `promo_banners`, categories, special offers, best sellers, new arrivals, and trending sections |
| `app/(tabs)/categories.tsx` | `/categories` | Lists main categories with images/icons |
| `app/(tabs)/cart.tsx` | `/cart` | Persistent cart, quantity updates, coupon validation, totals, and checkout entry |
| `app/(tabs)/profile.tsx` | `/profile` | Guest account entry points or signed-in profile dashboard with orders, addresses, wishlist, language/currency, help, WhatsApp, and logout |
| `app/(tabs)/category/[id].tsx` | `/category/[id]` | Category browsing with subcategories, filters, sorting, price range, and stock-only toggle |
| `app/category/[id].tsx` | `/category/[id]` | Standalone category route with the same filter/sort/product-grid behavior |
| `app/search.tsx` | `/search` | Debounced product search across Arabic and English names |
| `app/product/[id].tsx` | `/product/[id]` | Product detail page with quantity selector, add-to-cart, wishlist, and similar products |
| `app/orders.tsx` | `/orders` | Active/history order list with realtime status updates and pull-to-refresh |
| `app/order/[id].tsx` | `/order/[id]` | Order detail view with realtime status updates, line items, totals, and a post-checkout thank-you modal |
| `app/checkout.tsx` | `/checkout` | Multi-step checkout for address, delivery, payment, review, coupon discount handling, order creation, and stock decrement RPC |
| `app/addresses.tsx` | `/addresses` | Saved address list with delete and default-address actions |
| `app/address/add.tsx` | `/address/add` | Add-address form with Iraqi city picker and interactive map pin selection |
| `app/wishlist.tsx` | `/wishlist` | Wishlist list, remove action, and add-to-cart from saved items |
| `app/notifications.tsx` | `/notifications` | Notification inbox with read state, clear/mark-all actions, and notification preference toggle |
| `app/help/faq.tsx` | `/help/faq` | FAQ accordion screen |
| `app/help/contact.tsx` | `/help/contact` | Contact/support links for WhatsApp, phone, email, Facebook, and Instagram |
| `app/auth/login.tsx` | `/auth/login` | Email/password login with Supabase auth |
| `app/auth/register.tsx` | `/auth/register` | Customer registration with Iraqi phone validation and Supabase sign-up |
| `app/auth/verify.tsx` | `/auth/verify` | Email OTP verification and resend flow |
| `app/profile/edit.tsx` | `/profile/edit` | Edit profile details and upload avatar to Supabase Storage |
| `app/profile/change-password.tsx` | `/profile/change-password` | Password change flow that re-authenticates the current user before update |

### Major Mobile Components

| Component | Purpose |
| --- | --- |
| `components/SplashScreen.tsx` | Branded animated splash overlay |
| `components/auth/AuthUI.tsx` | Shared auth scaffold, inputs, action buttons, notes, and switching prompts |
| `components/cart/CartItem.tsx` | Cart line item with quantity and remove actions |
| `components/checkout/AddressStep.tsx` | Checkout address form step |
| `components/checkout/DeliveryStep.tsx` | Checkout delivery-type step |
| `components/checkout/PaymentStep.tsx` | Checkout payment-method step |
| `components/checkout/ReviewStep.tsx` | Checkout review/summary step |
| `components/ui/MainHeader.tsx` | Main app header with search/cart/profile shortcuts |
| `components/ui/BannerSlider.tsx` | Home hero banner carousel |
| `components/ui/PromoBannerSlot.tsx` | Homepage promo banner renderer by slot |
| `components/ui/CategoryProductsSection.tsx` | Homepage category-based product section |
| `components/ui/ProductCard.tsx` | Reusable product card used across home/category/similar products |
| `components/ui/WishlistButton.tsx` | Auth-aware wishlist toggle backed by Supabase |
| `components/ui/BottomSheet.tsx` | Shared bottom-sheet container used for filters and sorting |
| `components/ui/PriceSlider.tsx` | Filter price range slider |
| `components/ui/LocationPicker.tsx` | Map picker built with `expo-location`, `react-native-webview`, and Leaflet/OpenStreetMap |
| `components/ui/Toast.tsx` | Toast provider and `showToast` helper |
| `components/ui/Skeleton.tsx` | Loading placeholders |

## Admin Panel

### Admin Routes

| Route | Purpose |
| --- | --- |
| `/login` | Admin sign-in page using Supabase email/password auth |
| `/` | Dashboard with KPIs, sales chart, order-status chart, low-stock alerts, recent orders, and top products |
| `/products` | Product list with search, filters, pagination, delete action, and Excel import entry |
| `/products/new` | Product creation mode selector: manual form or AI-assisted flow |
| `/products/[id]` | Product editing, image upload, activation, and delete action |
| `/orders` | Order list with status filter |
| `/orders/[id]` | Order detail, status updates, customer/delivery details, and printable invoice |
| `/categories` | Category CRUD, parent-child assignment, image upload or URL import, activation, and ordering |
| `/offers` | Offer list with search, status filters, activation toggle, and delete action |
| `/offers/new` | Create an offer, define discount rules, dates, and attach products |
| `/offers/[id]` | Edit an existing offer and its product assignments |
| `/coupons` | Create, edit, activate/deactivate, and delete coupons |
| `/homepage` | Manage homepage banners, dynamic home sections, and promo banner slots used by the mobile app |
| `/notifications` | Send notifications to all users or a single user and review recent notifications |
| `/favorites` | Favorites analytics from the `wishlist` table |
| `/users` | Profiles list with avatar, phone, role, and registration date |

### Admin Components and Flows

| Component | Purpose |
| --- | --- |
| `admin/src/components/layout/Sidebar.tsx` | Main dashboard navigation and role-aware menu filtering |
| `admin/src/components/layout/Header.tsx` | Global page header with product/order/category search and unread notification count |
| `admin/src/components/products/ManualProductForm.tsx` | Manual product creation form with image upload to the `products` bucket |
| `admin/src/components/products/AIProductForm.tsx` | AI-assisted product creation using front/back images, AI extraction, category matching, and optional background removal |
| `admin/src/components/products/ExcelUploadModal.tsx` | Bulk import from Excel/CSV, category matching, remote image download, storage upload, and product insertion |

### Admin API Routes

| Route | Purpose |
| --- | --- |
| `/api/proxy-image` | Fetches remote images server-side to avoid client-side CORS issues |
| `/api/ai/analyze-product` | Sends product images to OpenRouter and returns structured product data plus a matched category |
| `/api/ai/remove-background` | Removes product backgrounds with Replicate, uploads the result to Supabase Storage, and falls back to the original image if needed |
| `/api/ai/test` | Debug/test route for Gemini connectivity |

### Backend Connection

The admin panel uses the same Supabase project as the mobile app. In current code it reads from and writes to the shared commerce tables and content tables, including:

- `products`, `categories`, `orders`, `order_items`
- `offers`, `offer_products`, `coupons`, `coupon_usages`
- `banners`, `home_sections`, `promo_banners`
- `profiles`, `wishlist`, `notifications`, `addresses`

It also uploads files to Supabase Storage buckets used in the repo:

- `products`
- `categories`
- `avatars`

Auth and access control are enforced in `admin/src/middleware.ts`. All dashboard routes require a valid session, and the `products_manager` role is restricted to `/products` and `/categories`.

## Project Structure

| Path | Role |
| --- | --- |
| `app/` | Expo Router mobile screens and layouts |
| `components/` | Reusable mobile UI, auth, cart, and checkout components |
| `contexts/` | Mobile language and currency providers |
| `hooks/` | React Query hooks for products, categories, banners, sections, and promo banners |
| `services/` | Supabase data-access functions for products, categories, orders, and content |
| `lib/` | Mobile Supabase client and i18n setup |
| `constants/` | App-wide constants such as support channels and colors |
| `store/` | Persisted Zustand cart store |
| `shared/` | Shared database and domain types used by both apps |
| `types/` | Mobile-specific domain and form types such as checkout schemas and Iraqi cities |
| `locales/` | Arabic and English translation dictionaries |
| `assets/` | App icons and splash assets |
| `admin/` | Separate Next.js admin application |
| `admin/src/app/` | Admin routes, layouts, and API endpoints |
| `admin/src/components/` | Admin layout and product-management components |
| `admin/src/contexts/` | Admin sidebar state context |
| `admin/src/lib/` | Admin Supabase client and utility helpers |
| `admin/src/types/` | Admin-side re-exports of shared types |
| `admin/public/` | Static files for the admin app |
| `.docs/` | Project notes; currently includes Supabase realtime setup guidance for orders |
| `web/` | Expo web HTML shell |

## Environment Variables

### Mobile App (`EXPO_PUBLIC_*`)

| Variable | Used in | Purpose |
| --- | --- | --- |
| `EXPO_PUBLIC_APP_NAME` | `app.config.ts` | Overrides the Expo app display name |
| `EXPO_PUBLIC_APP_VERSION` | `app.config.ts` | Overrides the Expo app version |
| `EXPO_PUBLIC_SUPABASE_URL` | `app.config.ts`, `lib/supabase.ts` | Supabase project URL for the mobile app |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | `app.config.ts`, `lib/supabase.ts` | Supabase anon key for the mobile app |
| `EXPO_PUBLIC_DEFAULT_CURRENCY` | `app.config.ts` | Exposed in Expo config as the default currency setting |
| `EXPO_PUBLIC_ENABLE_REVIEWS` | `app.config.ts` | Exposed as a feature flag for reviews |
| `EXPO_PUBLIC_ENABLE_WISHLIST` | `app.config.ts` | Exposed as a feature flag for wishlist behavior |
| `EXPO_PUBLIC_ENABLE_NOTIFICATIONS` | `app.config.ts` | Exposed as a feature flag for notifications |
| `EXPO_PUBLIC_DEBUG_MODE` | `app.config.ts` | Exposed as a debug-mode flag |

### Admin Panel Environment Variables

| Variable | Used in | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `admin/src/lib/supabase.ts`, `admin/src/middleware.ts`, `admin/src/app/api/ai/remove-background/route.ts` | Supabase project URL for the admin app |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `admin/src/lib/supabase.ts`, `admin/src/middleware.ts`, `admin/src/app/api/ai/remove-background/route.ts` | Supabase anon key for the admin app |
| `OPENROUTER_API_KEY` | `admin/src/app/api/ai/analyze-product/route.ts` | Enables AI product analysis through OpenRouter |
| `REPLICATE_API_TOKEN` | `admin/src/app/api/ai/remove-background/route.ts` | Enables AI background removal with Replicate |

## Getting Started

### 1. Install and run the mobile app

From the repository root:

```bash
npm install
npm run start
```

Platform-specific commands from the repository root:

```bash
npm run android
npm run ios
npm run web
```

### 2. Install and run the admin panel

From the repository root:

```bash
cd admin
npm install
npm run dev
```

Production commands for the admin panel:

```bash
cd admin
npm run build
npm run start
```

### 3. Configure environment variables before running

Mobile app variables belong in the repository root environment file used by Expo. Admin variables belong in `admin/.env.local`.

### 4. Supabase setup note

Realtime order tracking in the mobile app depends on Supabase Realtime being enabled for the `orders` table. The repository already includes setup notes in `.docs/ORDERS_REALTIME_SETUP.md`.
