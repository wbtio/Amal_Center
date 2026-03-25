(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/src/components/ui/CategoriesCarousel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoriesCarousel",
    ()=>CategoriesCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-client] (ecmascript)");
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
function CategoriesCarousel(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(41);
    if ($[0] !== "dbad5804c266b46fdc2ce86c593938f491aa5dbf863809302a749219bf762e42") {
        for(let $i = 0; $i < 41; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "dbad5804c266b46fdc2ce86c593938f491aa5dbf863809302a749219bf762e42";
    }
    const { categories, columns: t1 } = t0;
    const columns = t1 === undefined ? 6 : t1;
    const { language, isRTL } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    const itemsPerPage = columns * 2;
    const totalPages = Math.ceil(categories.length / itemsPerPage);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const canGoPrev = page > 0;
    const canGoNext = page < totalPages - 1;
    let t2;
    if ($[1] !== canGoNext) {
        t2 = ({
            "CategoriesCarousel[goNext]": ()=>{
                if (canGoNext) {
                    setPage(_CategoriesCarouselGoNextSetPage);
                }
            }
        })["CategoriesCarousel[goNext]"];
        $[1] = canGoNext;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const goNext = t2;
    let t3;
    if ($[3] !== canGoPrev) {
        t3 = ({
            "CategoriesCarousel[goPrev]": ()=>{
                if (canGoPrev) {
                    setPage(_CategoriesCarouselGoPrevSetPage);
                }
            }
        })["CategoriesCarousel[goPrev]"];
        $[3] = canGoPrev;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const goPrev = t3;
    const handleLeftClick = isRTL ? goNext : goPrev;
    const handleRightClick = isRTL ? goPrev : goNext;
    const canClickLeft = isRTL ? canGoNext : canGoPrev;
    const canClickRight = isRTL ? canGoPrev : canGoNext;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[5] !== canClickLeft || $[6] !== canClickRight || $[7] !== categories || $[8] !== handleLeftClick || $[9] !== handleRightClick || $[10] !== isRTL || $[11] !== itemsPerPage || $[12] !== language || $[13] !== page || $[14] !== totalPages) {
        const pages = [];
        for(let i = 0; i < categories.length; i = i + itemsPerPage, i){
            pages.push(categories.slice(i, i + itemsPerPage));
        }
        t8 = "relative";
        if ($[21] !== canClickLeft || $[22] !== canClickRight || $[23] !== handleLeftClick || $[24] !== handleRightClick || $[25] !== isRTL || $[26] !== totalPages) {
            t9 = totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleLeftClick,
                        disabled: !canClickLeft,
                        "aria-label": isRTL ? "\u0627\u0644\u062A\u0627\u0644\u064A" : "Previous",
                        className: "absolute -start-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-soft transition hover:border-primary/30 hover:shadow-premium disabled:cursor-not-allowed disabled:opacity-30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/ui/CategoriesCarousel.tsx",
                            lineNumber: 86,
                            columnNumber: 443
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/web/src/components/ui/CategoriesCarousel.tsx",
                        lineNumber: 86,
                        columnNumber: 32
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleRightClick,
                        disabled: !canClickRight,
                        "aria-label": isRTL ? "\u0627\u0644\u0633\u0627\u0628\u0642" : "Next",
                        className: "absolute -end-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-soft transition hover:border-primary/30 hover:shadow-premium disabled:cursor-not-allowed disabled:opacity-30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/ui/CategoriesCarousel.tsx",
                            lineNumber: 86,
                            columnNumber: 884
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/web/src/components/ui/CategoriesCarousel.tsx",
                        lineNumber: 86,
                        columnNumber: 477
                    }, this)
                ]
            }, void 0, true);
            $[21] = canClickLeft;
            $[22] = canClickRight;
            $[23] = handleLeftClick;
            $[24] = handleRightClick;
            $[25] = isRTL;
            $[26] = totalPages;
            $[27] = t9;
        } else {
            t9 = $[27];
        }
        t7 = "overflow-hidden";
        t4 = "flex transition-transform duration-500 ease-in-out";
        const t10 = isRTL ? `translateX(${page * 100}%)` : `translateX(-${page * 100}%)`;
        if ($[28] !== t10) {
            t5 = {
                transform: t10
            };
            $[28] = t10;
            $[29] = t5;
        } else {
            t5 = $[29];
        }
        t6 = pages.map({
            "CategoriesCarousel[pages.map()]": (group, pageIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid w-full flex-shrink-0 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
                    children: group.map({
                        "CategoriesCarousel[pages.map() > group.map()]": (category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/category/${category.id}`,
                                className: "group rounded-xl border border-slate-200 bg-white p-3 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-premium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden rounded-lg bg-slate-100",
                                        children: category.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: category.image_url,
                                            alt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryName"])(category, language),
                                            className: "aspect-square w-full object-cover transition duration-500 group-hover:scale-105",
                                            loading: "lazy"
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/ui/CategoriesCarousel.tsx",
                                            lineNumber: 111,
                                            columnNumber: 377
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex aspect-square items-center justify-center bg-[linear-gradient(135deg,#eff7ef_0%,#f8fbf8_100%)] text-4xl text-primary",
                                            children: category.icon?.slice(0, 1) || "\u2022"
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/ui/CategoriesCarousel.tsx",
                                            lineNumber: 111,
                                            columnNumber: 561
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/ui/CategoriesCarousel.tsx",
                                        lineNumber: 111,
                                        columnNumber: 298
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm font-semibold text-[#1D1D1F] text-start",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryName"])(category, language)
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/ui/CategoriesCarousel.tsx",
                                        lineNumber: 111,
                                        columnNumber: 753
                                    }, this)
                                ]
                            }, category.id, true, {
                                fileName: "[project]/web/src/components/ui/CategoriesCarousel.tsx",
                                lineNumber: 111,
                                columnNumber: 72
                            }, this)
                    }["CategoriesCarousel[pages.map() > group.map()]"])
                }, pageIndex, false, {
                    fileName: "[project]/web/src/components/ui/CategoriesCarousel.tsx",
                    lineNumber: 110,
                    columnNumber: 64
                }, this)
        }["CategoriesCarousel[pages.map()]"]);
        $[5] = canClickLeft;
        $[6] = canClickRight;
        $[7] = categories;
        $[8] = handleLeftClick;
        $[9] = handleRightClick;
        $[10] = isRTL;
        $[11] = itemsPerPage;
        $[12] = language;
        $[13] = page;
        $[14] = totalPages;
        $[15] = t4;
        $[16] = t5;
        $[17] = t6;
        $[18] = t7;
        $[19] = t8;
        $[20] = t9;
    } else {
        t4 = $[15];
        t5 = $[16];
        t6 = $[17];
        t7 = $[18];
        t8 = $[19];
        t9 = $[20];
    }
    let t10;
    if ($[30] !== t4 || $[31] !== t5 || $[32] !== t6) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t4,
            style: t5,
            children: t6
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/CategoriesCarousel.tsx",
            lineNumber: 140,
            columnNumber: 11
        }, this);
        $[30] = t4;
        $[31] = t5;
        $[32] = t6;
        $[33] = t10;
    } else {
        t10 = $[33];
    }
    let t11;
    if ($[34] !== t10 || $[35] !== t7) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t7,
            children: t10
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/CategoriesCarousel.tsx",
            lineNumber: 150,
            columnNumber: 11
        }, this);
        $[34] = t10;
        $[35] = t7;
        $[36] = t11;
    } else {
        t11 = $[36];
    }
    let t12;
    if ($[37] !== t11 || $[38] !== t8 || $[39] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t8,
            children: [
                t9,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/ui/CategoriesCarousel.tsx",
            lineNumber: 159,
            columnNumber: 11
        }, this);
        $[37] = t11;
        $[38] = t8;
        $[39] = t9;
        $[40] = t12;
    } else {
        t12 = $[40];
    }
    return t12;
}
_s(CategoriesCarousel, "jluSZ3JXgbHKCC1fSrFnzp943WY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"]
    ];
});
_c = CategoriesCarousel;
function _CategoriesCarouselGoPrevSetPage(p_0) {
    return p_0 - 1;
}
function _CategoriesCarouselGoNextSetPage(p) {
    return p + 1;
}
var _c;
__turbopack_context__.k.register(_c, "CategoriesCarousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/components/ui/DepartmentCarousel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DepartmentCarousel",
    ()=>DepartmentCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-client] (ecmascript)");
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
function DepartmentCarousel(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(40);
    if ($[0] !== "bc1119d3fc9edf525b1180f03ac35efbad56b3a18c61e423e65c36fdcabb16a4") {
        for(let $i = 0; $i < 40; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "bc1119d3fc9edf525b1180f03ac35efbad56b3a18c61e423e65c36fdcabb16a4";
    }
    const { categories } = t0;
    const { language, isRTL } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    const totalPages = Math.ceil(categories.length / 3);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const canGoPrev = page > 0;
    const canGoNext = page < totalPages - 1;
    let t1;
    if ($[1] !== canGoNext) {
        t1 = ({
            "DepartmentCarousel[goNext]": ()=>{
                if (canGoNext) {
                    setPage(_DepartmentCarouselGoNextSetPage);
                }
            }
        })["DepartmentCarousel[goNext]"];
        $[1] = canGoNext;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const goNext = t1;
    let t2;
    if ($[3] !== canGoPrev) {
        t2 = ({
            "DepartmentCarousel[goPrev]": ()=>{
                if (canGoPrev) {
                    setPage(_DepartmentCarouselGoPrevSetPage);
                }
            }
        })["DepartmentCarousel[goPrev]"];
        $[3] = canGoPrev;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const goPrev = t2;
    const handleLeftClick = isRTL ? goNext : goPrev;
    const handleRightClick = isRTL ? goPrev : goNext;
    const canClickLeft = isRTL ? canGoNext : canGoPrev;
    const canClickRight = isRTL ? canGoPrev : canGoNext;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    if ($[5] !== canClickLeft || $[6] !== canClickRight || $[7] !== categories || $[8] !== handleLeftClick || $[9] !== handleRightClick || $[10] !== isRTL || $[11] !== language || $[12] !== page || $[13] !== totalPages) {
        const pages = [];
        for(let i = 0; i < categories.length; i = i + 3, i){
            pages.push(categories.slice(i, i + 3));
        }
        t7 = "relative";
        if ($[20] !== canClickLeft || $[21] !== canClickRight || $[22] !== handleLeftClick || $[23] !== handleRightClick || $[24] !== isRTL || $[25] !== totalPages) {
            t8 = totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleLeftClick,
                        disabled: !canClickLeft,
                        "aria-label": isRTL ? "\u0627\u0644\u062A\u0627\u0644\u064A" : "Previous",
                        className: "absolute -start-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-soft transition hover:border-primary/30 hover:shadow-premium disabled:cursor-not-allowed disabled:opacity-30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                            lineNumber: 81,
                            columnNumber: 443
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                        lineNumber: 81,
                        columnNumber: 32
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleRightClick,
                        disabled: !canClickRight,
                        "aria-label": isRTL ? "\u0627\u0644\u0633\u0627\u0628\u0642" : "Next",
                        className: "absolute -end-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-soft transition hover:border-primary/30 hover:shadow-premium disabled:cursor-not-allowed disabled:opacity-30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                            lineNumber: 81,
                            columnNumber: 884
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                        lineNumber: 81,
                        columnNumber: 477
                    }, this)
                ]
            }, void 0, true);
            $[20] = canClickLeft;
            $[21] = canClickRight;
            $[22] = handleLeftClick;
            $[23] = handleRightClick;
            $[24] = isRTL;
            $[25] = totalPages;
            $[26] = t8;
        } else {
            t8 = $[26];
        }
        t6 = "overflow-hidden";
        t3 = "flex transition-transform duration-500 ease-in-out";
        const t9 = isRTL ? `translateX(${page * 100}%)` : `translateX(-${page * 100}%)`;
        if ($[27] !== t9) {
            t4 = {
                transform: t9
            };
            $[27] = t9;
            $[28] = t4;
        } else {
            t4 = $[28];
        }
        t5 = pages.map({
            "DepartmentCarousel[pages.map()]": (group, pageIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid w-full flex-shrink-0 grid-cols-3 gap-6",
                    children: group.map({
                        "DepartmentCarousel[pages.map() > group.map()]": (category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/category/${category.id}`,
                                className: "group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-premium",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        category.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: category.image_url,
                                            alt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryName"])(category, language),
                                            className: "aspect-square w-full object-cover transition duration-500 group-hover:scale-105",
                                            loading: "lazy"
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                                            lineNumber: 106,
                                            columnNumber: 334
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex aspect-square items-center justify-center bg-[linear-gradient(135deg,#f1f8f1_0%,#fbfcfb_100%)] text-6xl text-primary",
                                            children: category.icon?.slice(0, 1) || "\u2022"
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                                            lineNumber: 106,
                                            columnNumber: 518
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                                            lineNumber: 106,
                                            columnNumber: 704
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-x-3 bottom-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl bg-white/92 px-3 py-3 shadow-soft backdrop-blur-md",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm text-primary",
                                                            children: category.icon?.slice(0, 1) || "\u2022"
                                                        }, void 0, false, {
                                                            fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                                                            lineNumber: 106,
                                                            columnNumber: 966
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0 flex-1 text-start",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "truncate text-base font-semibold text-[#1D1D1F]",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryName"])(category, language)
                                                            }, void 0, false, {
                                                                fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                                                                lineNumber: 106,
                                                                columnNumber: 1163
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                                                            lineNumber: 106,
                                                            columnNumber: 1120
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 923
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                                                lineNumber: 106,
                                                columnNumber: 844
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                                            lineNumber: 106,
                                            columnNumber: 799
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                                    lineNumber: 106,
                                    columnNumber: 286
                                }, this)
                            }, category.id, false, {
                                fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                                lineNumber: 106,
                                columnNumber: 72
                            }, this)
                    }["DepartmentCarousel[pages.map() > group.map()]"])
                }, pageIndex, false, {
                    fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
                    lineNumber: 105,
                    columnNumber: 64
                }, this)
        }["DepartmentCarousel[pages.map()]"]);
        $[5] = canClickLeft;
        $[6] = canClickRight;
        $[7] = categories;
        $[8] = handleLeftClick;
        $[9] = handleRightClick;
        $[10] = isRTL;
        $[11] = language;
        $[12] = page;
        $[13] = totalPages;
        $[14] = t3;
        $[15] = t4;
        $[16] = t5;
        $[17] = t6;
        $[18] = t7;
        $[19] = t8;
    } else {
        t3 = $[14];
        t4 = $[15];
        t5 = $[16];
        t6 = $[17];
        t7 = $[18];
        t8 = $[19];
    }
    let t9;
    if ($[29] !== t3 || $[30] !== t4 || $[31] !== t5) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            style: t4,
            children: t5
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
            lineNumber: 134,
            columnNumber: 10
        }, this);
        $[29] = t3;
        $[30] = t4;
        $[31] = t5;
        $[32] = t9;
    } else {
        t9 = $[32];
    }
    let t10;
    if ($[33] !== t6 || $[34] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t6,
            children: t9
        }, void 0, false, {
            fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
            lineNumber: 144,
            columnNumber: 11
        }, this);
        $[33] = t6;
        $[34] = t9;
        $[35] = t10;
    } else {
        t10 = $[35];
    }
    let t11;
    if ($[36] !== t10 || $[37] !== t7 || $[38] !== t8) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t7,
            children: [
                t8,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/ui/DepartmentCarousel.tsx",
            lineNumber: 153,
            columnNumber: 11
        }, this);
        $[36] = t10;
        $[37] = t7;
        $[38] = t8;
        $[39] = t11;
    } else {
        t11 = $[39];
    }
    return t11;
}
_s(DepartmentCarousel, "jluSZ3JXgbHKCC1fSrFnzp943WY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"]
    ];
});
_c = DepartmentCarousel;
function _DepartmentCarouselGoPrevSetPage(p_0) {
    return p_0 - 1;
}
function _DepartmentCarouselGoNextSetPage(p) {
    return p + 1;
}
var _c;
__turbopack_context__.k.register(_c, "DepartmentCarousel");
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

//# sourceMappingURL=web_71f3c03d._.js.map