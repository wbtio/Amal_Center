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

//# sourceMappingURL=_9c62179f._.js.map