(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/src/components/checkout/CheckoutFlow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckoutFlow",
    ()=>CheckoutFlow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReceiptText$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/receipt-text.js [app-client] (ecmascript) <export default as ReceiptText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/SupabaseSessionProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/storefront.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/store/cart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/utils.ts [app-client] (ecmascript)");
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
const PAYMENT_OPTIONS = [
    {
        id: "cod",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
    },
    {
        id: "card",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
        disabled: true
    }
];
function CheckoutFlow(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(168);
    if ($[0] !== "0edebada9fa3c3e64a62e60648b2368f4c4fbd0da6dc526f572e8f37a603e4d1") {
        for(let $i = 0; $i < 168; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0edebada9fa3c3e64a62e60648b2368f4c4fbd0da6dc526f572e8f37a603e4d1";
    }
    const { profile, addresses } = t0;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { language, messages, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    const { supabase, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseSession"])();
    const db = supabase;
    const { items, totalIQD, clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [paymentMethod, setPaymentMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("cod");
    const [selectedAddressId, setSelectedAddressId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(addresses.find(_CheckoutFlowAddressesFind)?.id ?? addresses[0]?.id ?? null);
    const [saveAddress, setSaveAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(addresses.length === 0);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t1;
    if ($[1] !== addresses || $[2] !== selectedAddressId) {
        t1 = addresses.find({
            "CheckoutFlow[addresses.find()]": (address_1)=>address_1.id === selectedAddressId
        }["CheckoutFlow[addresses.find()]"]) ?? addresses.find(_CheckoutFlowAddressesFind2) ?? addresses[0];
        $[1] = addresses;
        $[2] = selectedAddressId;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const defaultAddress = t1;
    const t2 = profile?.full_name ?? defaultAddress?.name ?? "";
    const t3 = profile?.phone ?? defaultAddress?.phone ?? "";
    const t4 = defaultAddress?.city ?? "Baghdad";
    const t5 = defaultAddress?.area ?? "";
    const t6 = defaultAddress?.street ?? "";
    let t7;
    if ($[4] !== t2 || $[5] !== t3 || $[6] !== t4 || $[7] !== t5 || $[8] !== t6) {
        t7 = {
            fullName: t2,
            phone: t3,
            city: t4,
            area: t5,
            street: t6,
            notes: ""
        };
        $[4] = t2;
        $[5] = t3;
        $[6] = t4;
        $[7] = t5;
        $[8] = t6;
        $[9] = t7;
    } else {
        t7 = $[9];
    }
    const [address_2, setAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t7);
    let t8;
    if ($[10] !== messages.checkout.address) {
        t8 = {
            title: messages.checkout.address,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"]
        };
        $[10] = messages.checkout.address;
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] !== messages.checkout.payment) {
        t9 = {
            title: messages.checkout.payment,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"]
        };
        $[12] = messages.checkout.payment;
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] !== messages.checkout.review) {
        t10 = {
            title: messages.checkout.review,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReceiptText$3e$__["ReceiptText"]
        };
        $[14] = messages.checkout.review;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] !== t10 || $[17] !== t8 || $[18] !== t9) {
        t11 = [
            t8,
            t9,
            t10
        ];
        $[16] = t10;
        $[17] = t8;
        $[18] = t9;
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    const steps = t11;
    if (items.length === 0) {
        let t12;
        if ($[20] !== t) {
            t12 = t("checkout.emptyCart");
            $[20] = t;
            $[21] = t12;
        } else {
            t12 = $[21];
        }
        let t13;
        if ($[22] !== t12) {
            t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-2xl font-semibold text-[#1D1D1F]",
                children: t12
            }, void 0, false, {
                fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                lineNumber: 164,
                columnNumber: 13
            }, this);
            $[22] = t12;
            $[23] = t13;
        } else {
            t13 = $[23];
        }
        let t14;
        if ($[24] !== t) {
            t14 = t("cart.continueShopping");
            $[24] = t;
            $[25] = t14;
        } else {
            t14 = $[25];
        }
        let t15;
        if ($[26] !== t14) {
            t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/products",
                className: "pill-button-primary",
                children: t14
            }, void 0, false, {
                fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                lineNumber: 180,
                columnNumber: 13
            }, this);
            $[26] = t14;
            $[27] = t15;
        } else {
            t15 = $[27];
        }
        let t16;
        if ($[28] !== t13 || $[29] !== t15) {
            t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "soft-panel flex flex-col items-center gap-4 px-6 py-16 text-center",
                children: [
                    t13,
                    t15
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                lineNumber: 188,
                columnNumber: 13
            }, this);
            $[28] = t13;
            $[29] = t15;
            $[30] = t16;
        } else {
            t16 = $[30];
        }
        return t16;
    }
    let t12;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = function updateAddress(key, value) {
            setSelectedAddressId(null);
            setAddress({
                "CheckoutFlow[updateAddress > setAddress()]": (current)=>({
                        ...current,
                        [key]: value
                    })
            }["CheckoutFlow[updateAddress > setAddress()]"]);
        };
        $[31] = t12;
    } else {
        t12 = $[31];
    }
    const updateAddress = t12;
    let t13;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = function selectSavedAddress(savedAddress) {
            setSelectedAddressId(savedAddress.id);
            setAddress({
                fullName: savedAddress.name,
                phone: savedAddress.phone,
                city: savedAddress.city,
                area: savedAddress.area,
                street: savedAddress.street,
                notes: ""
            });
        };
        $[32] = t13;
    } else {
        t13 = $[32];
    }
    const selectSavedAddress = t13;
    let t14;
    if ($[33] !== address_2.area || $[34] !== address_2.city || $[35] !== address_2.fullName || $[36] !== address_2.phone || $[37] !== address_2.street || $[38] !== language) {
        t14 = function validateAddressStep() {
            if (!address_2.fullName.trim() || !address_2.phone.trim() || !address_2.city.trim() || !address_2.area.trim() || !address_2.street.trim()) {
                setError(language === "ar" ? "\u064A\u0631\u062C\u0649 \u0625\u0643\u0645\u0627\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0623\u0648\u0644\u0627\u064B." : "Please complete the delivery address first.");
                return false;
            }
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHONE_REGEX"].test(address_2.phone.trim())) {
                setError(language === "ar" ? "\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0639\u0631\u0627\u0642\u064A \u0635\u062D\u064A\u062D." : "Please enter a valid Iraqi phone number.");
                return false;
            }
            return true;
        };
        $[33] = address_2.area;
        $[34] = address_2.city;
        $[35] = address_2.fullName;
        $[36] = address_2.phone;
        $[37] = address_2.street;
        $[38] = language;
        $[39] = t14;
    } else {
        t14 = $[39];
    }
    const validateAddressStep = t14;
    let t15;
    if ($[40] !== db) {
        t15 = async function rollbackStocks(stockRollbackItems) {
            for (const item of stockRollbackItems){
                await db.from("products").update({
                    stock_quantity: item.previousQuantity
                }).eq("id", item.id).eq("is_active", true);
            }
        };
        $[40] = db;
        $[41] = t15;
    } else {
        t15 = $[41];
    }
    const rollbackStocks = t15;
    let t16;
    if ($[42] !== address_2.area || $[43] !== address_2.city || $[44] !== address_2.fullName || $[45] !== address_2.notes || $[46] !== address_2.phone || $[47] !== address_2.street || $[48] !== addresses.length || $[49] !== clearCart || $[50] !== db || $[51] !== items || $[52] !== language || $[53] !== paymentMethod || $[54] !== rollbackStocks || $[55] !== router || $[56] !== saveAddress || $[57] !== selectedAddressId || $[58] !== user || $[59] !== validateAddressStep) {
        t16 = async function confirmOrder() {
            if (!validateAddressStep()) {
                setStep(0);
                return;
            }
            if (!user) {
                router.replace("/auth/login?next=/checkout");
                return;
            }
            setIsSubmitting(true);
            setError("");
            const productIds = items.map(_CheckoutFlowConfirmOrderItemsMap);
            const { data: liveProducts, error: productsError } = await db.from("products").select("*").in("id", productIds).eq("is_active", true);
            if (productsError || !liveProducts) {
                setIsSubmitting(false);
                setError(language === "ar" ? "\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629." : "Unable to load the latest product data.");
                return;
            }
            const liveProductRows = liveProducts;
            const productMap = new Map(liveProductRows.map(_CheckoutFlowConfirmOrderLiveProductRowsMap));
            for (const item_1 of items){
                const liveProduct = productMap.get(item_1.product.id);
                if (!liveProduct) {
                    setIsSubmitting(false);
                    setError(language === "ar" ? "\u0628\u0639\u0636 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0644\u0645 \u062A\u0639\u062F \u0645\u062A\u0627\u062D\u0629." : "Some products are no longer available.");
                    return;
                }
                if (liveProduct.stock_quantity < item_1.quantity) {
                    setIsSubmitting(false);
                    setError(language === "ar" ? `الكمية المطلوبة غير متوفرة للمنتج ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductName"])(liveProduct, language)}.` : `The requested quantity is no longer available for ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductName"])(liveProduct, language)}.`);
                    return;
                }
            }
            const stockRollbackItems_0 = [];
            for (const item_2 of items){
                const liveProduct_0 = productMap.get(item_2.product.id);
                const { data: updatedProduct, error: updateError } = await db.from("products").update({
                    stock_quantity: liveProduct_0.stock_quantity - item_2.quantity
                }).eq("id", liveProduct_0.id).eq("is_active", true).eq("stock_quantity", liveProduct_0.stock_quantity).select("id, stock_quantity").maybeSingle();
                if (updateError || !updatedProduct) {
                    await rollbackStocks(stockRollbackItems_0);
                    setIsSubmitting(false);
                    setError(language === "ar" ? "\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062E\u0632\u0648\u0646. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649." : "Unable to update stock. Please try again.");
                    return;
                }
                stockRollbackItems_0.push({
                    id: liveProduct_0.id,
                    previousQuantity: liveProduct_0.stock_quantity
                });
            }
            const subtotal = items.reduce({
                "CheckoutFlow[confirmOrder > items.reduce()]": (sum, item_3)=>{
                    const liveProduct_1 = productMap.get(item_3.product.id);
                    return sum + liveProduct_1.price_iqd * item_3.quantity;
                }
            }["CheckoutFlow[confirmOrder > items.reduce()]"], 0);
            const orderTotalIQD = subtotal + __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DELIVERY_COST_IQD"];
            const deliveryAddress = [
                address_2.city,
                address_2.area,
                address_2.street
            ].filter(Boolean).join("\u060C ");
            const { data: order, error: orderError } = await db.from("orders").insert({
                user_id: user.id,
                total_iqd: orderTotalIQD,
                total_usd: orderTotalIQD / __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXCHANGE_RATE"],
                delivery_cost_iqd: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DELIVERY_COST_IQD"],
                coupon_id: null,
                coupon_code: null,
                discount_amount: 0,
                status: "pending",
                payment_method: paymentMethod,
                payment_status: paymentMethod === "cod" ? "pending" : "awaiting_payment",
                delivery_type: "scheduled",
                delivery_address: deliveryAddress,
                delivery_phone: address_2.phone.trim(),
                customer_name: address_2.fullName.trim(),
                customer_notes: address_2.notes.trim() || null
            }).select("*").single();
            if (orderError || !order) {
                await rollbackStocks(stockRollbackItems_0);
                setIsSubmitting(false);
                setError(language === "ar" ? "\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0637\u0644\u0628." : "Unable to create the order.");
                return;
            }
            const orderItems = items.map({
                "CheckoutFlow[confirmOrder > items.map()]": (item_4)=>{
                    const liveProduct_2 = productMap.get(item_4.product.id);
                    return {
                        order_id: order.id,
                        product_id: liveProduct_2.id,
                        quantity: item_4.quantity,
                        price_iqd: liveProduct_2.price_iqd,
                        price_usd: liveProduct_2.price_iqd / __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXCHANGE_RATE"],
                        product_snapshot: {
                            name: liveProduct_2.name,
                            name_ar: liveProduct_2.name_ar,
                            image_url: liveProduct_2.image_url
                        }
                    };
                }
            }["CheckoutFlow[confirmOrder > items.map()]"]);
            const { error: itemsError } = await db.from("order_items").insert(orderItems);
            if (itemsError) {
                await db.from("orders").delete().eq("id", order.id);
                await rollbackStocks(stockRollbackItems_0);
                setIsSubmitting(false);
                setError(language === "ar" ? "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0637\u0644\u0628 \u0644\u0643\u0646 \u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0639\u0646\u0627\u0635\u0631\u0647." : "The order was created, but its line items could not be saved.");
                return;
            }
            if (saveAddress && !selectedAddressId) {
                await db.from("addresses").insert({
                    user_id: user.id,
                    name: address_2.fullName.trim(),
                    city: address_2.city.trim(),
                    area: address_2.area.trim(),
                    street: address_2.street.trim(),
                    phone: address_2.phone.trim(),
                    type: "home",
                    is_default: addresses.length === 0
                });
            }
            clearCart();
            setIsSubmitting(false);
            router.replace(`/account/orders/${order.id}`);
            router.refresh();
        };
        $[42] = address_2.area;
        $[43] = address_2.city;
        $[44] = address_2.fullName;
        $[45] = address_2.notes;
        $[46] = address_2.phone;
        $[47] = address_2.street;
        $[48] = addresses.length;
        $[49] = clearCart;
        $[50] = db;
        $[51] = items;
        $[52] = language;
        $[53] = paymentMethod;
        $[54] = rollbackStocks;
        $[55] = router;
        $[56] = saveAddress;
        $[57] = selectedAddressId;
        $[58] = user;
        $[59] = validateAddressStep;
        $[60] = t16;
    } else {
        t16 = $[60];
    }
    const confirmOrder = t16;
    let t17;
    if ($[61] !== language || $[62] !== step || $[63] !== steps) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "soft-panel p-5 sm:p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 md:grid-cols-3",
                children: steps.map({
                    "CheckoutFlow[steps.map()]": (item_5, index)=>{
                        const Icon = item_5.icon;
                        const active = index === step;
                        const complete = index < step;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 rounded-[2rem] px-4 py-4 transition", active || complete ? "bg-[#1D1D1F] text-white" : "bg-slate-50 text-slate-500"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex h-11 w-11 items-center justify-center rounded-full bg-white/10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                        lineNumber: 436,
                                        columnNumber: 287
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                    lineNumber: 436,
                                    columnNumber: 201
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold",
                                            children: item_5.title
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                            lineNumber: 436,
                                            columnNumber: 340
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-white/70",
                                            children: complete ? language === "ar" ? "\u0645\u0643\u062A\u0645\u0644" : "Completed" : active ? language === "ar" ? "\u0627\u0644\u062E\u0637\u0648\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629" : "Current step" : language === "ar" ? "\u0644\u0627\u062D\u0642\u0627\u064B" : "Up next"
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                            lineNumber: 436,
                                            columnNumber: 395
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                    lineNumber: 436,
                                    columnNumber: 312
                                }, this)
                            ]
                        }, item_5.title, true, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 436,
                            columnNumber: 20
                        }, this);
                    }
                }["CheckoutFlow[steps.map()]"])
            }, void 0, false, {
                fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                lineNumber: 431,
                columnNumber: 50
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 431,
            columnNumber: 11
        }, this);
        $[61] = language;
        $[62] = step;
        $[63] = steps;
        $[64] = t17;
    } else {
        t17 = $[64];
    }
    let t18;
    if ($[65] !== address_2.area || $[66] !== address_2.city || $[67] !== address_2.fullName || $[68] !== address_2.notes || $[69] !== address_2.phone || $[70] !== address_2.street || $[71] !== addresses || $[72] !== language || $[73] !== messages.checkout.address || $[74] !== messages.checkout.noSavedAddresses || $[75] !== saveAddress || $[76] !== selectedAddressId || $[77] !== step) {
        t18 = step === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "soft-panel p-6 sm:p-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-start",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "eyebrow",
                            children: messages.checkout.address
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 448,
                            columnNumber: 91
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mt-3 text-3xl font-semibold text-[#1D1D1F]",
                            children: language === "ar" ? "\u0627\u062E\u062A\u0631 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0648\u0635\u064A\u0644" : "Choose the delivery address"
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 448,
                            columnNumber: 145
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                    lineNumber: 448,
                    columnNumber: 63
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 space-y-4",
                    children: addresses.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-4 md:grid-cols-2",
                        children: addresses.map({
                            "CheckoutFlow[addresses.map()]": (savedAddress_0)=>{
                                const selected = selectedAddressId === savedAddress_0.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: {
                                        "CheckoutFlow[addresses.map() > <button>.onClick]": ()=>selectSavedAddress(savedAddress_0)
                                    }["CheckoutFlow[addresses.map() > <button>.onClick]"],
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-[2rem] border px-5 py-5 text-sm transition", selected ? "border-primary bg-primary/5" : "border-slate-100 bg-slate-50 hover:border-primary/20", "text-start"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-base font-semibold text-[#1D1D1F]",
                                                    children: savedAddress_0.name
                                                }, void 0, false, {
                                                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 309
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddressTypeLabel"])(savedAddress_0.type, language)
                                                }, void 0, false, {
                                                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 388
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                            lineNumber: 453,
                                            columnNumber: 252
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 leading-7 text-slate-500",
                                            children: [
                                                savedAddress_0.city,
                                                savedAddress_0.area,
                                                savedAddress_0.street
                                            ].filter(Boolean).join("\u060C ")
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                            lineNumber: 453,
                                            columnNumber: 540
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 text-slate-500",
                                            children: savedAddress_0.phone
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                            lineNumber: 453,
                                            columnNumber: 688
                                        }, this)
                                    ]
                                }, savedAddress_0.id, true, {
                                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                    lineNumber: 451,
                                    columnNumber: 22
                                }, this);
                            }
                        }["CheckoutFlow[addresses.map()]"])
                    }, void 0, false, {
                        fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                        lineNumber: 448,
                        columnNumber: 425
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[2rem] bg-slate-50 px-5 py-5 text-sm text-slate-500",
                        children: messages.checkout.noSavedAddresses
                    }, void 0, false, {
                        fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                        lineNumber: 455,
                        columnNumber: 56
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                    lineNumber: 448,
                    columnNumber: 369
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 grid gap-4 md:grid-cols-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: address_2.fullName,
                            onChange: {
                                "CheckoutFlow[<input>.onChange]": (event)=>updateAddress("fullName", event.target.value)
                            }["CheckoutFlow[<input>.onChange]"],
                            placeholder: language === "ar" ? "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644" : "Full name",
                            className: "field-input"
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 455,
                            columnNumber: 230
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: address_2.phone,
                            onChange: {
                                "CheckoutFlow[<input>.onChange]": (event_0)=>updateAddress("phone", event_0.target.value)
                            }["CheckoutFlow[<input>.onChange]"],
                            placeholder: language === "ar" ? "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" : "Phone number",
                            className: "field-input",
                            dir: "ltr"
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 457,
                            columnNumber: 190
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: address_2.city,
                            onChange: {
                                "CheckoutFlow[<input>.onChange]": (event_1)=>updateAddress("city", event_1.target.value)
                            }["CheckoutFlow[<input>.onChange]"],
                            placeholder: language === "ar" ? "\u0627\u0644\u0645\u062F\u064A\u0646\u0629" : "City",
                            className: "field-input"
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 459,
                            columnNumber: 191
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: address_2.area,
                            onChange: {
                                "CheckoutFlow[<input>.onChange]": (event_2)=>updateAddress("area", event_2.target.value)
                            }["CheckoutFlow[<input>.onChange]"],
                            placeholder: language === "ar" ? "\u0627\u0644\u0645\u0646\u0637\u0642\u0629" : "Area",
                            className: "field-input"
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 461,
                            columnNumber: 160
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: address_2.street,
                            onChange: {
                                "CheckoutFlow[<input>.onChange]": (event_3)=>updateAddress("street", event_3.target.value)
                            }["CheckoutFlow[<input>.onChange]"],
                            placeholder: language === "ar" ? "\u0627\u0644\u0634\u0627\u0631\u0639" : "Street",
                            className: "field-input md:col-span-2"
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 463,
                            columnNumber: 160
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: address_2.notes,
                            onChange: {
                                "CheckoutFlow[<textarea>.onChange]": (event_4)=>updateAddress("notes", event_4.target.value)
                            }["CheckoutFlow[<textarea>.onChange]"],
                            placeholder: language === "ar" ? "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u0644\u0644\u0633\u0627\u0626\u0642" : "Extra delivery notes",
                            className: "min-h-32 w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-[#1D1D1F] outline-none transition focus:border-primary/40 focus:ring-4 focus:ring-primary/10 md:col-span-2"
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 465,
                            columnNumber: 170
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                    lineNumber: 455,
                    columnNumber: 182
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "mt-6 flex items-center gap-3 text-sm text-slate-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "checkbox",
                            checked: saveAddress,
                            onChange: {
                                "CheckoutFlow[<input>.onChange]": (event_5)=>setSaveAddress(event_5.target.checked)
                            }["CheckoutFlow[<input>.onChange]"],
                            className: "h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary/20"
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 467,
                            columnNumber: 521
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: language === "ar" ? "\u0627\u062D\u0641\u0638 \u0647\u0630\u0627 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0644\u0627\u062D\u0642\u0627\u064B" : "Save this address for later"
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 469,
                            columnNumber: 128
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                    lineNumber: 467,
                    columnNumber: 450
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 448,
            columnNumber: 24
        }, this) : null;
        $[65] = address_2.area;
        $[66] = address_2.city;
        $[67] = address_2.fullName;
        $[68] = address_2.notes;
        $[69] = address_2.phone;
        $[70] = address_2.street;
        $[71] = addresses;
        $[72] = language;
        $[73] = messages.checkout.address;
        $[74] = messages.checkout.noSavedAddresses;
        $[75] = saveAddress;
        $[76] = selectedAddressId;
        $[77] = step;
        $[78] = t18;
    } else {
        t18 = $[78];
    }
    let t19;
    if ($[79] !== language || $[80] !== messages.checkout.payment || $[81] !== paymentMethod || $[82] !== step) {
        t19 = step === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "soft-panel p-6 sm:p-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-start",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "eyebrow",
                            children: messages.checkout.payment
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 489,
                            columnNumber: 91
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mt-3 text-3xl font-semibold text-[#1D1D1F]",
                            children: language === "ar" ? "\u0627\u062E\u062A\u0631 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639" : "Select a payment method"
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 489,
                            columnNumber: 145
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                    lineNumber: 489,
                    columnNumber: 63
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 grid gap-4 md:grid-cols-3",
                    children: PAYMENT_OPTIONS.map({
                        "CheckoutFlow[PAYMENT_OPTIONS.map()]": (option)=>{
                            const Icon_0 = option.icon;
                            const active_0 = paymentMethod === option.id;
                            const disabled = option.disabled === true;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: {
                                    "CheckoutFlow[PAYMENT_OPTIONS.map() > <button>.onClick]": ()=>{
                                        if (!disabled) {
                                            setPaymentMethod(option.id);
                                        }
                                    }
                                }["CheckoutFlow[PAYMENT_OPTIONS.map() > <button>.onClick]"],
                                disabled: disabled,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-[2rem] border px-5 py-6 transition", active_0 ? "border-primary bg-primary/5" : disabled ? "cursor-not-allowed border-slate-100 bg-slate-50/80 opacity-70" : "border-slate-100 bg-slate-50 hover:border-primary/20", "text-start"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon_0, {
                                                    size: 18,
                                                    className: "text-[#1D1D1F]"
                                                }, void 0, false, {
                                                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                                    lineNumber: 500,
                                                    columnNumber: 495
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 500,
                                                columnNumber: 402
                                            }, this),
                                            active_0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 18,
                                                className: "text-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 500,
                                                columnNumber: 561
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                        lineNumber: 500,
                                        columnNumber: 345
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-5 text-base font-semibold text-[#1D1D1F]",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaymentMethodLabel"])(option.id, language)
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                        lineNumber: 500,
                                        columnNumber: 626
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm leading-7 text-slate-500",
                                        children: option.id === "card" ? language === "ar" ? "\u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0642\u0631\u064A\u0628\u0627\u064B." : "Electronic payment coming soon." : language === "ar" ? "\u0645\u0646\u0627\u0633\u0628 \u0644\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u062A\u062C\u0631 \u0627\u0644\u064A\u0648\u0645\u064A\u0629." : "Suitable for everyday store orders."
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                        lineNumber: 500,
                                        columnNumber: 733
                                    }, this)
                                ]
                            }, option.id, true, {
                                fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                lineNumber: 494,
                                columnNumber: 20
                            }, this);
                        }
                    }["CheckoutFlow[PAYMENT_OPTIONS.map()]"])
                }, void 0, false, {
                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                    lineNumber: 489,
                    columnNumber: 353
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 489,
            columnNumber: 24
        }, this) : null;
        $[79] = language;
        $[80] = messages.checkout.payment;
        $[81] = paymentMethod;
        $[82] = step;
        $[83] = t19;
    } else {
        t19 = $[83];
    }
    let t20;
    if ($[84] !== address_2.area || $[85] !== address_2.city || $[86] !== address_2.fullName || $[87] !== address_2.notes || $[88] !== address_2.phone || $[89] !== address_2.street || $[90] !== items || $[91] !== language || $[92] !== messages.checkout.address || $[93] !== messages.checkout.payment || $[94] !== messages.checkout.review || $[95] !== paymentMethod || $[96] !== step) {
        t20 = step === 2 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "soft-panel p-6 sm:p-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-start",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "eyebrow",
                            children: messages.checkout.review
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 513,
                            columnNumber: 91
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mt-3 text-3xl font-semibold text-[#1D1D1F]",
                            children: language === "ar" ? "\u0631\u0627\u062C\u0639 \u0627\u0644\u0637\u0644\u0628" : "Review the order"
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 513,
                            columnNumber: 144
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                    lineNumber: 513,
                    columnNumber: 63
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 grid gap-4",
                    children: items.map({
                        "CheckoutFlow[items.map()]": (item_6)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-4 rounded-[2rem] bg-slate-50 px-5 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-start",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-base font-semibold text-[#1D1D1F]",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductName"])(item_6.product, language)
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 514,
                                                columnNumber: 196
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-sm text-slate-500",
                                                children: [
                                                    item_6.quantity,
                                                    " × ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIQD"])(item_6.product.price_iqd, language)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 514,
                                                columnNumber: 296
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                        lineNumber: 514,
                                        columnNumber: 168
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-base font-semibold text-[#1D1D1F]",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIQD"])(item_6.product.price_iqd * item_6.quantity, language)
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                        lineNumber: 514,
                                        columnNumber: 416
                                    }, this)
                                ]
                            }, item_6.product.id, true, {
                                fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                lineNumber: 514,
                                columnNumber: 50
                            }, this)
                    }["CheckoutFlow[items.map()]"])
                }, void 0, false, {
                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                    lineNumber: 513,
                    columnNumber: 314
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 grid gap-4 sm:grid-cols-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-[2rem] bg-slate-50 px-5 py-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "eyebrow",
                                    children: messages.checkout.address
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                    lineNumber: 515,
                                    columnNumber: 149
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-base font-semibold text-[#1D1D1F]",
                                    children: address_2.fullName
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                    lineNumber: 515,
                                    columnNumber: 203
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm leading-7 text-slate-500",
                                    children: [
                                        address_2.city,
                                        address_2.area,
                                        address_2.street
                                    ].filter(Boolean).join("\u060C ")
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                    lineNumber: 515,
                                    columnNumber: 286
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm text-slate-500",
                                    children: address_2.phone
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                    lineNumber: 515,
                                    columnNumber: 427
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 515,
                            columnNumber: 95
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-[2rem] bg-slate-50 px-5 py-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "eyebrow",
                                    children: messages.checkout.payment
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                    lineNumber: 515,
                                    columnNumber: 551
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-base font-semibold text-[#1D1D1F]",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaymentMethodLabel"])(paymentMethod, language)
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                    lineNumber: 515,
                                    columnNumber: 605
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm leading-7 text-slate-500",
                                    children: address_2.notes.trim() ? address_2.notes : language === "ar" ? "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629." : "No additional notes."
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                                    lineNumber: 515,
                                    columnNumber: 716
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 515,
                            columnNumber: 497
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                    lineNumber: 515,
                    columnNumber: 47
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 513,
            columnNumber: 24
        }, this) : null;
        $[84] = address_2.area;
        $[85] = address_2.city;
        $[86] = address_2.fullName;
        $[87] = address_2.notes;
        $[88] = address_2.phone;
        $[89] = address_2.street;
        $[90] = items;
        $[91] = language;
        $[92] = messages.checkout.address;
        $[93] = messages.checkout.payment;
        $[94] = messages.checkout.review;
        $[95] = paymentMethod;
        $[96] = step;
        $[97] = t20;
    } else {
        t20 = $[97];
    }
    let t21;
    if ($[98] !== error) {
        t21 = error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[2rem] bg-rose-50 px-5 py-4 text-sm text-danger",
            children: error
        }, void 0, false, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 535,
            columnNumber: 19
        }, this) : null;
        $[98] = error;
        $[99] = t21;
    } else {
        t21 = $[99];
    }
    let t22;
    if ($[100] !== messages.checkout.previous || $[101] !== step) {
        t22 = step > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: {
                "CheckoutFlow[<button>.onClick]": ()=>setStep(_CheckoutFlowButtonOnClickSetStep)
            }["CheckoutFlow[<button>.onClick]"],
            className: "pill-button-ghost",
            children: messages.checkout.previous
        }, void 0, false, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 543,
            columnNumber: 22
        }, this) : null;
        $[100] = messages.checkout.previous;
        $[101] = step;
        $[102] = t22;
    } else {
        t22 = $[102];
    }
    let t23;
    if ($[103] !== confirmOrder || $[104] !== isSubmitting || $[105] !== language || $[106] !== messages.checkout.next || $[107] !== step || $[108] !== validateAddressStep) {
        t23 = step < 2 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: {
                "CheckoutFlow[<button>.onClick]": ()=>{
                    if (step === 0 && !validateAddressStep()) {
                        return;
                    }
                    setError("");
                    setStep(_CheckoutFlowButtonOnClickSetStep2);
                }
            }["CheckoutFlow[<button>.onClick]"],
            className: "pill-button-primary",
            children: messages.checkout.next
        }, void 0, false, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 554,
            columnNumber: 22
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: {
                "CheckoutFlow[<button>.onClick]": ()=>void confirmOrder()
            }["CheckoutFlow[<button>.onClick]"],
            disabled: isSubmitting,
            className: "pill-button-primary",
            children: isSubmitting ? language === "ar" ? "\u062C\u0627\u0631\u064D \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0637\u0644\u0628" : "Confirming order" : language === "ar" ? "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0637\u0644\u0628" : "Confirm order"
        }, void 0, false, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 562,
            columnNumber: 110
        }, this);
        $[103] = confirmOrder;
        $[104] = isSubmitting;
        $[105] = language;
        $[106] = messages.checkout.next;
        $[107] = step;
        $[108] = validateAddressStep;
        $[109] = t23;
    } else {
        t23 = $[109];
    }
    let t24;
    if ($[110] !== t22 || $[111] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap gap-3 justify-end",
            children: [
                t22,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 577,
            columnNumber: 11
        }, this);
        $[110] = t22;
        $[111] = t23;
        $[112] = t24;
    } else {
        t24 = $[112];
    }
    let t25;
    if ($[113] !== t18 || $[114] !== t19 || $[115] !== t20 || $[116] !== t21 || $[117] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "space-y-6",
            children: [
                t18,
                t19,
                t20,
                t21,
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 586,
            columnNumber: 11
        }, this);
        $[113] = t18;
        $[114] = t19;
        $[115] = t20;
        $[116] = t21;
        $[117] = t24;
        $[118] = t25;
    } else {
        t25 = $[118];
    }
    const t26 = language === "ar" ? "\u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0641\u0631\u0639\u064A" : "Subtotal";
    let t27;
    if ($[119] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t26
        }, void 0, false, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 599,
            columnNumber: 11
        }, this);
        $[119] = t26;
        $[120] = t27;
    } else {
        t27 = $[120];
    }
    let t28;
    if ($[121] !== language || $[122] !== totalIQD) {
        t28 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIQD"])(totalIQD, language);
        $[121] = language;
        $[122] = totalIQD;
        $[123] = t28;
    } else {
        t28 = $[123];
    }
    let t29;
    if ($[124] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-semibold text-[#1D1D1F]",
            children: t28
        }, void 0, false, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 616,
            columnNumber: 11
        }, this);
        $[124] = t28;
        $[125] = t29;
    } else {
        t29 = $[125];
    }
    let t30;
    if ($[126] !== t27 || $[127] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between text-sm text-slate-500",
            children: [
                t27,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 624,
            columnNumber: 11
        }, this);
        $[126] = t27;
        $[127] = t29;
        $[128] = t30;
    } else {
        t30 = $[128];
    }
    const t31 = language === "ar" ? "\u0627\u0644\u062A\u0648\u0635\u064A\u0644" : "Delivery";
    let t32;
    if ($[129] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t31
        }, void 0, false, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 634,
            columnNumber: 11
        }, this);
        $[129] = t31;
        $[130] = t32;
    } else {
        t32 = $[130];
    }
    let t33;
    if ($[131] !== language) {
        t33 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIQD"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DELIVERY_COST_IQD"], language);
        $[131] = language;
        $[132] = t33;
    } else {
        t33 = $[132];
    }
    let t34;
    if ($[133] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-semibold text-[#1D1D1F]",
            children: t33
        }, void 0, false, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 650,
            columnNumber: 11
        }, this);
        $[133] = t33;
        $[134] = t34;
    } else {
        t34 = $[134];
    }
    let t35;
    if ($[135] !== t32 || $[136] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between text-sm text-slate-500",
            children: [
                t32,
                t34
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 658,
            columnNumber: 11
        }, this);
        $[135] = t32;
        $[136] = t34;
        $[137] = t35;
    } else {
        t35 = $[137];
    }
    const t36 = language === "ar" ? "\u0627\u0644\u062E\u0635\u0645" : "Discount";
    let t37;
    if ($[138] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t36
        }, void 0, false, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 668,
            columnNumber: 11
        }, this);
        $[138] = t36;
        $[139] = t37;
    } else {
        t37 = $[139];
    }
    let t38;
    if ($[140] !== language) {
        t38 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIQD"])(0, language);
        $[140] = language;
        $[141] = t38;
    } else {
        t38 = $[141];
    }
    let t39;
    if ($[142] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-semibold text-[#1D1D1F]",
            children: t38
        }, void 0, false, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 684,
            columnNumber: 11
        }, this);
        $[142] = t38;
        $[143] = t39;
    } else {
        t39 = $[143];
    }
    let t40;
    if ($[144] !== t37 || $[145] !== t39) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between text-sm text-slate-500",
            children: [
                t37,
                t39
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 692,
            columnNumber: 11
        }, this);
        $[144] = t37;
        $[145] = t39;
        $[146] = t40;
    } else {
        t40 = $[146];
    }
    const t41 = language === "ar" ? "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0646\u0647\u0627\u0626\u064A" : "Final total";
    let t42;
    if ($[147] !== t41) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-base font-medium text-slate-500",
            children: t41
        }, void 0, false, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 702,
            columnNumber: 11
        }, this);
        $[147] = t41;
        $[148] = t42;
    } else {
        t42 = $[148];
    }
    const t43 = totalIQD + __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DELIVERY_COST_IQD"];
    let t44;
    if ($[149] !== language || $[150] !== t43) {
        t44 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIQD"])(t43, language);
        $[149] = language;
        $[150] = t43;
        $[151] = t44;
    } else {
        t44 = $[151];
    }
    let t45;
    if ($[152] !== t44) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-2xl font-semibold text-[#1D1D1F]",
            children: t44
        }, void 0, false, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 720,
            columnNumber: 11
        }, this);
        $[152] = t44;
        $[153] = t45;
    } else {
        t45 = $[153];
    }
    let t46;
    if ($[154] !== t42 || $[155] !== t45) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between border-t border-slate-100 pt-4",
            children: [
                t42,
                t45
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 728,
            columnNumber: 11
        }, this);
        $[154] = t42;
        $[155] = t45;
        $[156] = t46;
    } else {
        t46 = $[156];
    }
    let t47;
    if ($[157] !== t30 || $[158] !== t35 || $[159] !== t40 || $[160] !== t46) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "space-y-4 xl:sticky xl:top-28 xl:h-fit",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "soft-panel p-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        t30,
                        t35,
                        t40,
                        t46
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                    lineNumber: 737,
                    columnNumber: 101
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
                lineNumber: 737,
                columnNumber: 69
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 737,
            columnNumber: 11
        }, this);
        $[157] = t30;
        $[158] = t35;
        $[159] = t40;
        $[160] = t46;
        $[161] = t47;
    } else {
        t47 = $[161];
    }
    let t48;
    if ($[162] !== t25 || $[163] !== t47) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]",
            children: [
                t25,
                t47
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 748,
            columnNumber: 11
        }, this);
        $[162] = t25;
        $[163] = t47;
        $[164] = t48;
    } else {
        t48 = $[164];
    }
    let t49;
    if ($[165] !== t17 || $[166] !== t48) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                t17,
                t48
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/checkout/CheckoutFlow.tsx",
            lineNumber: 757,
            columnNumber: 11
        }, this);
        $[165] = t17;
        $[166] = t48;
        $[167] = t49;
    } else {
        t49 = $[167];
    }
    return t49;
}
_s(CheckoutFlow, "DVjM8PDZSIwWo3Y3vM+F4xPs8RU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"]
    ];
});
_c = CheckoutFlow;
function _CheckoutFlowButtonOnClickSetStep2(current_1) {
    return current_1 + 1;
}
function _CheckoutFlowButtonOnClickSetStep(current_0) {
    return current_0 - 1;
}
function _CheckoutFlowConfirmOrderLiveProductRowsMap(product) {
    return [
        product.id,
        product
    ];
}
function _CheckoutFlowConfirmOrderItemsMap(item_0) {
    return item_0.product.id;
}
function _CheckoutFlowAddressesFind2(address_0) {
    return address_0.is_default;
}
function _CheckoutFlowAddressesFind(address) {
    return address.is_default;
}
var _c;
__turbopack_context__.k.register(_c, "CheckoutFlow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CircleCheck
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
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "m9 12 2 2 4-4",
            key: "dzmm74"
        }
    ]
];
const CircleCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("circle-check", __iconNode);
;
 //# sourceMappingURL=circle-check.js.map
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCircle2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CreditCard
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
        "rect",
        {
            width: "20",
            height: "14",
            x: "2",
            y: "5",
            rx: "2",
            key: "ynyp8z"
        }
    ],
    [
        "line",
        {
            x1: "2",
            x2: "22",
            y1: "10",
            y2: "10",
            key: "1b3vmo"
        }
    ]
];
const CreditCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("credit-card", __iconNode);
;
 //# sourceMappingURL=credit-card.js.map
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreditCard",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>MapPin
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
            d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
            key: "1r0f0z"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "10",
            r: "3",
            key: "ilqhr7"
        }
    ]
];
const MapPin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("map-pin", __iconNode);
;
 //# sourceMappingURL=map-pin.js.map
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapPin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/receipt-text.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ReceiptText
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
            d: "M13 16H8",
            key: "wsln4y"
        }
    ],
    [
        "path",
        {
            d: "M14 8H8",
            key: "1l3xfs"
        }
    ],
    [
        "path",
        {
            d: "M16 12H8",
            key: "1fr5h0"
        }
    ],
    [
        "path",
        {
            d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
            key: "ycz6yz"
        }
    ]
];
const ReceiptText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("receipt-text", __iconNode);
;
 //# sourceMappingURL=receipt-text.js.map
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/receipt-text.js [app-client] (ecmascript) <export default as ReceiptText>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReceiptText",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/receipt-text.js [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Wallet
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
            d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
            key: "18etb6"
        }
    ],
    [
        "path",
        {
            d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
            key: "xoc0q4"
        }
    ]
];
const Wallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("wallet", __iconNode);
;
 //# sourceMappingURL=wallet.js.map
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Wallet",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=web_69cda792._.js.map