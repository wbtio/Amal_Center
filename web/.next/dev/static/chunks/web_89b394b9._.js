(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/src/components/home/StorefrontHomeCarousels.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DepartmentCarousel",
    ()=>DepartmentCarousel,
    "QuickCategoriesCarousel",
    ()=>QuickCategoriesCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/storefront.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
/* eslint-disable @next/next/no-img-element */ "use client";
;
;
;
;
;
;
function chunkItems(items, size) {
    if (size <= 0 || items.length === 0) {
        return items.length > 0 ? [
            items
        ] : [];
    }
    const chunks = [];
    for(let index = 0; index < items.length; index += size){
        chunks.push(items.slice(index, index + size));
    }
    return chunks;
}
function getQuickCategoryColumns(width) {
    if (width >= 1280) {
        return 6;
    }
    if (width >= 1024) {
        return 4;
    }
    if (width >= 640) {
        return 3;
    }
    return 2;
}
function CarouselButton(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "fca749c8d7b6b6c7bdee9ea2b50be683f3255e9262336fcd4f63b0bc51cd1a0d") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "fca749c8d7b6b6c7bdee9ea2b50be683f3255e9262336fcd4f63b0bc51cd1a0d";
    }
    const { side, label, disabled, onClick } = t0;
    const t1 = disabled ? "cursor-not-allowed opacity-45" : "hover:border-primary/40 hover:text-primary hover:shadow-soft";
    let t2;
    if ($[1] !== t1) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[#1D1D1F] transition duration-200", t1);
        $[1] = t1;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== side) {
        t3 = side === "left" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 68,
            columnNumber: 28
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 68,
            columnNumber: 56
        }, this);
        $[3] = side;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== disabled || $[6] !== label || $[7] !== onClick || $[8] !== t2 || $[9] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            "aria-label": label,
            onClick: onClick,
            disabled: disabled,
            className: t2,
            children: t3
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 76,
            columnNumber: 10
        }, this);
        $[5] = disabled;
        $[6] = label;
        $[7] = onClick;
        $[8] = t2;
        $[9] = t3;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    return t4;
}
_c = CarouselButton;
function QuickCategoryCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "fca749c8d7b6b6c7bdee9ea2b50be683f3255e9262336fcd4f63b0bc51cd1a0d") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "fca749c8d7b6b6c7bdee9ea2b50be683f3255e9262336fcd4f63b0bc51cd1a0d";
    }
    const { category, language, textAlignClass } = t0;
    const t1 = `/category/${category.id}`;
    let t2;
    if ($[1] !== category || $[2] !== language) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-hidden rounded-[1.5rem] bg-slate-100",
            children: category.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: category.image_url,
                alt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryName"])(category, language),
                className: "aspect-square w-full object-cover transition duration-500 group-hover:scale-105",
                loading: "lazy"
            }, void 0, false, {
                fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                lineNumber: 104,
                columnNumber: 95
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex aspect-square items-center justify-center bg-[linear-gradient(135deg,#eff7ef_0%,#f8fbf8_100%)] text-4xl text-primary",
                children: category.icon?.slice(0, 1) || "\u2022"
            }, void 0, false, {
                fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                lineNumber: 104,
                columnNumber: 279
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 104,
            columnNumber: 10
        }, this);
        $[1] = category;
        $[2] = language;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== textAlignClass) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-4 line-clamp-2 text-base font-semibold text-[#1D1D1F]", textAlignClass);
        $[4] = textAlignClass;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== category || $[7] !== language) {
        t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryName"])(category, language);
        $[6] = category;
        $[7] = language;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] !== t3 || $[10] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: t3,
            children: t4
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 130,
            columnNumber: 10
        }, this);
        $[9] = t3;
        $[10] = t4;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== t1 || $[13] !== t2 || $[14] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: t1,
            className: "group rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-premium",
            children: [
                t2,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 139,
            columnNumber: 10
        }, this);
        $[12] = t1;
        $[13] = t2;
        $[14] = t5;
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    return t6;
}
_c1 = QuickCategoryCard;
function DepartmentCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "fca749c8d7b6b6c7bdee9ea2b50be683f3255e9262336fcd4f63b0bc51cd1a0d") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "fca749c8d7b6b6c7bdee9ea2b50be683f3255e9262336fcd4f63b0bc51cd1a0d";
    }
    const { category, language, textAlignClass } = t0;
    const t1 = `/category/${category.id}`;
    let t2;
    if ($[1] !== category || $[2] !== language) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-hidden bg-slate-100",
            children: category.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: category.image_url,
                alt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryName"])(category, language),
                className: "aspect-[4/4.4] w-full object-cover transition duration-500 group-hover:scale-105",
                loading: "lazy"
            }, void 0, false, {
                fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                lineNumber: 165,
                columnNumber: 78
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex aspect-[4/4.4] items-center justify-center bg-[linear-gradient(135deg,#f1f8f1_0%,#fbfcfb_100%)] text-4xl text-primary",
                children: category.icon?.slice(0, 1) || "\u2022"
            }, void 0, false, {
                fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                lineNumber: 165,
                columnNumber: 263
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 165,
            columnNumber: 10
        }, this);
        $[1] = category;
        $[2] = language;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== textAlignClass) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("line-clamp-2 text-xs font-semibold text-[#1D1D1F] sm:text-base", textAlignClass);
        $[4] = textAlignClass;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== category || $[7] !== language) {
        t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryName"])(category, language);
        $[6] = category;
        $[7] = language;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] !== t3 || $[10] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-2.5 py-3 sm:px-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: t3,
                children: t4
            }, void 0, false, {
                fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                lineNumber: 191,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 191,
            columnNumber: 10
        }, this);
        $[9] = t3;
        $[10] = t4;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== t1 || $[13] !== t2 || $[14] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: t1,
            className: "group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-300 hover:border-primary/20",
            children: [
                t2,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 200,
            columnNumber: 10
        }, this);
        $[12] = t1;
        $[13] = t2;
        $[14] = t5;
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    return t6;
}
_c2 = DepartmentCard;
function QuickCategoriesCarousel(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(46);
    if ($[0] !== "fca749c8d7b6b6c7bdee9ea2b50be683f3255e9262336fcd4f63b0bc51cd1a0d") {
        for(let $i = 0; $i < 46; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "fca749c8d7b6b6c7bdee9ea2b50be683f3255e9262336fcd4f63b0bc51cd1a0d";
    }
    const { categories, language } = t0;
    const isRTL = language === "ar";
    const textAlignClass = isRTL ? "text-right" : "text-left";
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [columns, setColumns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2);
    let t1;
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "QuickCategoriesCarousel[useEffect()]": ()=>{
                const handleResize = {
                    "QuickCategoriesCarousel[useEffect() > handleResize]": ()=>{
                        setColumns(getQuickCategoryColumns(window.innerWidth));
                    }
                }["QuickCategoriesCarousel[useEffect() > handleResize]"];
                handleResize();
                window.addEventListener("resize", handleResize);
                return ()=>window.removeEventListener("resize", handleResize);
            }
        })["QuickCategoriesCarousel[useEffect()]"];
        t2 = [];
        $[1] = t1;
        $[2] = t2;
    } else {
        t1 = $[1];
        t2 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    const pageSize = columns * 2;
    let activePage;
    let nextLabel;
    let pageCount;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[3] !== categories || $[4] !== currentPage || $[5] !== isRTL || $[6] !== language || $[7] !== pageSize || $[8] !== textAlignClass) {
        t9 = Symbol.for("react.early_return_sentinel");
        bb0: {
            const pages = chunkItems(categories, pageSize);
            pageCount = pages.length;
            activePage = Math.min(currentPage, Math.max(pageCount - 1, 0));
            const previousLabel = language === "ar" ? "\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629" : "Previous categories";
            nextLabel = language === "ar" ? "\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u062A\u0627\u0644\u064A\u0629" : "Next categories";
            if (pageCount === 0) {
                t9 = null;
                break bb0;
            }
            t7 = "mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4";
            if ($[19] !== activePage || $[20] !== isRTL || $[21] !== previousLabel) {
                t8 = isRTL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CarouselButton, {
                    side: "right",
                    label: previousLabel,
                    disabled: activePage === 0,
                    onClick: {
                        "QuickCategoriesCarousel[<CarouselButton>.onClick]": ()=>setCurrentPage(_QuickCategoriesCarouselCarouselButtonOnClickSetCurrentPage)
                    }["QuickCategoriesCarousel[<CarouselButton>.onClick]"]
                }, void 0, false, {
                    fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                    lineNumber: 274,
                    columnNumber: 22
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CarouselButton, {
                    side: "left",
                    label: previousLabel,
                    disabled: activePage === 0,
                    onClick: {
                        "QuickCategoriesCarousel[<CarouselButton>.onClick]": ()=>setCurrentPage(_QuickCategoriesCarouselCarouselButtonOnClickSetCurrentPage2)
                    }["QuickCategoriesCarousel[<CarouselButton>.onClick]"]
                }, void 0, false, {
                    fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                    lineNumber: 276,
                    columnNumber: 70
                }, this);
                $[19] = activePage;
                $[20] = isRTL;
                $[21] = previousLabel;
                $[22] = t8;
            } else {
                t8 = $[22];
            }
            t6 = "min-w-0 overflow-hidden";
            t3 = "flex transition-transform duration-500 ease-out";
            const t10 = `translate3d(-${activePage * 100}%, 0, 0)`;
            if ($[23] !== t10) {
                t4 = {
                    transform: t10
                };
                $[23] = t10;
                $[24] = t4;
            } else {
                t4 = $[24];
            }
            let t11;
            if ($[25] !== language || $[26] !== pageSize || $[27] !== textAlignClass) {
                t11 = ({
                    "QuickCategoriesCarousel[pages.map()]": (pageCategories, pageIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid min-w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
                            children: [
                                pageCategories.map({
                                    "QuickCategoriesCarousel[pages.map() > pageCategories.map()]": (category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickCategoryCard, {
                                            category: category,
                                            language: language,
                                            textAlignClass: textAlignClass
                                        }, category.id, false, {
                                            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                                            lineNumber: 302,
                                            columnNumber: 90
                                        }, this)
                                }["QuickCategoriesCarousel[pages.map() > pageCategories.map()]"]),
                                Array.from({
                                    length: Math.max(0, pageSize - pageCategories.length)
                                }).map({
                                    "QuickCategoriesCarousel[pages.map() > (anonymous)()]": (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "aria-hidden": "true",
                                            className: "invisible"
                                        }, `quick-category-empty-${pageIndex}-${index}`, false, {
                                            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                                            lineNumber: 306,
                                            columnNumber: 85
                                        }, this)
                                }["QuickCategoriesCarousel[pages.map() > (anonymous)()]"])
                            ]
                        }, `quick-categories-page-${pageIndex}`, true, {
                            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                            lineNumber: 301,
                            columnNumber: 82
                        }, this)
                })["QuickCategoriesCarousel[pages.map()]"];
                $[25] = language;
                $[26] = pageSize;
                $[27] = textAlignClass;
                $[28] = t11;
            } else {
                t11 = $[28];
            }
            t5 = pages.map(t11);
        }
        $[3] = categories;
        $[4] = currentPage;
        $[5] = isRTL;
        $[6] = language;
        $[7] = pageSize;
        $[8] = textAlignClass;
        $[9] = activePage;
        $[10] = nextLabel;
        $[11] = pageCount;
        $[12] = t3;
        $[13] = t4;
        $[14] = t5;
        $[15] = t6;
        $[16] = t7;
        $[17] = t8;
        $[18] = t9;
    } else {
        activePage = $[9];
        nextLabel = $[10];
        pageCount = $[11];
        t3 = $[12];
        t4 = $[13];
        t5 = $[14];
        t6 = $[15];
        t7 = $[16];
        t8 = $[17];
        t9 = $[18];
    }
    if (t9 !== Symbol.for("react.early_return_sentinel")) {
        return t9;
    }
    let t10;
    if ($[29] !== t3 || $[30] !== t4 || $[31] !== t5) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            style: t4,
            children: t5
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 351,
            columnNumber: 11
        }, this);
        $[29] = t3;
        $[30] = t4;
        $[31] = t5;
        $[32] = t10;
    } else {
        t10 = $[32];
    }
    let t11;
    if ($[33] !== t10 || $[34] !== t6) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t6,
            children: t10
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 361,
            columnNumber: 11
        }, this);
        $[33] = t10;
        $[34] = t6;
        $[35] = t11;
    } else {
        t11 = $[35];
    }
    let t12;
    if ($[36] !== activePage || $[37] !== isRTL || $[38] !== nextLabel || $[39] !== pageCount) {
        t12 = isRTL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CarouselButton, {
            side: "left",
            label: nextLabel,
            disabled: activePage >= pageCount - 1,
            onClick: {
                "QuickCategoriesCarousel[<CarouselButton>.onClick]": ()=>setCurrentPage({
                        "QuickCategoriesCarousel[<CarouselButton>.onClick > setCurrentPage()]": (page_1)=>Math.min(page_1 + 1, pageCount - 1)
                    }["QuickCategoriesCarousel[<CarouselButton>.onClick > setCurrentPage()]"])
            }["QuickCategoriesCarousel[<CarouselButton>.onClick]"]
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 370,
            columnNumber: 19
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CarouselButton, {
            side: "right",
            label: nextLabel,
            disabled: activePage >= pageCount - 1,
            onClick: {
                "QuickCategoriesCarousel[<CarouselButton>.onClick]": ()=>setCurrentPage({
                        "QuickCategoriesCarousel[<CarouselButton>.onClick > setCurrentPage()]": (page_2)=>Math.min(page_2 + 1, pageCount - 1)
                    }["QuickCategoriesCarousel[<CarouselButton>.onClick > setCurrentPage()]"])
            }["QuickCategoriesCarousel[<CarouselButton>.onClick]"]
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 374,
            columnNumber: 66
        }, this);
        $[36] = activePage;
        $[37] = isRTL;
        $[38] = nextLabel;
        $[39] = pageCount;
        $[40] = t12;
    } else {
        t12 = $[40];
    }
    let t13;
    if ($[41] !== t11 || $[42] !== t12 || $[43] !== t7 || $[44] !== t8) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t7,
            children: [
                t8,
                t11,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 389,
            columnNumber: 11
        }, this);
        $[41] = t11;
        $[42] = t12;
        $[43] = t7;
        $[44] = t8;
        $[45] = t13;
    } else {
        t13 = $[45];
    }
    return t13;
}
_s(QuickCategoriesCarousel, "hdpMFhh+bDm4RJ0+UsTtzgZauJ8=");
_c3 = QuickCategoriesCarousel;
function _QuickCategoriesCarouselCarouselButtonOnClickSetCurrentPage2(page_0) {
    return Math.max(page_0 - 1, 0);
}
function _QuickCategoriesCarouselCarouselButtonOnClickSetCurrentPage(page) {
    return Math.max(page - 1, 0);
}
function DepartmentCarousel(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(42);
    if ($[0] !== "fca749c8d7b6b6c7bdee9ea2b50be683f3255e9262336fcd4f63b0bc51cd1a0d") {
        for(let $i = 0; $i < 42; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "fca749c8d7b6b6c7bdee9ea2b50be683f3255e9262336fcd4f63b0bc51cd1a0d";
    }
    const { categories, language } = t0;
    const isRTL = language === "ar";
    const textAlignClass = isRTL ? "text-right" : "text-left";
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    let activePage;
    let nextLabel;
    let pageCount;
    let t1;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    if ($[1] !== categories || $[2] !== currentPage || $[3] !== isRTL || $[4] !== language || $[5] !== textAlignClass) {
        t7 = Symbol.for("react.early_return_sentinel");
        bb0: {
            const pages = chunkItems(categories, 3);
            pageCount = pages.length;
            activePage = Math.min(currentPage, Math.max(pageCount - 1, 0));
            const previousLabel = language === "ar" ? "\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0633\u0627\u0628\u0642\u0629" : "Previous departments";
            nextLabel = language === "ar" ? "\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u062A\u0627\u0644\u064A\u0629" : "Next departments";
            if (pageCount === 0) {
                t7 = null;
                break bb0;
            }
            t5 = "mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4";
            if ($[16] !== activePage || $[17] !== isRTL || $[18] !== previousLabel) {
                t6 = isRTL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CarouselButton, {
                    side: "right",
                    label: previousLabel,
                    disabled: activePage === 0,
                    onClick: {
                        "DepartmentCarousel[<CarouselButton>.onClick]": ()=>setCurrentPage(_DepartmentCarouselCarouselButtonOnClickSetCurrentPage)
                    }["DepartmentCarousel[<CarouselButton>.onClick]"]
                }, void 0, false, {
                    fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                    lineNumber: 445,
                    columnNumber: 22
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CarouselButton, {
                    side: "left",
                    label: previousLabel,
                    disabled: activePage === 0,
                    onClick: {
                        "DepartmentCarousel[<CarouselButton>.onClick]": ()=>setCurrentPage(_DepartmentCarouselCarouselButtonOnClickSetCurrentPage2)
                    }["DepartmentCarousel[<CarouselButton>.onClick]"]
                }, void 0, false, {
                    fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                    lineNumber: 447,
                    columnNumber: 65
                }, this);
                $[16] = activePage;
                $[17] = isRTL;
                $[18] = previousLabel;
                $[19] = t6;
            } else {
                t6 = $[19];
            }
            t4 = "min-w-0 overflow-hidden";
            t1 = "flex transition-transform duration-500 ease-out";
            const t8 = `translate3d(-${activePage * 100}%, 0, 0)`;
            if ($[20] !== t8) {
                t2 = {
                    transform: t8
                };
                $[20] = t8;
                $[21] = t2;
            } else {
                t2 = $[21];
            }
            let t9;
            if ($[22] !== language || $[23] !== textAlignClass) {
                t9 = ({
                    "DepartmentCarousel[pages.map()]": (pageCategories, pageIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid min-w-full grid-cols-3 gap-2 sm:gap-4",
                            children: [
                                pageCategories.map({
                                    "DepartmentCarousel[pages.map() > pageCategories.map()]": (category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DepartmentCard, {
                                            category: category,
                                            language: language,
                                            textAlignClass: textAlignClass
                                        }, category.id, false, {
                                            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                                            lineNumber: 473,
                                            columnNumber: 85
                                        }, this)
                                }["DepartmentCarousel[pages.map() > pageCategories.map()]"]),
                                Array.from({
                                    length: Math.max(0, 3 - pageCategories.length)
                                }).map({
                                    "DepartmentCarousel[pages.map() > (anonymous)()]": (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "aria-hidden": "true",
                                            className: "invisible"
                                        }, `department-empty-${pageIndex}-${index}`, false, {
                                            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                                            lineNumber: 477,
                                            columnNumber: 80
                                        }, this)
                                }["DepartmentCarousel[pages.map() > (anonymous)()]"])
                            ]
                        }, `department-page-${pageIndex}`, true, {
                            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
                            lineNumber: 472,
                            columnNumber: 77
                        }, this)
                })["DepartmentCarousel[pages.map()]"];
                $[22] = language;
                $[23] = textAlignClass;
                $[24] = t9;
            } else {
                t9 = $[24];
            }
            t3 = pages.map(t9);
        }
        $[1] = categories;
        $[2] = currentPage;
        $[3] = isRTL;
        $[4] = language;
        $[5] = textAlignClass;
        $[6] = activePage;
        $[7] = nextLabel;
        $[8] = pageCount;
        $[9] = t1;
        $[10] = t2;
        $[11] = t3;
        $[12] = t4;
        $[13] = t5;
        $[14] = t6;
        $[15] = t7;
    } else {
        activePage = $[6];
        nextLabel = $[7];
        pageCount = $[8];
        t1 = $[9];
        t2 = $[10];
        t3 = $[11];
        t4 = $[12];
        t5 = $[13];
        t6 = $[14];
        t7 = $[15];
    }
    if (t7 !== Symbol.for("react.early_return_sentinel")) {
        return t7;
    }
    let t8;
    if ($[25] !== t1 || $[26] !== t2 || $[27] !== t3) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            style: t2,
            children: t3
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 520,
            columnNumber: 10
        }, this);
        $[25] = t1;
        $[26] = t2;
        $[27] = t3;
        $[28] = t8;
    } else {
        t8 = $[28];
    }
    let t9;
    if ($[29] !== t4 || $[30] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t4,
            children: t8
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 530,
            columnNumber: 10
        }, this);
        $[29] = t4;
        $[30] = t8;
        $[31] = t9;
    } else {
        t9 = $[31];
    }
    let t10;
    if ($[32] !== activePage || $[33] !== isRTL || $[34] !== nextLabel || $[35] !== pageCount) {
        t10 = isRTL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CarouselButton, {
            side: "left",
            label: nextLabel,
            disabled: activePage >= pageCount - 1,
            onClick: {
                "DepartmentCarousel[<CarouselButton>.onClick]": ()=>setCurrentPage({
                        "DepartmentCarousel[<CarouselButton>.onClick > setCurrentPage()]": (page_1)=>Math.min(page_1 + 1, pageCount - 1)
                    }["DepartmentCarousel[<CarouselButton>.onClick > setCurrentPage()]"])
            }["DepartmentCarousel[<CarouselButton>.onClick]"]
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 539,
            columnNumber: 19
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CarouselButton, {
            side: "right",
            label: nextLabel,
            disabled: activePage >= pageCount - 1,
            onClick: {
                "DepartmentCarousel[<CarouselButton>.onClick]": ()=>setCurrentPage({
                        "DepartmentCarousel[<CarouselButton>.onClick > setCurrentPage()]": (page_2)=>Math.min(page_2 + 1, pageCount - 1)
                    }["DepartmentCarousel[<CarouselButton>.onClick > setCurrentPage()]"])
            }["DepartmentCarousel[<CarouselButton>.onClick]"]
        }, void 0, false, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 543,
            columnNumber: 61
        }, this);
        $[32] = activePage;
        $[33] = isRTL;
        $[34] = nextLabel;
        $[35] = pageCount;
        $[36] = t10;
    } else {
        t10 = $[36];
    }
    let t11;
    if ($[37] !== t10 || $[38] !== t5 || $[39] !== t6 || $[40] !== t9) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t5,
            children: [
                t6,
                t9,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/home/StorefrontHomeCarousels.tsx",
            lineNumber: 558,
            columnNumber: 11
        }, this);
        $[37] = t10;
        $[38] = t5;
        $[39] = t6;
        $[40] = t9;
        $[41] = t11;
    } else {
        t11 = $[41];
    }
    return t11;
}
_s1(DepartmentCarousel, "kF5zyetxw6M8BnbNC3J8pG5ccpI=");
_c4 = DepartmentCarousel;
function _DepartmentCarouselCarouselButtonOnClickSetCurrentPage2(page_0) {
    return Math.max(page_0 - 1, 0);
}
function _DepartmentCarouselCarouselButtonOnClickSetCurrentPage(page) {
    return Math.max(page - 1, 0);
}
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "CarouselButton");
__turbopack_context__.k.register(_c1, "QuickCategoryCard");
__turbopack_context__.k.register(_c2, "DepartmentCard");
__turbopack_context__.k.register(_c3, "QuickCategoriesCarousel");
__turbopack_context__.k.register(_c4, "DepartmentCarousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronLeft
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
            d: "m15 18-6-6 6-6",
            key: "1wnfg3"
        }
    ]
];
const ChevronLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("chevron-left", __iconNode);
;
 //# sourceMappingURL=chevron-left.js.map
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronRight
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
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }
    ]
];
const ChevronRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("chevron-right", __iconNode);
;
 //# sourceMappingURL=chevron-right.js.map
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=web_89b394b9._.js.map