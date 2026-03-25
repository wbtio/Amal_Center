import { ProductsExplorer } from "@/components/catalog/ProductsExplorer";
import {
  getActiveCategories,
  searchActiveProducts,
  type ProductSortOption,
} from "@/lib/storefront-data";

export const dynamic = "force-dynamic";

type ProductsPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    category?: string | string[];
    sort?: string | string[];
    minPrice?: string | string[];
    maxPrice?: string | string[];
    inStock?: string | string[];
    page?: string | string[];
  }>;
};

const PRODUCTS_PER_PAGE = 12;

function readParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function readSort(value?: string): ProductSortOption {
  if (
    value === "price_low" ||
    value === "price_high" ||
    value === "name_az"
  ) {
    return value;
  }

  return "newest";
}

function readNumber(value?: string) {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const query = readParam(params.q);
  const categoryId = readParam(params.category);
  const sort = readSort(readParam(params.sort));
  const minPrice = readParam(params.minPrice);
  const maxPrice = readParam(params.maxPrice);
  const inStock = readParam(params.inStock) === "true";
  const page = Math.max(1, readNumber(readParam(params.page)) || 1);
  const offset = (page - 1) * PRODUCTS_PER_PAGE;
  const [categories, products] = await Promise.all([
    getActiveCategories(),
    searchActiveProducts({
      query: query || undefined,
      categoryId: categoryId || undefined,
      sort,
      minPrice: readNumber(minPrice),
      maxPrice: readNumber(maxPrice),
      inStock,
      limit: PRODUCTS_PER_PAGE,
      offset,
    }),
  ]);

  return (
    <ProductsExplorer
      categories={categories}
      products={products}
      initialQuery={query}
      initialCategory={categoryId}
      initialSort={sort}
      initialMinPrice={minPrice}
      initialMaxPrice={maxPrice}
      initialInStock={inStock}
      currentPage={page}
      productsPerPage={PRODUCTS_PER_PAGE}
    />
  );
}
