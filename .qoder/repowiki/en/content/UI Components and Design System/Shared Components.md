# Shared Components

<cite>
**Referenced Files in This Document**
- [ProductCard.tsx](file://components/ui/ProductCard.tsx)
- [MainHeader.tsx](file://components/ui/MainHeader.tsx)
- [BottomSheet.tsx](file://components/ui/BottomSheet.tsx)
- [SectionHeader.tsx](file://components/ui/SectionHeader.tsx)
- [Toast.tsx](file://components/ui/Toast.tsx)
- [WishlistButton.tsx](file://components/ui/WishlistButton.tsx)
- [BannerSlider.tsx](file://components/ui/BannerSlider.tsx)
- [PromoBannerSlot.tsx](file://components/ui/PromoBannerSlot.tsx)
- [CountdownTimer.tsx](file://components/ui/CountdownTimer.tsx)
- [KeyboardAvoidingWrapper.tsx](file://components/shared/KeyboardAvoidingWrapper.tsx)
- [useSupabase.ts](file://hooks/useSupabase.ts)
- [types.ts](file://shared/types.ts)
- [content.service.ts](file://services/content.service.ts)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)
10. [Appendices](#appendices)

## Introduction
This document describes the shared UI components library used across mobile, web, and admin platforms. It focuses on reusable elements that provide consistent navigation, content presentation, user feedback, and interactive modals. The documentation covers each component’s purpose, props interface, styling approach, usage patterns, composition, event handling, and cross-platform compatibility. It also highlights integration points with localization, currency formatting, routing, and backend services.

## Project Structure
The shared UI components live under components/ui and are consumed by pages and views across the mobile app, web app, and admin app. Supporting utilities and providers include:
- Localization and currency contexts
- Supabase hooks and services for data fetching
- Shared types for consistent typing across platforms

```mermaid
graph TB
subgraph "Mobile App"
M_UI["components/ui/*"]
M_SHARED["components/shared/*"]
end
subgraph "Web App"
W_UI["web/src/components/ui/*"]
end
subgraph "Admin App"
A_UI["admin/src/components/ui/*"]
end
subgraph "Shared"
HOOKS["hooks/useSupabase.ts"]
TYPES["shared/types.ts"]
CONTENT["services/content.service.ts"]
end
M_UI --> HOOKS
W_UI --> HOOKS
A_UI --> HOOKS
HOOKS --> CONTENT
HOOKS --> TYPES
M_SHARED --> M_UI
```

**Diagram sources**
- [ProductCard.tsx](file://components/ui/ProductCard.tsx)
- [MainHeader.tsx](file://components/ui/MainHeader.tsx)
- [BottomSheet.tsx](file://components/ui/BottomSheet.tsx)
- [SectionHeader.tsx](file://components/ui/SectionHeader.tsx)
- [Toast.tsx](file://components/ui/Toast.tsx)
- [WishlistButton.tsx](file://components/ui/WishlistButton.tsx)
- [BannerSlider.tsx](file://components/ui/BannerSlider.tsx)
- [PromoBannerSlot.tsx](file://components/ui/PromoBannerSlot.tsx)
- [CountdownTimer.tsx](file://components/ui/CountdownTimer.tsx)
- [KeyboardAvoidingWrapper.tsx](file://components/shared/KeyboardAvoidingWrapper.tsx)
- [useSupabase.ts](file://hooks/useSupabase.ts)
- [types.ts](file://shared/types.ts)
- [content.service.ts](file://services/content.service.ts)

**Section sources**
- [ProductCard.tsx](file://components/ui/ProductCard.tsx)
- [MainHeader.tsx](file://components/ui/MainHeader.tsx)
- [BottomSheet.tsx](file://components/ui/BottomSheet.tsx)
- [SectionHeader.tsx](file://components/ui/SectionHeader.tsx)
- [Toast.tsx](file://components/ui/Toast.tsx)
- [WishlistButton.tsx](file://components/ui/WishlistButton.tsx)
- [BannerSlider.tsx](file://components/ui/BannerSlider.tsx)
- [PromoBannerSlot.tsx](file://components/ui/PromoBannerSlot.tsx)
- [CountdownTimer.tsx](file://components/ui/CountdownTimer.tsx)
- [KeyboardAvoidingWrapper.tsx](file://components/shared/KeyboardAvoidingWrapper.tsx)
- [useSupabase.ts](file://hooks/useSupabase.ts)
- [types.ts](file://shared/types.ts)
- [content.service.ts](file://services/content.service.ts)

## Core Components
This section summarizes the primary shared components and their responsibilities.

- ProductCard: Displays product images, pricing, optional discount badge, and “Add to Cart” action.
- MainHeader: Provides a branded header with a search bar and safe-area-aware layout.
- BottomSheet: Modal overlay with animated backdrop and draggable handle for content presentation.
- SectionHeader: Section title with optional icon, countdown timer, and “See all” action.
- Toast: Global notification provider with animated toasts and dialog overlays.
- WishlistButton: Toggle favorite item with user authentication gating and optimistic UI updates.
- BannerSlider: Auto-rotating promotional banners with pagination indicators.
- PromoBannerSlot: Responsive promotional slots supporting full-width, half-width, and square layouts.
- CountdownTimer: Live countdown display for limited-time offers.

**Section sources**
- [ProductCard.tsx](file://components/ui/ProductCard.tsx)
- [MainHeader.tsx](file://components/ui/MainHeader.tsx)
- [BottomSheet.tsx](file://components/ui/BottomSheet.tsx)
- [SectionHeader.tsx](file://components/ui/SectionHeader.tsx)
- [Toast.tsx](file://components/ui/Toast.tsx)
- [WishlistButton.tsx](file://components/ui/WishlistButton.tsx)
- [BannerSlider.tsx](file://components/ui/BannerSlider.tsx)
- [PromoBannerSlot.tsx](file://components/ui/PromoBannerSlot.tsx)
- [CountdownTimer.tsx](file://components/ui/CountdownTimer.tsx)

## Architecture Overview
The components rely on:
- Routing via Expo Router for navigation
- Localization and RTL support via LanguageContext
- Currency formatting via CurrencyContext
- Backend integration via Supabase hooks and services
- Animated transitions via react-native-reanimated and Animated

```mermaid
sequenceDiagram
participant UI as "UI Component"
participant Ctx as "Contexts<br/>Language/Currency"
participant Hook as "useSupabase Hook"
participant Svc as "content.service.ts"
participant DB as "Supabase"
UI->>Ctx : Read language, RTL, currency config
UI->>Hook : Call query hook (e.g., useBanners)
Hook->>Svc : Fetch data (e.g., getActiveBanners)
Svc->>DB : Supabase query
DB-->>Svc : Data rows
Svc-->>Hook : Parsed data
Hook-->>UI : { data, isLoading, error }
UI->>UI : Render with RTL/currency/formatting
```

**Diagram sources**
- [useSupabase.ts](file://hooks/useSupabase.ts)
- [content.service.ts](file://services/content.service.ts)
- [ProductCard.tsx](file://components/ui/ProductCard.tsx)
- [SectionHeader.tsx](file://components/ui/SectionHeader.tsx)
- [BannerSlider.tsx](file://components/ui/BannerSlider.tsx)
- [PromoBannerSlot.tsx](file://components/ui/PromoBannerSlot.tsx)

## Detailed Component Analysis

### ProductCard
- Purpose: Present a single product with image, name, price, optional discount badge, and “Add to Cart” action.
- Props:
  - product: Product
  - showDiscount?: boolean
  - width?: DimensionValue
- Behavior:
  - Navigates to product detail on press.
  - Adds product to cart via cart store and shows localized toast.
  - Uses currency formatting and language switching for names/prices.
- Styling:
  - Tailwind-like classes for layout and shadows.
  - Aspect-ratio maintained for product image.
- Accessibility:
  - Uses semantic pressable areas; ensure focus outlines if extended.
- Cross-platform:
  - Uses expo-image and native touchables; compatible with web via Expo Router.

```mermaid
sequenceDiagram
participant U as "User"
participant PC as "ProductCard"
participant RS as "Router"
participant CS as "CartStore"
participant TL as "Toast"
U->>PC : Tap product card
PC->>RS : Navigate to product detail
U->>PC : Tap "Add to Cart"
PC->>CS : addItem(product)
PC->>TL : showToast(localized message)
```

**Diagram sources**
- [ProductCard.tsx](file://components/ui/ProductCard.tsx)
- [Toast.tsx](file://components/ui/Toast.tsx)

**Section sources**
- [ProductCard.tsx](file://components/ui/ProductCard.tsx)
- [types.ts](file://shared/types.ts)

### MainHeader
- Purpose: Branding and search entry point with safe-area awareness.
- Props: None
- Behavior:
  - Renders a search box that navigates to the search page.
  - Adapts layout direction based on language (RTL/LTR).
- Styling:
  - Dynamic padding based on safe-area insets.
- Accessibility:
  - Clear focus target for the search box; ensure label for assistive tech.

```mermaid
flowchart TD
Start(["Render MainHeader"]) --> ReadInsets["Read safe-area insets"]
ReadInsets --> ReadLang["Read language & direction"]
ReadLang --> Layout["Apply dynamic padding and direction"]
Layout --> SearchBox["Render search box with icon"]
SearchBox --> OnPress{"User taps?"}
OnPress --> |Yes| Navigate["Navigate to search page"]
OnPress --> |No| End(["Idle"])
```

**Diagram sources**
- [MainHeader.tsx](file://components/ui/MainHeader.tsx)

**Section sources**
- [MainHeader.tsx](file://components/ui/MainHeader.tsx)

### BottomSheet
- Purpose: Modal overlay with animated backdrop and draggable handle.
- Props:
  - visible: boolean
  - onClose: () => void
  - children: ReactNode
  - maxHeight?: number | string
- Behavior:
  - Opens with slide-up and fade-in; closes with slide-down and fade-out.
  - Responds to hardware back press when visible.
  - Draggable handle supports swipe-to-dismiss.
- Styling:
  - Rounded top corners, backdrop overlay, and animated transforms.
- Accessibility:
  - Transparent backdrop dismiss; ensure focus trapping if adding inputs.

```mermaid
sequenceDiagram
participant BS as "BottomSheet"
participant RN as "React Native"
participant AN as "Reanimated"
RN->>BS : visible=true
BS->>AN : animate backdrop opacity + translateY
AN-->>BS : animations complete
RN->>BS : user swipes down or presses backdrop
BS->>AN : animate close
AN-->>BS : animations complete
BS-->>RN : onClose()
```

**Diagram sources**
- [BottomSheet.tsx](file://components/ui/BottomSheet.tsx)

**Section sources**
- [BottomSheet.tsx](file://components/ui/BottomSheet.tsx)

### SectionHeader
- Purpose: Section title with optional icon, countdown timer, and “See all” action.
- Props:
  - title: string
  - icon?: Ionicons key
  - onSeeAll?: () => void
  - hasTimer?: boolean
  - timerSeconds?: number
- Behavior:
  - Composes CountdownTimer when requested.
  - Localizes “See all” text via translation function.
- Styling:
  - Flexible row layout with RTL-aware ordering.

```mermaid
classDiagram
class SectionHeader {
+props : title, icon?, onSeeAll?, hasTimer?, timerSeconds?
+render() : JSX.Element
}
class CountdownTimer {
+props : initialSeconds?
+render() : JSX.Element
}
SectionHeader --> CountdownTimer : "optional composition"
```

**Diagram sources**
- [SectionHeader.tsx](file://components/ui/SectionHeader.tsx)
- [CountdownTimer.tsx](file://components/ui/CountdownTimer.tsx)

**Section sources**
- [SectionHeader.tsx](file://components/ui/SectionHeader.tsx)
- [CountdownTimer.tsx](file://components/ui/CountdownTimer.tsx)

### Toast
- Purpose: Global notification system with animated toasts and dialog overlays.
- APIs:
  - showToast(message, type?, duration?)
  - showAppToast(data)
  - showAppDialog(data)
- Behavior:
  - Infers type from keywords or destructive buttons.
  - Supports RTL-aware text direction and layout.
  - Integrates with native Alert while preserving custom dialogs.
- Styling:
  - Accent bars, soft backgrounds, and directional icons per type.

```mermaid
sequenceDiagram
participant App as "App"
participant TP as "ToastProvider"
participant AN as "Animated"
participant AL as "Alert"
App->>TP : showToast(...)
TP->>AL : Override Alert.alert
TP->>AN : Animate toast in
AN-->>TP : Animation done
TP->>AN : Animate toast out
TP-->>App : Toast dismissed
```

**Diagram sources**
- [Toast.tsx](file://components/ui/Toast.tsx)

**Section sources**
- [Toast.tsx](file://components/ui/Toast.tsx)

### WishlistButton
- Purpose: Toggle product as favorite with user authentication gating.
- Props:
  - productId: string
  - size?: number
  - iconSize?: number
  - backgroundColor?: string
  - activeBackgroundColor?: string
  - color?: string
  - activeColor?: string
- Behavior:
  - Loads current user session and checks existing wishlist record.
  - Prompts login if unauthenticated; otherwise inserts/deletes wishlist item.
  - Shows localized toasts for success/error.
- Styling:
  - Circular button with active/inactive states.

```mermaid
flowchart TD
Start(["Render WishlistButton"]) --> Load["Load session & wishlist status"]
Load --> Logged{"User logged in?"}
Logged --> |No| Prompt["Show Alert to login"]
Prompt --> Route["Navigate to login"]
Logged --> |Yes| Toggle{"Already favorited?"}
Toggle --> |Yes| Remove["DELETE from wishlist"]
Toggle --> |No| Insert["INSERT into wishlist"]
Remove --> Toast["Show success toast"]
Insert --> Toast
Toast --> End(["Done"])
```

**Diagram sources**
- [WishlistButton.tsx](file://components/ui/WishlistButton.tsx)
- [Toast.tsx](file://components/ui/Toast.tsx)

**Section sources**
- [WishlistButton.tsx](file://components/ui/WishlistButton.tsx)
- [types.ts](file://shared/types.ts)

### BannerSlider
- Purpose: Auto-scrolling promotional banners with pagination dots.
- Props:
  - banners: Banner[] | undefined
  - isLoading: boolean
  - error: any
  - onRetry: () => void
  - t: (key: string) => string
- Behavior:
  - Auto-advances slides at intervals; manual scroll updates active index.
  - Handles external links vs internal navigation.
  - Shows skeleton loader, error state, or empty state.
- Styling:
  - Paging-enabled horizontal scroll with snap-to-interval.

```mermaid
sequenceDiagram
participant BS as "BannerSlider"
participant SV as "ScrollView"
participant Timer as "setInterval"
Timer-->>BS : tick (advance index)
BS->>SV : scrollTo(nextIndex, animated)
SV-->>BS : onMomentumScrollEnd
BS->>BS : update activeBannerIndex
```

**Diagram sources**
- [BannerSlider.tsx](file://components/ui/BannerSlider.tsx)

**Section sources**
- [BannerSlider.tsx](file://components/ui/BannerSlider.tsx)
- [content.service.ts](file://services/content.service.ts)

### PromoBannerSlot
- Purpose: Render promotional banners in responsive layouts (full, half, square).
- Props:
  - banners: PromoBanner[] | undefined
  - isLoading?: boolean
- Behavior:
  - Determines layout based on first banner’s size.
  - Handles external URLs and internal navigation.
  - Shows skeleton loader during loading.
- Styling:
  - Dynamic widths/heights based on screen width; shadow and rounded corners.

```mermaid
flowchart TD
Start(["Render PromoBannerSlot"]) --> CheckLoading{"isLoading?"}
CheckLoading --> |Yes| Skeleton["Render skeleton"]
CheckLoading --> |No| CheckEmpty{"Has banners?"}
CheckEmpty --> |No| Hide["Return null"]
CheckEmpty --> |Yes| Decide["Read first banner size"]
Decide --> Full["Render full-width banner"]
Decide --> Half["Render two half-width banners"]
Decide --> Square["Render two square banners"]
Full --> End(["Done"])
Half --> End
Square --> End
```

**Diagram sources**
- [PromoBannerSlot.tsx](file://components/ui/PromoBannerSlot.tsx)
- [content.service.ts](file://services/content.service.ts)

**Section sources**
- [PromoBannerSlot.tsx](file://components/ui/PromoBannerSlot.tsx)
- [content.service.ts](file://services/content.service.ts)

### CountdownTimer
- Purpose: Display a live countdown for limited-time offers.
- Props:
  - initialSeconds?: number
- Behavior:
  - Decrements every second until zero.
  - Renders with icon, time digits, and localized suffix.
- Styling:
  - Compact pill layout with danger accents and RTL-aware text direction.

```mermaid
flowchart TD
Start(["Render CountdownTimer"]) --> Init["Initialize timeLeft from props"]
Init --> Loop{"timeLeft > 0?"}
Loop --> |Yes| Tick["setInterval -1 sec"]
Tick --> Update["setTimeLeft"]
Update --> Loop
Loop --> |No| Hide["Return null"]
```

**Diagram sources**
- [CountdownTimer.tsx](file://components/ui/CountdownTimer.tsx)

**Section sources**
- [CountdownTimer.tsx](file://components/ui/CountdownTimer.tsx)

### KeyboardAvoidingWrapper
- Purpose: Provide a consistent keyboard-avoiding container for forms and scrollable content.
- Props:
  - children, contentContainerStyle, style, keyboardVerticalOffset
- Behavior:
  - Wraps content in a keyboard-avoiding view and scroll view with platform-specific adjustments.
- Styling:
  - Flex-based layout with handled keyboard dismissal modes.

**Section sources**
- [KeyboardAvoidingWrapper.tsx](file://components/shared/KeyboardAvoidingWrapper.tsx)

## Dependency Analysis
- Data fetching:
  - useSupabase.ts re-exports typed hooks for products, categories, and content.
  - content.service.ts defines Banner, HomeSection, and PromoBanner types and fetches from Supabase.
- Type safety:
  - shared/types.ts centralizes database-derived types and enums.
- Component coupling:
  - Components depend on contexts (Language/Currency) and hooks/services for data.
  - Minimal coupling via props and composition (e.g., SectionHeader composes CountdownTimer).

```mermaid
graph LR
PC["ProductCard.tsx"] --> CTX["Language/Currency Contexts"]
SH["SectionHeader.tsx"] --> CTX
CT["CountdownTimer.tsx"] --> CTX
WL["WishlistButton.tsx"] --> CTX
BS["BannerSlider.tsx"] --> HU["useSupabase.ts"]
PBS["PromoBannerSlot.tsx"] --> HU
HU --> CS["content.service.ts"]
HU --> ST["shared/types.ts"]
```

**Diagram sources**
- [ProductCard.tsx](file://components/ui/ProductCard.tsx)
- [SectionHeader.tsx](file://components/ui/SectionHeader.tsx)
- [CountdownTimer.tsx](file://components/ui/CountdownTimer.tsx)
- [WishlistButton.tsx](file://components/ui/WishlistButton.tsx)
- [BannerSlider.tsx](file://components/ui/BannerSlider.tsx)
- [PromoBannerSlot.tsx](file://components/ui/PromoBannerSlot.tsx)
- [useSupabase.ts](file://hooks/useSupabase.ts)
- [content.service.ts](file://services/content.service.ts)
- [types.ts](file://shared/types.ts)

**Section sources**
- [useSupabase.ts](file://hooks/useSupabase.ts)
- [content.service.ts](file://services/content.service.ts)
- [types.ts](file://shared/types.ts)

## Performance Considerations
- Memoization:
  - BannerSlider uses React.memo to prevent unnecessary re-renders.
- Animations:
  - BottomSheet and Toast use native-driven animations for smoothness.
- Lazy loading:
  - BannerSlider and PromoBannerSlot render skeletons during loading states.
- Scrolling:
  - BannerSlider enables paging and snap-to-interval for efficient horizontal scrolling.
- Network:
  - useSupabase.ts integrates React Query for caching and background refetching.

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
- Toast not appearing:
  - Ensure ToastProvider wraps the app root so global handlers are registered.
  - Verify language context is initialized for proper RTL detection.
- BottomSheet does not close:
  - Confirm visible prop is controlled and onClose is called after animations complete.
  - Check hardware back handler registration.
- WishlistButton shows incorrect state:
  - Ensure session is loaded before rendering; confirm user_id exists.
  - Verify database constraints and error handling for insert/delete.
- BannerSlider not auto-advancing:
  - Confirm banners array length > 1; verify bannerWidth calculation and snap interval.
- PromoBannerSlot not rendering:
  - Ensure banners are passed and first banner size is one of supported values.
- CountdownTimer not updating:
  - Verify initialSeconds is greater than zero and timer interval is active.

**Section sources**
- [Toast.tsx](file://components/ui/Toast.tsx)
- [BottomSheet.tsx](file://components/ui/BottomSheet.tsx)
- [WishlistButton.tsx](file://components/ui/WishlistButton.tsx)
- [BannerSlider.tsx](file://components/ui/BannerSlider.tsx)
- [PromoBannerSlot.tsx](file://components/ui/PromoBannerSlot.tsx)
- [CountdownTimer.tsx](file://components/ui/CountdownTimer.tsx)

## Conclusion
The shared UI components library provides a cohesive, cross-platform foundation for product displays, navigation, promotions, and user feedback. By composing lightweight, context-aware components and integrating with Supabase-backed hooks, teams can maintain consistency across mobile, web, and admin experiences while ensuring responsive and accessible interfaces.

[No sources needed since this section summarizes without analyzing specific files]

## Appendices

### Component Composition Patterns
- Composition over inheritance: Components like SectionHeader compose smaller elements (e.g., CountdownTimer).
- Provider pattern: ToastProvider centralizes global state and animations.
- Controlled props: BottomSheet relies on visible and onClose to manage lifecycle.

**Section sources**
- [SectionHeader.tsx](file://components/ui/SectionHeader.tsx)
- [Toast.tsx](file://components/ui/Toast.tsx)
- [BottomSheet.tsx](file://components/ui/BottomSheet.tsx)

### Prop Validation and Defaults
- Optional props with defaults (e.g., width, showDiscount, maxHeight, timerSeconds) simplify usage.
- Controlled visibility (visible) prevents accidental leaks of hidden modals.

**Section sources**
- [ProductCard.tsx](file://components/ui/ProductCard.tsx)
- [BottomSheet.tsx](file://components/ui/BottomSheet.tsx)
- [SectionHeader.tsx](file://components/ui/SectionHeader.tsx)
- [CountdownTimer.tsx](file://components/ui/CountdownTimer.tsx)

### Event Handling and Navigation
- Navigation:
  - ProductCard and PromoBannerSlot use router to navigate to product or internal routes; external links open via Linking.
- Interaction:
  - BottomSheet handles backdrop press and back handler; WishlistButton manages auth prompts and optimistic UI.

**Section sources**
- [ProductCard.tsx](file://components/ui/ProductCard.tsx)
- [PromoBannerSlot.tsx](file://components/ui/PromoBannerSlot.tsx)
- [BottomSheet.tsx](file://components/ui/BottomSheet.tsx)
- [WishlistButton.tsx](file://components/ui/WishlistButton.tsx)

### Cross-Platform Compatibility and Accessibility
- Cross-platform:
  - Components use React Native primitives and Expo Router for navigation; styling leverages platform-agnostic libraries.
- Accessibility:
  - Prefer pressable targets with adequate size; add labels for assistive technologies where needed.
  - Respect RTL layouts and text direction resolution.

[No sources needed since this section provides general guidance]