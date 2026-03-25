(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/src/components/ui/ProductCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductCard",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/storefront.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/store/cart.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/* eslint-disable @next/next/no-img-element */ "use client";
;
;
;
;
;
;
function ProductCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(64);
    if ($[0] !== "be169bdaae42f8b628c7fbcac215d316816cc89948e4b8002bbece695cebc448") {
        for(let $i = 0; $i < 64; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "be169bdaae42f8b628c7fbcac215d316816cc89948e4b8002bbece695cebc448";
    }
    const { product } = t0;
    const addItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])(_ProductCardUseCartStore);
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    const hasDiscount = typeof product.original_price === "number" && product.original_price > product.price_iqd;
    let t1;
    if ($[1] !== hasDiscount || $[2] !== product.original_price || $[3] !== product.price_iqd) {
        t1 = hasDiscount ? Math.round(((product.original_price ?? product.price_iqd) - product.price_iqd) / (product.original_price ?? product.price_iqd) * 100) : 0;
        $[1] = hasDiscount;
        $[2] = product.original_price;
        $[3] = product.price_iqd;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const discountPercent = t1;
    const t2 = `/product/${product.id}`;
    const t3 = product.image_url;
    let t4;
    if ($[5] !== language || $[6] !== product) {
        t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductName"])(product, language);
        $[5] = language;
        $[6] = product;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] !== product.image_url || $[9] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: t3,
            alt: t4,
            className: "h-full w-full object-cover transition duration-500 group-hover:scale-105",
            loading: "lazy"
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 54,
            columnNumber: 10
        }, this);
        $[8] = product.image_url;
        $[9] = t4;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] !== discountPercent || $[12] !== hasDiscount || $[13] !== language) {
        t6 = hasDiscount ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "absolute top-2.5 start-2.5 rounded-md bg-[#1D1D1F] px-2.5 py-1 text-xs font-semibold text-white",
            children: language === "ar" ? `خصم ${discountPercent}%` : `${discountPercent}% off`
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 63,
            columnNumber: 24
        }, this) : null;
        $[11] = discountPercent;
        $[12] = hasDiscount;
        $[13] = language;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    let t7;
    if ($[15] !== t2 || $[16] !== t5 || $[17] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: t2,
            className: "relative block flex-[7_7_0%] overflow-hidden bg-slate-50",
            children: [
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 73,
            columnNumber: 10
        }, this);
        $[15] = t2;
        $[16] = t5;
        $[17] = t6;
        $[18] = t7;
    } else {
        t7 = $[18];
    }
    const t8 = `/product/${product.id}`;
    let t9;
    if ($[19] !== language || $[20] !== product) {
        t9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductName"])(product, language);
        $[19] = language;
        $[20] = product;
        $[21] = t9;
    } else {
        t9 = $[21];
    }
    let t10;
    if ($[22] !== t8 || $[23] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: t8,
            className: "line-clamp-1 text-sm font-semibold tracking-tight text-[#1D1D1F]",
            children: t9
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 93,
            columnNumber: 11
        }, this);
        $[22] = t8;
        $[23] = t9;
        $[24] = t10;
    } else {
        t10 = $[24];
    }
    const t11 = `mt-0.5 text-[11px] font-medium ${product.stock_quantity > 0 ? "text-primary" : "text-danger"}`;
    const t12 = product.stock_quantity > 0 ? language === "ar" ? "\u0645\u062A\u0648\u0641\u0631" : "In stock" : language === "ar" ? "\u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631" : "Out of stock";
    let t13;
    if ($[25] !== t11 || $[26] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: t11,
            children: t12
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 104,
            columnNumber: 11
        }, this);
        $[25] = t11;
        $[26] = t12;
        $[27] = t13;
    } else {
        t13 = $[27];
    }
    let t14;
    if ($[28] !== t10 || $[29] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t10,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 113,
            columnNumber: 11
        }, this);
        $[28] = t10;
        $[29] = t13;
        $[30] = t14;
    } else {
        t14 = $[30];
    }
    let t15;
    if ($[31] !== language || $[32] !== product.price_iqd) {
        t15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIQD"])(product.price_iqd, language);
        $[31] = language;
        $[32] = product.price_iqd;
        $[33] = t15;
    } else {
        t15 = $[33];
    }
    let t16;
    if ($[34] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-bold text-[#1D1D1F]",
            children: t15
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 131,
            columnNumber: 11
        }, this);
        $[34] = t15;
        $[35] = t16;
    } else {
        t16 = $[35];
    }
    let t17;
    if ($[36] !== hasDiscount || $[37] !== language || $[38] !== product.original_price || $[39] !== product.price_iqd) {
        t17 = hasDiscount ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[11px] text-slate-400 line-through",
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIQD"])(product.original_price ?? product.price_iqd, language)
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 139,
            columnNumber: 25
        }, this) : null;
        $[36] = hasDiscount;
        $[37] = language;
        $[38] = product.original_price;
        $[39] = product.price_iqd;
        $[40] = t17;
    } else {
        t17 = $[40];
    }
    let t18;
    if ($[41] !== t16 || $[42] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-start",
            children: [
                t16,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 150,
            columnNumber: 11
        }, this);
        $[41] = t16;
        $[42] = t17;
        $[43] = t18;
    } else {
        t18 = $[43];
    }
    let t19;
    if ($[44] !== addItem || $[45] !== product) {
        t19 = ({
            "ProductCard[<button>.onClick]": (e)=>{
                e.preventDefault();
                addItem(product);
            }
        })["ProductCard[<button>.onClick]"];
        $[44] = addItem;
        $[45] = product;
        $[46] = t19;
    } else {
        t19 = $[46];
    }
    const t20 = product.stock_quantity <= 0;
    const t21 = `inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${product.stock_quantity > 0 ? "bg-primary text-white hover:bg-primary/90" : "cursor-not-allowed bg-slate-200 text-slate-500"}`;
    let t22;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
            size: 13
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 175,
            columnNumber: 11
        }, this);
        $[47] = t22;
    } else {
        t22 = $[47];
    }
    const t23 = language === "ar" ? "\u0623\u0636\u0641 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629" : "Add to cart";
    let t24;
    if ($[48] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t23
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 183,
            columnNumber: 11
        }, this);
        $[48] = t23;
        $[49] = t24;
    } else {
        t24 = $[49];
    }
    let t25;
    if ($[50] !== t19 || $[51] !== t20 || $[52] !== t21 || $[53] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t19,
            disabled: t20,
            className: t21,
            children: [
                t22,
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 191,
            columnNumber: 11
        }, this);
        $[50] = t19;
        $[51] = t20;
        $[52] = t21;
        $[53] = t24;
        $[54] = t25;
    } else {
        t25 = $[54];
    }
    let t26;
    if ($[55] !== t18 || $[56] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between gap-2",
            children: [
                t18,
                t25
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 202,
            columnNumber: 11
        }, this);
        $[55] = t18;
        $[56] = t25;
        $[57] = t26;
    } else {
        t26 = $[57];
    }
    let t27;
    if ($[58] !== t14 || $[59] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-[3_3_0%] flex-col justify-between gap-1.5 px-3 py-2.5 text-start",
            children: [
                t14,
                t26
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 211,
            columnNumber: 11
        }, this);
        $[58] = t14;
        $[59] = t26;
        $[60] = t27;
    } else {
        t27 = $[60];
    }
    let t28;
    if ($[61] !== t27 || $[62] !== t7) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: "group flex flex-col overflow-hidden rounded-[10px] bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-premium",
            children: [
                t7,
                t27
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 220,
            columnNumber: 11
        }, this);
        $[61] = t27;
        $[62] = t7;
        $[63] = t28;
    } else {
        t28 = $[63];
    }
    return t28;
}
_s(ProductCard, "gj5Fm58Sjk0Ec1OzTJMcBoXK82k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"]
    ];
});
_c = ProductCard;
function _ProductCardUseCartStore(state) {
    return state.addItem;
}
var _c;
__turbopack_context__.k.register(_c, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/components/catalog/ProductsExplorer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductsExplorer",
    ()=>ProductsExplorer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$StorefrontSearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/search/StorefrontSearchBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$useCatalogSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/search/useCatalogSearch.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$ui$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/ui/ProductCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/storefront.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/* eslint-disable @next/next/no-img-element */ "use client";
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
function ProductsExplorer(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(159);
    if ($[0] !== "1f1521a5592bfaa0d42aa19f64930eea5948f28b9f2fff292e14885b07e28bf1") {
        for(let $i = 0; $i < 159; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1f1521a5592bfaa0d42aa19f64930eea5948f28b9f2fff292e14885b07e28bf1";
    }
    const { categories, products, initialCategory, initialSort, initialMinPrice, initialMaxPrice, initialInStock, currentPage, productsPerPage } = t0;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { language, isRTL, messages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    const [isPending, startRouteTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const [minPrice, setMinPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMinPrice);
    const [maxPrice, setMaxPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMaxPrice);
    let t1;
    if ($[1] !== pathname || $[2] !== router || $[3] !== searchParams) {
        t1 = {
            pathname,
            router,
            searchParams
        };
        $[1] = pathname;
        $[2] = router;
        $[3] = searchParams;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const { searchValue: search, setSearchValue: setSearch, submitSearch, clearSearch, isSearchPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$useCatalogSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCatalogSearch"])(t1);
    let t2;
    let t3;
    if ($[5] !== initialMinPrice) {
        t2 = ({
            "ProductsExplorer[useEffect()]": ()=>{
                setMinPrice(initialMinPrice);
            }
        })["ProductsExplorer[useEffect()]"];
        t3 = [
            initialMinPrice
        ];
        $[5] = initialMinPrice;
        $[6] = t2;
        $[7] = t3;
    } else {
        t2 = $[6];
        t3 = $[7];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    let t5;
    if ($[8] !== initialMaxPrice) {
        t4 = ({
            "ProductsExplorer[useEffect()]": ()=>{
                setMaxPrice(initialMaxPrice);
            }
        })["ProductsExplorer[useEffect()]"];
        t5 = [
            initialMaxPrice
        ];
        $[8] = initialMaxPrice;
        $[9] = t4;
        $[10] = t5;
    } else {
        t4 = $[9];
        t5 = $[10];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    let t6;
    if ($[11] !== pathname || $[12] !== router || $[13] !== searchParams) {
        t6 = function replaceQuery(updates, options) {
            const params = new URLSearchParams(searchParams.toString());
            for (const [key, value] of Object.entries(updates)){
                if (value === undefined || value === null || value === "" || value === false) {
                    params.delete(key);
                    continue;
                }
                params.set(key, String(value));
            }
            const query = params.toString();
            startRouteTransition({
                "ProductsExplorer[replaceQuery > startRouteTransition()]": ()=>{
                    router.replace(query ? `${pathname}?${query}` : pathname, {
                        scroll: options?.scroll ?? false
                    });
                }
            }["ProductsExplorer[replaceQuery > startRouteTransition()]"]);
        };
        $[11] = pathname;
        $[12] = router;
        $[13] = searchParams;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    const replaceQuery = t6;
    let t7;
    if ($[15] !== pathname || $[16] !== router || $[17] !== setSearch) {
        t7 = function clearFilters() {
            setSearch("");
            setMinPrice("");
            setMaxPrice("");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startTransition"])({
                "ProductsExplorer[clearFilters > startTransition()]": ()=>{
                    router.replace(pathname, {
                        scroll: false
                    });
                }
            }["ProductsExplorer[clearFilters > startTransition()]"]);
        };
        $[15] = pathname;
        $[16] = router;
        $[17] = setSearch;
        $[18] = t7;
    } else {
        t7 = $[18];
    }
    const clearFilters = t7;
    let t8;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                lineNumber: 165,
                columnNumber: 111
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 165,
            columnNumber: 10
        }, this);
        $[19] = t8;
    } else {
        t8 = $[19];
    }
    let t9;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: "Filters"
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 172,
            columnNumber: 10
        }, this);
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    const t10 = language === "ar" ? "\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0646\u062A\u0627\u0626\u062C" : "Refine results";
    let t11;
    if ($[21] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-5 flex items-center gap-3",
            children: [
                t8,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-start",
                    children: [
                        t9,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold text-[#1D1D1F]",
                            children: t10
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                            lineNumber: 180,
                            columnNumber: 93
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                    lineNumber: 180,
                    columnNumber: 61
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 180,
            columnNumber: 11
        }, this);
        $[21] = t10;
        $[22] = t11;
    } else {
        t11 = $[22];
    }
    const t12 = language === "ar" ? "\u0627\u0644\u0623\u0642\u0633\u0627\u0645" : "Categories";
    let t13;
    if ($[23] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-semibold text-[#1D1D1F]",
            children: t12
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 189,
            columnNumber: 11
        }, this);
        $[23] = t12;
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    let t14;
    if ($[25] !== replaceQuery) {
        t14 = ({
            "ProductsExplorer[<button>.onClick]": ()=>replaceQuery({
                    category: null
                })
        })["ProductsExplorer[<button>.onClick]"];
        $[25] = replaceQuery;
        $[26] = t14;
    } else {
        t14 = $[26];
    }
    const t15 = !initialCategory ? "border-primary bg-primary/5 text-primary shadow-soft" : "border-slate-200 text-slate-600 hover:border-primary/30 hover:bg-slate-50";
    let t16;
    if ($[27] !== t15) {
        t16 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm transition", "text-start", t15);
        $[27] = t15;
        $[28] = t16;
    } else {
        t16 = $[28];
    }
    const t17 = !initialCategory ? "border-primary/20 bg-primary/10 text-primary" : "border-slate-200 bg-slate-100 text-slate-500";
    let t18;
    if ($[29] !== t17) {
        t18 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border", t17);
        $[29] = t17;
        $[30] = t18;
    } else {
        t18 = $[30];
    }
    let t19;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 227,
            columnNumber: 11
        }, this);
        $[31] = t19;
    } else {
        t19 = $[31];
    }
    let t20;
    if ($[32] !== t18) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t18,
            children: t19
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 234,
            columnNumber: 11
        }, this);
        $[32] = t18;
        $[33] = t20;
    } else {
        t20 = $[33];
    }
    let t21;
    if ($[34] !== messages.products.allCategories) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "min-w-0 truncate font-medium",
            children: messages.products.allCategories
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 242,
            columnNumber: 11
        }, this);
        $[34] = messages.products.allCategories;
        $[35] = t21;
    } else {
        t21 = $[35];
    }
    let t22;
    if ($[36] !== t14 || $[37] !== t16 || $[38] !== t20 || $[39] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t14,
            className: t16,
            children: [
                t20,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 250,
            columnNumber: 11
        }, this);
        $[36] = t14;
        $[37] = t16;
        $[38] = t20;
        $[39] = t21;
        $[40] = t22;
    } else {
        t22 = $[40];
    }
    let t23;
    if ($[41] !== categories || $[42] !== initialCategory || $[43] !== language || $[44] !== replaceQuery) {
        let t24;
        if ($[46] !== initialCategory || $[47] !== language || $[48] !== replaceQuery) {
            t24 = ({
                "ProductsExplorer[categories.map()]": (category)=>{
                    const selected = initialCategory === category.id;
                    const categoryName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryName"])(category, language);
                    const fallbackLabel = category.icon?.trim()?.[0] || categoryName.trim().charAt(0) || "\u2022";
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: {
                            "ProductsExplorer[categories.map() > <button>.onClick]": ()=>replaceQuery({
                                    category: selected ? null : category.id
                                })
                        }["ProductsExplorer[categories.map() > <button>.onClick]"],
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm transition", "text-start", selected ? "border-primary bg-primary/5 text-primary shadow-soft" : "border-slate-200 text-slate-600 hover:border-primary/30 hover:bg-slate-50"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border", selected ? "border-primary/20 bg-primary/10" : "border-slate-200 bg-slate-100"),
                                children: category.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: category.image_url,
                                    alt: categoryName,
                                    className: "h-full w-full object-cover",
                                    loading: "lazy"
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                                    lineNumber: 272,
                                    columnNumber: 532
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-base font-semibold", selected ? "text-primary" : "text-slate-500"),
                                    children: fallbackLabel
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                                    lineNumber: 272,
                                    columnNumber: 640
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                                lineNumber: 272,
                                columnNumber: 320
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "min-w-0 truncate font-medium",
                                children: categoryName
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                                lineNumber: 272,
                                columnNumber: 764
                            }, this)
                        ]
                    }, category.id, true, {
                        fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                        lineNumber: 268,
                        columnNumber: 18
                    }, this);
                }
            })["ProductsExplorer[categories.map()]"];
            $[46] = initialCategory;
            $[47] = language;
            $[48] = replaceQuery;
            $[49] = t24;
        } else {
            t24 = $[49];
        }
        t23 = categories.map(t24);
        $[41] = categories;
        $[42] = initialCategory;
        $[43] = language;
        $[44] = replaceQuery;
        $[45] = t23;
    } else {
        t23 = $[45];
    }
    let t24;
    if ($[50] !== t22 || $[51] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-2",
            children: [
                t22,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 293,
            columnNumber: 11
        }, this);
        $[50] = t22;
        $[51] = t23;
        $[52] = t24;
    } else {
        t24 = $[52];
    }
    let t25;
    if ($[53] !== t13 || $[54] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: [
                t13,
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 302,
            columnNumber: 11
        }, this);
        $[53] = t13;
        $[54] = t24;
        $[55] = t25;
    } else {
        t25 = $[55];
    }
    const t26 = language === "ar" ? "\u0646\u0637\u0627\u0642 \u0627\u0644\u0633\u0639\u0631" : "Price range";
    let t27;
    if ($[56] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-semibold text-[#1D1D1F]",
            children: t26
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 312,
            columnNumber: 11
        }, this);
        $[56] = t26;
        $[57] = t27;
    } else {
        t27 = $[57];
    }
    let t28;
    if ($[58] !== replaceQuery) {
        t28 = ({
            "ProductsExplorer[<input>.onChange]": (event)=>{
                const next = event.target.value;
                setMinPrice(next);
                replaceQuery({
                    minPrice: next
                });
            }
        })["ProductsExplorer[<input>.onChange]"];
        $[58] = replaceQuery;
        $[59] = t28;
    } else {
        t28 = $[59];
    }
    const t29 = language === "ar" ? "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649" : "Minimum";
    let t30;
    if ($[60] !== minPrice || $[61] !== t28 || $[62] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            value: minPrice,
            onChange: t28,
            inputMode: "numeric",
            placeholder: t29,
            className: "field-input h-12"
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 337,
            columnNumber: 11
        }, this);
        $[60] = minPrice;
        $[61] = t28;
        $[62] = t29;
        $[63] = t30;
    } else {
        t30 = $[63];
    }
    let t31;
    if ($[64] !== replaceQuery) {
        t31 = ({
            "ProductsExplorer[<input>.onChange]": (event_0)=>{
                const next_0 = event_0.target.value;
                setMaxPrice(next_0);
                replaceQuery({
                    maxPrice: next_0
                });
            }
        })["ProductsExplorer[<input>.onChange]"];
        $[64] = replaceQuery;
        $[65] = t31;
    } else {
        t31 = $[65];
    }
    const t32 = language === "ar" ? "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0639\u0644\u0649" : "Maximum";
    let t33;
    if ($[66] !== maxPrice || $[67] !== t31 || $[68] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            value: maxPrice,
            onChange: t31,
            inputMode: "numeric",
            placeholder: t32,
            className: "field-input h-12"
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 364,
            columnNumber: 11
        }, this);
        $[66] = maxPrice;
        $[67] = t31;
        $[68] = t32;
        $[69] = t33;
    } else {
        t33 = $[69];
    }
    let t34;
    if ($[70] !== t30 || $[71] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-1",
            children: [
                t30,
                t33
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 374,
            columnNumber: 11
        }, this);
        $[70] = t30;
        $[71] = t33;
        $[72] = t34;
    } else {
        t34 = $[72];
    }
    let t35;
    if ($[73] !== t27 || $[74] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: [
                t27,
                t34
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 383,
            columnNumber: 11
        }, this);
        $[73] = t27;
        $[74] = t34;
        $[75] = t35;
    } else {
        t35 = $[75];
    }
    const t36 = language === "ar" ? "\u0627\u0644\u0645\u062A\u0648\u0641\u0631 \u0641\u0642\u0637" : "In stock only";
    let t37;
    if ($[76] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm font-medium text-slate-700",
            children: t36
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 393,
            columnNumber: 11
        }, this);
        $[76] = t36;
        $[77] = t37;
    } else {
        t37 = $[77];
    }
    let t38;
    if ($[78] !== initialInStock || $[79] !== replaceQuery) {
        t38 = ({
            "ProductsExplorer[<button>.onClick]": ()=>replaceQuery({
                    inStock: !initialInStock || null
                })
        })["ProductsExplorer[<button>.onClick]"];
        $[78] = initialInStock;
        $[79] = replaceQuery;
        $[80] = t38;
    } else {
        t38 = $[80];
    }
    const t39 = initialInStock ? "bg-primary" : "bg-slate-200";
    let t40;
    if ($[81] !== t39) {
        t40 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative h-7 w-12 rounded-full transition", t39);
        $[81] = t39;
        $[82] = t40;
    } else {
        t40 = $[82];
    }
    const t41 = initialInStock ? "end-1" : "start-1";
    let t42;
    if ($[83] !== t41) {
        t42 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition", t41);
        $[83] = t41;
        $[84] = t42;
    } else {
        t42 = $[84];
    }
    let t43;
    if ($[85] !== t42) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t42
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 432,
            columnNumber: 11
        }, this);
        $[85] = t42;
        $[86] = t43;
    } else {
        t43 = $[86];
    }
    let t44;
    if ($[87] !== initialInStock || $[88] !== t38 || $[89] !== t40 || $[90] !== t43) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t38,
            className: t40,
            "aria-pressed": initialInStock,
            children: t43
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 440,
            columnNumber: 11
        }, this);
        $[87] = initialInStock;
        $[88] = t38;
        $[89] = t40;
        $[90] = t43;
        $[91] = t44;
    } else {
        t44 = $[91];
    }
    let t45;
    if ($[92] !== t37 || $[93] !== t44) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex cursor-pointer items-center justify-between gap-4 rounded-3xl bg-slate-50 px-4 py-4",
            children: [
                t37,
                t44
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 451,
            columnNumber: 11
        }, this);
        $[92] = t37;
        $[93] = t44;
        $[94] = t45;
    } else {
        t45 = $[94];
    }
    const t46 = language === "ar" ? "\u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631" : "Clear filters";
    let t47;
    if ($[95] !== clearFilters || $[96] !== t46) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: clearFilters,
            className: "pill-button-ghost w-full",
            children: t46
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 461,
            columnNumber: 11
        }, this);
        $[95] = clearFilters;
        $[96] = t46;
        $[97] = t47;
    } else {
        t47 = $[97];
    }
    let t48;
    if ($[98] !== t25 || $[99] !== t35 || $[100] !== t45 || $[101] !== t47) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                t25,
                t35,
                t45,
                t47
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 470,
            columnNumber: 11
        }, this);
        $[98] = t25;
        $[99] = t35;
        $[100] = t45;
        $[101] = t47;
        $[102] = t48;
    } else {
        t48 = $[102];
    }
    let t49;
    if ($[103] !== t11 || $[104] !== t48) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "space-y-5 lg:sticky lg:top-28 lg:h-fit",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "soft-panel p-6",
                children: [
                    t11,
                    t48
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                lineNumber: 481,
                columnNumber: 69
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 481,
            columnNumber: 11
        }, this);
        $[103] = t11;
        $[104] = t48;
        $[105] = t49;
    } else {
        t49 = $[105];
    }
    const t50 = search.trim() ? language === "ar" ? "\u0647\u0630\u0627 \u0627\u0644\u0628\u062D\u062B \u0645\u0631\u062A\u0628\u0637 \u0628\u0646\u0641\u0633 \u0646\u062A\u0627\u0626\u062C \u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0648\u064A\u062A\u062D\u062F\u062B \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0643\u062A\u0627\u0628\u0629." : "This search is synced with the products results and updates while typing." : null;
    let t51;
    if ($[106] !== clearSearch || $[107] !== isRTL || $[108] !== isSearchPending || $[109] !== messages.products.searchPlaceholder || $[110] !== search || $[111] !== setSearch || $[112] !== submitSearch || $[113] !== t50) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$StorefrontSearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorefrontSearchBar"], {
            value: search,
            isRTL: isRTL,
            placeholder: messages.products.searchPlaceholder,
            helperText: t50,
            pending: isSearchPending,
            variant: "page",
            onChange: setSearch,
            onClear: clearSearch,
            onSubmit: submitSearch
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 491,
            columnNumber: 11
        }, this);
        $[106] = clearSearch;
        $[107] = isRTL;
        $[108] = isSearchPending;
        $[109] = messages.products.searchPlaceholder;
        $[110] = search;
        $[111] = setSearch;
        $[112] = submitSearch;
        $[113] = t50;
        $[114] = t51;
    } else {
        t51 = $[114];
    }
    let t52;
    if ($[115] !== isPending || $[116] !== isSearchPending || $[117] !== language) {
        t52 = isPending || isSearchPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ms-2 text-primary",
            children: language === "ar" ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u062F\u064A\u062B" : "Updating"
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 506,
            columnNumber: 42
        }, this) : null;
        $[115] = isPending;
        $[116] = isSearchPending;
        $[117] = language;
        $[118] = t52;
    } else {
        t52 = $[118];
    }
    let t53;
    if ($[119] !== messages.products.results || $[120] !== products.length || $[121] !== t52) {
        t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-slate-500 text-start",
            children: [
                products.length,
                " ",
                messages.products.results,
                t52
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 516,
            columnNumber: 11
        }, this);
        $[119] = messages.products.results;
        $[120] = products.length;
        $[121] = t52;
        $[122] = t53;
    } else {
        t53 = $[122];
    }
    let t54;
    if ($[123] !== replaceQuery) {
        t54 = ({
            "ProductsExplorer[<select>.onChange]": (event_1)=>replaceQuery({
                    sort: event_1.target.value || null
                })
        })["ProductsExplorer[<select>.onChange]"];
        $[123] = replaceQuery;
        $[124] = t54;
    } else {
        t54 = $[124];
    }
    const t55 = language === "ar" ? "\u0627\u0644\u0623\u062D\u062F\u062B \u0623\u0648\u0644\u0627\u064B" : "Newest first";
    let t56;
    if ($[125] !== t55) {
        t56 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "newest",
            children: t55
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 539,
            columnNumber: 11
        }, this);
        $[125] = t55;
        $[126] = t56;
    } else {
        t56 = $[126];
    }
    const t57 = language === "ar" ? "\u0627\u0644\u0633\u0639\u0631: \u0645\u0646 \u0627\u0644\u0623\u0642\u0644" : "Price: low to high";
    let t58;
    if ($[127] !== t57) {
        t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "price_low",
            children: t57
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 548,
            columnNumber: 11
        }, this);
        $[127] = t57;
        $[128] = t58;
    } else {
        t58 = $[128];
    }
    const t59 = language === "ar" ? "\u0627\u0644\u0633\u0639\u0631: \u0645\u0646 \u0627\u0644\u0623\u0639\u0644\u0649" : "Price: high to low";
    let t60;
    if ($[129] !== t59) {
        t60 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "price_high",
            children: t59
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 557,
            columnNumber: 11
        }, this);
        $[129] = t59;
        $[130] = t60;
    } else {
        t60 = $[130];
    }
    const t61 = language === "ar" ? "\u0627\u0644\u0627\u0633\u0645" : "Name";
    let t62;
    if ($[131] !== t61) {
        t62 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "name_az",
            children: t61
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 566,
            columnNumber: 11
        }, this);
        $[131] = t61;
        $[132] = t62;
    } else {
        t62 = $[132];
    }
    let t63;
    if ($[133] !== initialSort || $[134] !== t54 || $[135] !== t56 || $[136] !== t58 || $[137] !== t60 || $[138] !== t62) {
        t63 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
            value: initialSort,
            onChange: t54,
            className: "field-select",
            children: [
                t56,
                t58,
                t60,
                t62
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 574,
            columnNumber: 11
        }, this);
        $[133] = initialSort;
        $[134] = t54;
        $[135] = t56;
        $[136] = t58;
        $[137] = t60;
        $[138] = t62;
        $[139] = t63;
    } else {
        t63 = $[139];
    }
    let t64;
    if ($[140] !== t53 || $[141] !== t63) {
        t64 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-3 sm:grid-cols-[auto_220px] sm:items-center",
            children: [
                t53,
                t63
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 587,
            columnNumber: 11
        }, this);
        $[140] = t53;
        $[141] = t63;
        $[142] = t64;
    } else {
        t64 = $[142];
    }
    let t65;
    if ($[143] !== t51 || $[144] !== t64) {
        t65 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "soft-panel overflow-hidden p-5 sm:p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center",
                children: [
                    t51,
                    t64
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                lineNumber: 596,
                columnNumber: 66
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 596,
            columnNumber: 11
        }, this);
        $[143] = t51;
        $[144] = t64;
        $[145] = t65;
    } else {
        t65 = $[145];
    }
    let t66;
    if ($[146] !== currentPage || $[147] !== language || $[148] !== messages.products.empty || $[149] !== products || $[150] !== productsPerPage || $[151] !== replaceQuery) {
        t66 = products.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
                    children: products.map(_ProductsExplorerProductsMap)
                }, void 0, false, {
                    fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                    lineNumber: 605,
                    columnNumber: 35
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 flex items-center justify-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: {
                                "ProductsExplorer[<button>.onClick]": ()=>{
                                    if (currentPage > 1) {
                                        replaceQuery({
                                            page: currentPage - 1 > 1 ? String(currentPage - 1) : null
                                        });
                                    }
                                }
                            }["ProductsExplorer[<button>.onClick]"],
                            disabled: currentPage === 1,
                            className: "pill-button-ghost disabled:cursor-not-allowed disabled:opacity-40",
                            children: language === "ar" ? "\u0627\u0644\u0633\u0627\u0628\u0642" : "Previous"
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                            lineNumber: 605,
                            columnNumber: 216
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-slate-600",
                            children: language === "ar" ? `صفحة ${currentPage}` : `Page ${currentPage}`
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                            lineNumber: 613,
                            columnNumber: 239
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: {
                                "ProductsExplorer[<button>.onClick]": ()=>{
                                    if (products.length === productsPerPage) {
                                        replaceQuery({
                                            page: String(currentPage + 1)
                                        });
                                    }
                                }
                            }["ProductsExplorer[<button>.onClick]"],
                            disabled: products.length < productsPerPage,
                            className: "pill-button-ghost disabled:cursor-not-allowed disabled:opacity-40",
                            children: language === "ar" ? "\u0627\u0644\u062A\u0627\u0644\u064A" : "Next"
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                            lineNumber: 613,
                            columnNumber: 354
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                    lineNumber: 605,
                    columnNumber: 155
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "soft-panel px-8 py-16 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg font-semibold text-[#1D1D1F]",
                    children: messages.products.empty
                }, void 0, false, {
                    fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                    lineNumber: 621,
                    columnNumber: 314
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-3 text-sm leading-7 text-slate-500",
                    children: language === "ar" ? "\u062C\u0631\u0651\u0628 \u062A\u063A\u064A\u064A\u0631 \u0643\u0644\u0645\u0627\u062A \u0627\u0644\u0628\u062D\u062B \u0623\u0648 \u062A\u0648\u0633\u064A\u0639 \u0646\u0637\u0627\u0642 \u0627\u0644\u0633\u0639\u0631." : "Try adjusting the search terms or widening the price range."
                }, void 0, false, {
                    fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
                    lineNumber: 621,
                    columnNumber: 395
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 621,
            columnNumber: 263
        }, this);
        $[146] = currentPage;
        $[147] = language;
        $[148] = messages.products.empty;
        $[149] = products;
        $[150] = productsPerPage;
        $[151] = replaceQuery;
        $[152] = t66;
    } else {
        t66 = $[152];
    }
    let t67;
    if ($[153] !== t65 || $[154] !== t66) {
        t67 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                t65,
                t66
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 634,
            columnNumber: 11
        }, this);
        $[153] = t65;
        $[154] = t66;
        $[155] = t67;
    } else {
        t67 = $[155];
    }
    let t68;
    if ($[156] !== t49 || $[157] !== t67) {
        t68 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-10",
            children: [
                t49,
                t67
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
            lineNumber: 643,
            columnNumber: 11
        }, this);
        $[156] = t49;
        $[157] = t67;
        $[158] = t68;
    } else {
        t68 = $[158];
    }
    return t68;
}
_s(ProductsExplorer, "Opkr8mOBTeUIVp41KBedOeWqvzk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$search$2f$useCatalogSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCatalogSearch"]
    ];
});
_c = ProductsExplorer;
function _ProductsExplorerProductsMap(product) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$ui$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductCard"], {
        product: product
    }, product.id, false, {
        fileName: "[project]/web/src/components/catalog/ProductsExplorer.tsx",
        lineNumber: 653,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "ProductsExplorer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>SlidersHorizontal
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M10 5H3",
            key: "1qgfaw"
        }
    ],
    [
        "path",
        {
            d: "M12 19H3",
            key: "yhmn1j"
        }
    ],
    [
        "path",
        {
            d: "M14 3v4",
            key: "1sua03"
        }
    ],
    [
        "path",
        {
            d: "M16 17v4",
            key: "1q0r14"
        }
    ],
    [
        "path",
        {
            d: "M21 12h-9",
            key: "1o4lsq"
        }
    ],
    [
        "path",
        {
            d: "M21 19h-5",
            key: "1rlt1p"
        }
    ],
    [
        "path",
        {
            d: "M21 5h-7",
            key: "1oszz2"
        }
    ],
    [
        "path",
        {
            d: "M8 10v4",
            key: "tgpxqk"
        }
    ],
    [
        "path",
        {
            d: "M8 12H3",
            key: "a7s4jb"
        }
    ]
];
const SlidersHorizontal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("sliders-horizontal", __iconNode);
;
 //# sourceMappingURL=sliders-horizontal.js.map
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SlidersHorizontal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ShoppingCart
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "8",
            cy: "21",
            r: "1",
            key: "jimo8o"
        }
    ],
    [
        "circle",
        {
            cx: "19",
            cy: "21",
            r: "1",
            key: "13723u"
        }
    ],
    [
        "path",
        {
            d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
            key: "9zh506"
        }
    ]
];
const ShoppingCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("shopping-cart", __iconNode);
;
 //# sourceMappingURL=shopping-cart.js.map
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShoppingCart",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=web_86bc3f45._.js.map