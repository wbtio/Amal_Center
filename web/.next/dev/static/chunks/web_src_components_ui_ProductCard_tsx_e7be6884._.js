(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/src/components/ui/ProductCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductCard",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
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
function ProductCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(46);
    if ($[0] !== "fe12e30a4481536cae4310c1ae8dc87c83c6799b6b5d29306a4d3456d0de6107") {
        for(let $i = 0; $i < 46; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "fe12e30a4481536cae4310c1ae8dc87c83c6799b6b5d29306a4d3456d0de6107";
    }
    const { product } = t0;
    const addItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])(_ProductCardUseCartStore);
    const { language, isRTL } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    const t1 = `/product/${product.id}`;
    const t2 = product.image_url;
    let t3;
    if ($[1] !== language || $[2] !== product) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductName"])(product, language);
        $[1] = language;
        $[2] = product;
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    let t4;
    if ($[4] !== product.image_url || $[5] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-hidden bg-slate-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: t2,
                alt: t3,
                className: "aspect-[4/4.8] w-full object-cover transition duration-500 group-hover:scale-[1.03]",
                loading: "lazy"
            }, void 0, false, {
                fileName: "[project]/web/src/components/ui/ProductCard.tsx",
                lineNumber: 42,
                columnNumber: 56
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 42,
            columnNumber: 10
        }, this);
        $[4] = product.image_url;
        $[5] = t3;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== t1 || $[8] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: t1,
            className: "block",
            children: t4
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 51,
            columnNumber: 10
        }, this);
        $[7] = t1;
        $[8] = t4;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    const t6 = isRTL ? "text-right" : "text-left";
    const t7 = `/product/${product.id}`;
    let t8;
    if ($[10] !== language || $[11] !== product) {
        t8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductName"])(product, language);
        $[10] = language;
        $[11] = product;
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    let t9;
    if ($[13] !== t7 || $[14] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: t7,
            className: "line-clamp-2 text-sm font-semibold tracking-tight text-[#1D1D1F] sm:text-base",
            children: t8
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 71,
            columnNumber: 10
        }, this);
        $[13] = t7;
        $[14] = t8;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    const t10 = `mt-2 text-xs font-medium ${product.stock_quantity > 0 ? "text-primary" : "text-slate-500"}`;
    const t11 = product.stock_quantity > 0 ? language === "ar" ? "\u0645\u062A\u0648\u0641\u0631" : "In stock" : language === "ar" ? "\u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631" : "Out of stock";
    let t12;
    if ($[16] !== t10 || $[17] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: t10,
            children: t11
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 82,
            columnNumber: 11
        }, this);
        $[16] = t10;
        $[17] = t11;
        $[18] = t12;
    } else {
        t12 = $[18];
    }
    let t13;
    if ($[19] !== t12 || $[20] !== t6 || $[21] !== t9) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t6,
            children: [
                t9,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 91,
            columnNumber: 11
        }, this);
        $[19] = t12;
        $[20] = t6;
        $[21] = t9;
        $[22] = t13;
    } else {
        t13 = $[22];
    }
    const t14 = isRTL ? "text-right text-lg font-semibold text-[#1D1D1F]" : "text-left text-lg font-semibold text-[#1D1D1F]";
    let t15;
    if ($[23] !== language || $[24] !== product.price_iqd) {
        t15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIQD"])(product.price_iqd, language);
        $[23] = language;
        $[24] = product.price_iqd;
        $[25] = t15;
    } else {
        t15 = $[25];
    }
    let t16;
    if ($[26] !== t14 || $[27] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: t14,
            children: t15
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 111,
            columnNumber: 11
        }, this);
        $[26] = t14;
        $[27] = t15;
        $[28] = t16;
    } else {
        t16 = $[28];
    }
    let t17;
    if ($[29] !== addItem || $[30] !== product) {
        t17 = ({
            "ProductCard[<button>.onClick]": ()=>addItem(product)
        })["ProductCard[<button>.onClick]"];
        $[29] = addItem;
        $[30] = product;
        $[31] = t17;
    } else {
        t17 = $[31];
    }
    const t18 = product.stock_quantity <= 0;
    const t19 = `mt-auto inline-flex min-h-11 w-full items-center justify-center rounded-[0.625rem] px-4 py-2.5 text-sm font-semibold transition ${product.stock_quantity > 0 ? "bg-primary text-white hover:bg-primary/95" : "cursor-not-allowed bg-slate-200 text-slate-500"}`;
    const t20 = language === "ar" ? "\u0623\u0636\u0641 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629" : "Add to cart";
    let t21;
    if ($[32] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t20
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 134,
            columnNumber: 11
        }, this);
        $[32] = t20;
        $[33] = t21;
    } else {
        t21 = $[33];
    }
    let t22;
    if ($[34] !== t17 || $[35] !== t18 || $[36] !== t19 || $[37] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t17,
            disabled: t18,
            className: t19,
            children: t21
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 142,
            columnNumber: 11
        }, this);
        $[34] = t17;
        $[35] = t18;
        $[36] = t19;
        $[37] = t21;
        $[38] = t22;
    } else {
        t22 = $[38];
    }
    let t23;
    if ($[39] !== t13 || $[40] !== t16 || $[41] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-1 flex-col gap-2 p-3",
            children: [
                t13,
                t16,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 153,
            columnNumber: 11
        }, this);
        $[39] = t13;
        $[40] = t16;
        $[41] = t22;
        $[42] = t23;
    } else {
        t23 = $[42];
    }
    let t24;
    if ($[43] !== t23 || $[44] !== t5) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: "group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-200 hover:border-slate-300",
            children: [
                t5,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/ui/ProductCard.tsx",
            lineNumber: 163,
            columnNumber: 11
        }, this);
        $[43] = t23;
        $[44] = t5;
        $[45] = t24;
    } else {
        t24 = $[45];
    }
    return t24;
}
_s(ProductCard, "DvGrYvlOe+YWgoKVFOAlClQv9LE=", false, function() {
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
]);

//# sourceMappingURL=web_src_components_ui_ProductCard_tsx_e7be6884._.js.map