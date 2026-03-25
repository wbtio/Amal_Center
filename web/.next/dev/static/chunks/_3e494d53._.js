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
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/app.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
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
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(89);
    if ($[0] !== "1ad62eca5e88899c289676cf00a86b009ce2034abf8b70929a0da57ff82c056e") {
        for(let $i = 0; $i < 89; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1ad62eca5e88899c289676cf00a86b009ce2034abf8b70929a0da57ff82c056e";
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
    const t1 = isRTL && "flex-row-reverse";
    let t2;
    if ($[2] !== t1) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-3 rounded-[1.6rem] bg-slate-50 px-3 py-3", t1);
        $[2] = t1;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex h-11 w-11 items-center justify-center rounded-[1rem] bg-primary text-lg font-bold text-white shadow-button",
            children: "أ"
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 53,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const t4 = isRTL ? "text-right" : "text-left";
    const t5 = isRTL ? "\u0627\u0644\u0623\u0645\u0644 \u0633\u0646\u062A\u0631" : "Al Amal Center";
    let t6;
    if ($[5] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-semibold text-[#1D1D1F]",
            children: t5
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 62,
            columnNumber: 10
        }, this);
        $[5] = t5;
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    const t7 = isRTL ? "Al Amal Center" : "\u0627\u0644\u0623\u0645\u0644 \u0633\u0646\u062A\u0631";
    let t8;
    if ($[7] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-1 text-xs text-slate-500",
            children: t7
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 71,
            columnNumber: 10
        }, this);
        $[7] = t7;
        $[8] = t8;
    } else {
        t8 = $[8];
    }
    let t9;
    if ($[9] !== t4 || $[10] !== t6 || $[11] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t4,
            children: [
                t6,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 79,
            columnNumber: 10
        }, this);
        $[9] = t4;
        $[10] = t6;
        $[11] = t8;
        $[12] = t9;
    } else {
        t9 = $[12];
    }
    let t10;
    if ($[13] !== t2 || $[14] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            children: [
                t3,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 89,
            columnNumber: 11
        }, this);
        $[13] = t2;
        $[14] = t9;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    const t11 = isRTL ? "text-right" : "text-left";
    let t12;
    if ($[16] !== t11) {
        t12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("max-w-xl text-sm leading-7 text-slate-500 sm:text-base", t11);
        $[16] = t11;
        $[17] = t12;
    } else {
        t12 = $[17];
    }
    let t13;
    if ($[18] !== t) {
        t13 = t("footer.description");
        $[18] = t;
        $[19] = t13;
    } else {
        t13 = $[19];
    }
    let t14;
    if ($[20] !== t12 || $[21] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: t12,
            children: t13
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 115,
            columnNumber: 11
        }, this);
        $[20] = t12;
        $[21] = t13;
        $[22] = t14;
    } else {
        t14 = $[22];
    }
    let t15;
    if ($[23] !== t10 || $[24] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-5",
            children: [
                t10,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 124,
            columnNumber: 11
        }, this);
        $[23] = t10;
        $[24] = t14;
        $[25] = t15;
    } else {
        t15 = $[25];
    }
    const t16 = isRTL ? "text-right" : "text-left";
    let t17;
    if ($[26] !== t) {
        t17 = t("footer.quickLinks");
        $[26] = t;
        $[27] = t17;
    } else {
        t17 = $[27];
    }
    let t18;
    if ($[28] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: t17
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 142,
            columnNumber: 11
        }, this);
        $[28] = t17;
        $[29] = t18;
    } else {
        t18 = $[29];
    }
    let t19;
    if ($[30] !== t) {
        t19 = QUICK_LINKS.map({
            "Footer[QUICK_LINKS.map()]": (link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: link.href,
                    className: "text-sm text-slate-500 transition hover:text-[#1D1D1F]",
                    children: t(link.key)
                }, link.href, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 151,
                    columnNumber: 44
                }, this)
        }["Footer[QUICK_LINKS.map()]"]);
        $[30] = t;
        $[31] = t19;
    } else {
        t19 = $[31];
    }
    let t20;
    if ($[32] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-5 grid gap-3",
            children: t19
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 160,
            columnNumber: 11
        }, this);
        $[32] = t19;
        $[33] = t20;
    } else {
        t20 = $[33];
    }
    let t21;
    if ($[34] !== t16 || $[35] !== t18 || $[36] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t16,
            children: [
                t18,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 168,
            columnNumber: 11
        }, this);
        $[34] = t16;
        $[35] = t18;
        $[36] = t20;
        $[37] = t21;
    } else {
        t21 = $[37];
    }
    const t22 = isRTL ? "text-right" : "text-left";
    let t23;
    if ($[38] !== t) {
        t23 = t("footer.contact");
        $[38] = t;
        $[39] = t23;
    } else {
        t23 = $[39];
    }
    let t24;
    if ($[40] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: t23
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 187,
            columnNumber: 11
        }, this);
        $[40] = t23;
        $[41] = t24;
    } else {
        t24 = $[41];
    }
    const t25 = isRTL && "flex-row-reverse justify-end";
    let t26;
    if ($[42] !== t25) {
        t26 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-3 transition hover:text-[#1D1D1F]", t25);
        $[42] = t25;
        $[43] = t26;
    } else {
        t26 = $[43];
    }
    let t27;
    let t28;
    if ($[44] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 205,
            columnNumber: 11
        }, this);
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_NUMBER
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 206,
            columnNumber: 11
        }, this);
        $[44] = t27;
        $[45] = t28;
    } else {
        t27 = $[44];
        t28 = $[45];
    }
    let t29;
    if ($[46] !== t26) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_URL,
            target: "_blank",
            rel: "noreferrer",
            className: t26,
            children: [
                t27,
                t28
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 215,
            columnNumber: 11
        }, this);
        $[46] = t26;
        $[47] = t29;
    } else {
        t29 = $[47];
    }
    const t30 = isRTL && "flex-row-reverse justify-end";
    let t31;
    if ($[48] !== t30) {
        t31 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-3 transition hover:text-[#1D1D1F]", t30);
        $[48] = t30;
        $[49] = t31;
    } else {
        t31 = $[49];
    }
    let t32;
    let t33;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 233,
            columnNumber: 11
        }, this);
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_NUMBER
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 234,
            columnNumber: 11
        }, this);
        $[50] = t32;
        $[51] = t33;
    } else {
        t32 = $[50];
        t33 = $[51];
    }
    let t34;
    if ($[52] !== t31) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: `tel:${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_NUMBER}`,
            className: t31,
            children: [
                t32,
                t33
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 243,
            columnNumber: 11
        }, this);
        $[52] = t31;
        $[53] = t34;
    } else {
        t34 = $[53];
    }
    const t35 = isRTL && "flex-row-reverse justify-end";
    let t36;
    if ($[54] !== t35) {
        t36 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-3 transition hover:text-[#1D1D1F]", t35);
        $[54] = t35;
        $[55] = t36;
    } else {
        t36 = $[55];
    }
    let t37;
    let t38;
    if ($[56] === Symbol.for("react.memo_cache_sentinel")) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 261,
            columnNumber: 11
        }, this);
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].SUPPORT_EMAIL
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 262,
            columnNumber: 11
        }, this);
        $[56] = t37;
        $[57] = t38;
    } else {
        t37 = $[56];
        t38 = $[57];
    }
    let t39;
    if ($[58] !== t36) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].SUPPORT_EMAIL}`,
            className: t36,
            children: [
                t37,
                t38
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 271,
            columnNumber: 11
        }, this);
        $[58] = t36;
        $[59] = t39;
    } else {
        t39 = $[59];
    }
    const t40 = isRTL && "flex-row-reverse justify-end";
    let t41;
    if ($[60] !== t40) {
        t41 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 pt-2", t40);
        $[60] = t40;
        $[61] = t41;
    } else {
        t41 = $[61];
    }
    let t42;
    if ($[62] === Symbol.for("react.memo_cache_sentinel")) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].FACEBOOK_URL,
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-primary/30 hover:text-[#1D1D1F]",
            "aria-label": "Facebook",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"], {
                size: 17
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Footer.tsx",
                lineNumber: 288,
                columnNumber: 279
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 288,
            columnNumber: 11
        }, this);
        $[62] = t42;
    } else {
        t42 = $[62];
    }
    let t43;
    if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].INSTAGRAM_URL,
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-primary/30 hover:text-[#1D1D1F]",
            "aria-label": "Instagram",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                size: 17
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Footer.tsx",
                lineNumber: 295,
                columnNumber: 281
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 295,
            columnNumber: 11
        }, this);
        $[63] = t43;
    } else {
        t43 = $[63];
    }
    let t44;
    if ($[64] !== t41) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t41,
            children: [
                t42,
                t43
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 302,
            columnNumber: 11
        }, this);
        $[64] = t41;
        $[65] = t44;
    } else {
        t44 = $[65];
    }
    let t45;
    if ($[66] !== t29 || $[67] !== t34 || $[68] !== t39 || $[69] !== t44) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-5 grid gap-4 text-sm text-slate-500",
            children: [
                t29,
                t34,
                t39,
                t44
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 310,
            columnNumber: 11
        }, this);
        $[66] = t29;
        $[67] = t34;
        $[68] = t39;
        $[69] = t44;
        $[70] = t45;
    } else {
        t45 = $[70];
    }
    let t46;
    if ($[71] !== t22 || $[72] !== t24 || $[73] !== t45) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t22,
            children: [
                t24,
                t45
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 321,
            columnNumber: 11
        }, this);
        $[71] = t22;
        $[72] = t24;
        $[73] = t45;
        $[74] = t46;
    } else {
        t46 = $[74];
    }
    let t47;
    if ($[75] !== t15 || $[76] !== t21 || $[77] !== t46) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.9fr]",
            children: [
                t15,
                t21,
                t46
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 331,
            columnNumber: 11
        }, this);
        $[75] = t15;
        $[76] = t21;
        $[77] = t46;
        $[78] = t47;
    } else {
        t47 = $[78];
    }
    const t48 = isRTL ? "text-right" : "text-left";
    let t49;
    if ($[79] !== t48) {
        t49 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-8 border-t border-slate-100 pt-5 text-sm text-slate-400", t48);
        $[79] = t48;
        $[80] = t49;
    } else {
        t49 = $[80];
    }
    let t50;
    if ($[81] !== t) {
        t50 = t("footer.rights");
        $[81] = t;
        $[82] = t50;
    } else {
        t50 = $[82];
    }
    let t51;
    if ($[83] !== t49 || $[84] !== t50) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t49,
            children: [
                year,
                " © Al Amal Center. ",
                t50
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 358,
            columnNumber: 11
        }, this);
        $[83] = t49;
        $[84] = t50;
        $[85] = t51;
    } else {
        t51 = $[85];
    }
    let t52;
    if ($[86] !== t47 || $[87] !== t51) {
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
            className: "mt-16 pb-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-shell",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "soft-panel overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10",
                    children: [
                        t47,
                        t51
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 367,
                    columnNumber: 70
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Footer.tsx",
                lineNumber: 367,
                columnNumber: 42
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 367,
            columnNumber: 11
        }, this);
        $[86] = t47;
        $[87] = t51;
        $[88] = t52;
    } else {
        t52 = $[88];
    }
    return t52;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/circle-user-round.js [app-client] (ecmascript) <export default as UserCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/image.js [app-client] (ecmascript)");
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
function HeaderSearch(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(42);
    if ($[0] !== "90fb9108f1a626b3d2776faef59f472b9ecdbc5a5a6ebb8c033463a1eb3f5c56") {
        for(let $i = 0; $i < 42; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "90fb9108f1a626b3d2776faef59f472b9ecdbc5a5a6ebb8c033463a1eb3f5c56";
    }
    const { value, isRTL, placeholder, helperText, pending, onChange, onClear, onSubmit } = t0;
    let t1;
    if ($[1] !== value) {
        t1 = value.trim();
        $[1] = value;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const hasValue = t1.length > 0;
    const clearLabel = isRTL ? "\u0645\u0633\u062D \u0627\u0644\u0628\u062D\u062B" : "Clear search";
    const submitLabel = isRTL ? "\u0628\u062D\u062B" : "Search";
    const t2 = isRTL ? "right-4" : "left-4";
    let t3;
    if ($[3] !== t2) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400", t2);
        $[3] = t2;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            size: 17,
            className: t3
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 88,
            columnNumber: 10
        }, this);
        $[5] = t3;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== onChange) {
        t5 = ({
            "HeaderSearch[<input>.onChange]": (event)=>onChange(event.target.value)
        })["HeaderSearch[<input>.onChange]"];
        $[7] = onChange;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    const t6 = hasValue ? isRTL ? "pl-10 pr-11 text-right" : "pl-11 pr-10 text-left" : isRTL ? "pr-11 text-right" : "pl-11 text-left";
    let t7;
    if ($[9] !== t6) {
        t7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-11 w-full rounded-[1.1rem] border-0 bg-transparent text-sm text-[#1D1D1F] outline-none placeholder:text-slate-400", t6);
        $[9] = t6;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    if ($[11] !== placeholder || $[12] !== t5 || $[13] !== t7 || $[14] !== value) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "search",
            name: "q",
            value: value,
            onChange: t5,
            placeholder: placeholder,
            autoComplete: "off",
            className: t7
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 115,
            columnNumber: 10
        }, this);
        $[11] = placeholder;
        $[12] = t5;
        $[13] = t7;
        $[14] = value;
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    let t9;
    if ($[16] !== clearLabel || $[17] !== hasValue || $[18] !== isRTL || $[19] !== onClear) {
        t9 = hasValue ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onClear,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700", isRTL ? "left-2" : "right-2"),
            "aria-label": clearLabel,
            title: clearLabel,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                size: 15
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Header.tsx",
                lineNumber: 126,
                columnNumber: 313
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 126,
            columnNumber: 21
        }, this) : null;
        $[16] = clearLabel;
        $[17] = hasValue;
        $[18] = isRTL;
        $[19] = onClear;
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    let t10;
    if ($[21] !== t4 || $[22] !== t8 || $[23] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative min-w-0 flex-1",
            children: [
                t4,
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 137,
            columnNumber: 11
        }, this);
        $[21] = t4;
        $[22] = t8;
        $[23] = t9;
        $[24] = t10;
    } else {
        t10 = $[24];
    }
    let t11;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            size: 16
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 147,
            columnNumber: 11
        }, this);
        $[25] = t11;
    } else {
        t11 = $[25];
    }
    let t12;
    if ($[26] !== submitLabel) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "hidden sm:inline",
            children: submitLabel
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 154,
            columnNumber: 11
        }, this);
        $[26] = submitLabel;
        $[27] = t12;
    } else {
        t12 = $[27];
    }
    let t13;
    if ($[28] !== submitLabel || $[29] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "submit",
            className: "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[1.1rem] bg-[#1D1D1F] px-4 text-sm font-medium text-white shadow-button transition hover:bg-primary",
            "aria-label": submitLabel,
            title: submitLabel,
            children: [
                t11,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 162,
            columnNumber: 11
        }, this);
        $[28] = submitLabel;
        $[29] = t12;
        $[30] = t13;
    } else {
        t13 = $[30];
    }
    let t14;
    if ($[31] !== t10 || $[32] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[1.55rem] border border-white/80 bg-white/92 p-1.5 shadow-soft",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    t10,
                    t13
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/layout/Header.tsx",
                lineNumber: 171,
                columnNumber: 99
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 171,
            columnNumber: 11
        }, this);
        $[31] = t10;
        $[32] = t13;
        $[33] = t14;
    } else {
        t14 = $[33];
    }
    let t15;
    if ($[34] !== helperText || $[35] !== isRTL || $[36] !== pending) {
        t15 = helperText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-2 px-1 text-xs", pending ? "text-primary" : "text-slate-500", isRTL ? "text-right" : "text-left"),
            children: helperText
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 180,
            columnNumber: 24
        }, this) : null;
        $[34] = helperText;
        $[35] = isRTL;
        $[36] = pending;
        $[37] = t15;
    } else {
        t15 = $[37];
    }
    let t16;
    if ($[38] !== onSubmit || $[39] !== t14 || $[40] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: onSubmit,
            className: "w-full",
            children: [
                t14,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 190,
            columnNumber: 11
        }, this);
        $[38] = onSubmit;
        $[39] = t14;
        $[40] = t15;
        $[41] = t16;
    } else {
        t16 = $[41];
    }
    return t16;
}
_c = HeaderSearch;
function Header() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(145);
    if ($[0] !== "90fb9108f1a626b3d2776faef59f472b9ecdbc5a5a6ebb8c033463a1eb3f5c56") {
        for(let $i = 0; $i < 145; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "90fb9108f1a626b3d2776faef59f472b9ecdbc5a5a6ebb8c033463a1eb3f5c56";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseSession"])();
    const { isRTL, language, t, toggleLanguage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    const totalItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])(_HeaderUseCartStore);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] !== searchParams) {
        t0 = searchParams.get("q") ?? "";
        $[1] = searchParams;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    const currentQuery = t0;
    const [searchValue, setSearchValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentQuery);
    const deferredSearchValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeferredValue"])(searchValue);
    const [isSearchPending, startSearchTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const cartActive = pathname === "/cart";
    const accountActive = pathname.startsWith("/account") || pathname.startsWith("/auth");
    let t1;
    if ($[3] !== searchValue) {
        t1 = searchValue.trim();
        $[3] = searchValue;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const trimmedSearch = t1;
    const searchHelperText = isSearchPending ? language === "ar" ? "\u062C\u0627\u0631\u064D \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u062D\u062B..." : "Updating search..." : trimmedSearch ? language === "ar" ? `اضغط Enter للبحث عن "${trimmedSearch}"` : `Press Enter to search for "${trimmedSearch}"` : null;
    const languageTitle = language === "ar" ? "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" : "English";
    const languageActionLabel = language === "ar" ? "\u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629" : "Switch to Arabic";
    let t2;
    if ($[5] !== t || $[6] !== user) {
        t2 = user ? t("nav.account") : t("nav.login");
        $[5] = t;
        $[6] = user;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    const accountLabel = t2;
    let t3;
    let t4;
    if ($[8] !== currentQuery) {
        t3 = ({
            "Header[useEffect()]": ()=>{
                setSearchValue(currentQuery);
            }
        })["Header[useEffect()]"];
        t4 = [
            currentQuery
        ];
        $[8] = currentQuery;
        $[9] = t3;
        $[10] = t4;
    } else {
        t3 = $[9];
        t4 = $[10];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    let t5;
    let t6;
    if ($[11] !== currentQuery || $[12] !== deferredSearchValue || $[13] !== pathname || $[14] !== router || $[15] !== searchParams) {
        t5 = ({
            "Header[useEffect()]": ()=>{
                if (pathname !== "/products") {
                    return;
                }
                const normalized = deferredSearchValue.trim();
                if (normalized === currentQuery) {
                    return;
                }
                const params = new URLSearchParams(searchParams.toString());
                if (normalized) {
                    params.set("q", normalized);
                } else {
                    params.delete("q");
                }
                const query = params.toString();
                startSearchTransition({
                    "Header[useEffect() > startSearchTransition()]": ()=>{
                        router.replace(query ? `${pathname}?${query}` : pathname, {
                            scroll: false
                        });
                    }
                }["Header[useEffect() > startSearchTransition()]"]);
            }
        })["Header[useEffect()]"];
        t6 = [
            currentQuery,
            deferredSearchValue,
            pathname,
            router,
            searchParams,
            startSearchTransition
        ];
        $[11] = currentQuery;
        $[12] = deferredSearchValue;
        $[13] = pathname;
        $[14] = router;
        $[15] = searchParams;
        $[16] = t5;
        $[17] = t6;
    } else {
        t5 = $[16];
        t6 = $[17];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t5, t6);
    let t7;
    if ($[18] !== pathname || $[19] !== searchParams) {
        t7 = function buildSearchHref(value) {
            const normalized_0 = value.trim();
            const params_0 = pathname === "/products" ? new URLSearchParams(searchParams.toString()) : new URLSearchParams();
            if (normalized_0) {
                params_0.set("q", normalized_0);
            } else {
                params_0.delete("q");
            }
            const query_0 = params_0.toString();
            return query_0 ? `/products?${query_0}` : "/products";
        };
        $[18] = pathname;
        $[19] = searchParams;
        $[20] = t7;
    } else {
        t7 = $[20];
    }
    const buildSearchHref = t7;
    let t8;
    if ($[21] !== buildSearchHref || $[22] !== router || $[23] !== searchValue) {
        t8 = function submitSearch(event) {
            event.preventDefault();
            setIsMenuOpen(false);
            startSearchTransition({
                "Header[submitSearch > startSearchTransition()]": ()=>{
                    router.push(buildSearchHref(searchValue));
                }
            }["Header[submitSearch > startSearchTransition()]"]);
        };
        $[21] = buildSearchHref;
        $[22] = router;
        $[23] = searchValue;
        $[24] = t8;
    } else {
        t8 = $[24];
    }
    const submitSearch = t8;
    let t9;
    if ($[25] !== buildSearchHref || $[26] !== pathname || $[27] !== router) {
        t9 = function clearSearch() {
            setSearchValue("");
            if (pathname === "/products") {
                startSearchTransition({
                    "Header[clearSearch > startSearchTransition()]": ()=>{
                        router.replace(buildSearchHref(""), {
                            scroll: false
                        });
                    }
                }["Header[clearSearch > startSearchTransition()]"]);
            }
        };
        $[25] = buildSearchHref;
        $[26] = pathname;
        $[27] = router;
        $[28] = t9;
    } else {
        t9 = $[28];
    }
    const clearSearch = t9;
    let t10;
    if ($[29] !== router || $[30] !== toggleLanguage) {
        t10 = function changeLanguage() {
            toggleLanguage();
            setIsMenuOpen(false);
            router.refresh();
        };
        $[29] = router;
        $[30] = toggleLanguage;
        $[31] = t10;
    } else {
        t10 = $[31];
    }
    const changeLanguage = t10;
    let t11;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pointer-events-none absolute inset-x-10 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(46,125,50,0.14),rgba(255,179,0,0.06)_42%,transparent_74%)] blur-3xl"
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 393,
            columnNumber: 11
        }, this);
        $[32] = t11;
    } else {
        t11 = $[32];
    }
    const t12 = isRTL && "flex-row-reverse";
    let t13;
    if ($[33] !== t12) {
        t13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex min-w-0 items-center gap-3", t12);
        $[33] = t12;
        $[34] = t13;
    } else {
        t13 = $[34];
    }
    let t14;
    let t15;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = ({
            "Header[<button>.onClick]": ()=>setIsMenuOpen(_HeaderButtonOnClickSetIsMenuOpen)
        })["Header[<button>.onClick]"];
        t15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(actionButtonClass, "lg:hidden");
        $[35] = t14;
        $[36] = t15;
    } else {
        t14 = $[35];
        t15 = $[36];
    }
    let t16;
    if ($[37] !== t) {
        t16 = t("nav.menu");
        $[37] = t;
        $[38] = t16;
    } else {
        t16 = $[38];
    }
    let t17;
    if ($[39] !== t) {
        t17 = t("nav.menu");
        $[39] = t;
        $[40] = t17;
    } else {
        t17 = $[40];
    }
    let t18;
    if ($[41] !== isMenuOpen) {
        t18 = isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 438,
            columnNumber: 24
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 438,
            columnNumber: 42
        }, this);
        $[41] = isMenuOpen;
        $[42] = t18;
    } else {
        t18 = $[42];
    }
    let t19;
    if ($[43] !== isMenuOpen || $[44] !== t16 || $[45] !== t17 || $[46] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t14,
            className: t15,
            "aria-label": t16,
            "aria-expanded": isMenuOpen,
            title: t17,
            children: t18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 446,
            columnNumber: 11
        }, this);
        $[43] = isMenuOpen;
        $[44] = t16;
        $[45] = t17;
        $[46] = t18;
        $[47] = t19;
    } else {
        t19 = $[47];
    }
    const t20 = isRTL && "flex-row-reverse";
    let t21;
    if ($[48] !== t20) {
        t21 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex min-w-0 items-center gap-3 rounded-[1.3rem] border border-white/80 bg-white/95 px-3 py-2 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-premium", t20);
        $[48] = t20;
        $[49] = t21;
    } else {
        t21 = $[49];
    }
    let t22;
    let t23;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                lineNumber: 467,
                columnNumber: 127
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 467,
            columnNumber: 11
        }, this);
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "min-w-0 truncate text-sm font-semibold text-[#1D1D1F] sm:text-base",
            children: "الأمل سنتر"
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 468,
            columnNumber: 11
        }, this);
        $[50] = t22;
        $[51] = t23;
    } else {
        t22 = $[50];
        t23 = $[51];
    }
    let t24;
    if ($[52] !== t21) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/",
            className: t21,
            children: [
                t22,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 477,
            columnNumber: 11
        }, this);
        $[52] = t21;
        $[53] = t24;
    } else {
        t24 = $[53];
    }
    let t25;
    if ($[54] !== t13 || $[55] !== t19 || $[56] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t13,
            children: [
                t19,
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 485,
            columnNumber: 11
        }, this);
        $[54] = t13;
        $[55] = t19;
        $[56] = t24;
        $[57] = t25;
    } else {
        t25 = $[57];
    }
    let t26;
    if ($[58] !== t) {
        t26 = t("nav.search");
        $[58] = t;
        $[59] = t26;
    } else {
        t26 = $[59];
    }
    let t27;
    if ($[60] !== clearSearch || $[61] !== isRTL || $[62] !== isSearchPending || $[63] !== searchHelperText || $[64] !== searchValue || $[65] !== submitSearch || $[66] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden min-w-0 flex-1 px-2 lg:block",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-[42rem]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeaderSearch, {
                    value: searchValue,
                    isRTL: isRTL,
                    placeholder: t26,
                    helperText: searchHelperText,
                    pending: isSearchPending,
                    onChange: setSearchValue,
                    onClear: clearSearch,
                    onSubmit: submitSearch
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 503,
                    columnNumber: 110
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Header.tsx",
                lineNumber: 503,
                columnNumber: 64
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 503,
            columnNumber: 11
        }, this);
        $[60] = clearSearch;
        $[61] = isRTL;
        $[62] = isSearchPending;
        $[63] = searchHelperText;
        $[64] = searchValue;
        $[65] = submitSearch;
        $[66] = t26;
        $[67] = t27;
    } else {
        t27 = $[67];
    }
    const t28 = isRTL && "flex-row-reverse";
    let t29;
    if ($[68] !== t28) {
        t29 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex shrink-0 items-center gap-2", t28);
        $[68] = t28;
        $[69] = t29;
    } else {
        t29 = $[69];
    }
    const t30 = isRTL && "flex-row-reverse";
    let t31;
    if ($[70] !== t30) {
        t31 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("hidden items-center gap-2 lg:flex", t30);
        $[70] = t30;
        $[71] = t31;
    } else {
        t31 = $[71];
    }
    let t32;
    if ($[72] !== pathname || $[73] !== t) {
        t32 = NAV_LINKS.map({
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
                            lineNumber: 539,
                            columnNumber: 393
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "hidden xl:inline",
                            children: t(item.key)
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/layout/Header.tsx",
                            lineNumber: 539,
                            columnNumber: 411
                        }, this)
                    ]
                }, item.href, true, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 539,
                    columnNumber: 16
                }, this);
            }
        }["Header[NAV_LINKS.map()]"]);
        $[72] = pathname;
        $[73] = t;
        $[74] = t32;
    } else {
        t32 = $[74];
    }
    let t33;
    if ($[75] !== t31 || $[76] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: t31,
            children: t32
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 550,
            columnNumber: 11
        }, this);
        $[75] = t31;
        $[76] = t32;
        $[77] = t33;
    } else {
        t33 = $[77];
    }
    let t34;
    if ($[78] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
            size: 17
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 559,
            columnNumber: 11
        }, this);
        $[78] = t34;
    } else {
        t34 = $[78];
    }
    let t35;
    if ($[79] !== changeLanguage || $[80] !== languageActionLabel || $[81] !== languageTitle) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: changeLanguage,
            className: actionButtonClass,
            "aria-label": languageActionLabel,
            title: languageTitle,
            children: t34
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 566,
            columnNumber: 11
        }, this);
        $[79] = changeLanguage;
        $[80] = languageActionLabel;
        $[81] = languageTitle;
        $[82] = t35;
    } else {
        t35 = $[82];
    }
    const t36 = user ? "/account" : "/auth/login";
    const t37 = user ? "border-primary/25 bg-primary/10 text-primary" : accountActive ? "border-slate-300 bg-slate-100 text-slate-900" : "";
    let t38;
    if ($[83] !== t37) {
        t38 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(actionButtonClass, t37);
        $[83] = t37;
        $[84] = t38;
    } else {
        t38 = $[84];
    }
    let t39;
    if ($[85] !== t) {
        t39 = t("nav.account");
        $[85] = t;
        $[86] = t39;
    } else {
        t39 = $[86];
    }
    let t40;
    if ($[87] === Symbol.for("react.memo_cache_sentinel")) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__["UserCircle2"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 594,
            columnNumber: 11
        }, this);
        $[87] = t40;
    } else {
        t40 = $[87];
    }
    let t41;
    if ($[88] !== accountLabel || $[89] !== t36 || $[90] !== t38 || $[91] !== t39) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: t36,
            className: t38,
            "aria-label": accountLabel,
            title: t39,
            children: t40
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 601,
            columnNumber: 11
        }, this);
        $[88] = accountLabel;
        $[89] = t36;
        $[90] = t38;
        $[91] = t39;
        $[92] = t41;
    } else {
        t41 = $[92];
    }
    const t42 = cartActive ? "border-primary/30 bg-primary/5 text-primary" : "border-slate-200/80 text-slate-700 hover:border-primary/30 hover:text-[#1D1D1F]";
    let t43;
    if ($[93] !== t42) {
        t43 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative inline-flex h-11 w-11 items-center justify-center rounded-[1.15rem] border bg-white/95 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft", t42);
        $[93] = t42;
        $[94] = t43;
    } else {
        t43 = $[94];
    }
    let t44;
    if ($[95] !== t) {
        t44 = t("nav.cart");
        $[95] = t;
        $[96] = t44;
    } else {
        t44 = $[96];
    }
    let t45;
    if ($[97] !== t) {
        t45 = t("nav.cart");
        $[97] = t;
        $[98] = t45;
    } else {
        t45 = $[98];
    }
    let t46;
    if ($[99] === Symbol.for("react.memo_cache_sentinel")) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 637,
            columnNumber: 11
        }, this);
        $[99] = t46;
    } else {
        t46 = $[99];
    }
    const t47 = isRTL ? "-left-1" : "-right-1";
    let t48;
    if ($[100] !== t47) {
        t48 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute -top-1 min-w-5 rounded-full bg-primary px-1.5 py-0.5 text-center text-[11px] font-bold text-white", t47);
        $[100] = t47;
        $[101] = t48;
    } else {
        t48 = $[101];
    }
    let t49;
    if ($[102] !== t48 || $[103] !== totalItems) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t48,
            children: totalItems
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 653,
            columnNumber: 11
        }, this);
        $[102] = t48;
        $[103] = totalItems;
        $[104] = t49;
    } else {
        t49 = $[104];
    }
    let t50;
    if ($[105] !== t43 || $[106] !== t44 || $[107] !== t45 || $[108] !== t49) {
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/cart",
            className: t43,
            "aria-label": t44,
            title: t45,
            children: [
                t46,
                t49
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 662,
            columnNumber: 11
        }, this);
        $[105] = t43;
        $[106] = t44;
        $[107] = t45;
        $[108] = t49;
        $[109] = t50;
    } else {
        t50 = $[109];
    }
    let t51;
    if ($[110] !== t29 || $[111] !== t33 || $[112] !== t35 || $[113] !== t41 || $[114] !== t50) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t29,
            children: [
                t33,
                t35,
                t41,
                t50
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 673,
            columnNumber: 11
        }, this);
        $[110] = t29;
        $[111] = t33;
        $[112] = t35;
        $[113] = t41;
        $[114] = t50;
        $[115] = t51;
    } else {
        t51 = $[115];
    }
    let t52;
    if ($[116] !== t25 || $[117] !== t27 || $[118] !== t51) {
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between gap-3",
            children: [
                t25,
                t27,
                t51
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 685,
            columnNumber: 11
        }, this);
        $[116] = t25;
        $[117] = t27;
        $[118] = t51;
        $[119] = t52;
    } else {
        t52 = $[119];
    }
    let t53;
    if ($[120] !== t) {
        t53 = t("nav.search");
        $[120] = t;
        $[121] = t53;
    } else {
        t53 = $[121];
    }
    let t54;
    if ($[122] !== clearSearch || $[123] !== isRTL || $[124] !== isSearchPending || $[125] !== searchHelperText || $[126] !== searchValue || $[127] !== submitSearch || $[128] !== t53) {
        t54 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "lg:hidden",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeaderSearch, {
                value: searchValue,
                isRTL: isRTL,
                placeholder: t53,
                helperText: searchHelperText,
                pending: isSearchPending,
                onChange: setSearchValue,
                onClear: clearSearch,
                onSubmit: submitSearch
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Header.tsx",
                lineNumber: 703,
                columnNumber: 38
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 703,
            columnNumber: 11
        }, this);
        $[122] = clearSearch;
        $[123] = isRTL;
        $[124] = isSearchPending;
        $[125] = searchHelperText;
        $[126] = searchValue;
        $[127] = submitSearch;
        $[128] = t53;
        $[129] = t54;
    } else {
        t54 = $[129];
    }
    const t55 = isMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0";
    let t56;
    if ($[130] !== t55) {
        t56 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("overflow-hidden transition-[max-height,opacity,margin] duration-300 lg:hidden", t55);
        $[130] = t55;
        $[131] = t56;
    } else {
        t56 = $[131];
    }
    let t57;
    if ($[132] !== isRTL || $[133] !== pathname || $[134] !== t) {
        t57 = NAV_LINKS.map({
            "Header[NAV_LINKS.map()]": (item_0)=>{
                const Icon_0 = item_0.icon;
                const active_0 = isNavActive(pathname, item_0.href);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: item_0.href,
                    onClick: {
                        "Header[NAV_LINKS.map() > <Link>.onClick]": ()=>setIsMenuOpen(false)
                    }["Header[NAV_LINKS.map() > <Link>.onClick]"],
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex min-h-11 items-center gap-3 rounded-[1.2rem] border px-4 text-sm font-medium transition", isRTL && "flex-row-reverse", active_0 ? "border-primary/30 bg-primary/5 text-primary" : "border-slate-200/80 bg-white/95 text-slate-600 hover:border-primary/30 hover:text-[#1D1D1F]"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon_0, {
                            size: 17
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/layout/Header.tsx",
                            lineNumber: 732,
                            columnNumber: 350
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: t(item_0.key)
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/layout/Header.tsx",
                            lineNumber: 732,
                            columnNumber: 370
                        }, this)
                    ]
                }, item_0.href, true, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 730,
                    columnNumber: 16
                }, this);
            }
        }["Header[NAV_LINKS.map()]"]);
        $[132] = isRTL;
        $[133] = pathname;
        $[134] = t;
        $[135] = t57;
    } else {
        t57 = $[135];
    }
    let t58;
    if ($[136] !== t57) {
        t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-2 border-t border-slate-100 pt-3",
            children: t57
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 744,
            columnNumber: 11
        }, this);
        $[136] = t57;
        $[137] = t58;
    } else {
        t58 = $[137];
    }
    let t59;
    if ($[138] !== t56 || $[139] !== t58) {
        t59 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t56,
            children: t58
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 752,
            columnNumber: 11
        }, this);
        $[138] = t56;
        $[139] = t58;
        $[140] = t59;
    } else {
        t59 = $[140];
    }
    let t60;
    if ($[141] !== t52 || $[142] !== t54 || $[143] !== t59) {
        t60 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "sticky top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-7xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative overflow-hidden rounded-[1.9rem] border border-white/80 bg-white/70 px-3 py-3 shadow-soft backdrop-blur-2xl sm:px-4 lg:px-5",
                    children: [
                        t11,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative space-y-3",
                            children: [
                                t52,
                                t54,
                                t59
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/src/components/layout/Header.tsx",
                            lineNumber: 761,
                            columnNumber: 280
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 761,
                    columnNumber: 125
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Header.tsx",
                lineNumber: 761,
                columnNumber: 83
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 761,
            columnNumber: 11
        }, this);
        $[141] = t52;
        $[142] = t54;
        $[143] = t59;
        $[144] = t60;
    } else {
        t60 = $[144];
    }
    return t60;
}
_s(Header, "D2UsBE/Jf3KZbQQiQxqRd/qjirs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeferredValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c1 = Header;
function _HeaderButtonOnClickSetIsMenuOpen(current) {
    return !current;
}
function _HeaderUseCartStore(state) {
    return state.totalItems;
}
var _c, _c1;
__turbopack_context__.k.register(_c, "HeaderSearch");
__turbopack_context__.k.register(_c1, "Header");
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

//# sourceMappingURL=_3e494d53._.js.map