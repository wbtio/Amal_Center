(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
(()=>{
    const e = new Error("Cannot find module '@/lib/storefront'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const StorefrontContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function writeLanguage(language) {
    document.documentElement.lang = language;
    document.documentElement.dir = getDirection(language);
    document.cookie = `${LANGUAGE_COOKIE}=${language}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem(LANGUAGE_COOKIE, language);
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
        t3 = getDirection(language);
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
        t7 = (key)=>translate(language, key);
        t8 = getMessages(language);
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
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(49);
    if ($[0] !== "c063ec949b71c6dee7eade32a1c22598a92729e84fe8d86ebb4e45ba8a9dd580") {
        for(let $i = 0; $i < 49; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c063ec949b71c6dee7eade32a1c22598a92729e84fe8d86ebb4e45ba8a9dd580";
    }
    const { isRTL, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = new Date().getFullYear();
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const currentYear = t0;
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white",
            children: "أ"
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 43,
            columnNumber: 10
        }, this);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const t2 = isRTL ? "text-right" : "text-left";
    let t3;
    let t4;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-semibold text-slate-900",
            children: "الأمل سنتر"
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 52,
            columnNumber: 10
        }, this);
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs uppercase tracking-[0.24em] text-primary/70",
            children: "Al-Amal Center"
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 53,
            columnNumber: 10
        }, this);
        $[3] = t3;
        $[4] = t4;
    } else {
        t3 = $[3];
        t4 = $[4];
    }
    let t5;
    if ($[5] !== t2) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "inline-flex items-center gap-3 rounded-3xl border border-emerald-100 bg-[#f6fbf6] px-4 py-3",
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: t2,
                    children: [
                        t3,
                        t4
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 62,
                    columnNumber: 123
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 62,
            columnNumber: 10
        }, this);
        $[5] = t2;
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] !== t) {
        t6 = t("footer.description");
        $[7] = t;
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    let t7;
    if ($[9] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "max-w-xl text-sm leading-7 text-slate-600",
            children: t6
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 78,
            columnNumber: 10
        }, this);
        $[9] = t6;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    if ($[11] !== t5 || $[12] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                t5,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 86,
            columnNumber: 10
        }, this);
        $[11] = t5;
        $[12] = t7;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    const t9 = isRTL ? "text-right" : "text-left";
    let t10;
    if ($[14] !== t) {
        t10 = t("footer.quickLinks");
        $[14] = t;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900",
            children: t10
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 104,
            columnNumber: 11
        }, this);
        $[16] = t10;
        $[17] = t11;
    } else {
        t11 = $[17];
    }
    let t12;
    if ($[18] !== t) {
        t12 = QUICK_LINKS.map({
            "Footer[QUICK_LINKS.map()]": (link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: link.href,
                    className: "text-sm text-slate-600 transition hover:text-primary",
                    children: t(link.key)
                }, link.href, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 113,
                    columnNumber: 44
                }, this)
        }["Footer[QUICK_LINKS.map()]"]);
        $[18] = t;
        $[19] = t12;
    } else {
        t12 = $[19];
    }
    let t13;
    if ($[20] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-3",
            children: t12
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 122,
            columnNumber: 11
        }, this);
        $[20] = t12;
        $[21] = t13;
    } else {
        t13 = $[21];
    }
    let t14;
    if ($[22] !== t11 || $[23] !== t13 || $[24] !== t9) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t9,
            children: [
                t11,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 130,
            columnNumber: 11
        }, this);
        $[22] = t11;
        $[23] = t13;
        $[24] = t9;
        $[25] = t14;
    } else {
        t14 = $[25];
    }
    const t15 = isRTL ? "text-right" : "text-left";
    let t16;
    if ($[26] !== t) {
        t16 = t("footer.contact");
        $[26] = t;
        $[27] = t16;
    } else {
        t16 = $[27];
    }
    let t17;
    if ($[28] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900",
            children: t16
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 149,
            columnNumber: 11
        }, this);
        $[28] = t16;
        $[29] = t17;
    } else {
        t17 = $[29];
    }
    let t18;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_URL,
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex items-center gap-2 transition hover:text-primary",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 157,
                    columnNumber: 151
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_NUMBER
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 157,
                    columnNumber: 178
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 157,
            columnNumber: 11
        }, this);
        $[30] = t18;
    } else {
        t18 = $[30];
    }
    let t19;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: `tel:${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_NUMBER}`,
            className: "inline-flex items-center gap-2 transition hover:text-primary",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 164,
                    columnNumber: 130
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].WHATSAPP_NUMBER
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 164,
                    columnNumber: 149
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 164,
            columnNumber: 11
        }, this);
        $[31] = t19;
    } else {
        t19 = $[31];
    }
    let t20;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].SUPPORT_EMAIL}`,
            className: "inline-flex items-center gap-2 transition hover:text-primary",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 171,
                    columnNumber: 131
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].SUPPORT_EMAIL
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 171,
                    columnNumber: 149
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 171,
            columnNumber: 11
        }, this);
        $[32] = t20;
    } else {
        t20 = $[32];
    }
    let t21;
    if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].FACEBOOK_URL,
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-100 bg-[#f6fbf6] text-slate-600 transition hover:border-primary hover:text-primary",
            "aria-label": "Facebook",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/web/src/components/layout/Footer.tsx",
                lineNumber: 178,
                columnNumber: 279
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 178,
            columnNumber: 11
        }, this);
        $[33] = t21;
    } else {
        t21 = $[33];
    }
    let t22;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-3 text-sm text-slate-600",
            children: [
                t18,
                t19,
                t20,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 pt-2",
                    children: [
                        t21,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].INSTAGRAM_URL,
                            target: "_blank",
                            rel: "noreferrer",
                            className: "inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-100 bg-[#f6fbf6] text-slate-600 transition hover:border-primary hover:text-primary",
                            "aria-label": "Instagram",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/layout/Footer.tsx",
                                lineNumber: 185,
                                columnNumber: 398
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/layout/Footer.tsx",
                            lineNumber: 185,
                            columnNumber: 128
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/layout/Footer.tsx",
                    lineNumber: 185,
                    columnNumber: 77
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 185,
            columnNumber: 11
        }, this);
        $[34] = t22;
    } else {
        t22 = $[34];
    }
    let t23;
    if ($[35] !== t15 || $[36] !== t17) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t15,
            children: [
                t17,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 192,
            columnNumber: 11
        }, this);
        $[35] = t15;
        $[36] = t17;
        $[37] = t23;
    } else {
        t23 = $[37];
    }
    let t24;
    if ($[38] !== t14 || $[39] !== t23 || $[40] !== t8) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8",
            children: [
                t8,
                t14,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 201,
            columnNumber: 11
        }, this);
        $[38] = t14;
        $[39] = t23;
        $[40] = t8;
        $[41] = t24;
    } else {
        t24 = $[41];
    }
    let t25;
    if ($[42] !== t) {
        t25 = t("footer.rights");
        $[42] = t;
        $[43] = t25;
    } else {
        t25 = $[43];
    }
    let t26;
    if ($[44] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border-t border-emerald-50 bg-[#f7fbf7] px-4 py-4 text-center text-xs text-slate-500",
            children: [
                currentYear,
                " © Al-Amal Center. ",
                t25
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 219,
            columnNumber: 11
        }, this);
        $[44] = t25;
        $[45] = t26;
    } else {
        t26 = $[45];
    }
    let t27;
    if ($[46] !== t24 || $[47] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
            className: "border-t border-white/60 bg-white/80",
            children: [
                t24,
                t26
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Footer.tsx",
            lineNumber: 227,
            columnNumber: 11
        }, this);
        $[46] = t24;
        $[47] = t26;
        $[48] = t27;
    } else {
        t27 = $[48];
    }
    return t27;
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
const NAV_ITEMS = [
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
    }
];
function Header() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(108);
    if ($[0] !== "f48095f79c4f5a70d806a0bf52bd51e9290c64021dafdb5606354e41973db729") {
        for(let $i = 0; $i < 108; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f48095f79c4f5a70d806a0bf52bd51e9290c64021dafdb5606354e41973db729";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const totalItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])(_HeaderUseCartStore);
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseSession"])();
    const { isRTL, t, toggleLanguage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    const accountHref = user ? "/account" : "/auth/login";
    let t0;
    if ($[1] !== t || $[2] !== user) {
        t0 = user ? t("nav.account") : t("nav.login");
        $[1] = t;
        $[2] = user;
        $[3] = t0;
    } else {
        t0 = $[3];
    }
    const accountLabel = t0;
    const t1 = user ? "nav.account" : "nav.login";
    let t2;
    if ($[4] !== accountHref || $[5] !== t1) {
        t2 = [
            ...NAV_ITEMS,
            {
                href: accountHref,
                key: t1
            }
        ];
        $[4] = accountHref;
        $[5] = t1;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    const mobileNavItems = t2;
    let t3;
    if ($[7] !== router) {
        t3 = ({
            "Header[handleSearchSubmit]": (event)=>{
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const nextQuery = String(formData.get("q") ?? "").trim();
                if (!nextQuery) {
                    router.push("/products");
                    setIsMenuOpen(false);
                    return;
                }
                router.push(`/products?q=${encodeURIComponent(nextQuery)}`);
                setIsMenuOpen(false);
            }
        })["Header[handleSearchSubmit]"];
        $[7] = router;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    const handleSearchSubmit = t3;
    let t4;
    if ($[9] !== router || $[10] !== toggleLanguage) {
        t4 = ({
            "Header[handleToggleLanguage]": ()=>{
                toggleLanguage();
                router.refresh();
            }
        })["Header[handleToggleLanguage]"];
        $[9] = router;
        $[10] = toggleLanguage;
        $[11] = t4;
    } else {
        t4 = $[11];
    }
    const handleToggleLanguage = t4;
    const t5 = isRTL && "sm:flex-row-reverse";
    let t6;
    if ($[12] !== t5) {
        t6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-between gap-3", t5);
        $[12] = t5;
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    let t7;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "Header[<button>.onClick]": ()=>setIsMenuOpen(_HeaderButtonOnClickSetIsMenuOpen)
        })["Header[<button>.onClick]"];
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] !== t) {
        t8 = t("nav.menu");
        $[15] = t;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== isMenuOpen) {
        t9 = isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 133,
            columnNumber: 23
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 133,
            columnNumber: 41
        }, this);
        $[17] = isMenuOpen;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    let t10;
    if ($[19] !== t8 || $[20] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-slate-700 shadow-sm transition hover:border-primary hover:text-primary lg:hidden",
            onClick: t7,
            "aria-label": t8,
            children: t9
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 141,
            columnNumber: 11
        }, this);
        $[19] = t8;
        $[20] = t9;
        $[21] = t10;
    } else {
        t10 = $[21];
    }
    const t11 = isRTL && "sm:flex-row-reverse";
    let t12;
    if ($[22] !== t11) {
        t12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group inline-flex items-center gap-3 rounded-3xl border border-emerald-100 bg-white/90 px-4 py-3 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/30", t11);
        $[22] = t11;
        $[23] = t12;
    } else {
        t12 = $[23];
    }
    let t13;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white",
            children: "أ"
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 159,
            columnNumber: 11
        }, this);
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    let t14;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex flex-col leading-tight",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs font-medium uppercase tracking-[0.28em] text-primary/70",
                    children: "Al-Amal Center"
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 166,
                    columnNumber: 57
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-ibm text-base font-semibold text-slate-900",
                    children: "الأمل سنتر"
                }, void 0, false, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 166,
                    columnNumber: 160
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 166,
            columnNumber: 11
        }, this);
        $[25] = t14;
    } else {
        t14 = $[25];
    }
    let t15;
    if ($[26] !== t12) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/",
            className: t12,
            children: [
                t13,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 173,
            columnNumber: 11
        }, this);
        $[26] = t12;
        $[27] = t15;
    } else {
        t15 = $[27];
    }
    let t16;
    if ($[28] !== t10 || $[29] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3",
            children: [
                t10,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 181,
            columnNumber: 11
        }, this);
        $[28] = t10;
        $[29] = t15;
        $[30] = t16;
    } else {
        t16 = $[30];
    }
    let t17;
    if ($[31] !== pathname || $[32] !== t) {
        t17 = NAV_ITEMS.map({
            "Header[NAV_ITEMS.map()]": (item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: item.href,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-full px-4 py-2 text-sm font-medium transition", pathname === item.href ? "bg-primary text-white shadow-sm" : "text-slate-600 hover:bg-white hover:text-primary"),
                    children: t(item.key)
                }, item.href, false, {
                    fileName: "[project]/web/src/components/layout/Header.tsx",
                    lineNumber: 191,
                    columnNumber: 42
                }, this)
        }["Header[NAV_ITEMS.map()]"]);
        $[31] = pathname;
        $[32] = t;
        $[33] = t17;
    } else {
        t17 = $[33];
    }
    let t18;
    if ($[34] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden items-center gap-2 lg:flex",
            children: t17
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 201,
            columnNumber: 11
        }, this);
        $[34] = t17;
        $[35] = t18;
    } else {
        t18 = $[35];
    }
    let t19;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
            size: 17
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 209,
            columnNumber: 11
        }, this);
        $[36] = t19;
    } else {
        t19 = $[36];
    }
    let t20;
    if ($[37] !== t) {
        t20 = t("nav.language");
        $[37] = t;
        $[38] = t20;
    } else {
        t20 = $[38];
    }
    let t21;
    if ($[39] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t20
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 224,
            columnNumber: 11
        }, this);
        $[39] = t20;
        $[40] = t21;
    } else {
        t21 = $[40];
    }
    let t22;
    if ($[41] !== handleToggleLanguage || $[42] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: handleToggleLanguage,
            className: "inline-flex h-11 items-center gap-2 rounded-2xl border border-emerald-100 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-primary hover:text-primary",
            children: [
                t19,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 232,
            columnNumber: 11
        }, this);
        $[41] = handleToggleLanguage;
        $[42] = t21;
        $[43] = t22;
    } else {
        t22 = $[43];
    }
    let t23;
    if ($[44] !== t) {
        t23 = t("nav.cart");
        $[44] = t;
        $[45] = t23;
    } else {
        t23 = $[45];
    }
    let t24;
    if ($[46] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
            size: 19
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 249,
            columnNumber: 11
        }, this);
        $[46] = t24;
    } else {
        t24 = $[46];
    }
    let t25;
    if ($[47] !== totalItems) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "absolute -right-1 -top-1 min-w-5 rounded-full bg-secondary px-1.5 py-0.5 text-center text-[11px] font-bold text-slate-900",
            children: totalItems
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 256,
            columnNumber: 11
        }, this);
        $[47] = totalItems;
        $[48] = t25;
    } else {
        t25 = $[48];
    }
    let t26;
    if ($[49] !== t23 || $[50] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/cart",
            className: "relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-slate-700 shadow-sm transition hover:border-primary hover:text-primary",
            "aria-label": t23,
            children: [
                t24,
                t25
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 264,
            columnNumber: 11
        }, this);
        $[49] = t23;
        $[50] = t25;
        $[51] = t26;
    } else {
        t26 = $[51];
    }
    let t27;
    if ($[52] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__["UserCircle2"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 273,
            columnNumber: 11
        }, this);
        $[52] = t27;
    } else {
        t27 = $[52];
    }
    let t28;
    if ($[53] !== accountLabel) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: accountLabel
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 280,
            columnNumber: 11
        }, this);
        $[53] = accountLabel;
        $[54] = t28;
    } else {
        t28 = $[54];
    }
    let t29;
    if ($[55] !== accountHref || $[56] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: accountHref,
            className: "hidden h-11 items-center gap-2 rounded-2xl border border-emerald-100 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-primary hover:text-primary sm:inline-flex",
            children: [
                t27,
                t28
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 288,
            columnNumber: 11
        }, this);
        $[55] = accountHref;
        $[56] = t28;
        $[57] = t29;
    } else {
        t29 = $[57];
    }
    let t30;
    if ($[58] !== t22 || $[59] !== t26 || $[60] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                t22,
                t26,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 297,
            columnNumber: 11
        }, this);
        $[58] = t22;
        $[59] = t26;
        $[60] = t29;
        $[61] = t30;
    } else {
        t30 = $[61];
    }
    let t31;
    if ($[62] !== t16 || $[63] !== t18 || $[64] !== t30 || $[65] !== t6) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t6,
            children: [
                t16,
                t18,
                t30
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 307,
            columnNumber: 11
        }, this);
        $[62] = t16;
        $[63] = t18;
        $[64] = t30;
        $[65] = t6;
        $[66] = t31;
    } else {
        t31 = $[66];
    }
    const t32 = isMenuOpen ? "block" : "hidden lg:flex";
    let t33;
    if ($[67] !== t32) {
        t33 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-3", t32);
        $[67] = t32;
        $[68] = t33;
    } else {
        t33 = $[68];
    }
    const t34 = isRTL ? "right-4" : "left-4";
    let t35;
    if ($[69] !== t34) {
        t35 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400", t34);
        $[69] = t34;
        $[70] = t35;
    } else {
        t35 = $[70];
    }
    let t36;
    if ($[71] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            className: t35,
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 336,
            columnNumber: 11
        }, this);
        $[71] = t35;
        $[72] = t36;
    } else {
        t36 = $[72];
    }
    let t37;
    if ($[73] !== searchParams) {
        t37 = searchParams.get("q") ?? "";
        $[73] = searchParams;
        $[74] = t37;
    } else {
        t37 = $[74];
    }
    const t38 = `${pathname}-${t37}`;
    let t39;
    if ($[75] !== searchParams) {
        t39 = searchParams.get("q") ?? "";
        $[75] = searchParams;
        $[76] = t39;
    } else {
        t39 = $[76];
    }
    let t40;
    if ($[77] !== t) {
        t40 = t("nav.search");
        $[77] = t;
        $[78] = t40;
    } else {
        t40 = $[78];
    }
    const t41 = isRTL ? "pr-12 text-right" : "pl-12";
    let t42;
    if ($[79] !== t41) {
        t42 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-12 w-full rounded-2xl border border-emerald-100 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-primary", t41);
        $[79] = t41;
        $[80] = t42;
    } else {
        t42 = $[80];
    }
    let t43;
    if ($[81] !== t38 || $[82] !== t39 || $[83] !== t40 || $[84] !== t42) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            name: "q",
            defaultValue: t39,
            placeholder: t40,
            className: t42
        }, t38, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 378,
            columnNumber: 11
        }, this);
        $[81] = t38;
        $[82] = t39;
        $[83] = t40;
        $[84] = t42;
        $[85] = t43;
    } else {
        t43 = $[85];
    }
    let t44;
    if ($[86] !== t36 || $[87] !== t43) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex-1",
            children: [
                t36,
                t43
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 389,
            columnNumber: 11
        }, this);
        $[86] = t36;
        $[87] = t43;
        $[88] = t44;
    } else {
        t44 = $[88];
    }
    let t45;
    if ($[89] !== t) {
        t45 = t("nav.search");
        $[89] = t;
        $[90] = t45;
    } else {
        t45 = $[90];
    }
    let t46;
    if ($[91] !== t45) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "submit",
            className: "inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#256a2a]",
            children: t45
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 406,
            columnNumber: 11
        }, this);
        $[91] = t45;
        $[92] = t46;
    } else {
        t46 = $[92];
    }
    let t47;
    if ($[93] !== handleSearchSubmit || $[94] !== t44 || $[95] !== t46) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSearchSubmit,
            className: "flex items-center gap-3",
            children: [
                t44,
                t46
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 414,
            columnNumber: 11
        }, this);
        $[93] = handleSearchSubmit;
        $[94] = t44;
        $[95] = t46;
        $[96] = t47;
    } else {
        t47 = $[96];
    }
    let t48;
    if ($[97] !== mobileNavItems || $[98] !== pathname || $[99] !== t) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-2 lg:hidden",
            children: mobileNavItems.map({
                "Header[mobileNavItems.map()]": (item_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: item_0.href,
                        onClick: {
                            "Header[mobileNavItems.map() > <Link>.onClick]": ()=>setIsMenuOpen(false)
                        }["Header[mobileNavItems.map() > <Link>.onClick]"],
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-2xl border px-4 py-3 text-sm font-medium transition", pathname === item_0.href ? "border-primary bg-primary text-white" : "border-emerald-100 bg-white text-slate-700 hover:border-primary/40 hover:text-primary"),
                        children: t(item_0.key)
                    }, item_0.href, false, {
                        fileName: "[project]/web/src/components/layout/Header.tsx",
                        lineNumber: 425,
                        columnNumber: 51
                    }, this)
            }["Header[mobileNavItems.map()]"])
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 424,
            columnNumber: 11
        }, this);
        $[97] = mobileNavItems;
        $[98] = pathname;
        $[99] = t;
        $[100] = t48;
    } else {
        t48 = $[100];
    }
    let t49;
    if ($[101] !== t33 || $[102] !== t47 || $[103] !== t48) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t33,
            children: [
                t47,
                t48
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 438,
            columnNumber: 11
        }, this);
        $[101] = t33;
        $[102] = t47;
        $[103] = t48;
        $[104] = t49;
    } else {
        t49 = $[104];
    }
    let t50;
    if ($[105] !== t31 || $[106] !== t49) {
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "sticky top-0 z-40 border-b border-white/60 bg-[#f7fbf7]/90 backdrop-blur-xl",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8",
                children: [
                    t31,
                    t49
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/layout/Header.tsx",
                lineNumber: 448,
                columnNumber: 107
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/layout/Header.tsx",
            lineNumber: 448,
            columnNumber: 11
        }, this);
        $[105] = t31;
        $[106] = t49;
        $[107] = t50;
    } else {
        t50 = $[107];
    }
    return t50;
}
_s(Header, "PqXGyTDcnkojimTclNh8tKlUf0E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"]
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

//# sourceMappingURL=_19d47526._.js.map