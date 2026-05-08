# Product Listing Interface

<cite>
**Referenced Files in This Document**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx)
- [admin/src/components/products/ExcelUploadModal.tsx](file://admin/src/components/products/ExcelUploadModal.tsx)
- [admin/src/components/products/ManualProductForm.tsx](file://admin/src/components/products/ManualProductForm.tsx)
- [admin/src/lib/utils.ts](file://admin/src/lib/utils.ts)
- [admin/src/lib/supabase.ts](file://admin/src/lib/supabase.ts)
- [services/products.service.ts](file://services/products.service.ts)
- [shared/types.ts](file://shared/types.ts)
- [types/index.ts](file://types/index.ts)
- [web/src/app/products/page.tsx](file://web/src/app/products/page.tsx)
- [web/src/components/catalog/ProductsExplorer.tsx](file://web/src/components/catalog/ProductsExplorer.tsx)
- [web/src/lib/storefront.ts](file://web/src/lib/storefront.ts)
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

## Introduction
This document describes the product listing interface for the administration dashboard, focusing on the responsive table and card-based views, search with debounced input, advanced filtering (category, status, stock), pagination, bulk operations (Excel upload), and real-time display. It also covers performance optimization strategies for large catalogs and accessibility considerations for screen readers.

## Project Structure
The product listing interface spans two primary areas:
- Admin dashboard: server/client hybrid page with search, filters, pagination, and bulk operations
- Web storefront: client-side product explorer with search, filters, and responsive cards

```mermaid
graph TB
subgraph "Admin Dashboard"
A1["Products Page<br/>(admin/src/app/(dashboard)/products/page.tsx)"]
A2["Excel Upload Modal<br/>(admin/src/components/products/ExcelUploadModal.tsx)"]
A3["Manual Product Form<br/>(admin/src/components/products/ManualProductForm.tsx)"]
A4["Supabase Client<br/>(admin/src/lib/supabase.ts)"]
A5["Utils (formatIQD)<br/>(admin/src/lib/utils.ts)"]
end
subgraph "Services"
S1["Products Service<br/>(services/products.service.ts)"]
S2["Shared Types<br/>(shared/types.ts)"]
S3["Types Index<br/>(types/index.ts)"]
end
subgraph "Web Storefront"
W1["Products Page<br/>(web/src/app/products/page.tsx)"]
W2["Products Explorer<br/>(web/src/components/catalog/ProductsExplorer.tsx)"]
W3["Storefront Utils<br/>(web/src/lib/storefront.ts)"]
end
A1 --> A4
A1 --> A5
A1 --> A2
A1 --> A3
A1 --> S1
S1 --> S2
S1 --> S3
W1 --> W2
W2 --> W3
```

**Diagram sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L13-L434)
- [admin/src/components/products/ExcelUploadModal.tsx:27-397](file://admin/src/components/products/ExcelUploadModal.tsx#L27-L397)
- [admin/src/components/products/ManualProductForm.tsx:13-254](file://admin/src/components/products/ManualProductForm.tsx#L13-L254)
- [admin/src/lib/supabase.ts:19-23](file://admin/src/lib/supabase.ts#L19-L23)
- [admin/src/lib/utils.ts:8-14](file://admin/src/lib/utils.ts#L8-L14)
- [services/products.service.ts:1-449](file://services/products.service.ts#L1-L449)
- [shared/types.ts:10-353](file://shared/types.ts#L10-L353)
- [types/index.ts:1-276](file://types/index.ts#L1-L276)
- [web/src/app/products/page.tsx:1-90](file://web/src/app/products/page.tsx#L1-L90)
- [web/src/components/catalog/ProductsExplorer.tsx:1-427](file://web/src/components/catalog/ProductsExplorer.tsx#L1-L427)
- [web/src/lib/storefront.ts:1-613](file://web/src/lib/storefront.ts#L1-L613)

**Section sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L13-L434)
- [web/src/app/products/page.tsx:1-90](file://web/src/app/products/page.tsx#L1-L90)

## Core Components
- Products listing page with responsive table and card view
- Debounced search across Arabic and English product names
- Advanced filters: category, active/inactive status, stock status
- Pagination with configurable items per page and intelligent navigation
- Bulk operations: Excel upload modal with progress and error reporting
- Real-time display: status indicators, image placeholders, responsive design
- Utilities: IQD formatting, Supabase client integration

**Section sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L13-L434)
- [admin/src/lib/utils.ts:8-14](file://admin/src/lib/utils.ts#L8-L14)
- [admin/src/lib/supabase.ts:19-23](file://admin/src/lib/supabase.ts#L19-L23)
- [admin/src/components/products/ExcelUploadModal.tsx:27-397](file://admin/src/components/products/ExcelUploadModal.tsx#L27-L397)

## Architecture Overview
The admin product listing integrates client-side state, debounced search, and Supabase queries. Filtering and pagination are handled client-side with server-backed data fetching. The web storefront mirrors search and filtering patterns with a card-based layout.

```mermaid
sequenceDiagram
participant U as "User"
participant P as "Products Page<br/>(admin)"
participant D as "Debounce Timer"
participant Q as "Supabase Query"
participant R as "Render"
U->>P : Type in search box
P->>D : Set timeout (500ms)
D-->>P : Fire debouncedSearch
P->>Q : Fetch products (filters + pagination)
Q-->>P : Products + count
P->>R : Render table/cards
Note over P,R : Responsive view switches at md breakpoint
```

**Diagram sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L39-L92)

## Detailed Component Analysis

### Responsive Table and Card Views
- Desktop: Scrollable table with columns for product image/name, category, price, stock, status, and actions
- Mobile: Card-based layout with compact rows, truncated text, and action buttons
- Image placeholders: Fallback icons when no image URL is present
- Status indicators: Dot indicators and labels for active/inactive state
- Responsive breakpoints: Hidden table below medium screens, cards above

```mermaid
flowchart TD
Start(["Render Products"]) --> View{"Screen size >= md?"}
View --> |Yes| Table["Render Desktop Table<br/>Columns: Image/Name, Category, Price, Stock, Status, Actions"]
View --> |No| Cards["Render Mobile Cards<br/>Compact rows with image, truncated text, actions"]
Table --> Placeholders["Image Placeholder Fallback"]
Cards --> Placeholders
Placeholders --> Status["Status Indicator Dot + Label"]
Status --> Actions["Action Buttons (Edit/Delete)"]
```

**Diagram sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L255-L361)

**Section sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L255-L361)

### Search Functionality with Debounced Input
- Debounce delay: 500 ms to reduce network requests during typing
- Multi-field search: Matches Arabic and English product names using OR conditions
- Reset page on search: Returns to first page when search term changes
- Clear filters: Resets search and clears active filters

```mermaid
flowchart TD
Input["User types in search"] --> Debounce["500ms debounce timer"]
Debounce --> UpdateState["Set debouncedSearch"]
UpdateState --> ResetPage["Reset currentPage to 1"]
ResetPage --> Query["Build Supabase query with filters + pagination"]
Query --> Results["Fetch products + count"]
Results --> Render["Render updated view"]
```

**Diagram sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L39-L92)

**Section sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L39-L92)

### Advanced Filtering System
- Category-based filtering: Select category dropdown with active categories
- Active/inactive status: Option to filter by all, active, or inactive
- Stock status: Options for all, in-stock (>0), low stock (<10), out-of-stock (=0)
- Intelligent filter reset: Clears all filters and search, resets to first page
- Active filter indicator: Shows when any filter or search term is applied

```mermaid
flowchart TD
Open["Open Filters Panel"] --> Category["Select Category"]
Open --> Status["Select Active/Inactive"]
Open --> Stock["Select Stock Status"]
Category --> Apply["Apply Filters"]
Status --> Apply
Stock --> Apply
Apply --> Query["Rebuild query with selected filters"]
Query --> ResetPage["Reset to page 1"]
ResetPage --> Refresh["Refresh product list"]
```

**Diagram sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L195-L247)
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L67-L81)

**Section sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L195-L247)
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L67-L81)

### Pagination Implementation
- Items per page: Fixed at 20 per page
- Page range calculation: from=(page-1)*limit to from+limit-1
- Total count: Exact count from Supabase for accurate pagination
- Navigation: Previous/Next arrows with intelligent ellipsis for middle pages
- Page indices: Show first, last, and surrounding pages around current

```mermaid
flowchart TD
Init["Initialize itemsPerPage=20"] --> Count["Fetch total count"]
Count --> Range["Compute range: from=(page-1)*20, to=from+19"]
Range --> Query["Execute query.range(from,to)"]
Query --> Render["Render products"]
Render --> Nav["Render pagination controls"]
Nav --> Prev{"currentPage > 1?"}
Prev --> |Yes| Dec["Decrement page"]
Prev --> |No| DisabledPrev["Disable Previous"]
Nav --> Next{"Products fetched == 20?"}
Next --> |Yes| Inc["Increment page"]
Next --> |No| DisabledNext["Disable Next"]
```

**Diagram sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L23-L124)
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L55-L83)
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L376-L429)

**Section sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L23-L124)
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L55-L83)
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L376-L429)

### Bulk Operations: Excel Upload
- Modal workflow: Drag-and-drop or select Excel/CSV file
- Parsing: Handles CSV with UTF-8 BOM and XLS/XLSX via SheetJS
- Field mapping: Supports localized column names for Arabic/English
- Image processing: Downloads remote images via proxy and uploads to Supabase Storage
- Import pipeline: Iterates rows, finds category IDs, checks duplicates, inserts records
- Progress and errors: Tracks total/current/success and aggregates errors
- Success callback: Refreshes product list after successful import

```mermaid
sequenceDiagram
participant U as "User"
participant M as "ExcelUploadModal"
participant P as "Parser"
participant S as "Supabase Storage"
participant DB as "Supabase DB"
U->>M : Choose file (CSV/XLSX)
M->>P : Parse file (handle BOM, binary/string)
P-->>M : Preview data (formatted rows)
U->>M : Start Import
loop For each row
M->>DB : Lookup category by name
M->>S : Download image via proxy
S-->>M : Public URL
M->>DB : Insert product (prevent duplicates)
end
M-->>U : Show success/error summary
```

**Diagram sources**
- [admin/src/components/products/ExcelUploadModal.tsx:47-255](file://admin/src/components/products/ExcelUploadModal.tsx#L47-L255)
- [admin/src/lib/supabase.ts:19-23](file://admin/src/lib/supabase.ts#L19-L23)

**Section sources**
- [admin/src/components/products/ExcelUploadModal.tsx:27-397](file://admin/src/components/products/ExcelUploadModal.tsx#L27-L397)

### Real-Time Product Display
- Status indicators: Green dot for active, gray for inactive
- Stock badges: Red for low stock (<10), green for in-stock (>0)
- Pricing: IQD formatted with Arabic locale
- Images: Lazy-loaded with Next.js Image; fallback icons when missing
- Loading states: Spinner and skeleton-like empty states
- Empty states: Distinct messages depending on active filters

```mermaid
flowchart TD
Data["Product record"] --> Image["Image or Placeholder"]
Data --> Name["Name (AR/EN)"]
Data --> Category["Category name"]
Data --> Price["Formatted IQD price"]
Data --> Stock["Stock badge (low/in-stock/out)"]
Data --> Status["Status dot + label"]
Data --> Actions["Edit/Delete buttons"]
```

**Diagram sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L269-L311)
- [admin/src/lib/utils.ts:8-14](file://admin/src/lib/utils.ts#L8-L14)

**Section sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L269-L311)
- [admin/src/lib/utils.ts:8-14](file://admin/src/lib/utils.ts#L8-L14)

### Web Storefront Similarities
- Client-side search and filters with URL param synchronization
- Responsive card grid with lazy-loading images
- Pagination controls and results messaging
- Price formatting and category labeling utilities

**Section sources**
- [web/src/app/products/page.tsx:1-90](file://web/src/app/products/page.tsx#L1-L90)
- [web/src/components/catalog/ProductsExplorer.tsx:1-427](file://web/src/components/catalog/ProductsExplorer.tsx#L1-L427)
- [web/src/lib/storefront.ts:527-572](file://web/src/lib/storefront.ts#L527-L572)

## Dependency Analysis
- Admin page depends on Supabase client and local utilities
- Services module centralizes database operations and types
- Web storefront reuses storefront utilities for formatting and translations
- Both layers share similar search/filter/pagination patterns

```mermaid
graph LR
AP["Admin Products Page"] --> SU["Supabase Client"]
AP --> UT["formatIQD"]
AP --> EM["Excel Upload Modal"]
EM --> SU
PS["Products Service"] --> ST["Shared Types"]
PS --> TI["Types Index"]
WP["Web Products Page"] --> PE["Products Explorer"]
PE --> SF["Storefront Utils"]
```

**Diagram sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L1-L12)
- [admin/src/lib/utils.ts:8-14](file://admin/src/lib/utils.ts#L8-L14)
- [admin/src/lib/supabase.ts:19-23](file://admin/src/lib/supabase.ts#L19-L23)
- [admin/src/components/products/ExcelUploadModal.tsx:1-7](file://admin/src/components/products/ExcelUploadModal.tsx#L1-L7)
- [services/products.service.ts:1-17](file://services/products.service.ts#L1-L17)
- [shared/types.ts:10-353](file://shared/types.ts#L10-L353)
- [types/index.ts:1-276](file://types/index.ts#L1-L276)
- [web/src/app/products/page.tsx:1-9](file://web/src/app/products/page.tsx#L1-L9)
- [web/src/components/catalog/ProductsExplorer.tsx:1-22](file://web/src/components/catalog/ProductsExplorer.tsx#L1-L22)
- [web/src/lib/storefront.ts:1-16](file://web/src/lib/storefront.ts#L1-L16)

**Section sources**
- [services/products.service.ts:1-449](file://services/products.service.ts#L1-L449)
- [shared/types.ts:10-353](file://shared/types.ts#L10-L353)
- [types/index.ts:1-276](file://types/index.ts#L1-L276)

## Performance Considerations
- Debounced search: Limits frequent queries; tune delay based on dataset size
- Field selection: Prefer minimal fields for listings; load full details on demand
- Pagination: Always use range queries and exact counts for predictable rendering
- Image optimization: Use Next.js Image with appropriate sizes and lazy loading
- Batch operations: Excel import processes sequentially; consider worker threads for very large files
- Caching: Reuse filtered results when filters change minimally
- Virtualization: For very large lists, consider virtualized lists to reduce DOM nodes

## Troubleshooting Guide
- Search not updating: Verify debounce timer and that debouncedSearch triggers fetch
- Filters not applying: Confirm filter state updates and query builder conditions
- Pagination issues: Ensure count matches items returned; check range boundaries
- Excel upload failures: Inspect error logs for storage upload or duplicate detection
- Image placeholders: Verify image URLs and proxy availability
- Formatting inconsistencies: Confirm IQD formatting locale and fallbacks

**Section sources**
- [admin/src/app/(dashboard)/products/page.tsx](file://admin/src/app/(dashboard)/products/page.tsx#L39-L92)
- [admin/src/components/products/ExcelUploadModal.tsx:177-255](file://admin/src/components/products/ExcelUploadModal.tsx#L177-L255)

## Conclusion
The product listing interface combines responsive design, efficient search and filtering, robust pagination, and powerful bulk operations. By leveraging debounced inputs, precise Supabase queries, and structured utilities, it delivers a scalable and accessible experience for managing large product catalogs.