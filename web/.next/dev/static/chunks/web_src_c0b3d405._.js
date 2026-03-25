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
            ar: "بطاقة",
            en: "Card"
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
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__House$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as House>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/circle-user-round.js [app-client] (ecmascript) <export default as UserCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-client] (ecmascript)");
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
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(191);
    if ($[0] !== "10c6ec80781dcbe8321544bc49fc0996d3edad416a0a46d051ab85a1147a1eb0") {
        for(let $i = 0; $i < 191; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "10c6ec80781dcbe8321544bc49fc0996d3edad416a0a46d051ab85a1147a1eb0";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseSession"])();
    const { isRTL, t, toggleLanguage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    const totalItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])(_HeaderUseCartStore);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const cartActive = pathname === "/cart";
    const accountActive = pathname.startsWith("/account") || pathname.startsWith("/auth");
    let t0;
    if ($[1] !== router) {
        t0 = function submitSearch(event) {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const trimmed = String(formData.get("q") ?? "").trim();
            setIsMenuOpen(false);
            router.push(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products");
        };
        $[1] = router;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    const submitSearch = t0;
    let t1;
    if ($[3] !== router || $[4] !== toggleLanguage) {
        t1 = function changeLanguage() {
            toggleLanguage();
            setIsMenuOpen(false);
            router.refresh();
        };
        $[3] = router;
        $[4] = toggleLanguage;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    const changeLanguage = t1;
    const t2 = isRTL && "flex-row-reverse";
    let t3;
    if ($[6] !== t2) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3", t2);
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    let t4;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "Header[<button>.onClick]": ()=>setIsMenuOpen(_HeaderButtonOnClickSetIsMenuOpen)
        })["Header[<button>.onClick]"];
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] !== t) {
        t5 = t("nav.menu");
        $[9] = t;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] !== isMenuOpen) {
        t6 = isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 115,
            columnNumber: 23
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 115,
            columnNumber: 41
        }, this);
        $[11] = isMenuOpen;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] !== t5 || $[14] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t4,
            className: "inline-flex h-12 w-12 items-center justify-center rounded-[1.25rem] border border-slate-200 bg-white text-slate-700 transition hover:border-primary/30 hover:text-[#1D1D1F] lg:hidden",
            "aria-label": t5,
            children: t6
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 123,
            columnNumber: 10
        }, this);
        $[13] = t5;
        $[14] = t6;
        $[15] = t7;
    } else {
        t7 = $[15];
    }
    const t8 = isRTL && "flex-row-reverse";
    let t9;
    if ($[16] !== t8) {
        t9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-3 rounded-[1.6rem] bg-white px-3 py-2 shadow-soft", t8);
        $[16] = t8;
        $[17] = t9;
    } else {
        t9 = $[17];
    }
    let t10;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex h-11 w-11 items-center justify-center rounded-[1rem] bg-primary text-lg font-bold text-white shadow-button",
            children: "أ"
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 141,
            columnNumber: 11
        }, this);
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    const t11 = isRTL ? "text-right" : "text-left";
    let t12;
    if ($[19] !== t11) {
        t12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-tight", t11);
        $[19] = t11;
        $[20] = t12;
    } else {
        t12 = $[20];
    }
    const t13 = isRTL ? "\u0627\u0644\u0623\u0645\u0644 \u0633\u0646\u062A\u0631" : "Al Amal Center";
    let t14;
    if ($[21] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "block text-sm font-semibold text-[#1D1D1F]",
            children: t13
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 158,
            columnNumber: 11
        }, this);
        $[21] = t13;
        $[22] = t14;
    } else {
        t14 = $[22];
    }
    const t15 = isRTL ? "Al Amal Center" : "\u0627\u0644\u0623\u0645\u0644 \u0633\u0646\u062A\u0631";
    let t16;
    if ($[23] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "mt-1 block text-xs text-slate-500",
            children: t15
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 167,
            columnNumber: 11
        }, this);
        $[23] = t15;
        $[24] = t16;
    } else {
        t16 = $[24];
    }
    let t17;
    if ($[25] !== t12 || $[26] !== t14 || $[27] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t12,
            children: [
                t14,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 175,
            columnNumber: 11
        }, this);
        $[25] = t12;
        $[26] = t14;
        $[27] = t16;
        $[28] = t17;
    } else {
        t17 = $[28];
    }
    let t18;
    if ($[29] !== t17 || $[30] !== t9) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/",
            className: t9,
            children: [
                t10,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 185,
            columnNumber: 11
        }, this);
        $[29] = t17;
        $[30] = t9;
        $[31] = t18;
    } else {
        t18 = $[31];
    }
    let t19;
    if ($[32] !== t18 || $[33] !== t3 || $[34] !== t7) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            children: [
                t7,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 194,
            columnNumber: 11
        }, this);
        $[32] = t18;
        $[33] = t3;
        $[34] = t7;
        $[35] = t19;
    } else {
        t19 = $[35];
    }
    const t20 = isRTL ? "right-5" : "left-5";
    let t21;
    if ($[36] !== t20) {
        t21 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400", t20);
        $[36] = t20;
        $[37] = t21;
    } else {
        t21 = $[37];
    }
    let t22;
    if ($[38] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            size: 18,
            className: t21
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 213,
            columnNumber: 11
        }, this);
        $[38] = t21;
        $[39] = t22;
    } else {
        t22 = $[39];
    }
    let t23;
    if ($[40] !== searchParams) {
        t23 = searchParams.get("q") ?? "";
        $[40] = searchParams;
        $[41] = t23;
    } else {
        t23 = $[41];
    }
    const t24 = `${pathname}-${t23}-desktop`;
    let t25;
    if ($[42] !== searchParams) {
        t25 = searchParams.get("q") ?? "";
        $[42] = searchParams;
        $[43] = t25;
    } else {
        t25 = $[43];
    }
    let t26;
    if ($[44] !== t) {
        t26 = t("nav.search");
        $[44] = t;
        $[45] = t26;
    } else {
        t26 = $[45];
    }
    const t27 = isRTL ? "pr-14 text-right" : "pl-14 text-left";
    let t28;
    if ($[46] !== t27) {
        t28 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("field-input bg-white/90", t27);
        $[46] = t27;
        $[47] = t28;
    } else {
        t28 = $[47];
    }
    let t29;
    if ($[48] !== t24 || $[49] !== t25 || $[50] !== t26 || $[51] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            name: "q",
            defaultValue: t25,
            placeholder: t26,
            className: t28
        }, t24, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 255,
            columnNumber: 11
        }, this);
        $[48] = t24;
        $[49] = t25;
        $[50] = t26;
        $[51] = t28;
        $[52] = t29;
    } else {
        t29 = $[52];
    }
    let t30;
    if ($[53] !== t22 || $[54] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                t22,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 266,
            columnNumber: 11
        }, this);
        $[53] = t22;
        $[54] = t29;
        $[55] = t30;
    } else {
        t30 = $[55];
    }
    let t31;
    if ($[56] !== submitSearch || $[57] !== t30) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden min-w-0 flex-1 xl:block",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: submitSearch,
                children: t30
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Header.tsx",
                lineNumber: 275,
                columnNumber: 59
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 275,
            columnNumber: 11
        }, this);
        $[56] = submitSearch;
        $[57] = t30;
        $[58] = t31;
    } else {
        t31 = $[58];
    }
    const t32 = isRTL && "flex-row-reverse";
    let t33;
    if ($[59] !== t32) {
        t33 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 sm:gap-3", t32);
        $[59] = t32;
        $[60] = t33;
    } else {
        t33 = $[60];
    }
    const t34 = isRTL && "flex-row-reverse";
    let t35;
    if ($[61] !== t34) {
        t35 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("hidden items-center gap-2 lg:flex", t34);
        $[61] = t34;
        $[62] = t35;
    } else {
        t35 = $[62];
    }
    let t36;
    if ($[63] !== pathname || $[64] !== t) {
        t36 = NAV_LINKS.map({
            "Header[NAV_LINKS.map()]": (item)=>{
                const Icon = item.icon;
                const active = isNavActive(pathname, item.href);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: item.href,
                    "aria-current": active ? "page" : undefined,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex min-h-12 items-center gap-2 rounded-[1.25rem] px-4 text-sm font-medium transition", active ? "bg-[#1D1D1F] text-white shadow-soft" : "bg-white text-slate-600 hover:border-primary/20 hover:text-[#1D1D1F]"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/layout/Header.tsx",
                            lineNumber: 306,
                            columnNumber: 331
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "hidden xl:inline",
                            children: t(item.key)
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/layout/Header.tsx",
                            lineNumber: 306,
                            columnNumber: 349
                        }, this)
                    ]
                }, item.href, true, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 306,
                    columnNumber: 16
                }, this);
            }
        }["Header[NAV_LINKS.map()]"]);
        $[63] = pathname;
        $[64] = t;
        $[65] = t36;
    } else {
        t36 = $[65];
    }
    let t37;
    if ($[66] !== t35 || $[67] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: t35,
            children: t36
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 317,
            columnNumber: 11
        }, this);
        $[66] = t35;
        $[67] = t36;
        $[68] = t37;
    } else {
        t37 = $[68];
    }
    let t38;
    if ($[69] === Symbol.for("react.memo_cache_sentinel")) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 326,
            columnNumber: 11
        }, this);
        $[69] = t38;
    } else {
        t38 = $[69];
    }
    let t39;
    if ($[70] !== t) {
        t39 = t("nav.language");
        $[70] = t;
        $[71] = t39;
    } else {
        t39 = $[71];
    }
    let t40;
    if ($[72] !== t39) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "hidden 2xl:inline",
            children: t39
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 341,
            columnNumber: 11
        }, this);
        $[72] = t39;
        $[73] = t40;
    } else {
        t40 = $[73];
    }
    let t41;
    if ($[74] !== changeLanguage || $[75] !== t40) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: changeLanguage,
            className: "inline-flex h-12 items-center gap-2 rounded-[1.25rem] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:border-primary/30 hover:text-[#1D1D1F]",
            children: [
                t38,
                t40
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 349,
            columnNumber: 11
        }, this);
        $[74] = changeLanguage;
        $[75] = t40;
        $[76] = t41;
    } else {
        t41 = $[76];
    }
    const t42 = user ? "/account" : "/auth/login";
    const t43 = accountActive ? "border-primary/30 bg-primary/5 text-primary" : "text-slate-600";
    let t44;
    if ($[77] !== t43) {
        t44 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("hidden h-12 items-center gap-2 rounded-[1.25rem] border border-slate-200 bg-white px-4 text-sm font-medium transition hover:border-primary/30 hover:text-[#1D1D1F] sm:inline-flex", t43);
        $[77] = t43;
        $[78] = t44;
    } else {
        t44 = $[78];
    }
    let t45;
    if ($[79] !== t || $[80] !== user) {
        t45 = user ? t("nav.account") : t("nav.login");
        $[79] = t;
        $[80] = user;
        $[81] = t45;
    } else {
        t45 = $[81];
    }
    let t46;
    if ($[82] === Symbol.for("react.memo_cache_sentinel")) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__["UserCircle2"], {
            size: 17
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 377,
            columnNumber: 11
        }, this);
        $[82] = t46;
    } else {
        t46 = $[82];
    }
    let t47;
    if ($[83] !== t || $[84] !== user) {
        t47 = user ? t("nav.account") : t("nav.login");
        $[83] = t;
        $[84] = user;
        $[85] = t47;
    } else {
        t47 = $[85];
    }
    let t48;
    if ($[86] !== t47) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "hidden xl:inline",
            children: t47
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 393,
            columnNumber: 11
        }, this);
        $[86] = t47;
        $[87] = t48;
    } else {
        t48 = $[87];
    }
    let t49;
    if ($[88] !== t42 || $[89] !== t44 || $[90] !== t45 || $[91] !== t48) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: t42,
            className: t44,
            "aria-label": t45,
            children: [
                t46,
                t48
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 401,
            columnNumber: 11
        }, this);
        $[88] = t42;
        $[89] = t44;
        $[90] = t45;
        $[91] = t48;
        $[92] = t49;
    } else {
        t49 = $[92];
    }
    const t50 = cartActive ? "border-primary/30 bg-primary/5 text-primary" : "border-slate-200 text-slate-700 hover:border-primary/30 hover:text-[#1D1D1F]";
    let t51;
    if ($[93] !== t50) {
        t51 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative inline-flex h-12 w-12 items-center justify-center rounded-[1.25rem] border bg-white transition", t50);
        $[93] = t50;
        $[94] = t51;
    } else {
        t51 = $[94];
    }
    let t52;
    if ($[95] !== t) {
        t52 = t("nav.cart");
        $[95] = t;
        $[96] = t52;
    } else {
        t52 = $[96];
    }
    let t53;
    if ($[97] === Symbol.for("react.memo_cache_sentinel")) {
        t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 429,
            columnNumber: 11
        }, this);
        $[97] = t53;
    } else {
        t53 = $[97];
    }
    const t54 = isRTL ? "-left-1" : "-right-1";
    let t55;
    if ($[98] !== t54) {
        t55 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute -top-1 min-w-5 rounded-full bg-primary px-1.5 py-0.5 text-center text-[11px] font-bold text-white", t54);
        $[98] = t54;
        $[99] = t55;
    } else {
        t55 = $[99];
    }
    let t56;
    if ($[100] !== t55 || $[101] !== totalItems) {
        t56 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t55,
            children: totalItems
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 445,
            columnNumber: 11
        }, this);
        $[100] = t55;
        $[101] = totalItems;
        $[102] = t56;
    } else {
        t56 = $[102];
    }
    let t57;
    if ($[103] !== t51 || $[104] !== t52 || $[105] !== t56) {
        t57 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/cart",
            className: t51,
            "aria-label": t52,
            children: [
                t53,
                t56
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 454,
            columnNumber: 11
        }, this);
        $[103] = t51;
        $[104] = t52;
        $[105] = t56;
        $[106] = t57;
    } else {
        t57 = $[106];
    }
    let t58;
    if ($[107] !== t33 || $[108] !== t37 || $[109] !== t41 || $[110] !== t49 || $[111] !== t57) {
        t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t33,
            children: [
                t37,
                t41,
                t49,
                t57
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 464,
            columnNumber: 11
        }, this);
        $[107] = t33;
        $[108] = t37;
        $[109] = t41;
        $[110] = t49;
        $[111] = t57;
        $[112] = t58;
    } else {
        t58 = $[112];
    }
    let t59;
    if ($[113] !== t19 || $[114] !== t31 || $[115] !== t58) {
        t59 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between gap-3",
            children: [
                t19,
                t31,
                t58
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 476,
            columnNumber: 11
        }, this);
        $[113] = t19;
        $[114] = t31;
        $[115] = t58;
        $[116] = t59;
    } else {
        t59 = $[116];
    }
    const t60 = isMenuOpen ? "mt-4 max-h-[36rem]" : "max-h-0";
    let t61;
    if ($[117] !== t60) {
        t61 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("overflow-hidden transition-all duration-300 lg:hidden", t60);
        $[117] = t60;
        $[118] = t61;
    } else {
        t61 = $[118];
    }
    const t62 = isRTL ? "right-5" : "left-5";
    let t63;
    if ($[119] !== t62) {
        t63 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400", t62);
        $[119] = t62;
        $[120] = t63;
    } else {
        t63 = $[120];
    }
    let t64;
    if ($[121] !== t63) {
        t64 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            size: 18,
            className: t63
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 504,
            columnNumber: 11
        }, this);
        $[121] = t63;
        $[122] = t64;
    } else {
        t64 = $[122];
    }
    let t65;
    if ($[123] !== searchParams) {
        t65 = searchParams.get("q") ?? "";
        $[123] = searchParams;
        $[124] = t65;
    } else {
        t65 = $[124];
    }
    const t66 = `${pathname}-${t65}-mobile`;
    let t67;
    if ($[125] !== searchParams) {
        t67 = searchParams.get("q") ?? "";
        $[125] = searchParams;
        $[126] = t67;
    } else {
        t67 = $[126];
    }
    let t68;
    if ($[127] !== t) {
        t68 = t("nav.search");
        $[127] = t;
        $[128] = t68;
    } else {
        t68 = $[128];
    }
    const t69 = isRTL ? "pr-14 text-right" : "pl-14 text-left";
    let t70;
    if ($[129] !== t69) {
        t70 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("field-input bg-white", t69);
        $[129] = t69;
        $[130] = t70;
    } else {
        t70 = $[130];
    }
    let t71;
    if ($[131] !== t66 || $[132] !== t67 || $[133] !== t68 || $[134] !== t70) {
        t71 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            name: "q",
            defaultValue: t67,
            placeholder: t68,
            className: t70
        }, t66, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 546,
            columnNumber: 11
        }, this);
        $[131] = t66;
        $[132] = t67;
        $[133] = t68;
        $[134] = t70;
        $[135] = t71;
    } else {
        t71 = $[135];
    }
    let t72;
    if ($[136] !== t64 || $[137] !== t71) {
        t72 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                t64,
                t71
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 557,
            columnNumber: 11
        }, this);
        $[136] = t64;
        $[137] = t71;
        $[138] = t72;
    } else {
        t72 = $[138];
    }
    let t73;
    if ($[139] !== submitSearch || $[140] !== t72) {
        t73 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: submitSearch,
            children: t72
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 566,
            columnNumber: 11
        }, this);
        $[139] = submitSearch;
        $[140] = t72;
        $[141] = t73;
    } else {
        t73 = $[141];
    }
    let t74;
    if ($[142] !== pathname || $[143] !== t) {
        t74 = NAV_LINKS.map({
            "Header[NAV_LINKS.map()]": (item_0)=>{
                const Icon_0 = item_0.icon;
                const active_0 = isNavActive(pathname, item_0.href);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: item_0.href,
                    onClick: {
                        "Header[NAV_LINKS.map() > <Link>.onClick]": ()=>setIsMenuOpen(false)
                    }["Header[NAV_LINKS.map() > <Link>.onClick]"],
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex min-h-[4.75rem] flex-col items-center justify-center gap-2 rounded-[1.5rem] border text-sm font-medium transition", active_0 ? "border-primary/30 bg-primary/5 text-primary" : "border-slate-200 bg-white text-slate-600 hover:text-[#1D1D1F]"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon_0, {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/layout/Header.tsx",
                            lineNumber: 581,
                            columnNumber: 317
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: t(item_0.key)
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/layout/Header.tsx",
                            lineNumber: 581,
                            columnNumber: 337
                        }, this)
                    ]
                }, item_0.href, true, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 579,
                    columnNumber: 16
                }, this);
            }
        }["Header[NAV_LINKS.map()]"]);
        $[142] = pathname;
        $[143] = t;
        $[144] = t74;
    } else {
        t74 = $[144];
    }
    let t75;
    if ($[145] === Symbol.for("react.memo_cache_sentinel")) {
        t75 = ({
            "Header[<Link>.onClick]": ()=>setIsMenuOpen(false)
        })["Header[<Link>.onClick]"];
        $[145] = t75;
    } else {
        t75 = $[145];
    }
    const t76 = cartActive ? "border-primary/30 bg-primary/5 text-primary" : "border-slate-200 bg-white text-slate-600 hover:text-[#1D1D1F]";
    let t77;
    if ($[146] !== t76) {
        t77 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex min-h-[4.75rem] flex-col items-center justify-center gap-2 rounded-[1.5rem] border text-sm font-medium transition", t76);
        $[146] = t76;
        $[147] = t77;
    } else {
        t77 = $[147];
    }
    let t78;
    if ($[148] === Symbol.for("react.memo_cache_sentinel")) {
        t78 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 610,
            columnNumber: 11
        }, this);
        $[148] = t78;
    } else {
        t78 = $[148];
    }
    let t79;
    if ($[149] !== t) {
        t79 = t("nav.cart");
        $[149] = t;
        $[150] = t79;
    } else {
        t79 = $[150];
    }
    let t80;
    if ($[151] !== t79) {
        t80 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t79
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 625,
            columnNumber: 11
        }, this);
        $[151] = t79;
        $[152] = t80;
    } else {
        t80 = $[152];
    }
    let t81;
    if ($[153] !== t77 || $[154] !== t80) {
        t81 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/cart",
            onClick: t75,
            className: t77,
            children: [
                t78,
                t80
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 633,
            columnNumber: 11
        }, this);
        $[153] = t77;
        $[154] = t80;
        $[155] = t81;
    } else {
        t81 = $[155];
    }
    const t82 = user ? "/account" : "/auth/login";
    let t83;
    if ($[156] === Symbol.for("react.memo_cache_sentinel")) {
        t83 = ({
            "Header[<Link>.onClick]": ()=>setIsMenuOpen(false)
        })["Header[<Link>.onClick]"];
        $[156] = t83;
    } else {
        t83 = $[156];
    }
    const t84 = accountActive ? "border-primary/30 bg-primary/5 text-primary" : "border-slate-200 bg-white text-slate-600 hover:text-[#1D1D1F]";
    let t85;
    if ($[157] !== t84) {
        t85 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex min-h-[4.75rem] flex-col items-center justify-center gap-2 rounded-[1.5rem] border text-sm font-medium transition", t84);
        $[157] = t84;
        $[158] = t85;
    } else {
        t85 = $[158];
    }
    let t86;
    if ($[159] === Symbol.for("react.memo_cache_sentinel")) {
        t86 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__["UserCircle2"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 661,
            columnNumber: 11
        }, this);
        $[159] = t86;
    } else {
        t86 = $[159];
    }
    let t87;
    if ($[160] !== t || $[161] !== user) {
        t87 = user ? t("nav.account") : t("nav.login");
        $[160] = t;
        $[161] = user;
        $[162] = t87;
    } else {
        t87 = $[162];
    }
    let t88;
    if ($[163] !== t87) {
        t88 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t87
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 677,
            columnNumber: 11
        }, this);
        $[163] = t87;
        $[164] = t88;
    } else {
        t88 = $[164];
    }
    let t89;
    if ($[165] !== t82 || $[166] !== t85 || $[167] !== t88) {
        t89 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: t82,
            onClick: t83,
            className: t85,
            children: [
                t86,
                t88
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 685,
            columnNumber: 11
        }, this);
        $[165] = t82;
        $[166] = t85;
        $[167] = t88;
        $[168] = t89;
    } else {
        t89 = $[168];
    }
    let t90;
    if ($[169] !== t74 || $[170] !== t81 || $[171] !== t89) {
        t90 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-3",
            children: [
                t74,
                t81,
                t89
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 695,
            columnNumber: 11
        }, this);
        $[169] = t74;
        $[170] = t81;
        $[171] = t89;
        $[172] = t90;
    } else {
        t90 = $[172];
    }
    let t91;
    if ($[173] === Symbol.for("react.memo_cache_sentinel")) {
        t91 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 705,
            columnNumber: 11
        }, this);
        $[173] = t91;
    } else {
        t91 = $[173];
    }
    let t92;
    if ($[174] !== t) {
        t92 = t("nav.language");
        $[174] = t;
        $[175] = t92;
    } else {
        t92 = $[175];
    }
    let t93;
    if ($[176] !== t92) {
        t93 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t92
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 720,
            columnNumber: 11
        }, this);
        $[176] = t92;
        $[177] = t93;
    } else {
        t93 = $[177];
    }
    let t94;
    if ($[178] !== changeLanguage || $[179] !== t93) {
        t94 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: changeLanguage,
            className: "inline-flex min-h-12 items-center justify-center gap-2 rounded-[1.25rem] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:border-primary/30 hover:text-[#1D1D1F]",
            children: [
                t91,
                t93
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 728,
            columnNumber: 11
        }, this);
        $[178] = changeLanguage;
        $[179] = t93;
        $[180] = t94;
    } else {
        t94 = $[180];
    }
    let t95;
    if ($[181] !== t73 || $[182] !== t90 || $[183] !== t94) {
        t95 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-3 border-t border-slate-100 pt-4",
            children: [
                t73,
                t90,
                t94
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 737,
            columnNumber: 11
        }, this);
        $[181] = t73;
        $[182] = t90;
        $[183] = t94;
        $[184] = t95;
    } else {
        t95 = $[184];
    }
    let t96;
    if ($[185] !== t61 || $[186] !== t95) {
        t96 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t61,
            children: t95
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 747,
            columnNumber: 11
        }, this);
        $[185] = t61;
        $[186] = t95;
        $[187] = t96;
    } else {
        t96 = $[187];
    }
    let t97;
    if ($[188] !== t59 || $[189] !== t96) {
        t97 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "sticky top-0 z-50 pt-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-shell",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "frosted rounded-[2rem] border border-white/80 px-4 py-4 shadow-soft sm:px-5",
                    children: [
                        t59,
                        t96
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 756,
                    columnNumber: 82
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Header.tsx",
                lineNumber: 756,
                columnNumber: 54
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 756,
            columnNumber: 11
        }, this);
        $[188] = t59;
        $[189] = t96;
        $[190] = t97;
    } else {
        t97 = $[190];
    }
    return t97;
}
_s(Header, "/LsV3+/ahbpbXSDM503BdvfeKz4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"]
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

//# sourceMappingURL=web_src_c0b3d405._.js.map