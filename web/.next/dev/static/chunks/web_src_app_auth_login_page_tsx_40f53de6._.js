(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/src/app/auth/login/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/web/node_modules/zod/v3/external.js [app-client] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/SupabaseSessionProvider.tsx [app-client] (ecmascript)");
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
function LoginPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(89);
    if ($[0] !== "26faca4af561caf30c4444e156d1aa949d29946666a3ceb77e28bcd1677fbf64") {
        for(let $i = 0; $i < 89; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "26faca4af561caf30c4444e156d1aa949d29946666a3ceb77e28bcd1677fbf64";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const next = searchParams.get("next") || "/account";
    const { language, messages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    const { supabase } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseSession"])();
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    let t1;
    if ($[1] !== language) {
        const loginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            email: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(language === "ar" ? "\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0628\u0631\u064A\u062F \u0635\u062D\u064A\u062D." : "Enter a valid email."),
            password: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6, language === "ar" ? "\u064A\u062C\u0628 \u0623\u0646 \u062A\u062D\u062A\u0648\u064A \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0639\u0644\u0649 6 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644." : "Password must be at least 6 characters.")
        });
        t1 = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"];
        t0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(loginSchema);
        $[1] = language;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    let t2;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            email: "",
            password: ""
        };
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== t0) {
        t3 = {
            resolver: t0,
            defaultValues: t2
        };
        $[5] = t0;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    const { register, handleSubmit, formState: t4 } = t1(t3);
    const { errors } = t4;
    const onSubmit = handleSubmit({
        "LoginPage[handleSubmit()]": async (values)=>{
            setIsSubmitting(true);
            setErrorMessage("");
            const { error } = await supabase.auth.signInWithPassword({
                email: values.email.trim().toLowerCase(),
                password: values.password
            });
            setIsSubmitting(false);
            if (error) {
                setErrorMessage(error.message);
                return;
            }
            router.replace(next);
            router.refresh();
        }
    }["LoginPage[handleSubmit()]"]);
    let t5;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: "Al-Amal Center"
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 98,
            columnNumber: 10
        }, this);
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    const t6 = language === "ar" ? "\u0633\u062C\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u062A\u0643\u0645\u0644 \u0637\u0644\u0628\u0627\u062A\u0643 \u0628\u0633\u0631\u0639\u0629 \u0648\u0648\u0636\u0648\u062D." : "Sign in to continue your orders with clarity and speed.";
    let t7;
    if ($[8] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "mt-5 max-w-xl text-5xl font-bold leading-[1.05] tracking-tight text-[#1D1D1F]",
            children: t6
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 106,
            columnNumber: 10
        }, this);
        $[8] = t6;
        $[9] = t7;
    } else {
        t7 = $[9];
    }
    const t8 = language === "ar" ? "\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0637\u0644\u0628\u0627\u062A\u060C \u0627\u0644\u0639\u0646\u0627\u0648\u064A\u0646\u060C \u0648\u0627\u0644\u062D\u0633\u0627\u0628 \u0645\u0646 \u0646\u0641\u0633 \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0647\u0627\u062F\u0626\u0629 \u0627\u0644\u0645\u0635\u0645\u0645\u0629 \u0644\u0644\u062A\u0633\u0648\u0642 \u0627\u0644\u064A\u0648\u0645\u064A." : "Access orders, addresses, and your account from the same calm interface built for everyday shopping.";
    let t9;
    if ($[10] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-6 max-w-xl text-lg leading-8 text-slate-500",
            children: t8
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 115,
            columnNumber: 10
        }, this);
        $[10] = t8;
        $[11] = t9;
    } else {
        t9 = $[11];
    }
    let t10;
    if ($[12] !== t7 || $[13] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-start",
            children: [
                t5,
                t7,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 123,
            columnNumber: 11
        }, this);
        $[12] = t7;
        $[13] = t9;
        $[14] = t10;
    } else {
        t10 = $[14];
    }
    const t11 = language === "ar" ? "\u062A\u062C\u0631\u0628\u0629 \u0623\u0633\u0631\u0639" : "Faster flow";
    let t12;
    if ($[15] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: t11
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 133,
            columnNumber: 11
        }, this);
        $[15] = t11;
        $[16] = t12;
    } else {
        t12 = $[16];
    }
    const t13 = language === "ar" ? "\u0633\u0644\u0629 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0637\u0644\u0628\u0627\u062A" : "Cart and order tracking";
    let t14;
    if ($[17] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-3 text-base font-semibold text-[#1D1D1F]",
            children: t13
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 142,
            columnNumber: 11
        }, this);
        $[17] = t13;
        $[18] = t14;
    } else {
        t14 = $[18];
    }
    let t15;
    if ($[19] !== t12 || $[20] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[2rem] bg-white px-5 py-5 shadow-soft",
            children: [
                t12,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 150,
            columnNumber: 11
        }, this);
        $[19] = t12;
        $[20] = t14;
        $[21] = t15;
    } else {
        t15 = $[21];
    }
    const t16 = language === "ar" ? "\u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0645\u062D\u0641\u0648\u0638\u0629" : "Your data";
    let t17;
    if ($[22] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: t16
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 160,
            columnNumber: 11
        }, this);
        $[22] = t16;
        $[23] = t17;
    } else {
        t17 = $[23];
    }
    const t18 = language === "ar" ? "\u0639\u0646\u0627\u0648\u064A\u0646 \u0648\u0645\u0644\u0641 \u0634\u062E\u0635\u064A" : "Addresses and profile";
    let t19;
    if ($[24] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-3 text-base font-semibold text-[#1D1D1F]",
            children: t18
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 169,
            columnNumber: 11
        }, this);
        $[24] = t18;
        $[25] = t19;
    } else {
        t19 = $[25];
    }
    let t20;
    if ($[26] !== t17 || $[27] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[2rem] bg-white px-5 py-5 shadow-soft",
            children: [
                t17,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 177,
            columnNumber: 11
        }, this);
        $[26] = t17;
        $[27] = t19;
        $[28] = t20;
    } else {
        t20 = $[28];
    }
    let t21;
    if ($[29] !== t15 || $[30] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-4 md:grid-cols-2",
            children: [
                t15,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 186,
            columnNumber: 11
        }, this);
        $[29] = t15;
        $[30] = t20;
        $[31] = t21;
    } else {
        t21 = $[31];
    }
    let t22;
    if ($[32] !== t10 || $[33] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "hidden overflow-hidden rounded-[2.5rem] bg-[linear-gradient(180deg,#ffffff_0%,#f5f7f5_100%)] p-10 lg:flex lg:flex-col lg:justify-between",
            children: [
                t10,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 195,
            columnNumber: 11
        }, this);
        $[32] = t10;
        $[33] = t21;
        $[34] = t22;
    } else {
        t22 = $[34];
    }
    let t23;
    let t24;
    if ($[35] !== messages.auth.loginTitle) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: messages.auth.loginTitle
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 205,
            columnNumber: 11
        }, this);
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "mt-4 text-4xl font-bold tracking-tight text-[#1D1D1F]",
            children: messages.auth.loginTitle
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 206,
            columnNumber: 11
        }, this);
        $[35] = messages.auth.loginTitle;
        $[36] = t23;
        $[37] = t24;
    } else {
        t23 = $[36];
        t24 = $[37];
    }
    let t25;
    if ($[38] !== messages.auth.loginSubtitle) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-5 text-base leading-8 text-slate-500",
            children: messages.auth.loginSubtitle
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 216,
            columnNumber: 11
        }, this);
        $[38] = messages.auth.loginSubtitle;
        $[39] = t25;
    } else {
        t25 = $[39];
    }
    let t26;
    if ($[40] !== t23 || $[41] !== t24 || $[42] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-start",
            children: [
                t23,
                t24,
                t25
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 224,
            columnNumber: 11
        }, this);
        $[40] = t23;
        $[41] = t24;
        $[42] = t25;
        $[43] = t26;
    } else {
        t26 = $[43];
    }
    let t27;
    if ($[44] !== messages.auth.email) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm font-medium text-slate-600",
            children: messages.auth.email
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 234,
            columnNumber: 11
        }, this);
        $[44] = messages.auth.email;
        $[45] = t27;
    } else {
        t27 = $[45];
    }
    let t28;
    if ($[46] !== register) {
        t28 = register("email");
        $[46] = register;
        $[47] = t28;
    } else {
        t28 = $[47];
    }
    let t29;
    if ($[48] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "email",
            ...t28,
            className: "field-input",
            dir: "ltr"
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 250,
            columnNumber: 11
        }, this);
        $[48] = t28;
        $[49] = t29;
    } else {
        t29 = $[49];
    }
    let t30;
    if ($[50] !== errors.email) {
        t30 = errors.email ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm text-danger",
            children: errors.email.message
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 258,
            columnNumber: 26
        }, this) : null;
        $[50] = errors.email;
        $[51] = t30;
    } else {
        t30 = $[51];
    }
    let t31;
    if ($[52] !== t27 || $[53] !== t29 || $[54] !== t30) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "grid gap-2",
            children: [
                t27,
                t29,
                t30
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 266,
            columnNumber: 11
        }, this);
        $[52] = t27;
        $[53] = t29;
        $[54] = t30;
        $[55] = t31;
    } else {
        t31 = $[55];
    }
    let t32;
    if ($[56] !== messages.auth.password) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm font-medium text-slate-600",
            children: messages.auth.password
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 276,
            columnNumber: 11
        }, this);
        $[56] = messages.auth.password;
        $[57] = t32;
    } else {
        t32 = $[57];
    }
    let t33;
    if ($[58] !== register) {
        t33 = register("password");
        $[58] = register;
        $[59] = t33;
    } else {
        t33 = $[59];
    }
    let t34;
    if ($[60] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "password",
            ...t33,
            className: "field-input",
            dir: "ltr"
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 292,
            columnNumber: 11
        }, this);
        $[60] = t33;
        $[61] = t34;
    } else {
        t34 = $[61];
    }
    let t35;
    if ($[62] !== errors.password) {
        t35 = errors.password ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm text-danger",
            children: errors.password.message
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 300,
            columnNumber: 29
        }, this) : null;
        $[62] = errors.password;
        $[63] = t35;
    } else {
        t35 = $[63];
    }
    let t36;
    if ($[64] !== t32 || $[65] !== t34 || $[66] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "grid gap-2",
            children: [
                t32,
                t34,
                t35
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 308,
            columnNumber: 11
        }, this);
        $[64] = t32;
        $[65] = t34;
        $[66] = t35;
        $[67] = t36;
    } else {
        t36 = $[67];
    }
    let t37;
    if ($[68] !== errorMessage) {
        t37 = errorMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "rounded-[2rem] bg-rose-50 px-5 py-4 text-sm text-danger",
            children: errorMessage
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 318,
            columnNumber: 26
        }, this) : null;
        $[68] = errorMessage;
        $[69] = t37;
    } else {
        t37 = $[69];
    }
    const t38 = isSubmitting ? messages.common.loading : messages.auth.submitLogin;
    let t39;
    if ($[70] !== isSubmitting || $[71] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "submit",
            disabled: isSubmitting,
            className: "pill-button-primary mt-2",
            children: t38
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 327,
            columnNumber: 11
        }, this);
        $[70] = isSubmitting;
        $[71] = t38;
        $[72] = t39;
    } else {
        t39 = $[72];
    }
    let t40;
    if ($[73] !== onSubmit || $[74] !== t31 || $[75] !== t36 || $[76] !== t37 || $[77] !== t39) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: onSubmit,
            className: "mt-8 grid gap-4",
            children: [
                t31,
                t36,
                t37,
                t39
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 336,
            columnNumber: 11
        }, this);
        $[73] = onSubmit;
        $[74] = t31;
        $[75] = t36;
        $[76] = t37;
        $[77] = t39;
        $[78] = t40;
    } else {
        t40 = $[78];
    }
    const t41 = ("TURBOPACK compile-time truthy", 1) ? `/auth/register?next=${encodeURIComponent(next)}` : "TURBOPACK unreachable";
    let t42;
    if ($[79] !== messages.auth.switchToRegister || $[80] !== t41) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 text-sm text-slate-500",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: t41,
                className: "font-semibold text-[#1D1D1F] transition hover:text-primary",
                children: messages.auth.switchToRegister
            }, void 0, false, {
                fileName: "[project]/web/src/app/auth/login/page.tsx",
                lineNumber: 349,
                columnNumber: 56
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 349,
            columnNumber: 11
        }, this);
        $[79] = messages.auth.switchToRegister;
        $[80] = t41;
        $[81] = t42;
    } else {
        t42 = $[81];
    }
    let t43;
    if ($[82] !== t26 || $[83] !== t40 || $[84] !== t42) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "soft-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10",
            children: [
                t26,
                t40,
                t42
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 358,
            columnNumber: 11
        }, this);
        $[82] = t26;
        $[83] = t40;
        $[84] = t42;
        $[85] = t43;
    } else {
        t43 = $[85];
    }
    let t44;
    if ($[86] !== t22 || $[87] !== t43) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid min-h-[calc(100vh-14rem)] gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch",
            children: [
                t22,
                t43
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/app/auth/login/page.tsx",
            lineNumber: 368,
            columnNumber: 11
        }, this);
        $[86] = t22;
        $[87] = t43;
        $[88] = t44;
    } else {
        t44 = $[88];
    }
    return t44;
}
_s(LoginPage, "+HZz8Dboxgmf0BCo8CY3qQ9cFVg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseSession"]
    ];
});
_c = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=web_src_app_auth_login_page_tsx_40f53de6._.js.map