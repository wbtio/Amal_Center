(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/web/src/components/cart/CartView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartView",
    ()=>CartView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2d$percent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TicketPercent$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/ticket-percent.js [app-client] (ecmascript) <export default as TicketPercent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/storefront.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/store/cart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/utils.ts [app-client] (ecmascript)");
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
function CartView() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(122);
    if ($[0] !== "192dffa768e99c8f38d219675b71d348a18fb5f34e18e4232cf31ba6555c9ab2") {
        for(let $i = 0; $i < 122; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "192dffa768e99c8f38d219675b71d348a18fb5f34e18e4232cf31ba6555c9ab2";
    }
    const { language, isRTL, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    const { items, totalItems, totalIQD, updateQuantity, removeItem, clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])();
    const [couponCode, setCouponCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    if (items.length === 0) {
        let t0;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-slate-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                    size: 36,
                    className: "text-slate-300"
                }, void 0, false, {
                    fileName: "[project]/web/src/components/cart/CartView.tsx",
                    lineNumber: 37,
                    columnNumber: 105
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/src/components/cart/CartView.tsx",
                lineNumber: 37,
                columnNumber: 12
            }, this);
            $[1] = t0;
        } else {
            t0 = $[1];
        }
        let t1;
        if ($[2] !== t) {
            t1 = t("cart.empty");
            $[2] = t;
            $[3] = t1;
        } else {
            t1 = $[3];
        }
        let t2;
        if ($[4] !== t1) {
            t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mt-8 text-3xl font-semibold tracking-tight text-[#1D1D1F]",
                children: t1
            }, void 0, false, {
                fileName: "[project]/web/src/components/cart/CartView.tsx",
                lineNumber: 52,
                columnNumber: 12
            }, this);
            $[4] = t1;
            $[5] = t2;
        } else {
            t2 = $[5];
        }
        const t3 = language === "ar" ? "\u0627\u0628\u062F\u0623 \u0628\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u062D\u062A\u0627\u062C\u0647\u0627 \u0644\u064A\u0638\u0647\u0631 \u0645\u0644\u062E\u0635 \u0627\u0644\u0637\u0644\u0628 \u0647\u0646\u0627 \u0628\u0634\u0643\u0644 \u0648\u0627\u0636\u062D \u0648\u0633\u0631\u064A\u0639." : "Start adding the products you need and the order summary will appear here.";
        let t4;
        if ($[6] !== t3) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mx-auto mt-4 max-w-xl text-base leading-8 text-slate-500",
                children: t3
            }, void 0, false, {
                fileName: "[project]/web/src/components/cart/CartView.tsx",
                lineNumber: 61,
                columnNumber: 12
            }, this);
            $[6] = t3;
            $[7] = t4;
        } else {
            t4 = $[7];
        }
        let t5;
        if ($[8] !== t) {
            t5 = t("cart.continueShopping");
            $[8] = t;
            $[9] = t5;
        } else {
            t5 = $[9];
        }
        let t6;
        if ($[10] !== t5) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/products",
                className: "pill-button-primary mt-8",
                children: t5
            }, void 0, false, {
                fileName: "[project]/web/src/components/cart/CartView.tsx",
                lineNumber: 77,
                columnNumber: 12
            }, this);
            $[10] = t5;
            $[11] = t6;
        } else {
            t6 = $[11];
        }
        let t7;
        if ($[12] !== t2 || $[13] !== t4 || $[14] !== t6) {
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "soft-panel overflow-hidden px-6 py-16 text-center sm:px-12",
                children: [
                    t0,
                    t2,
                    t4,
                    t6
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/cart/CartView.tsx",
                lineNumber: 85,
                columnNumber: 12
            }, this);
            $[12] = t2;
            $[13] = t4;
            $[14] = t6;
            $[15] = t7;
        } else {
            t7 = $[15];
        }
        return t7;
    }
    let t0;
    if ($[16] !== isRTL || $[17] !== items || $[18] !== language || $[19] !== removeItem || $[20] !== t || $[21] !== updateQuantity) {
        let t1;
        if ($[23] !== isRTL || $[24] !== language || $[25] !== removeItem || $[26] !== t || $[27] !== updateQuantity) {
            t1 = ({
                "CartView[items.map()]": (item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "soft-panel flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-28 w-full rounded-[2rem] bg-slate-50 sm:w-28",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: item.product.image_url,
                                    alt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductName"])(item.product, language),
                                    className: "h-full w-full object-contain p-4"
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/cart/CartView.tsx",
                                    lineNumber: 100,
                                    columnNumber: 219
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/cart/CartView.tsx",
                                lineNumber: 100,
                                columnNumber: 155
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: isRTL ? "text-right" : "text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/product/${item.product.id}`,
                                            className: "text-xl font-semibold tracking-tight text-[#1D1D1F]",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductName"])(item.product, language)
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/cart/CartView.tsx",
                                            lineNumber: 100,
                                            columnNumber: 427
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm text-slate-500",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIQD"])(item.product.price_iqd, language)
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/cart/CartView.tsx",
                                            lineNumber: 100,
                                            columnNumber: 581
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web/src/components/cart/CartView.tsx",
                                    lineNumber: 100,
                                    columnNumber: 375
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/cart/CartView.tsx",
                                lineNumber: 100,
                                columnNumber: 351
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-wrap items-center gap-3", isRTL && "sm:flex-row-reverse"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex min-h-12 items-center rounded-full border border-slate-200 bg-slate-50 p-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: {
                                                    "CartView[items.map() > <button>.onClick]": ()=>updateQuantity(item.product.id, item.quantity - 1)
                                                }["CartView[items.map() > <button>.onClick]"],
                                                className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 transition hover:text-primary",
                                                "aria-label": language === "ar" ? "\u062A\u0642\u0644\u064A\u0644 \u0627\u0644\u0643\u0645\u064A\u0629" : "Decrease quantity",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/web/src/components/cart/CartView.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 316
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/cart/CartView.tsx",
                                                lineNumber: 100,
                                                columnNumber: 878
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "min-w-10 text-center text-sm font-semibold text-[#1D1D1F]",
                                                children: item.quantity
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/cart/CartView.tsx",
                                                lineNumber: 102,
                                                columnNumber: 344
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: {
                                                    "CartView[items.map() > <button>.onClick]": ()=>updateQuantity(item.product.id, item.quantity + 1)
                                                }["CartView[items.map() > <button>.onClick]"],
                                                className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40",
                                                "aria-label": language === "ar" ? "\u0632\u064A\u0627\u062F\u0629 \u0627\u0644\u0643\u0645\u064A\u0629" : "Increase quantity",
                                                disabled: item.quantity >= item.product.stock_quantity,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/web/src/components/cart/CartView.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 420
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/cart/CartView.tsx",
                                                lineNumber: 102,
                                                columnNumber: 442
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/cart/CartView.tsx",
                                        lineNumber: 100,
                                        columnNumber: 774
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: {
                                            "CartView[items.map() > <button>.onClick]": ()=>removeItem(item.product.id)
                                        }["CartView[items.map() > <button>.onClick]"],
                                        className: "inline-flex h-12 w-12 items-center justify-center rounded-full border border-rose-100 text-danger transition hover:bg-rose-50",
                                        "aria-label": t("cart.remove"),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/cart/CartView.tsx",
                                            lineNumber: 106,
                                            columnNumber: 228
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/cart/CartView.tsx",
                                        lineNumber: 104,
                                        columnNumber: 453
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/cart/CartView.tsx",
                                lineNumber: 100,
                                columnNumber: 685
                            }, this)
                        ]
                    }, item.product.id, true, {
                        fileName: "[project]/web/src/components/cart/CartView.tsx",
                        lineNumber: 100,
                        columnNumber: 42
                    }, this)
            })["CartView[items.map()]"];
            $[23] = isRTL;
            $[24] = language;
            $[25] = removeItem;
            $[26] = t;
            $[27] = updateQuantity;
            $[28] = t1;
        } else {
            t1 = $[28];
        }
        t0 = items.map(t1);
        $[16] = isRTL;
        $[17] = items;
        $[18] = language;
        $[19] = removeItem;
        $[20] = t;
        $[21] = updateQuantity;
        $[22] = t0;
    } else {
        t0 = $[22];
    }
    let t1;
    if ($[29] !== t0) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: t0
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 130,
            columnNumber: 10
        }, this);
        $[29] = t0;
        $[30] = t1;
    } else {
        t1 = $[30];
    }
    const t2 = isRTL ? "text-right" : "text-left";
    let t3;
    if ($[31] !== t) {
        t3 = t("cart.summary");
        $[31] = t;
        $[32] = t3;
    } else {
        t3 = $[32];
    }
    let t4;
    if ($[33] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: t3
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 147,
            columnNumber: 10
        }, this);
        $[33] = t3;
        $[34] = t4;
    } else {
        t4 = $[34];
    }
    let t5;
    if ($[35] !== t) {
        t5 = t("cart.summary");
        $[35] = t;
        $[36] = t5;
    } else {
        t5 = $[36];
    }
    let t6;
    if ($[37] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "mt-3 text-2xl font-semibold text-[#1D1D1F]",
            children: t5
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 163,
            columnNumber: 10
        }, this);
        $[37] = t5;
        $[38] = t6;
    } else {
        t6 = $[38];
    }
    let t7;
    if ($[39] !== t2 || $[40] !== t4 || $[41] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            children: [
                t4,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 171,
            columnNumber: 10
        }, this);
        $[39] = t2;
        $[40] = t4;
        $[41] = t6;
        $[42] = t7;
    } else {
        t7 = $[42];
    }
    let t8;
    if ($[43] !== t) {
        t8 = t("cart.totalItems");
        $[43] = t;
        $[44] = t8;
    } else {
        t8 = $[44];
    }
    let t9;
    if ($[45] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t8
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 189,
            columnNumber: 10
        }, this);
        $[45] = t8;
        $[46] = t9;
    } else {
        t9 = $[46];
    }
    let t10;
    if ($[47] !== totalItems) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-semibold text-[#1D1D1F]",
            children: totalItems
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 197,
            columnNumber: 11
        }, this);
        $[47] = totalItems;
        $[48] = t10;
    } else {
        t10 = $[48];
    }
    let t11;
    if ($[49] !== t10 || $[50] !== t9) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between text-sm text-slate-500",
            children: [
                t9,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 205,
            columnNumber: 11
        }, this);
        $[49] = t10;
        $[50] = t9;
        $[51] = t11;
    } else {
        t11 = $[51];
    }
    const t12 = language === "ar" ? "\u0627\u0644\u062E\u0635\u0645" : "Discount";
    let t13;
    if ($[52] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t12
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 215,
            columnNumber: 11
        }, this);
        $[52] = t12;
        $[53] = t13;
    } else {
        t13 = $[53];
    }
    let t14;
    if ($[54] !== language) {
        t14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIQD"])(0, language);
        $[54] = language;
        $[55] = t14;
    } else {
        t14 = $[55];
    }
    let t15;
    if ($[56] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-semibold text-[#1D1D1F]",
            children: t14
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 231,
            columnNumber: 11
        }, this);
        $[56] = t14;
        $[57] = t15;
    } else {
        t15 = $[57];
    }
    let t16;
    if ($[58] !== t13 || $[59] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between text-sm text-slate-500",
            children: [
                t13,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 239,
            columnNumber: 11
        }, this);
        $[58] = t13;
        $[59] = t15;
        $[60] = t16;
    } else {
        t16 = $[60];
    }
    let t17;
    if ($[61] !== t) {
        t17 = t("cart.totalAmount");
        $[61] = t;
        $[62] = t17;
    } else {
        t17 = $[62];
    }
    let t18;
    if ($[63] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-medium text-slate-500",
            children: t17
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 256,
            columnNumber: 11
        }, this);
        $[63] = t17;
        $[64] = t18;
    } else {
        t18 = $[64];
    }
    let t19;
    if ($[65] !== language || $[66] !== totalIQD) {
        t19 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIQD"])(totalIQD, language);
        $[65] = language;
        $[66] = totalIQD;
        $[67] = t19;
    } else {
        t19 = $[67];
    }
    let t20;
    if ($[68] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-2xl font-semibold text-[#1D1D1F]",
            children: t19
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 273,
            columnNumber: 11
        }, this);
        $[68] = t19;
        $[69] = t20;
    } else {
        t20 = $[69];
    }
    let t21;
    if ($[70] !== t18 || $[71] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between border-t border-slate-100 pt-4 text-base",
            children: [
                t18,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 281,
            columnNumber: 11
        }, this);
        $[70] = t18;
        $[71] = t20;
        $[72] = t21;
    } else {
        t21 = $[72];
    }
    let t22;
    if ($[73] !== t11 || $[74] !== t16 || $[75] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 space-y-4",
            children: [
                t11,
                t16,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 290,
            columnNumber: 11
        }, this);
        $[73] = t11;
        $[74] = t16;
        $[75] = t21;
        $[76] = t22;
    } else {
        t22 = $[76];
    }
    let t23;
    if ($[77] !== t22 || $[78] !== t7) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "soft-panel p-6",
            children: [
                t7,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 300,
            columnNumber: 11
        }, this);
        $[77] = t22;
        $[78] = t7;
        $[79] = t23;
    } else {
        t23 = $[79];
    }
    let t24;
    if ($[80] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-11 w-11 items-center justify-center rounded-full bg-slate-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2d$percent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TicketPercent$3e$__["TicketPercent"], {
                size: 18,
                className: "text-slate-500"
            }, void 0, false, {
                fileName: "[project]/web/src/components/cart/CartView.tsx",
                lineNumber: 309,
                columnNumber: 96
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 309,
            columnNumber: 11
        }, this);
        $[80] = t24;
    } else {
        t24 = $[80];
    }
    const t25 = isRTL ? "text-right" : "text-left";
    const t26 = language === "ar" ? "\u0643\u0648\u062F \u0627\u0644\u062E\u0635\u0645" : "Promo code";
    let t27;
    if ($[81] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-semibold text-[#1D1D1F]",
            children: t26
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 318,
            columnNumber: 11
        }, this);
        $[81] = t26;
        $[82] = t27;
    } else {
        t27 = $[82];
    }
    const t28 = language === "ar" ? "\u0648\u0627\u062C\u0647\u0629 \u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u062A\u0641\u0639\u064A\u0644 \u0644\u0627\u062D\u0642\u0627\u064B" : "UI ready for validation later";
    let t29;
    if ($[83] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-slate-500",
            children: t28
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 327,
            columnNumber: 11
        }, this);
        $[83] = t28;
        $[84] = t29;
    } else {
        t29 = $[84];
    }
    let t30;
    if ($[85] !== t25 || $[86] !== t27 || $[87] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-4 flex items-center gap-3",
            children: [
                t24,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: t25,
                    children: [
                        t27,
                        t29
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/cart/CartView.tsx",
                    lineNumber: 335,
                    columnNumber: 62
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 335,
            columnNumber: 11
        }, this);
        $[85] = t25;
        $[86] = t27;
        $[87] = t29;
        $[88] = t30;
    } else {
        t30 = $[88];
    }
    let t31;
    if ($[89] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = ({
            "CartView[<input>.onChange]": (event)=>setCouponCode(event.target.value)
        })["CartView[<input>.onChange]"];
        $[89] = t31;
    } else {
        t31 = $[89];
    }
    const t32 = language === "ar" ? "\u0623\u062F\u062E\u0644 \u0627\u0644\u0643\u0648\u062F" : "Enter code";
    let t33;
    if ($[90] !== couponCode || $[91] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            value: couponCode,
            onChange: t31,
            placeholder: t32,
            className: "field-input"
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 355,
            columnNumber: 11
        }, this);
        $[90] = couponCode;
        $[91] = t32;
        $[92] = t33;
    } else {
        t33 = $[92];
    }
    const t34 = language === "ar" ? "\u062A\u0637\u0628\u064A\u0642" : "Apply";
    let t35;
    if ($[93] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: "pill-button-ghost",
            children: t34
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 365,
            columnNumber: 11
        }, this);
        $[93] = t34;
        $[94] = t35;
    } else {
        t35 = $[94];
    }
    let t36;
    if ($[95] !== t33 || $[96] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t33,
                t35
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 373,
            columnNumber: 11
        }, this);
        $[95] = t33;
        $[96] = t35;
        $[97] = t36;
    } else {
        t36 = $[97];
    }
    let t37;
    if ($[98] !== t30 || $[99] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "soft-panel p-6",
            children: [
                t30,
                t36
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 382,
            columnNumber: 11
        }, this);
        $[98] = t30;
        $[99] = t36;
        $[100] = t37;
    } else {
        t37 = $[100];
    }
    let t38;
    if ($[101] !== t) {
        t38 = t("cart.checkout");
        $[101] = t;
        $[102] = t38;
    } else {
        t38 = $[102];
    }
    let t39;
    if ($[103] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/checkout",
            className: "pill-button-primary",
            children: t38
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 399,
            columnNumber: 11
        }, this);
        $[103] = t38;
        $[104] = t39;
    } else {
        t39 = $[104];
    }
    let t40;
    if ($[105] !== clearCart) {
        t40 = ({
            "CartView[<button>.onClick]": ()=>clearCart()
        })["CartView[<button>.onClick]"];
        $[105] = clearCart;
        $[106] = t40;
    } else {
        t40 = $[106];
    }
    let t41;
    if ($[107] !== t) {
        t41 = t("cart.clear");
        $[107] = t;
        $[108] = t41;
    } else {
        t41 = $[108];
    }
    let t42;
    if ($[109] !== t40 || $[110] !== t41) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t40,
            className: "pill-button-ghost",
            children: t41
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 425,
            columnNumber: 11
        }, this);
        $[109] = t40;
        $[110] = t41;
        $[111] = t42;
    } else {
        t42 = $[111];
    }
    let t43;
    if ($[112] !== t39 || $[113] !== t42) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "soft-panel p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3",
                children: [
                    t39,
                    t42
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/cart/CartView.tsx",
                lineNumber: 434,
                columnNumber: 43
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 434,
            columnNumber: 11
        }, this);
        $[112] = t39;
        $[113] = t42;
        $[114] = t43;
    } else {
        t43 = $[114];
    }
    let t44;
    if ($[115] !== t23 || $[116] !== t37 || $[117] !== t43) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "space-y-4 xl:sticky xl:top-28 xl:h-fit",
            children: [
                t23,
                t37,
                t43
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 443,
            columnNumber: 11
        }, this);
        $[115] = t23;
        $[116] = t37;
        $[117] = t43;
        $[118] = t44;
    } else {
        t44 = $[118];
    }
    let t45;
    if ($[119] !== t1 || $[120] !== t44) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]",
            children: [
                t1,
                t44
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/cart/CartView.tsx",
            lineNumber: 453,
            columnNumber: 11
        }, this);
        $[119] = t1;
        $[120] = t44;
        $[121] = t45;
    } else {
        t45 = $[121];
    }
    return t45;
}
_s(CartView, "BRQZ0qTV7wnw11u0oN6hmqS68Qk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"]
    ];
});
_c = CartView;
var _c;
__turbopack_context__.k.register(_c, "CartView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/app/cart/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CartPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$cart$2f$CartView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/cart/CartView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function CartPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(19);
    if ($[0] !== "4b762119e00288f809ea51984d305180e39b7616bb9f8b016f85917a5a1c03ad") {
        for(let $i = 0; $i < 19; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "4b762119e00288f809ea51984d305180e39b7616bb9f8b016f85917a5a1c03ad";
    }
    const { isRTL, t, language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    const t0 = isRTL ? "text-right" : "text-left";
    let t1;
    if ($[1] !== t) {
        t1 = t("cart.title");
        $[1] = t;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: t1
        }, void 0, false, {
            fileName: "[project]/web/src/app/cart/page.tsx",
            lineNumber: 30,
            columnNumber: 10
        }, this);
        $[3] = t1;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== t) {
        t3 = t("cart.title");
        $[5] = t;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "mt-4 text-4xl font-bold tracking-tight text-[#1D1D1F] sm:text-5xl",
            children: t3
        }, void 0, false, {
            fileName: "[project]/web/src/app/cart/page.tsx",
            lineNumber: 46,
            columnNumber: 10
        }, this);
        $[7] = t3;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    const t5 = language === "ar" ? "\u0631\u0627\u062C\u0639 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0642\u0628\u0644 \u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u0637\u0644\u0628\u060C \u0648\u0639\u062F\u0651\u0644 \u0627\u0644\u0643\u0645\u064A\u0629 \u0623\u0648 \u0623\u0636\u0641 \u0643\u0648\u062F \u062E\u0635\u0645 \u0639\u0646\u062F\u0645\u0627 \u064A\u0643\u0648\u0646 \u062C\u0627\u0647\u0632\u0627\u064B." : "Review the products before checkout, adjust quantities, and keep a promo code ready for later validation.";
    let t6;
    if ($[9] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-5 max-w-2xl text-lg leading-8 text-slate-500",
            children: t5
        }, void 0, false, {
            fileName: "[project]/web/src/app/cart/page.tsx",
            lineNumber: 55,
            columnNumber: 10
        }, this);
        $[9] = t5;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    if ($[11] !== t0 || $[12] !== t2 || $[13] !== t4 || $[14] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "soft-panel px-6 py-10 sm:px-8 lg:px-12 lg:py-14",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: t0,
                children: [
                    t2,
                    t4,
                    t6
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/app/cart/page.tsx",
                lineNumber: 63,
                columnNumber: 79
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/app/cart/page.tsx",
            lineNumber: 63,
            columnNumber: 10
        }, this);
        $[11] = t0;
        $[12] = t2;
        $[13] = t4;
        $[14] = t6;
        $[15] = t7;
    } else {
        t7 = $[15];
    }
    let t8;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$cart$2f$CartView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartView"], {}, void 0, false, {
            fileName: "[project]/web/src/app/cart/page.tsx",
            lineNumber: 74,
            columnNumber: 10
        }, this);
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== t7) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-10",
            children: [
                t7,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/app/cart/page.tsx",
            lineNumber: 81,
            columnNumber: 10
        }, this);
        $[17] = t7;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    return t9;
}
_s(CartPage, "TjIFwHjMkryow1lQFLOCDNkuwgo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"]
    ];
});
_c = CartPage;
var _c;
__turbopack_context__.k.register(_c, "CartPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=web_src_59cc2cb0._.js.map