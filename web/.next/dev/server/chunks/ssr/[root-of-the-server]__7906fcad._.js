module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/web/src/lib/storefront.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_DELIVERY_COST_IQD",
    ()=>DEFAULT_DELIVERY_COST_IQD,
    "EXCHANGE_RATE",
    ()=>EXCHANGE_RATE,
    "LANGUAGE_COOKIE",
    ()=>LANGUAGE_COOKIE,
    "ORDER_STATUS_STEPS",
    ()=>ORDER_STATUS_STEPS,
    "PHONE_REGEX",
    ()=>PHONE_REGEX,
    "formatDateTime",
    ()=>formatDateTime,
    "formatIQD",
    ()=>formatIQD,
    "getAddressTypeLabel",
    ()=>getAddressTypeLabel,
    "getCategoryName",
    ()=>getCategoryName,
    "getDirection",
    ()=>getDirection,
    "getMessages",
    ()=>getMessages,
    "getOrderStatusLabel",
    ()=>getOrderStatusLabel,
    "getPaymentMethodLabel",
    ()=>getPaymentMethodLabel,
    "getProductDescription",
    ()=>getProductDescription,
    "getProductName",
    ()=>getProductName,
    "normalizeLanguage",
    ()=>normalizeLanguage,
    "resolveBannerHref",
    ()=>resolveBannerHref,
    "storefrontMessages",
    ()=>storefrontMessages,
    "translate",
    ()=>translate
]);
const LANGUAGE_COOKIE = "storefront-language";
const PHONE_REGEX = /^(07[3-9]\d{8}|\+9647[3-9]\d{8})$/;
const EXCHANGE_RATE = 1500;
const DEFAULT_DELIVERY_COST_IQD = 0;
const ORDER_STATUS_STEPS = [
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "delivered"
];
const storefrontMessages = {
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
            language: "English"
        },
        home: {
            quickCategories: "التصنيفات",
            eyebrow: "متجر الأمل سنتر",
            title: "تجربة تسوق يومية مصممة بهدوء وسرعة لعائلتك.",
            subtitle: "خضروات طازجة، منتجات منزلية، وعروض موسمية من نفس مشروع Supabase المستخدم في التطبيق ولوحة الإدارة.",
            offers: "العروض المميزة",
            categories: "تسوق حسب القسم",
            browseAll: "تصفح جميع المنتجات",
            discoverFresh: "اكتشف الوافد الجديد",
            noBanners: "لا توجد بنرات نشطة حالياً.",
            noOffers: "لا توجد عروض متاحة حالياً.",
            noCategories: "لا توجد أقسام نشطة حالياً.",
            newArrivals: "وصل حديثاً",
            promoTitle: "تسوق احتياجات البيت من شاشة واحدة بسيطة وواضحة.",
            promoSubtitle: "واجهة عربية سريعة، عناوين محفوظة، وسلة متزامنة مع نفس بيانات المشروع الحية.",
            promoAction: "ابدأ التسوق الآن"
        },
        products: {
            title: "كل المنتجات",
            subtitle: "ابحث وصفّ المنتجات النشطة فقط بتجربة سريعة ومريحة.",
            searchPlaceholder: "ابحث بالاسم أو الوصف",
            allCategories: "كل الأقسام",
            empty: "لم يتم العثور على منتجات مطابقة للفلاتر الحالية.",
            results: "نتيجة"
        },
        category: {
            empty: "لا توجد منتجات نشطة داخل هذا القسم حالياً.",
            back: "العودة إلى المنتجات"
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
            details: "التفاصيل"
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
            remove: "حذف"
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
            emptyCart: "أضف منتجات إلى السلة أولاً."
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
            logout: "تسجيل الخروج"
        },
        orders: {
            title: "طلباتي",
            empty: "لا توجد طلبات لعرضها بعد.",
            status: "الحالة",
            details: "تفاصيل الطلب",
            items: "المنتجات",
            total: "الإجمالي",
            createdAt: "تاريخ الإنشاء"
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
            successRegister: "تم إنشاء الحساب بنجاح."
        },
        footer: {
            description: "متجر عربي سريع ومريح لطلبات البقالة والهايبرماركت اليومية، متصل بنفس بيانات المشروع الحية.",
            contact: "تواصل معنا",
            quickLinks: "روابط سريعة",
            rights: "جميع الحقوق محفوظة"
        },
        common: {
            retry: "إعادة المحاولة",
            viewAll: "عرض الكل",
            notFound: "المحتوى غير موجود",
            loading: "جارٍ التحميل...",
            active: "نشط",
            inactive: "غير نشط"
        }
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
            language: "العربية"
        },
        home: {
            quickCategories: "Categories",
            eyebrow: "Al-Amal Center Storefront",
            title: "A calmer, faster everyday shopping experience for Iraqi homes.",
            subtitle: "Fresh produce, household staples, and seasonal offers powered by the same Supabase project used by the app and admin panel.",
            offers: "Featured Offers",
            categories: "Shop by Category",
            browseAll: "Browse all products",
            discoverFresh: "Discover what is new",
            noBanners: "No active banners right now.",
            noOffers: "No offers are available right now.",
            noCategories: "No active categories are available right now.",
            newArrivals: "New Arrivals",
            promoTitle: "Shop the whole household basket from one clear, modern storefront.",
            promoSubtitle: "Arabic-first browsing, saved addresses, and a cart connected to the same live project data.",
            promoAction: "Start shopping"
        },
        products: {
            title: "All Products",
            subtitle: "Search and filter active products with a fast, focused catalog.",
            searchPlaceholder: "Search by name or description",
            allCategories: "All categories",
            empty: "No products matched the current filters.",
            results: "results"
        },
        category: {
            empty: "No active products were found in this category.",
            back: "Back to products"
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
            details: "Details"
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
            remove: "Remove"
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
            emptyCart: "Add products to your cart first."
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
            logout: "Sign out"
        },
        orders: {
            title: "My Orders",
            empty: "There are no orders to show yet.",
            status: "Status",
            details: "Order details",
            items: "Items",
            total: "Total",
            createdAt: "Created at"
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
            successRegister: "Account created successfully."
        },
        footer: {
            description: "A refined Arabic-first storefront for grocery and hypermarket orders, connected to the same live project data.",
            contact: "Contact",
            quickLinks: "Quick links",
            rights: "All rights reserved"
        },
        common: {
            retry: "Retry",
            viewAll: "View all",
            notFound: "Content not found",
            loading: "Loading...",
            active: "Active",
            inactive: "Inactive"
        }
    }
};
function normalizeLanguage(value) {
    return value === "en" ? "en" : "ar";
}
function getDirection(language) {
    return language === "ar" ? "rtl" : "ltr";
}
function getMessages(language) {
    return storefrontMessages[language];
}
function resolveBannerHref(link) {
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
        } catch  {
            return rawLink;
        }
        return rawLink;
    }
    return normalizeWebRoute(rawLink);
}
function normalizeWebRoute(route) {
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
function translate(language, key) {
    const parts = key.split(".");
    let cursor = storefrontMessages[language];
    for (const part of parts){
        if (typeof cursor !== "object" || cursor === null || !(part in cursor)) {
            return key;
        }
        cursor = cursor[part];
    }
    return typeof cursor === "string" ? cursor : key;
}
function formatIQD(amount, language) {
    const locale = language === "ar" ? "ar-IQ" : "en-US";
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "IQD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}
function formatDateTime(value, language, options) {
    return new Intl.DateTimeFormat(language === "ar" ? "ar-IQ" : "en-US", {
        dateStyle: "medium",
        timeStyle: "short",
        ...options
    }).format(new Date(value));
}
function getProductName(product, language) {
    return language === "ar" ? product.name_ar : product.name || product.name_ar;
}
function getProductDescription(product, language) {
    return language === "ar" ? product.description_ar || product.description : product.description || product.description_ar;
}
function getCategoryName(category, language) {
    return language === "ar" ? category.name_ar : category.name || category.name_ar;
}
function getAddressTypeLabel(type, language) {
    if (language === "ar") {
        return type === "home" ? "المنزل" : "العمل";
    }
    return type === "home" ? "Home" : "Work";
}
function getPaymentMethodLabel(method, language) {
    const labels = {
        cod: {
            ar: "الدفع عند الاستلام",
            en: "Cash on delivery"
        },
        cash: {
            ar: "دفع نقدي",
            en: "Cash"
        },
        card: {
            ar: "الدفع الإلكتروني",
            en: "Electronic payment"
        }
    };
    return language === "ar" ? labels[method].ar : labels[method].en;
}
function getOrderStatusLabel(status, language) {
    const labels = {
        pending: {
            ar: "قيد الانتظار",
            en: "Pending"
        },
        confirmed: {
            ar: "تم التأكيد",
            en: "Confirmed"
        },
        preparing: {
            ar: "قيد التجهيز",
            en: "Preparing"
        },
        ready: {
            ar: "جاهز",
            en: "Ready"
        },
        delivered: {
            ar: "تم التسليم",
            en: "Delivered"
        },
        cancelled: {
            ar: "ملغي",
            en: "Cancelled"
        }
    };
    return language === "ar" ? labels[status].ar : labels[status].en;
}
}),
"[project]/web/src/components/providers/StorefrontProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StorefrontProvider",
    ()=>StorefrontProvider,
    "useStorefront",
    ()=>useStorefront
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/storefront.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const StorefrontContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function writeLanguage(language) {
    document.documentElement.lang = language;
    document.documentElement.dir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDirection"])(language);
    document.cookie = `${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LANGUAGE_COOKIE"]}=${language}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LANGUAGE_COOKIE"], language);
}
function StorefrontProvider({ children, initialLanguage }) {
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialLanguage);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        writeLanguage(language);
    }, [
        language
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            language,
            isRTL: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDirection"])(language) === "rtl",
            setLanguage: (nextLanguage)=>{
                setLanguageState(nextLanguage);
                writeLanguage(nextLanguage);
            },
            toggleLanguage: ()=>{
                const nextLanguage = language === "ar" ? "en" : "ar";
                setLanguageState(nextLanguage);
                writeLanguage(nextLanguage);
            },
            t: (key)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translate"])(language, key),
            messages: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMessages"])(language)
        }), [
        language
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StorefrontContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/web/src/components/providers/StorefrontProvider.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
function useStorefront() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(StorefrontContext);
    if (!context) {
        throw new Error("useStorefront must be used within StorefrontProvider");
    }
    return context;
}
}),
"[project]/constants/app.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * App-wide Constants
 * Contains configuration values used throughout the application
 */ __turbopack_context__.s([
    "APP_CONFIG",
    ()=>APP_CONFIG,
    "COLORS",
    ()=>COLORS
]);
const APP_CONFIG = {
    VERSION: '0.50',
    WHATSAPP_NUMBER: '9647801234567',
    WHATSAPP_URL: 'https://wa.me/9647801234567',
    // Support & Help
    SUPPORT_EMAIL: 'support@al-amal-center.iq',
    HELP_CENTER_URL: 'https://help.al-amal-center.iq',
    // Social Media
    FACEBOOK_URL: 'https://facebook.com/alamalcenter',
    INSTAGRAM_URL: 'https://instagram.com/alamalcenter'
};
const COLORS = {
    PRIMARY: '#2E7D32',
    SECONDARY: '#FFB300',
    ACCENT: '#4CAF50',
    DANGER: '#D32F2F',
    SUCCESS: '#4CAF50',
    WARNING: '#FF9800',
    INFO: '#2196F3',
    // Text Colors
    TEXT_PRIMARY: '#212121',
    TEXT_SECONDARY: '#757575',
    TEXT_DISABLED: '#9E9E9E',
    // Background Colors
    BG_PRIMARY: '#FFFFFF',
    BG_SECONDARY: '#F5F5F5',
    BG_TERTIARY: '#F6F8F6'
};
}),
"[project]/web/src/components/layout/Footer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/facebook.js [app-ssr] (ecmascript) <export default as Facebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/instagram.js [app-ssr] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/app.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const QUICK_LINKS = [
    {
        href: "/",
        key: "nav.home"
    },
    {
        href: "/products",
        key: "nav.products"
    },
    {
        href: "/cart",
        key: "nav.cart"
    },
    {
        href: "/account",
        key: "nav.account"
    }
];
function Footer() {
    const { isRTL, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStorefront"])();
    const year = new Date().getFullYear();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "mt-16 pb-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-shell",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "soft-panel overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.9fr]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex items-center gap-3 rounded-[1.6rem] bg-slate-50 px-3 py-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex h-11 w-11 items-center justify-center rounded-[1rem] bg-primary text-lg font-bold text-white shadow-button",
                                                children: "أ"
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                lineNumber: 37,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-start",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-[#1D1D1F]",
                                                        children: isRTL ? "الأمل سنتر" : "Al Amal Center"
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                        lineNumber: 41,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-xs text-slate-500",
                                                        children: isRTL ? "Al Amal Center" : "الأمل سنتر"
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                        lineNumber: 44,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                lineNumber: 40,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                        lineNumber: 34,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "max-w-xl text-sm leading-7 text-slate-500 text-start sm:text-base",
                                        children: t("footer.description")
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/layout/Footer.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "eyebrow",
                                        children: t("footer.quickLinks")
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5 grid gap-3",
                                        children: QUICK_LINKS.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-sm text-slate-500 transition hover:text-[#1D1D1F]",
                                                children: t(link.key)
                                            }, link.href, false, {
                                                fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                lineNumber: 59,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/layout/Footer.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "eyebrow",
                                        children: t("footer.contact")
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5 grid gap-4 text-sm text-slate-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_URL,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "inline-flex items-center gap-3 transition hover:text-[#1D1D1F]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_NUMBER
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                lineNumber: 73,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `tel:${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_NUMBER}`,
                                                className: "inline-flex items-center gap-3 transition hover:text-[#1D1D1F]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                        lineNumber: 86,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_NUMBER
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                        lineNumber: 87,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                lineNumber: 82,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_CONFIG"].SUPPORT_EMAIL}`,
                                                className: "inline-flex items-center gap-3 transition hover:text-[#1D1D1F]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_CONFIG"].SUPPORT_EMAIL
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                lineNumber: 89,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 pt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_CONFIG"].FACEBOOK_URL,
                                                        target: "_blank",
                                                        rel: "noreferrer",
                                                        className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-primary/30 hover:text-[#1D1D1F]",
                                                        "aria-label": "Facebook",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"], {
                                                            size: 17
                                                        }, void 0, false, {
                                                            fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                            lineNumber: 107,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_CONFIG"].INSTAGRAM_URL,
                                                        target: "_blank",
                                                        rel: "noreferrer",
                                                        className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-primary/30 hover:text-[#1D1D1F]",
                                                        "aria-label": "Instagram",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                            size: 17
                                                        }, void 0, false, {
                                                            fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                            lineNumber: 116,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web/src/components/layout/Footer.tsx",
                                                lineNumber: 97,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/layout/Footer.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 border-t border-slate-100 pt-5 text-sm text-slate-400 text-start",
                        children: [
                            year,
                            " © Al Amal Center. ",
                            t("footer.rights")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/layout/Footer.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/layout/Footer.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/web/src/components/layout/Footer.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
"[project]/assets/icon.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/icon.20fff2bf.png");}),
"[project]/assets/icon.png.mjs { IMAGE => \"[project]/assets/icon.png (static in ecmascript, tag client)\" } [app-ssr] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$assets$2f$icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/assets/icon.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$assets$2f$icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 938,
    height: 938,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAZ0lEQVR42oXNTwtAMAAFcJ+fj+HESZycHBEptfssW6PGUhxmNpS5+fOO71fvWftLrE+QUmNMew7ZyAXatDCgAVBJ0niBHaYlLtq5Orsb4hi6vhNlJcnJUhu4pjrK0MCnFSstf8+fcgA/VrZXdM4a8AAAAABJRU5ErkJggg=="
};
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/web/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/web/src/components/search/StorefrontSearchBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StorefrontSearchBar",
    ()=>StorefrontSearchBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function StorefrontSearchBar({ value, isRTL, placeholder, helperText, pending = false, variant = "page", className, onChange, onClear, onSubmit }) {
    const hasValue = value.trim().length > 0;
    const clearLabel = isRTL ? "مسح البحث" : "Clear search";
    const submitLabel = isRTL ? "بحث" : "Search";
    const shellClass = variant === "header" ? "rounded-[1.35rem] border border-white/75 bg-white/92 p-1 shadow-soft" : "rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94))] p-1.5 shadow-soft";
    const fieldHeightClass = variant === "header" ? "h-11" : "h-12";
    const submitClass = variant === "header" ? "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[1rem] bg-[#1D1D1F] px-4 text-sm font-medium text-white shadow-button transition hover:bg-primary" : "inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[1.2rem] bg-[#1D1D1F] px-4 text-sm font-medium text-white shadow-button transition hover:bg-primary";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: onSubmit,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: shellClass,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    size: 17,
                                    className: "pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 start-4"
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "search",
                                    name: "q",
                                    value: value,
                                    onChange: (event)=>onChange(event.target.value),
                                    placeholder: placeholder,
                                    autoComplete: "off",
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(fieldHeightClass, "w-full rounded-[1.1rem] border-0 bg-transparent text-sm text-[#1D1D1F] outline-none placeholder:text-slate-400 ps-11 text-start", hasValue && "pe-10")
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                hasValue ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClear,
                                    className: "absolute top-1/2 end-2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700",
                                    "aria-label": clearLabel,
                                    title: clearLabel,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
                                        lineNumber: 76,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
                                    lineNumber: 69,
                                    columnNumber: 15
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: submitClass,
                            "aria-label": submitLabel,
                            title: submitLabel,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:inline",
                                    children: submitLabel
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            helperText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mt-2 px-1 text-xs text-start", pending ? "text-primary" : "text-slate-500"),
                children: helperText
            }, void 0, false, {
                fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
"[project]/web/src/components/search/useCatalogSearch.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCatalogSearch",
    ()=>useCatalogSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useCatalogSearch({ pathname, router, searchParams, autoSyncOnProducts = true }) {
    const currentQuery = searchParams.get("q") ?? "";
    const [searchValue, setSearchValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(currentQuery);
    const deferredSearchValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDeferredValue"])(searchValue);
    const [isSearchPending, startSearchTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setSearchValue(currentQuery);
    }, [
        currentQuery
    ]);
    const buildSearchHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((value)=>{
        const normalized = value.trim();
        const params = pathname === "/products" ? new URLSearchParams(searchParams.toString()) : new URLSearchParams();
        if (normalized) {
            params.set("q", normalized);
        } else {
            params.delete("q");
        }
        const query = params.toString();
        return query ? `/products?${query}` : "/products";
    }, [
        pathname,
        searchParams
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!autoSyncOnProducts || pathname !== "/products") {
            return;
        }
        const normalized = deferredSearchValue.trim();
        if (normalized === currentQuery) {
            return;
        }
        startSearchTransition(()=>{
            router.replace(buildSearchHref(normalized), {
                scroll: false
            });
        });
    }, [
        autoSyncOnProducts,
        buildSearchHref,
        currentQuery,
        deferredSearchValue,
        pathname,
        router
    ]);
    function submitSearch(event) {
        event.preventDefault();
        startSearchTransition(()=>{
            router.push(buildSearchHref(searchValue));
        });
    }
    function clearSearch() {
        setSearchValue("");
        if (pathname === "/products") {
            startSearchTransition(()=>{
                router.replace(buildSearchHref(""), {
                    scroll: false
                });
            });
        }
    }
    return {
        searchValue,
        setSearchValue,
        isSearchPending,
        submitSearch,
        clearSearch,
        buildSearchHref
    };
}
}),
"[project]/web/src/lib/supabase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBrowserSupabaseClient",
    ()=>createBrowserSupabaseClient,
    "createServerSupabaseClient",
    ()=>createServerSupabaseClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-ssr] (ecmascript)");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://asxynodsnmrymmdspprn.supabase.co") || "https://placeholder.supabase.co";
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzeHlub2Rzbm1yeW1tZHNwcHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNDEyNDAsImV4cCI6MjA4MTcxNzI0MH0.glHB2rP9CaqD5uQqt_P3Ky3c4ApyLPLvIQ3-OUZQHK4") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.KX_2";
function createBrowserSupabaseClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(supabaseUrl, supabaseAnonKey);
}
async function createServerSupabaseClient() {
    const { cookies } = await __turbopack_context__.A("[project]/web/node_modules/next/headers.js [app-ssr] (ecmascript, async loader)");
    const cookieStore = await cookies();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerClient"])(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>{
                        cookieStore.set(name, value, options);
                    });
                } catch  {
                // Server Components cannot always write cookies directly.
                }
            }
        }
    });
}
}),
"[project]/web/src/components/providers/SupabaseSessionProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SupabaseSessionProvider",
    ()=>SupabaseSessionProvider,
    "useSupabaseSession",
    ()=>useSupabaseSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/supabase.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const SupabaseSessionContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function SupabaseSessionProvider({ children, initialSession }) {
    const [supabase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserSupabaseClient"])());
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialSession);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession)=>{
            setSession(nextSession);
        });
        supabase.auth.getSession().then(({ data })=>{
            if (data.session) {
                setSession(data.session);
            }
        });
        return ()=>{
            subscription.unsubscribe();
        };
    }, [
        supabase
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SupabaseSessionContext.Provider, {
        value: {
            supabase,
            session,
            user: session?.user ?? null
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/web/src/components/providers/SupabaseSessionProvider.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
function useSupabaseSession() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(SupabaseSessionContext);
    if (!context) {
        throw new Error("useSupabaseSession must be used within SupabaseSessionProvider");
    }
    return context;
}
}),
"[project]/web/src/store/cart.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCartStore",
    ()=>useCartStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/zustand/esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function calculateTotals(items) {
    return {
        totalItems: items.reduce((sum, item)=>sum + item.quantity, 0),
        totalIQD: items.reduce((sum, item)=>sum + item.product.price_iqd * item.quantity, 0)
    };
}
const useCartStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        items: [],
        totalItems: 0,
        totalIQD: 0,
        addItem: (product, quantity = 1)=>{
            const items = get().items;
            const existingItem = items.find((item)=>item.product.id === product.id);
            if (existingItem) {
                const nextQuantity = Math.min(existingItem.quantity + quantity, product.stock_quantity);
                const nextItems = items.map((item)=>item.product.id === product.id ? {
                        ...item,
                        quantity: nextQuantity
                    } : item);
                set({
                    items: nextItems,
                    ...calculateTotals(nextItems)
                });
                return;
            }
            const nextItems = [
                ...items,
                {
                    product,
                    quantity: Math.min(quantity, product.stock_quantity || quantity)
                }
            ];
            set({
                items: nextItems,
                ...calculateTotals(nextItems)
            });
        },
        removeItem: (productId)=>{
            const nextItems = get().items.filter((item)=>item.product.id !== productId);
            set({
                items: nextItems,
                ...calculateTotals(nextItems)
            });
        },
        updateQuantity: (productId, quantity)=>{
            if (quantity <= 0) {
                get().removeItem(productId);
                return;
            }
            const nextItems = get().items.map((item)=>{
                if (item.product.id !== productId) {
                    return item;
                }
                return {
                    ...item,
                    quantity: Math.min(quantity, item.product.stock_quantity || quantity)
                };
            });
            set({
                items: nextItems,
                ...calculateTotals(nextItems)
            });
        },
        clearCart: ()=>set({
                items: [],
                totalItems: 0,
                totalIQD: 0
            })
    }), {
    name: "storefront-cart",
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage),
    onRehydrateStorage: ()=>(state)=>{
            if (!state) {
                return;
            }
            Object.assign(state, calculateTotals(state.items));
        }
}));
}),
"[project]/web/src/components/layout/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$assets$2f$icon$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$assets$2f$icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/assets/icon.png.mjs { IMAGE => "[project]/assets/icon.png (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__House$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript) <export default as House>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-ssr] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-ssr] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/circle-user-round.js [app-ssr] (ecmascript) <export default as UserCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$StorefrontSearchBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/search/StorefrontSearchBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$useCatalogSearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/search/useCatalogSearch.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/SupabaseSessionProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/store/cart.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
const NAV_LINKS = [
    {
        href: "/",
        key: "nav.home",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__House$3e$__["House"]
    },
    {
        href: "/products",
        key: "nav.products",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"]
    }
];
const actionButtonClass = "inline-flex h-11 w-11 items-center justify-center rounded-[1.15rem] border border-slate-200/80 bg-white/95 text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:text-[#1D1D1F] hover:shadow-soft";
function isNavActive(pathname, href) {
    if (href === "/") {
        return pathname === "/";
    }
    if (href === "/products") {
        return pathname === "/products" || pathname.startsWith("/product/") || pathname.startsWith("/category/");
    }
    return pathname === href;
}
function Header() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSupabaseSession"])();
    const { isRTL, language, t, toggleLanguage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStorefront"])();
    const totalItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCartStore"])((state)=>state.totalItems);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { searchValue, setSearchValue, submitSearch, clearSearch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$useCatalogSearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCatalogSearch"])({
        pathname,
        router,
        searchParams
    });
    const cartActive = pathname === "/cart";
    const accountActive = pathname.startsWith("/account") || pathname.startsWith("/auth");
    const languageTitle = language === "ar" ? "العربية" : "English";
    const languageActionLabel = language === "ar" ? "التبديل إلى الإنجليزية" : "Switch to Arabic";
    const accountLabel = user ? t("nav.account") : t("nav.login");
    function handleSearchSubmit(event) {
        setIsMenuOpen(false);
        submitSearch(event);
    }
    function changeLanguage() {
        toggleLanguage();
        setIsMenuOpen(false);
        router.refresh();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 px-4 pt-2 sm:px-6 sm:pt-3 lg:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-7xl",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-hidden rounded-[1.65rem] border border-white/80 bg-white/72 px-3 py-2.5 shadow-soft backdrop-blur-2xl sm:px-4 sm:py-3 lg:px-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-x-10 top-0 h-16 bg-[radial-gradient(circle_at_top,rgba(46,125,50,0.14),rgba(255,179,0,0.06)_42%,transparent_74%)] blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/web/src/components/layout/Header.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-w-0 items-center gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setIsMenuOpen((current)=>!current),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(actionButtonClass, "lg:hidden"),
                                                "aria-label": t("nav.menu"),
                                                "aria-expanded": isMenuOpen,
                                                title: t("nav.menu"),
                                                children: isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/web/src/components/layout/Header.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 33
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/web/src/components/layout/Header.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 51
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/layout/Header.tsx",
                                                lineNumber: 102,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/",
                                                className: "inline-flex min-w-0 items-center gap-3 rounded-[1.2rem] border border-white/80 bg-white/95 px-3 py-1.5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-premium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            src: __TURBOPACK__imported__module__$5b$project$5d2f$assets$2f$icon$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$assets$2f$icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                                            alt: "الأمل سنتر",
                                                            fill: true,
                                                            priority: true,
                                                            sizes: "36px",
                                                            className: "object-cover scale-[1.9]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/web/src/components/layout/Header.tsx",
                                                            lineNumber: 118,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/layout/Header.tsx",
                                                        lineNumber: 117,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "min-w-0 truncate text-sm font-semibold text-[#1D1D1F] sm:text-base",
                                                        children: "الأمل سنتر"
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/layout/Header.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web/src/components/layout/Header.tsx",
                                                lineNumber: 113,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/layout/Header.tsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden min-w-0 flex-1 px-1 lg:block",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mx-auto w-full max-w-[40rem]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$StorefrontSearchBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StorefrontSearchBar"], {
                                                value: searchValue,
                                                isRTL: isRTL,
                                                placeholder: t("nav.search"),
                                                variant: "header",
                                                onChange: setSearchValue,
                                                onClear: clearSearch,
                                                onSubmit: handleSearchSubmit
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/layout/Header.tsx",
                                                lineNumber: 135,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/layout/Header.tsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/layout/Header.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex shrink-0 items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                                className: "hidden items-center gap-2 lg:flex",
                                                children: NAV_LINKS.map((item)=>{
                                                    const Icon = item.icon;
                                                    const active = isNavActive(pathname, item.href);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: item.href,
                                                        "aria-current": active ? "page" : undefined,
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-11 items-center gap-2 rounded-[1.1rem] border px-3 text-sm font-medium transition", active ? "border-[#1D1D1F] bg-[#1D1D1F] text-white shadow-soft" : "border-slate-200/80 bg-white/95 text-slate-600 hover:border-primary/30 hover:text-[#1D1D1F]"),
                                                        title: t(item.key),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                size: 17
                                                            }, void 0, false, {
                                                                fileName: "[project]/web/src/components/layout/Header.tsx",
                                                                lineNumber: 170,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "hidden xl:inline",
                                                                children: t(item.key)
                                                            }, void 0, false, {
                                                                fileName: "[project]/web/src/components/layout/Header.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, item.href, true, {
                                                        fileName: "[project]/web/src/components/layout/Header.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/layout/Header.tsx",
                                                lineNumber: 150,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: changeLanguage,
                                                className: actionButtonClass,
                                                "aria-label": languageActionLabel,
                                                title: languageTitle,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                    size: 17
                                                }, void 0, false, {
                                                    fileName: "[project]/web/src/components/layout/Header.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/layout/Header.tsx",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: user ? "/account" : "/auth/login",
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(actionButtonClass, user ? "border-primary/25 bg-primary/10 text-primary" : accountActive ? "border-slate-300 bg-slate-100 text-slate-900" : ""),
                                                "aria-label": accountLabel,
                                                title: t("nav.account"),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__["UserCircle2"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/web/src/components/layout/Header.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/layout/Header.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/cart",
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative inline-flex h-11 w-11 items-center justify-center rounded-[1.15rem] border bg-white/95 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft", cartActive ? "border-primary/30 bg-primary/5 text-primary" : "border-slate-200/80 text-slate-700 hover:border-primary/30 hover:text-[#1D1D1F]"),
                                                "aria-label": t("nav.cart"),
                                                title: t("nav.cart"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/layout/Header.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute -top-1 -end-1 min-w-5 rounded-full bg-primary px-1.5 py-0.5 text-center text-[11px] font-bold text-white",
                                                        children: totalItems
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/layout/Header.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web/src/components/layout/Header.tsx",
                                                lineNumber: 203,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/layout/Header.tsx",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/layout/Header.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$StorefrontSearchBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StorefrontSearchBar"], {
                                    value: searchValue,
                                    isRTL: isRTL,
                                    placeholder: t("nav.search"),
                                    variant: "header",
                                    onChange: setSearchValue,
                                    onClear: clearSearch,
                                    onSubmit: handleSearchSubmit
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/layout/Header.tsx",
                                    lineNumber: 225,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/layout/Header.tsx",
                                lineNumber: 224,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("overflow-hidden transition-[max-height,opacity,margin] duration-300 lg:hidden", isMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-2 border-t border-slate-100 pt-3",
                                    children: NAV_LINKS.map((item)=>{
                                        const Icon = item.icon;
                                        const active = isNavActive(pathname, item.href);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: item.href,
                                            onClick: ()=>setIsMenuOpen(false),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex min-h-11 items-center gap-3 rounded-[1.2rem] border px-4 text-sm font-medium transition", active ? "border-primary/30 bg-primary/5 text-primary" : "border-slate-200/80 bg-white/95 text-slate-600 hover:border-primary/30 hover:text-[#1D1D1F]"),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 17
                                                }, void 0, false, {
                                                    fileName: "[project]/web/src/components/layout/Header.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: t(item.key)
                                                }, void 0, false, {
                                                    fileName: "[project]/web/src/components/layout/Header.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, item.href, true, {
                                            fileName: "[project]/web/src/components/layout/Header.tsx",
                                            lineNumber: 248,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/layout/Header.tsx",
                                    lineNumber: 242,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/layout/Header.tsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/layout/Header.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/layout/Header.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 93,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/web/src/components/layout/Header.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
}),
"[project]/web/src/components/providers/Providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/SupabaseSessionProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Providers({ children, initialLanguage, initialSession }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        attribute: "class",
        defaultTheme: "light",
        enableSystem: false,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SupabaseSessionProvider"], {
            initialSession: initialSession,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StorefrontProvider"], {
                initialLanguage: initialLanguage,
                children: children
            }, void 0, false, {
                fileName: "[project]/web/src/components/providers/Providers.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/providers/Providers.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/web/src/components/providers/Providers.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7906fcad._.js.map