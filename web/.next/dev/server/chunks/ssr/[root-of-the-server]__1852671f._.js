module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/web/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/web/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/web/src/lib/storefront-data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAccountOverview",
    ()=>getAccountOverview,
    "getActiveBanners",
    ()=>getActiveBanners,
    "getActiveCategories",
    ()=>getActiveCategories,
    "getActiveCategoryById",
    ()=>getActiveCategoryById,
    "getActiveProductById",
    ()=>getActiveProductById,
    "getActiveProductsByCategory",
    ()=>getActiveProductsByCategory,
    "getCheckoutData",
    ()=>getCheckoutData,
    "getFeaturedCategories",
    ()=>getFeaturedCategories,
    "getNewArrivalProducts",
    ()=>getNewArrivalProducts,
    "getOfferProducts",
    ()=>getOfferProducts,
    "getOrderWithItemsForUser",
    ()=>getOrderWithItemsForUser,
    "getOrdersForUser",
    ()=>getOrdersForUser,
    "getRelatedProducts",
    ()=>getRelatedProducts,
    "requireAuthenticatedUser",
    ()=>requireAuthenticatedUser,
    "searchActiveProducts",
    ()=>searchActiveProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/supabase.ts [app-rsc] (ecmascript)");
;
;
async function getActiveBanners() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
    const { data, error } = await supabase.from("banners").select("id, image_url, title, subtitle, discount, active, link").eq("active", true).order("created_at", {
        ascending: false
    });
    if (error) {
        return [];
    }
    return data ?? [];
}
async function getFeaturedCategories(limit) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
    let query = supabase.from("categories").select("*").is("parent_id", null).eq("is_active", true).order("sort_order", {
        ascending: true
    });
    if (typeof limit === "number") {
        query = query.limit(limit);
    }
    const { data, error } = await query;
    if (error) {
        return [];
    }
    return data ?? [];
}
async function getActiveCategories() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
    const { data, error } = await supabase.from("categories").select("*").eq("is_active", true).order("sort_order", {
        ascending: true
    });
    if (error) {
        return [];
    }
    return data ?? [];
}
async function getOfferProducts(limit = 8) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
    const { data, error } = await supabase.from("products").select("*").eq("is_active", true).not("original_price", "is", null).order("created_at", {
        ascending: false
    }).limit(limit);
    if (error) {
        return [];
    }
    return (data ?? []).filter((product)=>typeof product.original_price === "number" && product.original_price > product.price_iqd);
}
async function getNewArrivalProducts(limit = 8) {
    return searchActiveProducts({
        sort: "newest",
        limit
    });
}
async function searchActiveProducts(params = {}) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
    let query = supabase.from("products").select("*").eq("is_active", true);
    if (params.categoryId) {
        query = query.eq("category_id", params.categoryId);
    }
    if (typeof params.minPrice === "number" && !Number.isNaN(params.minPrice)) {
        query = query.gte("price_iqd", params.minPrice);
    }
    if (typeof params.maxPrice === "number" && !Number.isNaN(params.maxPrice)) {
        query = query.lte("price_iqd", params.maxPrice);
    }
    if (params.inStock) {
        query = query.gt("stock_quantity", 0);
    }
    if (params.query?.trim()) {
        const value = params.query.trim();
        query = query.or(`name.ilike.%${value}%,name_ar.ilike.%${value}%,description.ilike.%${value}%,description_ar.ilike.%${value}%`);
    }
    switch(params.sort){
        case "price_low":
            query = query.order("price_iqd", {
                ascending: true
            });
            break;
        case "price_high":
            query = query.order("price_iqd", {
                ascending: false
            });
            break;
        case "name_az":
            query = query.order("name_ar", {
                ascending: true
            });
            break;
        default:
            query = query.order("created_at", {
                ascending: false
            });
            break;
    }
    if (params.limit) {
        query = query.limit(params.limit);
    }
    if (params.offset) {
        query = query.range(params.offset, params.offset + (params.limit || 20) - 1);
    }
    const { data, error } = await query;
    if (error) {
        return [];
    }
    return data ?? [];
}
async function getActiveCategoryById(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
    const { data, error } = await supabase.from("categories").select("*").eq("id", id).eq("is_active", true).single();
    if (error) {
        return null;
    }
    return data;
}
async function getActiveProductsByCategory(categoryId) {
    return searchActiveProducts({
        categoryId,
        sort: "newest"
    });
}
async function getActiveProductById(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
    const { data, error } = await supabase.from("products").select("*").eq("id", id).eq("is_active", true).single();
    if (error) {
        return null;
    }
    return data;
}
async function getRelatedProducts(categoryId, excludeId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
    const { data, error } = await supabase.from("products").select("*").eq("category_id", categoryId).eq("is_active", true).neq("id", excludeId).order("created_at", {
        ascending: false
    }).limit(8);
    if (error) {
        return [];
    }
    return data ?? [];
}
async function requireAuthenticatedUser() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/auth/login");
    }
    return {
        supabase,
        user
    };
}
async function getAccountOverview(userId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
    const [profileRes, ordersRes, addressesRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).single(),
        supabase.from("orders").select("*").eq("user_id", userId).order("created_at", {
            ascending: false
        }).limit(8),
        supabase.from("addresses").select("*").eq("user_id", userId).order("is_default", {
            ascending: false
        })
    ]);
    return {
        profile: profileRes.data,
        orders: ordersRes.data ?? [],
        addresses: addressesRes.data ?? []
    };
}
async function getOrdersForUser(userId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
    const { data, error } = await supabase.from("orders").select("*").eq("user_id", userId).order("created_at", {
        ascending: false
    });
    if (error) {
        return [];
    }
    return data ?? [];
}
async function getOrderWithItemsForUser(userId, orderId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
    const { data, error } = await supabase.from("orders").select("*, order_items(*)").eq("id", orderId).eq("user_id", userId).single();
    if (error) {
        return null;
    }
    return data;
}
async function getCheckoutData(userId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
    const [profileRes, addressesRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).single(),
        supabase.from("addresses").select("*").eq("user_id", userId).order("is_default", {
            ascending: false
        })
    ]);
    return {
        profile: profileRes.data,
        addresses: addressesRes.data ?? []
    };
}
}),
"[project]/web/src/app/account/orders/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrdersPage,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$server$2d$language$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/server-language.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/storefront-data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/storefront.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const dynamic = "force-dynamic";
async function OrdersPage() {
    const language = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$server$2d$language$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerLanguage"])();
    const messages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMessages"])(language);
    const { user } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAuthenticatedUser"])();
    const orders = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrdersForUser"])(user.id);
    const completedOrders = orders.filter((order)=>order.status === "delivered");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "soft-panel px-6 py-10 sm:px-8 lg:px-12 lg:py-14",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-start",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "eyebrow",
                            children: messages.orders.title
                        }, void 0, false, {
                            fileName: "[project]/web/src/app/account/orders/page.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-4 text-4xl font-bold tracking-tight text-[#1D1D1F] sm:text-5xl",
                            children: messages.orders.title
                        }, void 0, false, {
                            fileName: "[project]/web/src/app/account/orders/page.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-5 max-w-3xl text-lg leading-8 text-slate-500",
                            children: language === "ar" ? "سجل كامل للطلبات المرتبطة بحسابك، مع الحالة والقيمة وتاريخ الإنشاء." : "A complete record of the orders linked to your account, including status, value, and creation date."
                        }, void 0, false, {
                            fileName: "[project]/web/src/app/account/orders/page.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/app/account/orders/page.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/src/app/account/orders/page.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "grid gap-4 md:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "soft-panel px-6 py-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: language === "ar" ? "كل الطلبات" : "All orders"
                            }, void 0, false, {
                                fileName: "[project]/web/src/app/account/orders/page.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-3xl font-semibold text-[#1D1D1F]",
                                children: orders.length
                            }, void 0, false, {
                                fileName: "[project]/web/src/app/account/orders/page.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/app/account/orders/page.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "soft-panel px-6 py-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: language === "ar" ? "مكتملة" : "Delivered"
                            }, void 0, false, {
                                fileName: "[project]/web/src/app/account/orders/page.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-3xl font-semibold text-[#1D1D1F]",
                                children: completedOrders.length
                            }, void 0, false, {
                                fileName: "[project]/web/src/app/account/orders/page.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/app/account/orders/page.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "soft-panel px-6 py-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: language === "ar" ? "الأحدث" : "Latest"
                            }, void 0, false, {
                                fileName: "[project]/web/src/app/account/orders/page.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-base font-semibold text-[#1D1D1F]",
                                children: orders[0] ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatDateTime"])(orders[0].created_at, language) : language === "ar" ? "لا يوجد" : "None"
                            }, void 0, false, {
                                fileName: "[project]/web/src/app/account/orders/page.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/app/account/orders/page.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/app/account/orders/page.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-4",
                children: orders.length > 0 ? orders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: `/account/orders/${order.id}`,
                        className: "soft-panel block px-6 py-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-premium",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-6 lg:grid-cols-[1fr_auto_auto] lg:items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl font-semibold text-[#1D1D1F]",
                                            children: [
                                                "#",
                                                order.id.slice(0, 8)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/web/src/app/account/orders/page.tsx",
                                            lineNumber: 74,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 text-sm text-slate-500",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatDateTime"])(order.created_at, language)
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/app/account/orders/page.tsx",
                                            lineNumber: 77,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web/src/app/account/orders/page.tsx",
                                    lineNumber: 73,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-start",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex rounded-full bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrderStatusLabel"])(order.status, language)
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/app/account/orders/page.tsx",
                                        lineNumber: 82,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/web/src/app/account/orders/page.tsx",
                                    lineNumber: 81,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-start",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-semibold text-[#1D1D1F]",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatIQD"])(order.total_iqd, language)
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/app/account/orders/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/web/src/app/account/orders/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/src/app/account/orders/page.tsx",
                            lineNumber: 72,
                            columnNumber: 15
                        }, this)
                    }, order.id, false, {
                        fileName: "[project]/web/src/app/account/orders/page.tsx",
                        lineNumber: 67,
                        columnNumber: 13
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "soft-panel px-6 py-14 text-center text-slate-500",
                    children: messages.orders.empty
                }, void 0, false, {
                    fileName: "[project]/web/src/app/account/orders/page.tsx",
                    lineNumber: 95,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/src/app/account/orders/page.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/src/app/account/orders/page.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/web/src/app/account/orders/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/web/src/app/account/orders/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1852671f._.js.map