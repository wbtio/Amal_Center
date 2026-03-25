import type {
  Address,
  Category,
  OrderStatus,
  PaymentMethod,
  Product,
} from "@/lib/types";

export type StorefrontLanguage = "ar" | "en";

export const LANGUAGE_COOKIE = "storefront-language";

export const PHONE_REGEX = /^(07[3-9]\d{8}|\+9647[3-9]\d{8})$/;

export const EXCHANGE_RATE = 1500;
export const DEFAULT_DELIVERY_COST_IQD = 0;

export const ORDER_STATUS_STEPS: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "delivered",
];

export type Banner = {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
  discount: string;
  active: boolean;
  link?: string | null;
};

type StorefrontMessages = {
  nav: {
    home: string;
    products: string;
    cart: string;
    account: string;
    login: string;
    register: string;
    search: string;
    menu: string;
    language: string;
  };
  home: {
    quickCategories: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    offers: string;
    categories: string;
    browseAll: string;
    discoverFresh: string;
    noBanners: string;
    noOffers: string;
    noCategories: string;
    newArrivals: string;
    promoTitle: string;
    promoSubtitle: string;
    promoAction: string;
  };
  products: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    empty: string;
    results: string;
  };
  category: {
    empty: string;
    back: string;
  };
  product: {
    price: string;
    originalPrice: string;
    stock: string;
    related: string;
    noRelated: string;
    addToCart: string;
    outOfStock: string;
    description: string;
    details: string;
  };
  cart: {
    title: string;
    empty: string;
    summary: string;
    totalItems: string;
    totalAmount: string;
    checkout: string;
    clear: string;
    continueShopping: string;
    quantity: string;
    remove: string;
  };
  checkout: {
    title: string;
    address: string;
    payment: string;
    review: string;
    savedAddresses: string;
    noSavedAddresses: string;
    paymentMethods: string;
    next: string;
    previous: string;
    emptyCart: string;
  };
  account: {
    title: string;
    subtitle: string;
    profile: string;
    recentOrders: string;
    savedAddresses: string;
    allOrders: string;
    noOrders: string;
    noAddresses: string;
    logout: string;
  };
  orders: {
    title: string;
    empty: string;
    status: string;
    details: string;
    items: string;
    total: string;
    createdAt: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    email: string;
    password: string;
    fullName: string;
    phone: string;
    confirmPassword: string;
    submitLogin: string;
    submitRegister: string;
    switchToRegister: string;
    switchToLogin: string;
    successLogin: string;
    successRegister: string;
  };
  footer: {
    description: string;
    contact: string;
    quickLinks: string;
    rights: string;
  };
  common: {
    retry: string;
    viewAll: string;
    notFound: string;
    loading: string;
    active: string;
    inactive: string;
  };
};

export const storefrontMessages: Record<
  StorefrontLanguage,
  StorefrontMessages
> = {
  ar: {
    nav: {
      home: "الرئيسية",
      products: "المنتجات",
      cart: "السلة",
      account: "حسابي",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      search: "ابحث عن المنتجات والأقسام",
      menu: "القائمة",
      language: "English",
    },
    home: {
      quickCategories: "التصنيفات",
      eyebrow: "متجر الأمل سنتر",
      title: "تجربة تسوق يومية مصممة بهدوء وسرعة لعائلتك.",
      subtitle:
        "خضروات طازجة، منتجات منزلية، وعروض موسمية من نفس مشروع Supabase المستخدم في التطبيق ولوحة الإدارة.",
      offers: "العروض المميزة",
      categories: "تسوق حسب القسم",
      browseAll: "تصفح جميع المنتجات",
      discoverFresh: "اكتشف الوافد الجديد",
      noBanners: "لا توجد بنرات نشطة حالياً.",
      noOffers: "لا توجد عروض متاحة حالياً.",
      noCategories: "لا توجد أقسام نشطة حالياً.",
      newArrivals: "وصل حديثاً",
      promoTitle: "تسوق احتياجات البيت من شاشة واحدة بسيطة وواضحة.",
      promoSubtitle:
        "واجهة عربية سريعة، عناوين محفوظة، وسلة متزامنة مع نفس بيانات المشروع الحية.",
      promoAction: "ابدأ التسوق الآن",
    },
    products: {
      title: "كل المنتجات",
      subtitle: "ابحث وصفّ المنتجات النشطة فقط بتجربة سريعة ومريحة.",
      searchPlaceholder: "ابحث بالاسم أو الوصف",
      allCategories: "كل الأقسام",
      empty: "لم يتم العثور على منتجات مطابقة للفلاتر الحالية.",
      results: "نتيجة",
    },
    category: {
      empty: "لا توجد منتجات نشطة داخل هذا القسم حالياً.",
      back: "العودة إلى المنتجات",
    },
    product: {
      price: "السعر الحالي",
      originalPrice: "السعر السابق",
      stock: "المخزون",
      related: "منتجات مشابهة",
      noRelated: "لا توجد منتجات مشابهة حالياً.",
      addToCart: "أضف إلى السلة",
      outOfStock: "نفد المخزون",
      description: "الوصف",
      details: "التفاصيل",
    },
    cart: {
      title: "سلة التسوق",
      empty: "السلة فارغة حالياً.",
      summary: "ملخص الطلب",
      totalItems: "إجمالي القطع",
      totalAmount: "الإجمالي",
      checkout: "إكمال الطلب",
      clear: "تفريغ السلة",
      continueShopping: "متابعة التسوق",
      quantity: "الكمية",
      remove: "حذف",
    },
    checkout: {
      title: "إتمام الطلب",
      address: "العنوان",
      payment: "الدفع",
      review: "المراجعة",
      savedAddresses: "العناوين المحفوظة",
      noSavedAddresses: "لا توجد عناوين محفوظة بعد.",
      paymentMethods: "طرق الدفع",
      next: "التالي",
      previous: "السابق",
      emptyCart: "أضف منتجات إلى السلة أولاً.",
    },
    account: {
      title: "حسابي",
      subtitle: "إدارة الملف الشخصي والطلبات والعناوين في مكان واحد.",
      profile: "الملف الشخصي",
      recentOrders: "أحدث الطلبات",
      savedAddresses: "العناوين المحفوظة",
      allOrders: "كل الطلبات",
      noOrders: "لا توجد طلبات بعد.",
      noAddresses: "لا توجد عناوين محفوظة.",
      logout: "تسجيل الخروج",
    },
    orders: {
      title: "طلباتي",
      empty: "لا توجد طلبات لعرضها بعد.",
      status: "الحالة",
      details: "تفاصيل الطلب",
      items: "المنتجات",
      total: "الإجمالي",
      createdAt: "تاريخ الإنشاء",
    },
    auth: {
      loginTitle: "تسجيل الدخول",
      loginSubtitle: "ادخل إلى حسابك لتكمل التسوق وتتابع طلباتك.",
      registerTitle: "إنشاء حساب جديد",
      registerSubtitle: "أنشئ حسابك وابدأ الطلب بنفس بيانات المشروع الحالية.",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      fullName: "الاسم الكامل",
      phone: "رقم الهاتف",
      confirmPassword: "تأكيد كلمة المرور",
      submitLogin: "دخول",
      submitRegister: "إنشاء الحساب",
      switchToRegister: "ليس لديك حساب؟ أنشئ حساباً",
      switchToLogin: "لديك حساب بالفعل؟ سجل الدخول",
      successLogin: "تم تسجيل الدخول بنجاح.",
      successRegister: "تم إنشاء الحساب بنجاح.",
    },
    footer: {
      description:
        "متجر عربي سريع ومريح لطلبات البقالة والهايبرماركت اليومية، متصل بنفس بيانات المشروع الحية.",
      contact: "تواصل معنا",
      quickLinks: "روابط سريعة",
      rights: "جميع الحقوق محفوظة",
    },
    common: {
      retry: "إعادة المحاولة",
      viewAll: "عرض الكل",
      notFound: "المحتوى غير موجود",
      loading: "جارٍ التحميل...",
      active: "نشط",
      inactive: "غير نشط",
    },
  },
  en: {
    nav: {
      home: "Home",
      products: "Products",
      cart: "Cart",
      account: "Account",
      login: "Login",
      register: "Register",
      search: "Search products and categories",
      menu: "Menu",
      language: "العربية",
    },
    home: {
      quickCategories: "Categories",
      eyebrow: "Al-Amal Center Storefront",
      title: "A calmer, faster everyday shopping experience for Iraqi homes.",
      subtitle:
        "Fresh produce, household staples, and seasonal offers powered by the same Supabase project used by the app and admin panel.",
      offers: "Featured Offers",
      categories: "Shop by Category",
      browseAll: "Browse all products",
      discoverFresh: "Discover what is new",
      noBanners: "No active banners right now.",
      noOffers: "No offers are available right now.",
      noCategories: "No active categories are available right now.",
      newArrivals: "New Arrivals",
      promoTitle: "Shop the whole household basket from one clear, modern storefront.",
      promoSubtitle:
        "Arabic-first browsing, saved addresses, and a cart connected to the same live project data.",
      promoAction: "Start shopping",
    },
    products: {
      title: "All Products",
      subtitle: "Search and filter active products with a fast, focused catalog.",
      searchPlaceholder: "Search by name or description",
      allCategories: "All categories",
      empty: "No products matched the current filters.",
      results: "results",
    },
    category: {
      empty: "No active products were found in this category.",
      back: "Back to products",
    },
    product: {
      price: "Current price",
      originalPrice: "Original price",
      stock: "Stock",
      related: "Related products",
      noRelated: "No related products right now.",
      addToCart: "Add to cart",
      outOfStock: "Out of stock",
      description: "Description",
      details: "Details",
    },
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is currently empty.",
      summary: "Order summary",
      totalItems: "Total items",
      totalAmount: "Total",
      checkout: "Continue to checkout",
      clear: "Clear cart",
      continueShopping: "Continue shopping",
      quantity: "Quantity",
      remove: "Remove",
    },
    checkout: {
      title: "Checkout",
      address: "Address",
      payment: "Payment",
      review: "Review",
      savedAddresses: "Saved addresses",
      noSavedAddresses: "No saved addresses yet.",
      paymentMethods: "Payment methods",
      next: "Next",
      previous: "Previous",
      emptyCart: "Add products to your cart first.",
    },
    account: {
      title: "My Account",
      subtitle: "Manage your profile, orders, and addresses in one place.",
      profile: "Profile",
      recentOrders: "Recent orders",
      savedAddresses: "Saved addresses",
      allOrders: "All orders",
      noOrders: "No orders yet.",
      noAddresses: "No saved addresses yet.",
      logout: "Sign out",
    },
    orders: {
      title: "My Orders",
      empty: "There are no orders to show yet.",
      status: "Status",
      details: "Order details",
      items: "Items",
      total: "Total",
      createdAt: "Created at",
    },
    auth: {
      loginTitle: "Sign in",
      loginSubtitle: "Access your account to continue shopping and track orders.",
      registerTitle: "Create an account",
      registerSubtitle: "Create your customer account on the current live project.",
      email: "Email",
      password: "Password",
      fullName: "Full name",
      phone: "Phone number",
      confirmPassword: "Confirm password",
      submitLogin: "Sign in",
      submitRegister: "Create account",
      switchToRegister: "No account yet? Create one",
      switchToLogin: "Already have an account? Sign in",
      successLogin: "Signed in successfully.",
      successRegister: "Account created successfully.",
    },
    footer: {
      description:
        "A refined Arabic-first storefront for grocery and hypermarket orders, connected to the same live project data.",
      contact: "Contact",
      quickLinks: "Quick links",
      rights: "All rights reserved",
    },
    common: {
      retry: "Retry",
      viewAll: "View all",
      notFound: "Content not found",
      loading: "Loading...",
      active: "Active",
      inactive: "Inactive",
    },
  },
};

export function normalizeLanguage(value?: string | null): StorefrontLanguage {
  return value === "en" ? "en" : "ar";
}

export function getDirection(language: StorefrontLanguage) {
  return language === "ar" ? "rtl" : "ltr";
}

export function getMessages(language: StorefrontLanguage) {
  return storefrontMessages[language];
}

export function resolveBannerHref(link?: string | null) {
  const rawLink = link?.trim();

  if (!rawLink) {
    return "/products";
  }

  if (/^(mailto:|tel:|sms:|whatsapp:)/i.test(rawLink)) {
    return rawLink;
  }

  if (/^https?:\/\//i.test(rawLink)) {
    try {
      const url = new URL(rawLink);

      if (url.pathname.startsWith("/(tabs)")) {
        return normalizeWebRoute(`${url.pathname}${url.search}${url.hash}`);
      }
    } catch {
      return rawLink;
    }

    return rawLink;
  }

  return normalizeWebRoute(rawLink);
}

function normalizeWebRoute(route: string) {
  const [pathWithSearch, hash = ""] = route.split("#", 2);
  const [rawPath, search = ""] = pathWithSearch.split("?", 2);
  let path = rawPath.trim();

  if (!path) {
    return "/products";
  }

  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  if (path === "/(tabs)" || path === "/(tabs)/") {
    path = "/";
  } else if (path.startsWith("/(tabs)/")) {
    path = path.replace("/(tabs)", "");
  }

  if (path === "/categories") {
    path = "/products";
  }

  if (path === "/profile") {
    path = "/account";
  }

  return `${path}${search ? `?${search}` : ""}${hash ? `#${hash}` : ""}`;
}

export function translate(language: StorefrontLanguage, key: string) {
  const parts = key.split(".");
  let cursor: unknown = storefrontMessages[language];

  for (const part of parts) {
    if (typeof cursor !== "object" || cursor === null || !(part in cursor)) {
      return key;
    }

    cursor = (cursor as Record<string, unknown>)[part];
  }

  return typeof cursor === "string" ? cursor : key;
}

export function formatIQD(amount: number, language: StorefrontLanguage) {
  const locale = language === "ar" ? "ar-IQ" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "IQD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateTime(
  value: string,
  language: StorefrontLanguage,
  options?: Intl.DateTimeFormatOptions
) {
  return new Intl.DateTimeFormat(language === "ar" ? "ar-IQ" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    ...options,
  }).format(new Date(value));
}

export function getProductName(
  product: Pick<Product, "name" | "name_ar">,
  language: StorefrontLanguage
) {
  return language === "ar" ? product.name_ar : product.name || product.name_ar;
}

export function getProductDescription(
  product: Pick<Product, "description" | "description_ar">,
  language: StorefrontLanguage
) {
  return language === "ar"
    ? product.description_ar || product.description
    : product.description || product.description_ar;
}

export function getCategoryName(
  category: Pick<Category, "name" | "name_ar">,
  language: StorefrontLanguage
) {
  return language === "ar"
    ? category.name_ar
    : category.name || category.name_ar;
}

export function getAddressTypeLabel(
  type: Address["type"],
  language: StorefrontLanguage
) {
  if (language === "ar") {
    return type === "home" ? "المنزل" : "العمل";
  }

  return type === "home" ? "Home" : "Work";
}

export function getPaymentMethodLabel(
  method: PaymentMethod,
  language: StorefrontLanguage
) {
  const labels: Record<PaymentMethod, { ar: string; en: string }> = {
    cod: { ar: "الدفع عند الاستلام", en: "Cash on delivery" },
    cash: { ar: "دفع نقدي", en: "Cash" },
    card: { ar: "الدفع الإلكتروني", en: "Electronic payment" },
  };

  return language === "ar" ? labels[method].ar : labels[method].en;
}

export function getOrderStatusLabel(
  status: OrderStatus,
  language: StorefrontLanguage
) {
  const labels: Record<OrderStatus, { ar: string; en: string }> = {
    pending: { ar: "قيد الانتظار", en: "Pending" },
    confirmed: { ar: "تم التأكيد", en: "Confirmed" },
    preparing: { ar: "قيد التجهيز", en: "Preparing" },
    ready: { ar: "جاهز", en: "Ready" },
    delivered: { ar: "تم التسليم", en: "Delivered" },
    cancelled: { ar: "ملغي", en: "Cancelled" },
  };

  return language === "ar" ? labels[status].ar : labels[status].en;
}
