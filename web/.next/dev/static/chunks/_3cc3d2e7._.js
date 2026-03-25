(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/src/lib/storefront.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/components/providers/StorefrontProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StorefrontProvider",
    ()=>StorefrontProvider,
    "useStorefront",
    ()=>useStorefront
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/storefront.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const StorefrontContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function writeLanguage(language) {
    document.documentElement.lang = language;
    document.documentElement.dir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDirection"])(language);
    document.cookie = `${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANGUAGE_COOKIE"]}=${language}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANGUAGE_COOKIE"], language);
}
function StorefrontProvider(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(20);
    if ($[0] !== "3e86dd853c5145b9f85d1bcf4a4a98af627c16e727d521ff16d3960153e72b90") {
        for(let $i = 0; $i < 20; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "3e86dd853c5145b9f85d1bcf4a4a98af627c16e727d521ff16d3960153e72b90";
    }
    const { children, initialLanguage } = t0;
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialLanguage);
    let t1;
    let t2;
    if ($[1] !== language) {
        t1 = ({
            "StorefrontProvider[useEffect()]": ()=>{
                writeLanguage(language);
            }
        })["StorefrontProvider[useEffect()]"];
        t2 = [
            language
        ];
        $[1] = language;
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    let t3;
    if ($[4] !== language) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDirection"])(language);
        $[4] = language;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    const t4 = t3 === "rtl";
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = (nextLanguage)=>{
            setLanguageState(nextLanguage);
            writeLanguage(nextLanguage);
        };
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    let t7;
    let t8;
    if ($[7] !== language) {
        t6 = ()=>{
            const nextLanguage_0 = language === "ar" ? "en" : "ar";
            setLanguageState(nextLanguage_0);
            writeLanguage(nextLanguage_0);
        };
        t7 = (key)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translate"])(language, key);
        t8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMessages"])(language);
        $[7] = language;
        $[8] = t6;
        $[9] = t7;
        $[10] = t8;
    } else {
        t6 = $[8];
        t7 = $[9];
        t8 = $[10];
    }
    let t9;
    if ($[11] !== language || $[12] !== t4 || $[13] !== t6 || $[14] !== t7 || $[15] !== t8) {
        t9 = {
            language,
            isRTL: t4,
            setLanguage: t5,
            toggleLanguage: t6,
            t: t7,
            messages: t8
        };
        $[11] = language;
        $[12] = t4;
        $[13] = t6;
        $[14] = t7;
        $[15] = t8;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    const value = t9;
    let t10;
    if ($[17] !== children || $[18] !== value) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StorefrontContext.Provider, {
            value: value,
            children: children
        }, void 0, false, {
            fileName: "[project]/web/src/components/providers/StorefrontProvider.tsx",
            lineNumber: 116,
            columnNumber: 11
        }, this);
        $[17] = children;
        $[18] = value;
        $[19] = t10;
    } else {
        t10 = $[19];
    }
    return t10;
}
_s(StorefrontProvider, "c06CUi9KPR+T/oD1wqFcm1VcHoc=");
_c = StorefrontProvider;
function useStorefront() {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(1);
    if ($[0] !== "3e86dd853c5145b9f85d1bcf4a4a98af627c16e727d521ff16d3960153e72b90") {
        for(let $i = 0; $i < 1; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "3e86dd853c5145b9f85d1bcf4a4a98af627c16e727d521ff16d3960153e72b90";
    }
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(StorefrontContext);
    if (!context) {
        throw new Error("useStorefront must be used within StorefrontProvider");
    }
    return context;
}
_s1(useStorefront, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "StorefrontProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/constants/app.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/components/layout/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript) <export default as Facebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/app.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(50);
    if ($[0] !== "3d750ff8fcc314939e9e876740c9da47ada2aed966ea4fa1fd7b30cd5b6c117e") {
        for(let $i = 0; $i < 50; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "3d750ff8fcc314939e9e876740c9da47ada2aed966ea4fa1fd7b30cd5b6c117e";
    }
    const { isRTL, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = new Date().getFullYear();
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const year = t0;
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex h-11 w-11 items-center justify-center rounded-[1rem] bg-primary text-lg font-bold text-white shadow-button",
            children: "أ"
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 44,
            columnNumber: 10
        }, this);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const t2 = isRTL ? "\u0627\u0644\u0623\u0645\u0644 \u0633\u0646\u062A\u0631" : "Al Amal Center";
    let t3;
    if ($[3] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-semibold text-[#1D1D1F]",
            children: t2
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 52,
            columnNumber: 10
        }, this);
        $[3] = t2;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const t4 = isRTL ? "Al Amal Center" : "\u0627\u0644\u0623\u0645\u0644 \u0633\u0646\u062A\u0631";
    let t5;
    if ($[5] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-1 text-xs text-slate-500",
            children: t4
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 61,
            columnNumber: 10
        }, this);
        $[5] = t4;
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] !== t3 || $[8] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "inline-flex items-center gap-3 rounded-[1.6rem] bg-slate-50 px-3 py-3",
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-start",
                    children: [
                        t3,
                        t5
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 69,
                    columnNumber: 101
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 69,
            columnNumber: 10
        }, this);
        $[7] = t3;
        $[8] = t5;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== t) {
        t7 = t("footer.description");
        $[10] = t;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "max-w-xl text-sm leading-7 text-slate-500 text-start sm:text-base",
            children: t7
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 86,
            columnNumber: 10
        }, this);
        $[12] = t7;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] !== t6 || $[15] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-5",
            children: [
                t6,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 94,
            columnNumber: 10
        }, this);
        $[14] = t6;
        $[15] = t8;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] !== t) {
        t10 = t("footer.quickLinks");
        $[17] = t;
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    let t11;
    if ($[19] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: t10
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 111,
            columnNumber: 11
        }, this);
        $[19] = t10;
        $[20] = t11;
    } else {
        t11 = $[20];
    }
    let t12;
    if ($[21] !== t) {
        t12 = QUICK_LINKS.map({
            "Footer[QUICK_LINKS.map()]": (link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: link.href,
                    className: "text-sm text-slate-500 transition hover:text-[#1D1D1F]",
                    children: t(link.key)
                }, link.href, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 120,
                    columnNumber: 44
                }, this)
        }["Footer[QUICK_LINKS.map()]"]);
        $[21] = t;
        $[22] = t12;
    } else {
        t12 = $[22];
    }
    let t13;
    if ($[23] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-5 grid gap-3",
            children: t12
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 129,
            columnNumber: 11
        }, this);
        $[23] = t12;
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    let t14;
    if ($[25] !== t11 || $[26] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-start",
            children: [
                t11,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 137,
            columnNumber: 11
        }, this);
        $[25] = t11;
        $[26] = t13;
        $[27] = t14;
    } else {
        t14 = $[27];
    }
    let t15;
    if ($[28] !== t) {
        t15 = t("footer.contact");
        $[28] = t;
        $[29] = t15;
    } else {
        t15 = $[29];
    }
    let t16;
    if ($[30] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: t15
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 154,
            columnNumber: 11
        }, this);
        $[30] = t15;
        $[31] = t16;
    } else {
        t16 = $[31];
    }
    let t17;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_URL,
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex items-center gap-3 transition hover:text-[#1D1D1F]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 162,
                    columnNumber: 153
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_NUMBER
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 162,
                    columnNumber: 180
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 162,
            columnNumber: 11
        }, this);
        $[32] = t17;
    } else {
        t17 = $[32];
    }
    let t18;
    if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: `tel:${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_NUMBER}`,
            className: "inline-flex items-center gap-3 transition hover:text-[#1D1D1F]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 169,
                    columnNumber: 132
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_NUMBER
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 169,
                    columnNumber: 151
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 169,
            columnNumber: 11
        }, this);
        $[33] = t18;
    } else {
        t18 = $[33];
    }
    let t19;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].SUPPORT_EMAIL}`,
            className: "inline-flex items-center gap-3 transition hover:text-[#1D1D1F]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 176,
                    columnNumber: 133
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].SUPPORT_EMAIL
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 176,
                    columnNumber: 151
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 176,
            columnNumber: 11
        }, this);
        $[34] = t19;
    } else {
        t19 = $[34];
    }
    let t20;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].FACEBOOK_URL,
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-primary/30 hover:text-[#1D1D1F]",
            "aria-label": "Facebook",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"], {
                size: 17
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Footer.tsx",
                lineNumber: 183,
                columnNumber: 279
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 183,
            columnNumber: 11
        }, this);
        $[35] = t20;
    } else {
        t20 = $[35];
    }
    let t21;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-5 grid gap-4 text-sm text-slate-500",
            children: [
                t17,
                t18,
                t19,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 pt-2",
                    children: [
                        t20,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].INSTAGRAM_URL,
                            target: "_blank",
                            rel: "noreferrer",
                            className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-primary/30 hover:text-[#1D1D1F]",
                            "aria-label": "Instagram",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                size: 17
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/layout/Footer.tsx",
                                lineNumber: 190,
                                columnNumber: 403
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/layout/Footer.tsx",
                            lineNumber: 190,
                            columnNumber: 133
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 190,
                    columnNumber: 82
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 190,
            columnNumber: 11
        }, this);
        $[36] = t21;
    } else {
        t21 = $[36];
    }
    let t22;
    if ($[37] !== t16) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-start",
            children: [
                t16,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 197,
            columnNumber: 11
        }, this);
        $[37] = t16;
        $[38] = t22;
    } else {
        t22 = $[38];
    }
    let t23;
    if ($[39] !== t14 || $[40] !== t22 || $[41] !== t9) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.9fr]",
            children: [
                t9,
                t14,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 205,
            columnNumber: 11
        }, this);
        $[39] = t14;
        $[40] = t22;
        $[41] = t9;
        $[42] = t23;
    } else {
        t23 = $[42];
    }
    let t24;
    if ($[43] !== t) {
        t24 = t("footer.rights");
        $[43] = t;
        $[44] = t24;
    } else {
        t24 = $[44];
    }
    let t25;
    if ($[45] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 border-t border-slate-100 pt-5 text-sm text-slate-400 text-start",
            children: [
                year,
                " © Al Amal Center. ",
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 223,
            columnNumber: 11
        }, this);
        $[45] = t24;
        $[46] = t25;
    } else {
        t25 = $[46];
    }
    let t26;
    if ($[47] !== t23 || $[48] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
            className: "mt-16 pb-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-shell",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "soft-panel overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10",
                    children: [
                        t23,
                        t25
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 231,
                    columnNumber: 70
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Footer.tsx",
                lineNumber: 231,
                columnNumber: 42
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 231,
            columnNumber: 11
        }, this);
        $[47] = t23;
        $[48] = t25;
        $[49] = t26;
    } else {
        t26 = $[49];
    }
    return t26;
}
_s(Footer, "ImpUVj780cvtSpt4eGgxLPcJemE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"]
    ];
});
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/assets/icon.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/icon.20fff2bf.png");}),
"[project]/assets/icon.png.mjs { IMAGE => \"[project]/assets/icon.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/components/search/StorefrontSearchBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StorefrontSearchBar",
    ()=>StorefrontSearchBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function StorefrontSearchBar(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(44);
    if ($[0] !== "796b42f8f33edea938399d61686f9642094190d72026a55365086da2c2ec91e1") {
        for(let $i = 0; $i < 44; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "796b42f8f33edea938399d61686f9642094190d72026a55365086da2c2ec91e1";
    }
    const { value, isRTL, placeholder, helperText, pending: t1, variant: t2, className, onChange, onClear, onSubmit } = t0;
    const pending = t1 === undefined ? false : t1;
    const variant = t2 === undefined ? "page" : t2;
    let t3;
    if ($[1] !== value) {
        t3 = value.trim();
        $[1] = value;
        $[2] = t3;
    } else {
        t3 = $[2];
    }
    const hasValue = t3.length > 0;
    const clearLabel = isRTL ? "\u0645\u0633\u062D \u0627\u0644\u0628\u062D\u062B" : "Clear search";
    const submitLabel = isRTL ? "\u0628\u062D\u062B" : "Search";
    const shellClass = variant === "header" ? "rounded-[1.35rem] border border-white/75 bg-white/92 p-1 shadow-soft" : "rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94))] p-1.5 shadow-soft";
    const fieldHeightClass = variant === "header" ? "h-11" : "h-12";
    const submitClass = variant === "header" ? "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[1rem] bg-[#1D1D1F] px-4 text-sm font-medium text-white shadow-button transition hover:bg-primary" : "inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[1.2rem] bg-[#1D1D1F] px-4 text-sm font-medium text-white shadow-button transition hover:bg-primary";
    let t4;
    if ($[3] !== className) {
        t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full", className);
        $[3] = className;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            size: 17,
            className: "pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 start-4"
        }, void 0, false, {
            fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
            lineNumber: 65,
            columnNumber: 10
        }, this);
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    let t6;
    if ($[6] !== onChange) {
        t6 = ({
            "StorefrontSearchBar[<input>.onChange]": (event)=>onChange(event.target.value)
        })["StorefrontSearchBar[<input>.onChange]"];
        $[6] = onChange;
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    const t7 = hasValue && "pe-10";
    let t8;
    if ($[8] !== fieldHeightClass || $[9] !== t7) {
        t8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(fieldHeightClass, "w-full rounded-[1.1rem] border-0 bg-transparent text-sm text-[#1D1D1F] outline-none placeholder:text-slate-400 ps-11 text-start", t7);
        $[8] = fieldHeightClass;
        $[9] = t7;
        $[10] = t8;
    } else {
        t8 = $[10];
    }
    let t9;
    if ($[11] !== placeholder || $[12] !== t6 || $[13] !== t8 || $[14] !== value) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "search",
            name: "q",
            value: value,
            onChange: t6,
            placeholder: placeholder,
            autoComplete: "off",
            className: t8
        }, void 0, false, {
            fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
            lineNumber: 92,
            columnNumber: 10
        }, this);
        $[11] = placeholder;
        $[12] = t6;
        $[13] = t8;
        $[14] = value;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    let t10;
    if ($[16] !== clearLabel || $[17] !== hasValue || $[18] !== onClear) {
        t10 = hasValue ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onClear,
            className: "absolute top-1/2 end-2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700",
            "aria-label": clearLabel,
            title: clearLabel,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                size: 15
            }, void 0, false, {
                fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
                lineNumber: 103,
                columnNumber: 284
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
            lineNumber: 103,
            columnNumber: 22
        }, this) : null;
        $[16] = clearLabel;
        $[17] = hasValue;
        $[18] = onClear;
        $[19] = t10;
    } else {
        t10 = $[19];
    }
    let t11;
    if ($[20] !== t10 || $[21] !== t9) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative min-w-0 flex-1",
            children: [
                t5,
                t9,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
            lineNumber: 113,
            columnNumber: 11
        }, this);
        $[20] = t10;
        $[21] = t9;
        $[22] = t11;
    } else {
        t11 = $[22];
    }
    let t12;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
            lineNumber: 122,
            columnNumber: 11
        }, this);
        $[23] = t12;
    } else {
        t12 = $[23];
    }
    let t13;
    if ($[24] !== submitLabel) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "hidden sm:inline",
            children: submitLabel
        }, void 0, false, {
            fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
            lineNumber: 129,
            columnNumber: 11
        }, this);
        $[24] = submitLabel;
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] !== submitClass || $[27] !== submitLabel || $[28] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "submit",
            className: submitClass,
            "aria-label": submitLabel,
            title: submitLabel,
            children: [
                t12,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
            lineNumber: 137,
            columnNumber: 11
        }, this);
        $[26] = submitClass;
        $[27] = submitLabel;
        $[28] = t13;
        $[29] = t14;
    } else {
        t14 = $[29];
    }
    let t15;
    if ($[30] !== t11 || $[31] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                t11,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
            lineNumber: 147,
            columnNumber: 11
        }, this);
        $[30] = t11;
        $[31] = t14;
        $[32] = t15;
    } else {
        t15 = $[32];
    }
    let t16;
    if ($[33] !== shellClass || $[34] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: shellClass,
            children: t15
        }, void 0, false, {
            fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
            lineNumber: 156,
            columnNumber: 11
        }, this);
        $[33] = shellClass;
        $[34] = t15;
        $[35] = t16;
    } else {
        t16 = $[35];
    }
    let t17;
    if ($[36] !== helperText || $[37] !== pending) {
        t17 = helperText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-2 px-1 text-xs text-start", pending ? "text-primary" : "text-slate-500"),
            children: helperText
        }, void 0, false, {
            fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
            lineNumber: 165,
            columnNumber: 24
        }, this) : null;
        $[36] = helperText;
        $[37] = pending;
        $[38] = t17;
    } else {
        t17 = $[38];
    }
    let t18;
    if ($[39] !== onSubmit || $[40] !== t16 || $[41] !== t17 || $[42] !== t4) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: onSubmit,
            className: t4,
            children: [
                t16,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/search/StorefrontSearchBar.tsx",
            lineNumber: 174,
            columnNumber: 11
        }, this);
        $[39] = onSubmit;
        $[40] = t16;
        $[41] = t17;
        $[42] = t4;
        $[43] = t18;
    } else {
        t18 = $[43];
    }
    return t18;
}
_c = StorefrontSearchBar;
var _c;
__turbopack_context__.k.register(_c, "StorefrontSearchBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/components/search/useCatalogSearch.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCatalogSearch",
    ()=>useCatalogSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useCatalogSearch(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(31);
    if ($[0] !== "8bfcf47c7486a4004ece63b4202737825d6bcdf96938df983d2a06064c5b1c65") {
        for(let $i = 0; $i < 31; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8bfcf47c7486a4004ece63b4202737825d6bcdf96938df983d2a06064c5b1c65";
    }
    const { pathname, router, searchParams, autoSyncOnProducts: t1 } = t0;
    const autoSyncOnProducts = t1 === undefined ? true : t1;
    let t2;
    if ($[1] !== searchParams) {
        t2 = searchParams.get("q") ?? "";
        $[1] = searchParams;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const currentQuery = t2;
    const [searchValue, setSearchValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentQuery);
    const deferredSearchValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeferredValue"])(searchValue);
    const [isSearchPending, startSearchTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    let t3;
    let t4;
    if ($[3] !== currentQuery) {
        t3 = ({
            "useCatalogSearch[useEffect()]": ()=>{
                setSearchValue(currentQuery);
            }
        })["useCatalogSearch[useEffect()]"];
        t4 = [
            currentQuery
        ];
        $[3] = currentQuery;
        $[4] = t3;
        $[5] = t4;
    } else {
        t3 = $[4];
        t4 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    let t5;
    if ($[6] !== pathname || $[7] !== searchParams) {
        t5 = ({
            "useCatalogSearch[buildSearchHref]": (value)=>{
                const normalized = value.trim();
                const params = pathname === "/products" ? new URLSearchParams(searchParams.toString()) : new URLSearchParams();
                if (normalized) {
                    params.set("q", normalized);
                } else {
                    params.delete("q");
                }
                const query = params.toString();
                return query ? `/products?${query}` : "/products";
            }
        })["useCatalogSearch[buildSearchHref]"];
        $[6] = pathname;
        $[7] = searchParams;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    const buildSearchHref = t5;
    let t6;
    let t7;
    if ($[9] !== autoSyncOnProducts || $[10] !== buildSearchHref || $[11] !== currentQuery || $[12] !== deferredSearchValue || $[13] !== pathname || $[14] !== router) {
        t6 = ({
            "useCatalogSearch[useEffect()]": ()=>{
                if (!autoSyncOnProducts || pathname !== "/products") {
                    return;
                }
                const normalized_0 = deferredSearchValue.trim();
                if (normalized_0 === currentQuery) {
                    return;
                }
                startSearchTransition({
                    "useCatalogSearch[useEffect() > startSearchTransition()]": ()=>{
                        router.replace(buildSearchHref(normalized_0), {
                            scroll: false
                        });
                    }
                }["useCatalogSearch[useEffect() > startSearchTransition()]"]);
            }
        })["useCatalogSearch[useEffect()]"];
        t7 = [
            autoSyncOnProducts,
            buildSearchHref,
            currentQuery,
            deferredSearchValue,
            pathname,
            router
        ];
        $[9] = autoSyncOnProducts;
        $[10] = buildSearchHref;
        $[11] = currentQuery;
        $[12] = deferredSearchValue;
        $[13] = pathname;
        $[14] = router;
        $[15] = t6;
        $[16] = t7;
    } else {
        t6 = $[15];
        t7 = $[16];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t6, t7);
    let t8;
    if ($[17] !== buildSearchHref || $[18] !== router || $[19] !== searchValue) {
        t8 = function submitSearch(event) {
            event.preventDefault();
            startSearchTransition({
                "useCatalogSearch[submitSearch > startSearchTransition()]": ()=>{
                    router.push(buildSearchHref(searchValue));
                }
            }["useCatalogSearch[submitSearch > startSearchTransition()]"]);
        };
        $[17] = buildSearchHref;
        $[18] = router;
        $[19] = searchValue;
        $[20] = t8;
    } else {
        t8 = $[20];
    }
    const submitSearch = t8;
    let t9;
    if ($[21] !== buildSearchHref || $[22] !== pathname || $[23] !== router) {
        t9 = function clearSearch() {
            setSearchValue("");
            if (pathname === "/products") {
                startSearchTransition({
                    "useCatalogSearch[clearSearch > startSearchTransition()]": ()=>{
                        router.replace(buildSearchHref(""), {
                            scroll: false
                        });
                    }
                }["useCatalogSearch[clearSearch > startSearchTransition()]"]);
            }
        };
        $[21] = buildSearchHref;
        $[22] = pathname;
        $[23] = router;
        $[24] = t9;
    } else {
        t9 = $[24];
    }
    const clearSearch = t9;
    let t10;
    if ($[25] !== buildSearchHref || $[26] !== clearSearch || $[27] !== isSearchPending || $[28] !== searchValue || $[29] !== submitSearch) {
        t10 = {
            searchValue,
            setSearchValue,
            isSearchPending,
            submitSearch,
            clearSearch,
            buildSearchHref
        };
        $[25] = buildSearchHref;
        $[26] = clearSearch;
        $[27] = isSearchPending;
        $[28] = searchValue;
        $[29] = submitSearch;
        $[30] = t10;
    } else {
        t10 = $[30];
    }
    return t10;
}
_s(useCatalogSearch, "ab7Ky4/tsCJhmJJo/wGLyKJxh/E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeferredValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBrowserSupabaseClient",
    ()=>createBrowserSupabaseClient,
    "createServerSupabaseClient",
    ()=>createServerSupabaseClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-client] (ecmascript)");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://asxynodsnmrymmdspprn.supabase.co") || "https://placeholder.supabase.co";
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzeHlub2Rzbm1yeW1tZHNwcHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNDEyNDAsImV4cCI6MjA4MTcxNzI0MH0.glHB2rP9CaqD5uQqt_P3Ky3c4ApyLPLvIQ3-OUZQHK4") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.KX_2";
function createBrowserSupabaseClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(supabaseUrl, supabaseAnonKey);
}
async function createServerSupabaseClient() {
    const { cookies } = await __turbopack_context__.A("[project]/web/node_modules/next/headers.js [app-client] (ecmascript, async loader)");
    const cookieStore = await cookies();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerClient"])(supabaseUrl, supabaseAnonKey, {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/components/providers/SupabaseSessionProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SupabaseSessionProvider",
    ()=>SupabaseSessionProvider,
    "useSupabaseSession",
    ()=>useSupabaseSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const SupabaseSessionContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function SupabaseSessionProvider(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(12);
    if ($[0] !== "1ce72d91638a344101ec7fce280fdf6ae99583649b31704cd6b2c785b2af84d7") {
        for(let $i = 0; $i < 12; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1ce72d91638a344101ec7fce280fdf6ae99583649b31704cd6b2c785b2af84d7";
    }
    const { children, initialSession } = t0;
    const [supabase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(_SupabaseSessionProviderUseState);
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialSession);
    let t1;
    if ($[1] !== supabase.auth) {
        t1 = ({
            "SupabaseSessionProvider[useEffect()]": ()=>{
                const { data: t2 } = supabase.auth.onAuthStateChange({
                    "SupabaseSessionProvider[useEffect() > supabase.auth.onAuthStateChange()]": (_event, nextSession)=>{
                        setSession(nextSession);
                    }
                }["SupabaseSessionProvider[useEffect() > supabase.auth.onAuthStateChange()]"]);
                const { subscription } = t2;
                supabase.auth.getSession().then({
                    "SupabaseSessionProvider[useEffect() > (anonymous)()]": (t3)=>{
                        const { data } = t3;
                        if (data.session) {
                            setSession(data.session);
                        }
                    }
                }["SupabaseSessionProvider[useEffect() > (anonymous)()]"]);
                return ()=>{
                    subscription.unsubscribe();
                };
            }
        })["SupabaseSessionProvider[useEffect()]"];
        $[1] = supabase.auth;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== supabase) {
        t2 = [
            supabase
        ];
        $[3] = supabase;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    const t3 = session?.user ?? null;
    let t4;
    if ($[5] !== session || $[6] !== supabase || $[7] !== t3) {
        t4 = {
            supabase,
            session,
            user: t3
        };
        $[5] = session;
        $[6] = supabase;
        $[7] = t3;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] !== children || $[10] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SupabaseSessionContext.Provider, {
            value: t4,
            children: children
        }, void 0, false, {
            fileName: "[project]/web/src/components/providers/SupabaseSessionProvider.tsx",
            lineNumber: 92,
            columnNumber: 10
        }, this);
        $[9] = children;
        $[10] = t4;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    return t5;
}
_s(SupabaseSessionProvider, "ADII83aak+dFagR7mPKaGfdFoFc=");
_c = SupabaseSessionProvider;
function _SupabaseSessionProviderUseState() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserSupabaseClient"])();
}
function useSupabaseSession() {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(1);
    if ($[0] !== "1ce72d91638a344101ec7fce280fdf6ae99583649b31704cd6b2c785b2af84d7") {
        for(let $i = 0; $i < 1; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1ce72d91638a344101ec7fce280fdf6ae99583649b31704cd6b2c785b2af84d7";
    }
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SupabaseSessionContext);
    if (!context) {
        throw new Error("useSupabaseSession must be used within SupabaseSessionProvider");
    }
    return context;
}
_s1(useSupabaseSession, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "SupabaseSessionProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/store/cart.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCartStore",
    ()=>useCartStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/zustand/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
"use client";
;
;
function calculateTotals(items) {
    return {
        totalItems: items.reduce((sum, item)=>sum + item.quantity, 0),
        totalIQD: items.reduce((sum, item)=>sum + item.product.price_iqd * item.quantity, 0)
    };
}
const useCartStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
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
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage),
    onRehydrateStorage: ()=>(state)=>{
            if (!state) {
                return;
            }
            Object.assign(state, calculateTotals(state.items));
        }
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/components/layout/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$assets$2f$icon$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$assets$2f$icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/assets/icon.png.mjs { IMAGE => "[project]/assets/icon.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__House$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as House>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/circle-user-round.js [app-client] (ecmascript) <export default as UserCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$StorefrontSearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/search/StorefrontSearchBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$useCatalogSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/search/useCatalogSearch.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/SupabaseSessionProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/store/cart.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__House$3e$__["House"]
    },
    {
        href: "/products",
        key: "nav.products",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"]
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
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(105);
    if ($[0] !== "3a6be9e33c1574716e8aee11d45c939336bed48211de967977df331e24c7861f") {
        for(let $i = 0; $i < 105; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "3a6be9e33c1574716e8aee11d45c939336bed48211de967977df331e24c7861f";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseSession"])();
    const { isRTL, language, t, toggleLanguage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    const totalItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])(_HeaderUseCartStore);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] !== pathname || $[2] !== router || $[3] !== searchParams) {
        t0 = {
            pathname,
            router,
            searchParams
        };
        $[1] = pathname;
        $[2] = router;
        $[3] = searchParams;
        $[4] = t0;
    } else {
        t0 = $[4];
    }
    const { searchValue, setSearchValue, submitSearch, clearSearch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$useCatalogSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCatalogSearch"])(t0);
    const cartActive = pathname === "/cart";
    const accountActive = pathname.startsWith("/account") || pathname.startsWith("/auth");
    const languageTitle = language === "ar" ? "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" : "English";
    const languageActionLabel = language === "ar" ? "\u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629" : "Switch to Arabic";
    let t1;
    if ($[5] !== t || $[6] !== user) {
        t1 = user ? t("nav.account") : t("nav.login");
        $[5] = t;
        $[6] = user;
        $[7] = t1;
    } else {
        t1 = $[7];
    }
    const accountLabel = t1;
    let t2;
    if ($[8] !== submitSearch) {
        t2 = function handleSearchSubmit(event) {
            setIsMenuOpen(false);
            submitSearch(event);
        };
        $[8] = submitSearch;
        $[9] = t2;
    } else {
        t2 = $[9];
    }
    const handleSearchSubmit = t2;
    let t3;
    if ($[10] !== router || $[11] !== toggleLanguage) {
        t3 = function changeLanguage() {
            toggleLanguage();
            setIsMenuOpen(false);
            router.refresh();
        };
        $[10] = router;
        $[11] = toggleLanguage;
        $[12] = t3;
    } else {
        t3 = $[12];
    }
    const changeLanguage = t3;
    let t4;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pointer-events-none absolute inset-x-10 top-0 h-16 bg-[radial-gradient(circle_at_top,rgba(46,125,50,0.14),rgba(255,179,0,0.06)_42%,transparent_74%)] blur-3xl"
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 124,
            columnNumber: 10
        }, this);
        $[13] = t4;
    } else {
        t4 = $[13];
    }
    let t5;
    let t6;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "Header[<button>.onClick]": ()=>setIsMenuOpen(_HeaderButtonOnClickSetIsMenuOpen)
        })["Header[<button>.onClick]"];
        t6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(actionButtonClass, "lg:hidden");
        $[14] = t5;
        $[15] = t6;
    } else {
        t5 = $[14];
        t6 = $[15];
    }
    let t7;
    if ($[16] !== t) {
        t7 = t("nav.menu");
        $[16] = t;
        $[17] = t7;
    } else {
        t7 = $[17];
    }
    let t8;
    if ($[18] !== t) {
        t8 = t("nav.menu");
        $[18] = t;
        $[19] = t8;
    } else {
        t8 = $[19];
    }
    let t9;
    if ($[20] !== isMenuOpen) {
        t9 = isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 160,
            columnNumber: 23
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 160,
            columnNumber: 41
        }, this);
        $[20] = isMenuOpen;
        $[21] = t9;
    } else {
        t9 = $[21];
    }
    let t10;
    if ($[22] !== isMenuOpen || $[23] !== t7 || $[24] !== t8 || $[25] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t5,
            className: t6,
            "aria-label": t7,
            "aria-expanded": isMenuOpen,
            title: t8,
            children: t9
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 168,
            columnNumber: 11
        }, this);
        $[22] = isMenuOpen;
        $[23] = t7;
        $[24] = t8;
        $[25] = t9;
        $[26] = t10;
    } else {
        t10 = $[26];
    }
    let t11;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/",
            className: "inline-flex min-w-0 items-center gap-3 rounded-[1.2rem] border border-white/80 bg-white/95 px-3 py-1.5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-premium",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: __TURBOPACK__imported__module__$5b$project$5d2f$assets$2f$icon$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$assets$2f$icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                        alt: "\u0627\u0644\u0623\u0645\u0644 \u0633\u0646\u062A\u0631",
                        fill: true,
                        priority: true,
                        sizes: "36px",
                        className: "object-cover scale-[1.9]"
                    }, void 0, false, {
                        fileName: "[project]/web/src/components/layout/Header.tsx",
                        lineNumber: 179,
                        columnNumber: 337
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 179,
                    columnNumber: 221
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "min-w-0 truncate text-sm font-semibold text-[#1D1D1F] sm:text-base",
                    children: "الأمل سنتر"
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 179,
                    columnNumber: 509
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 179,
            columnNumber: 11
        }, this);
        $[27] = t11;
    } else {
        t11 = $[27];
    }
    let t12;
    if ($[28] !== t10) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-w-0 items-center gap-2.5",
            children: [
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 186,
            columnNumber: 11
        }, this);
        $[28] = t10;
        $[29] = t12;
    } else {
        t12 = $[29];
    }
    let t13;
    if ($[30] !== t) {
        t13 = t("nav.search");
        $[30] = t;
        $[31] = t13;
    } else {
        t13 = $[31];
    }
    let t14;
    if ($[32] !== clearSearch || $[33] !== handleSearchSubmit || $[34] !== isRTL || $[35] !== searchValue || $[36] !== setSearchValue || $[37] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden min-w-0 flex-1 px-1 lg:block",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-[40rem]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$StorefrontSearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorefrontSearchBar"], {
                    value: searchValue,
                    isRTL: isRTL,
                    placeholder: t13,
                    variant: "header",
                    onChange: setSearchValue,
                    onClear: clearSearch,
                    onSubmit: handleSearchSubmit
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 202,
                    columnNumber: 110
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Header.tsx",
                lineNumber: 202,
                columnNumber: 64
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 202,
            columnNumber: 11
        }, this);
        $[32] = clearSearch;
        $[33] = handleSearchSubmit;
        $[34] = isRTL;
        $[35] = searchValue;
        $[36] = setSearchValue;
        $[37] = t13;
        $[38] = t14;
    } else {
        t14 = $[38];
    }
    let t15;
    if ($[39] !== pathname || $[40] !== t) {
        t15 = NAV_LINKS.map({
            "Header[NAV_LINKS.map()]": (item)=>{
                const Icon = item.icon;
                const active = isNavActive(pathname, item.href);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: item.href,
                    "aria-current": active ? "page" : undefined,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-11 items-center gap-2 rounded-[1.1rem] border px-3 text-sm font-medium transition", active ? "border-[#1D1D1F] bg-[#1D1D1F] text-white shadow-soft" : "border-slate-200/80 bg-white/95 text-slate-600 hover:border-primary/30 hover:text-[#1D1D1F]"),
                    title: t(item.key),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            size: 17
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/layout/Header.tsx",
                            lineNumber: 219,
                            columnNumber: 393
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "hidden xl:inline",
                            children: t(item.key)
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/layout/Header.tsx",
                            lineNumber: 219,
                            columnNumber: 411
                        }, this)
                    ]
                }, item.href, true, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 219,
                    columnNumber: 16
                }, this);
            }
        }["Header[NAV_LINKS.map()]"]);
        $[39] = pathname;
        $[40] = t;
        $[41] = t15;
    } else {
        t15 = $[41];
    }
    let t16;
    if ($[42] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "hidden items-center gap-2 lg:flex",
            children: t15
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 230,
            columnNumber: 11
        }, this);
        $[42] = t15;
        $[43] = t16;
    } else {
        t16 = $[43];
    }
    let t17;
    if ($[44] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
            size: 17
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 238,
            columnNumber: 11
        }, this);
        $[44] = t17;
    } else {
        t17 = $[44];
    }
    let t18;
    if ($[45] !== changeLanguage || $[46] !== languageActionLabel || $[47] !== languageTitle) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: changeLanguage,
            className: actionButtonClass,
            "aria-label": languageActionLabel,
            title: languageTitle,
            children: t17
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 245,
            columnNumber: 11
        }, this);
        $[45] = changeLanguage;
        $[46] = languageActionLabel;
        $[47] = languageTitle;
        $[48] = t18;
    } else {
        t18 = $[48];
    }
    const t19 = user ? "/account" : "/auth/login";
    const t20 = user ? "border-primary/25 bg-primary/10 text-primary" : accountActive ? "border-slate-300 bg-slate-100 text-slate-900" : "";
    let t21;
    if ($[49] !== t20) {
        t21 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(actionButtonClass, t20);
        $[49] = t20;
        $[50] = t21;
    } else {
        t21 = $[50];
    }
    let t22;
    if ($[51] !== t) {
        t22 = t("nav.account");
        $[51] = t;
        $[52] = t22;
    } else {
        t22 = $[52];
    }
    let t23;
    if ($[53] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__["UserCircle2"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 273,
            columnNumber: 11
        }, this);
        $[53] = t23;
    } else {
        t23 = $[53];
    }
    let t24;
    if ($[54] !== accountLabel || $[55] !== t19 || $[56] !== t21 || $[57] !== t22) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: t19,
            className: t21,
            "aria-label": accountLabel,
            title: t22,
            children: t23
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 280,
            columnNumber: 11
        }, this);
        $[54] = accountLabel;
        $[55] = t19;
        $[56] = t21;
        $[57] = t22;
        $[58] = t24;
    } else {
        t24 = $[58];
    }
    const t25 = cartActive ? "border-primary/30 bg-primary/5 text-primary" : "border-slate-200/80 text-slate-700 hover:border-primary/30 hover:text-[#1D1D1F]";
    let t26;
    if ($[59] !== t25) {
        t26 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative inline-flex h-11 w-11 items-center justify-center rounded-[1.15rem] border bg-white/95 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft", t25);
        $[59] = t25;
        $[60] = t26;
    } else {
        t26 = $[60];
    }
    let t27;
    if ($[61] !== t) {
        t27 = t("nav.cart");
        $[61] = t;
        $[62] = t27;
    } else {
        t27 = $[62];
    }
    let t28;
    if ($[63] !== t) {
        t28 = t("nav.cart");
        $[63] = t;
        $[64] = t28;
    } else {
        t28 = $[64];
    }
    let t29;
    if ($[65] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 316,
            columnNumber: 11
        }, this);
        $[65] = t29;
    } else {
        t29 = $[65];
    }
    let t30;
    if ($[66] !== totalItems) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "absolute -top-1 -end-1 min-w-5 rounded-full bg-primary px-1.5 py-0.5 text-center text-[11px] font-bold text-white",
            children: totalItems
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 323,
            columnNumber: 11
        }, this);
        $[66] = totalItems;
        $[67] = t30;
    } else {
        t30 = $[67];
    }
    let t31;
    if ($[68] !== t26 || $[69] !== t27 || $[70] !== t28 || $[71] !== t30) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/cart",
            className: t26,
            "aria-label": t27,
            title: t28,
            children: [
                t29,
                t30
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 331,
            columnNumber: 11
        }, this);
        $[68] = t26;
        $[69] = t27;
        $[70] = t28;
        $[71] = t30;
        $[72] = t31;
    } else {
        t31 = $[72];
    }
    let t32;
    if ($[73] !== t16 || $[74] !== t18 || $[75] !== t24 || $[76] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex shrink-0 items-center gap-2",
            children: [
                t16,
                t18,
                t24,
                t31
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 342,
            columnNumber: 11
        }, this);
        $[73] = t16;
        $[74] = t18;
        $[75] = t24;
        $[76] = t31;
        $[77] = t32;
    } else {
        t32 = $[77];
    }
    let t33;
    if ($[78] !== t12 || $[79] !== t14 || $[80] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between gap-2.5",
            children: [
                t12,
                t14,
                t32
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 353,
            columnNumber: 11
        }, this);
        $[78] = t12;
        $[79] = t14;
        $[80] = t32;
        $[81] = t33;
    } else {
        t33 = $[81];
    }
    let t34;
    if ($[82] !== t) {
        t34 = t("nav.search");
        $[82] = t;
        $[83] = t34;
    } else {
        t34 = $[83];
    }
    let t35;
    if ($[84] !== clearSearch || $[85] !== handleSearchSubmit || $[86] !== isRTL || $[87] !== searchValue || $[88] !== setSearchValue || $[89] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "lg:hidden",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$StorefrontSearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorefrontSearchBar"], {
                value: searchValue,
                isRTL: isRTL,
                placeholder: t34,
                variant: "header",
                onChange: setSearchValue,
                onClear: clearSearch,
                onSubmit: handleSearchSubmit
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Header.tsx",
                lineNumber: 371,
                columnNumber: 38
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 371,
            columnNumber: 11
        }, this);
        $[84] = clearSearch;
        $[85] = handleSearchSubmit;
        $[86] = isRTL;
        $[87] = searchValue;
        $[88] = setSearchValue;
        $[89] = t34;
        $[90] = t35;
    } else {
        t35 = $[90];
    }
    const t36 = isMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0";
    let t37;
    if ($[91] !== t36) {
        t37 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("overflow-hidden transition-[max-height,opacity,margin] duration-300 lg:hidden", t36);
        $[91] = t36;
        $[92] = t37;
    } else {
        t37 = $[92];
    }
    let t38;
    if ($[93] !== pathname || $[94] !== t) {
        t38 = NAV_LINKS.map({
            "Header[NAV_LINKS.map()]": (item_0)=>{
                const Icon_0 = item_0.icon;
                const active_0 = isNavActive(pathname, item_0.href);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: item_0.href,
                    onClick: {
                        "Header[NAV_LINKS.map() > <Link>.onClick]": ()=>setIsMenuOpen(false)
                    }["Header[NAV_LINKS.map() > <Link>.onClick]"],
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex min-h-11 items-center gap-3 rounded-[1.2rem] border px-4 text-sm font-medium transition", active_0 ? "border-primary/30 bg-primary/5 text-primary" : "border-slate-200/80 bg-white/95 text-slate-600 hover:border-primary/30 hover:text-[#1D1D1F]"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon_0, {
                            size: 17
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/layout/Header.tsx",
                            lineNumber: 399,
                            columnNumber: 321
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: t(item_0.key)
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/layout/Header.tsx",
                            lineNumber: 399,
                            columnNumber: 341
                        }, this)
                    ]
                }, item_0.href, true, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 397,
                    columnNumber: 16
                }, this);
            }
        }["Header[NAV_LINKS.map()]"]);
        $[93] = pathname;
        $[94] = t;
        $[95] = t38;
    } else {
        t38 = $[95];
    }
    let t39;
    if ($[96] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-2 border-t border-slate-100 pt-3",
            children: t38
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 410,
            columnNumber: 11
        }, this);
        $[96] = t38;
        $[97] = t39;
    } else {
        t39 = $[97];
    }
    let t40;
    if ($[98] !== t37 || $[99] !== t39) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t37,
            children: t39
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 418,
            columnNumber: 11
        }, this);
        $[98] = t37;
        $[99] = t39;
        $[100] = t40;
    } else {
        t40 = $[100];
    }
    let t41;
    if ($[101] !== t33 || $[102] !== t35 || $[103] !== t40) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "sticky top-0 z-50 px-4 pt-2 sm:px-6 sm:pt-3 lg:px-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-7xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative overflow-hidden rounded-[1.65rem] border border-white/80 bg-white/72 px-3 py-2.5 shadow-soft backdrop-blur-2xl sm:px-4 sm:py-3 lg:px-5",
                    children: [
                        t4,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative space-y-2",
                            children: [
                                t33,
                                t35,
                                t40
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/src/components/layout/Header.tsx",
                            lineNumber: 427,
                            columnNumber: 290
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 427,
                    columnNumber: 125
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Header.tsx",
                lineNumber: 427,
                columnNumber: 83
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 427,
            columnNumber: 11
        }, this);
        $[101] = t33;
        $[102] = t35;
        $[103] = t40;
        $[104] = t41;
    } else {
        t41 = $[104];
    }
    return t41;
}
_s(Header, "zleMwD6ealg0wPfKqQQsHiYp1FQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$useCatalogSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCatalogSearch"]
    ];
});
_c = Header;
function _HeaderButtonOnClickSetIsMenuOpen(current) {
    return !current;
}
function _HeaderUseCartStore(state) {
    return state.totalItems;
}
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/components/providers/Providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/SupabaseSessionProvider.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function Providers(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "eb2097fbd8a5a0807970ca4a66ce95b445ffc67b7c410160b7ca4fdbfb8a4641") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "eb2097fbd8a5a0807970ca4a66ce95b445ffc67b7c410160b7ca4fdbfb8a4641";
    }
    const { children, initialLanguage, initialSession } = t0;
    let t1;
    if ($[1] !== children || $[2] !== initialLanguage) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorefrontProvider"], {
            initialLanguage: initialLanguage,
            children: children
        }, void 0, false, {
            fileName: "[project]/web/src/components/providers/Providers.tsx",
            lineNumber: 30,
            columnNumber: 10
        }, this);
        $[1] = children;
        $[2] = initialLanguage;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    let t2;
    if ($[4] !== initialSession || $[5] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
            attribute: "class",
            defaultTheme: "light",
            enableSystem: false,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SupabaseSessionProvider"], {
                initialSession: initialSession,
                children: t1
            }, void 0, false, {
                fileName: "[project]/web/src/components/providers/Providers.tsx",
                lineNumber: 39,
                columnNumber: 85
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/providers/Providers.tsx",
            lineNumber: 39,
            columnNumber: 10
        }, this);
        $[4] = initialSession;
        $[5] = t1;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    return t2;
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_3cc3d2e7._.js.map