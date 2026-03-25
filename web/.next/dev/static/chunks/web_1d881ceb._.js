(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/src/components/account/AccountDashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountDashboard",
    ()=>AccountDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/circle-user-round.js [app-client] (ecmascript) <export default as UserCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/StorefrontProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/providers/SupabaseSessionProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/storefront.ts [app-client] (ecmascript)");
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
;
const EMPTY_ADDRESS_FORM = {
    name: "",
    phone: "",
    city: "",
    area: "",
    street: "",
    type: "home"
};
function AccountDashboard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(171);
    if ($[0] !== "4229f4a8d8ca6c93e06de1c2753d460b35b388d66eef4269fc5d31baa03d7d01") {
        for(let $i = 0; $i < 171; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "4229f4a8d8ca6c93e06de1c2753d460b35b388d66eef4269fc5d31baa03d7d01";
    }
    const { userId, userEmail, initialProfile, initialOrders, initialAddresses, initialTab } = t0;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { supabase } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseSession"])();
    const db = supabase;
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialTab);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialProfile);
    const [orders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialOrders);
    const [addresses, setAddresses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialAddresses);
    const t1 = initialProfile?.full_name ?? "";
    const t2 = initialProfile?.phone ?? "";
    let t3;
    if ($[1] !== t1 || $[2] !== t2) {
        t3 = {
            fullName: t1,
            phone: t2
        };
        $[1] = t1;
        $[2] = t2;
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    const [profileForm, setProfileForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t3);
    const [addressForm, setAddressForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(EMPTY_ADDRESS_FORM);
    const [notice, setNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isPending, startRouteTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const [isSavingProfile, setIsSavingProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSavingAddress, setIsSavingAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSigningOut, setIsSigningOut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t4;
    let t5;
    if ($[4] !== initialTab) {
        t4 = ({
            "AccountDashboard[useEffect()]": ()=>{
                setActiveTab(initialTab);
            }
        })["AccountDashboard[useEffect()]"];
        t5 = [
            initialTab
        ];
        $[4] = initialTab;
        $[5] = t4;
        $[6] = t5;
    } else {
        t4 = $[5];
        t5 = $[6];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    let t6;
    if ($[7] !== pathname || $[8] !== router || $[9] !== searchParams) {
        t6 = function setTab(tab) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("tab", tab);
            setActiveTab(tab);
            startRouteTransition({
                "AccountDashboard[setTab > startRouteTransition()]": ()=>{
                    router.replace(`${pathname}?${params.toString()}`, {
                        scroll: false
                    });
                }
            }["AccountDashboard[setTab > startRouteTransition()]"]);
        };
        $[7] = pathname;
        $[8] = router;
        $[9] = searchParams;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    const setTab = t6;
    let t7;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = function showNotice(message) {
            setError("");
            setNotice(message);
        };
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    const showNotice = t7;
    let t8;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = function showError(message_0) {
            setNotice("");
            setError(message_0);
        };
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    const showError = t8;
    let t9;
    if ($[13] !== db || $[14] !== language || $[15] !== profile?.avatar_url || $[16] !== profileForm.fullName || $[17] !== profileForm.phone || $[18] !== router || $[19] !== userId) {
        t9 = async function saveProfile() {
            setIsSavingProfile(true);
            setNotice("");
            setError("");
            const { data, error: updateError } = await db.from("profiles").upsert({
                id: userId,
                full_name: profileForm.fullName.trim() || null,
                phone: profileForm.phone.trim() || null,
                avatar_url: profile?.avatar_url ?? null
            }).select("*").single();
            setIsSavingProfile(false);
            if (updateError) {
                showError(language === "ar" ? "\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A." : "Unable to update the profile.");
                return;
            }
            setProfile(data);
            showNotice(language === "ar" ? "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A \u0628\u0646\u062C\u0627\u062D." : "Profile updated successfully.");
            router.refresh();
        };
        $[13] = db;
        $[14] = language;
        $[15] = profile?.avatar_url;
        $[16] = profileForm.fullName;
        $[17] = profileForm.phone;
        $[18] = router;
        $[19] = userId;
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    const saveProfile = t9;
    let t10;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = function extractFileNameFromUrl(url) {
            const parts = url.split("/avatars/");
            if (parts.length < 2) {
                return null;
            }
            return parts[1]?.split("?")[0] ?? null;
        };
        $[21] = t10;
    } else {
        t10 = $[21];
    }
    const extractFileNameFromUrl = t10;
    let t11;
    if ($[22] !== supabase.storage) {
        t11 = async function removeOldAvatar(oldUrl) {
            if (!oldUrl) {
                return;
            }
            const fileName = extractFileNameFromUrl(oldUrl);
            if (!fileName) {
                return;
            }
            await supabase.storage.from("avatars").remove([
                fileName
            ]);
        };
        $[22] = supabase.storage;
        $[23] = t11;
    } else {
        t11 = $[23];
    }
    const removeOldAvatar = t11;
    let t12;
    if ($[24] !== db || $[25] !== language || $[26] !== profile?.avatar_url || $[27] !== profileForm.fullName || $[28] !== profileForm.phone || $[29] !== removeOldAvatar || $[30] !== router || $[31] !== supabase.storage || $[32] !== userId) {
        t12 = async function uploadAvatar(file) {
            setIsUploadingAvatar(true);
            setNotice("");
            setError("");
            const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
            const fileName_0 = `${userId}-${Date.now()}.${extension}`;
            const { error: uploadError } = await supabase.storage.from("avatars").upload(fileName_0, file, {
                contentType: file.type || "image/jpeg",
                upsert: true
            });
            if (uploadError) {
                setIsUploadingAvatar(false);
                showError(language === "ar" ? "\u062A\u0639\u0630\u0631 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629." : "Unable to upload the avatar.");
                return;
            }
            await removeOldAvatar(profile?.avatar_url ?? null);
            const { data: t13 } = supabase.storage.from("avatars").getPublicUrl(fileName_0);
            const { publicUrl } = t13;
            const { data: data_0, error: updateError_0 } = await db.from("profiles").upsert({
                id: userId,
                full_name: profileForm.fullName.trim() || null,
                phone: profileForm.phone.trim() || null,
                avatar_url: publicUrl
            }).select("*").single();
            setIsUploadingAvatar(false);
            if (updateError_0) {
                showError(language === "ar" ? "\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0644\u0643\u0646 \u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A." : "Avatar uploaded, but profile update failed.");
                return;
            }
            setProfile(data_0);
            showNotice(language === "ar" ? "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629." : "Avatar updated successfully.");
            router.refresh();
        };
        $[24] = db;
        $[25] = language;
        $[26] = profile?.avatar_url;
        $[27] = profileForm.fullName;
        $[28] = profileForm.phone;
        $[29] = removeOldAvatar;
        $[30] = router;
        $[31] = supabase.storage;
        $[32] = userId;
        $[33] = t12;
    } else {
        t12 = $[33];
    }
    const uploadAvatar = t12;
    let t13;
    if ($[34] !== addressForm.area || $[35] !== addressForm.city || $[36] !== addressForm.name || $[37] !== addressForm.phone || $[38] !== addressForm.street || $[39] !== addressForm.type || $[40] !== addresses.length || $[41] !== db || $[42] !== language || $[43] !== router || $[44] !== userId) {
        t13 = async function addAddress() {
            setIsSavingAddress(true);
            setNotice("");
            setError("");
            const payload = {
                user_id: userId,
                name: addressForm.name.trim(),
                phone: addressForm.phone.trim(),
                city: addressForm.city.trim(),
                area: addressForm.area.trim(),
                street: addressForm.street.trim(),
                type: addressForm.type,
                is_default: addresses.length === 0
            };
            const { data: data_1, error: insertError } = await db.from("addresses").insert(payload).select("*").single();
            setIsSavingAddress(false);
            if (insertError) {
                showError(language === "ar" ? "\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0627\u0644\u0639\u0646\u0648\u0627\u0646." : "Unable to save the address.");
                return;
            }
            setAddresses({
                "AccountDashboard[addAddress > setAddresses()]": (current)=>[
                        data_1,
                        ...current
                    ].sort(_AccountDashboardAddAddressSetAddressesAnonymous)
            }["AccountDashboard[addAddress > setAddresses()]"]);
            setAddressForm(EMPTY_ADDRESS_FORM);
            showNotice(language === "ar" ? "\u062A\u0645\u062A \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0628\u0646\u062C\u0627\u062D." : "Address added successfully.");
            router.refresh();
        };
        $[34] = addressForm.area;
        $[35] = addressForm.city;
        $[36] = addressForm.name;
        $[37] = addressForm.phone;
        $[38] = addressForm.street;
        $[39] = addressForm.type;
        $[40] = addresses.length;
        $[41] = db;
        $[42] = language;
        $[43] = router;
        $[44] = userId;
        $[45] = t13;
    } else {
        t13 = $[45];
    }
    const addAddress = t13;
    let t14;
    if ($[46] !== db || $[47] !== language || $[48] !== router || $[49] !== userId) {
        t14 = async function setDefaultAddress(addressId) {
            setNotice("");
            setError("");
            const unsetResponse = await db.from("addresses").update({
                is_default: false
            }).eq("user_id", userId);
            if (unsetResponse.error) {
                showError(language === "ar" ? "\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A." : "Unable to update the default address.");
                return;
            }
            const setResponse = await db.from("addresses").update({
                is_default: true
            }).eq("id", addressId);
            if (setResponse.error) {
                showError(language === "ar" ? "\u062A\u0639\u0630\u0631 \u062A\u0639\u064A\u064A\u0646 \u0647\u0630\u0627 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0643\u0627\u0641\u062A\u0631\u0627\u0636\u064A." : "Unable to set this address as default.");
                return;
            }
            setAddresses({
                "AccountDashboard[setDefaultAddress > setAddresses()]": (current_0)=>current_0.map({
                        "AccountDashboard[setDefaultAddress > setAddresses() > current_0.map()]": (address)=>({
                                ...address,
                                is_default: address.id === addressId
                            })
                    }["AccountDashboard[setDefaultAddress > setAddresses() > current_0.map()]"]).sort(_AccountDashboardSetDefaultAddressSetAddressesAnonymous)
            }["AccountDashboard[setDefaultAddress > setAddresses()]"]);
            showNotice(language === "ar" ? "\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A." : "Default address updated.");
            router.refresh();
        };
        $[46] = db;
        $[47] = language;
        $[48] = router;
        $[49] = userId;
        $[50] = t14;
    } else {
        t14 = $[50];
    }
    const setDefaultAddress = t14;
    let t15;
    if ($[51] !== db || $[52] !== language || $[53] !== router) {
        t15 = async function deleteAddress(addressId_0) {
            setNotice("");
            setError("");
            const { error: deleteError } = await db.from("addresses").delete().eq("id", addressId_0);
            if (deleteError) {
                showError(language === "ar" ? "\u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0627\u0644\u0639\u0646\u0648\u0627\u0646." : "Unable to delete the address.");
                return;
            }
            setAddresses({
                "AccountDashboard[deleteAddress > setAddresses()]": (current_1)=>current_1.filter({
                        "AccountDashboard[deleteAddress > setAddresses() > current_1.filter()]": (address_0)=>address_0.id !== addressId_0
                    }["AccountDashboard[deleteAddress > setAddresses() > current_1.filter()]"])
            }["AccountDashboard[deleteAddress > setAddresses()]"]);
            showNotice(language === "ar" ? "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0639\u0646\u0648\u0627\u0646." : "Address deleted successfully.");
            router.refresh();
        };
        $[51] = db;
        $[52] = language;
        $[53] = router;
        $[54] = t15;
    } else {
        t15 = $[54];
    }
    const deleteAddress = t15;
    let t16;
    if ($[55] !== router || $[56] !== supabase.auth) {
        t16 = async function signOut() {
            setIsSigningOut(true);
            await supabase.auth.signOut();
            setIsSigningOut(false);
            router.replace("/");
            router.refresh();
        };
        $[55] = router;
        $[56] = supabase.auth;
        $[57] = t16;
    } else {
        t16 = $[57];
    }
    const signOut = t16;
    const t17 = language === "ar" ? "\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A" : "Profile";
    let t18;
    if ($[58] !== t17) {
        t18 = {
            id: "profile",
            label: t17,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__["UserCircle2"]
        };
        $[58] = t17;
        $[59] = t18;
    } else {
        t18 = $[59];
    }
    const t19 = language === "ar" ? "\u0627\u0644\u0637\u0644\u0628\u0627\u062A" : "Orders";
    let t20;
    if ($[60] !== t19) {
        t20 = {
            id: "orders",
            label: t19,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"]
        };
        $[60] = t19;
        $[61] = t20;
    } else {
        t20 = $[61];
    }
    const t21 = language === "ar" ? "\u0627\u0644\u0639\u0646\u0627\u0648\u064A\u0646" : "Addresses";
    let t22;
    if ($[62] !== t21) {
        t22 = {
            id: "addresses",
            label: t21,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"]
        };
        $[62] = t21;
        $[63] = t22;
    } else {
        t22 = $[63];
    }
    let t23;
    if ($[64] !== t18 || $[65] !== t20 || $[66] !== t22) {
        t23 = [
            t18,
            t20,
            t22
        ];
        $[64] = t18;
        $[65] = t20;
        $[66] = t22;
        $[67] = t23;
    } else {
        t23 = $[67];
    }
    const navItems = t23;
    const t24 = language === "ar" ? "\u062D\u0633\u0627\u0628\u0643" : "Your account";
    let t25;
    if ($[68] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: t24
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 462,
            columnNumber: 11
        }, this);
        $[68] = t24;
        $[69] = t25;
    } else {
        t25 = $[69];
    }
    const t26 = profile?.full_name || (language === "ar" ? "\u0639\u0645\u064A\u0644 \u0627\u0644\u0623\u0645\u0644 \u0633\u0646\u062A\u0631" : "Al-Amal customer");
    let t27;
    if ($[70] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-3 text-xl font-semibold text-[#1D1D1F]",
            children: t26
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 471,
            columnNumber: 11
        }, this);
        $[70] = t26;
        $[71] = t27;
    } else {
        t27 = $[71];
    }
    let t28;
    if ($[72] !== userEmail) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-2 text-sm text-slate-500",
            children: userEmail
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 479,
            columnNumber: 11
        }, this);
        $[72] = userEmail;
        $[73] = t28;
    } else {
        t28 = $[73];
    }
    let t29;
    if ($[74] !== t25 || $[75] !== t27 || $[76] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[2rem] bg-slate-50 p-5",
            children: [
                t25,
                t27,
                t28
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 487,
            columnNumber: 11
        }, this);
        $[74] = t25;
        $[75] = t27;
        $[76] = t28;
        $[77] = t29;
    } else {
        t29 = $[77];
    }
    let t30;
    if ($[78] !== activeTab || $[79] !== navItems || $[80] !== setTab) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-4 grid gap-2",
            children: navItems.map({
                "AccountDashboard[navItems.map()]": (item)=>{
                    const Icon = item.icon;
                    const active = activeTab === item.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: {
                            "AccountDashboard[navItems.map() > <button>.onClick]": ()=>setTab(item.id)
                        }["AccountDashboard[navItems.map() > <button>.onClick]"],
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex min-h-12 items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition", active ? "bg-[#1D1D1F] text-white" : "text-slate-600 hover:bg-slate-50 hover:text-[#1D1D1F]"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                lineNumber: 503,
                                columnNumber: 268
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                lineNumber: 503,
                                columnNumber: 286
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                        lineNumber: 501,
                        columnNumber: 18
                    }, this);
                }
            }["AccountDashboard[navItems.map()]"])
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 497,
            columnNumber: 11
        }, this);
        $[78] = activeTab;
        $[79] = navItems;
        $[80] = setTab;
        $[81] = t30;
    } else {
        t30 = $[81];
    }
    let t31;
    let t32;
    if ($[82] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-4 flex min-h-12 w-full items-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-danger/40 hover:text-danger");
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 517,
            columnNumber: 11
        }, this);
        $[82] = t31;
        $[83] = t32;
    } else {
        t31 = $[82];
        t32 = $[83];
    }
    const t33 = isSigningOut ? language === "ar" ? "\u062C\u0627\u0631\u064D \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C" : "Signing out" : language === "ar" ? "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C" : "Sign out";
    let t34;
    if ($[84] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t33
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 527,
            columnNumber: 11
        }, this);
        $[84] = t33;
        $[85] = t34;
    } else {
        t34 = $[85];
    }
    let t35;
    if ($[86] !== isSigningOut || $[87] !== signOut || $[88] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: signOut,
            disabled: isSigningOut,
            className: t31,
            children: [
                t32,
                t34
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 535,
            columnNumber: 11
        }, this);
        $[86] = isSigningOut;
        $[87] = signOut;
        $[88] = t34;
        $[89] = t35;
    } else {
        t35 = $[89];
    }
    let t36;
    if ($[90] !== t29 || $[91] !== t30 || $[92] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "soft-panel h-fit p-4 lg:sticky lg:top-28",
            children: [
                t29,
                t30,
                t35
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 545,
            columnNumber: 11
        }, this);
        $[90] = t29;
        $[91] = t30;
        $[92] = t35;
        $[93] = t36;
    } else {
        t36 = $[93];
    }
    const t37 = language === "ar" ? "\u0627\u0644\u0637\u0644\u0628\u0627\u062A" : "Orders";
    let t38;
    if ($[94] !== t37) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: t37
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 556,
            columnNumber: 11
        }, this);
        $[94] = t37;
        $[95] = t38;
    } else {
        t38 = $[95];
    }
    let t39;
    if ($[96] !== orders.length) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-3 text-3xl font-semibold text-[#1D1D1F]",
            children: orders.length
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 564,
            columnNumber: 11
        }, this);
        $[96] = orders.length;
        $[97] = t39;
    } else {
        t39 = $[97];
    }
    let t40;
    if ($[98] !== t38 || $[99] !== t39) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[2rem] bg-slate-50 px-5 py-5",
            children: [
                t38,
                t39
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 572,
            columnNumber: 11
        }, this);
        $[98] = t38;
        $[99] = t39;
        $[100] = t40;
    } else {
        t40 = $[100];
    }
    const t41 = language === "ar" ? "\u0627\u0644\u0639\u0646\u0627\u0648\u064A\u0646" : "Addresses";
    let t42;
    if ($[101] !== t41) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: t41
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 582,
            columnNumber: 11
        }, this);
        $[101] = t41;
        $[102] = t42;
    } else {
        t42 = $[102];
    }
    let t43;
    if ($[103] !== addresses.length) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-3 text-3xl font-semibold text-[#1D1D1F]",
            children: addresses.length
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 590,
            columnNumber: 11
        }, this);
        $[103] = addresses.length;
        $[104] = t43;
    } else {
        t43 = $[104];
    }
    let t44;
    if ($[105] !== t42 || $[106] !== t43) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[2rem] bg-slate-50 px-5 py-5",
            children: [
                t42,
                t43
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 598,
            columnNumber: 11
        }, this);
        $[105] = t42;
        $[106] = t43;
        $[107] = t44;
    } else {
        t44 = $[107];
    }
    const t45 = language === "ar" ? "\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B" : "Last update";
    let t46;
    if ($[108] !== t45) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "eyebrow",
            children: t45
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 608,
            columnNumber: 11
        }, this);
        $[108] = t45;
        $[109] = t46;
    } else {
        t46 = $[109];
    }
    let t47;
    if ($[110] !== language || $[111] !== profile) {
        t47 = profile?.updated_at ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateTime"])(profile.updated_at, language) : language === "ar" ? "\u0644\u0627 \u064A\u0648\u062C\u062F" : "Not available";
        $[110] = language;
        $[111] = profile;
        $[112] = t47;
    } else {
        t47 = $[112];
    }
    let t48;
    if ($[113] !== t47) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-3 text-base font-semibold text-[#1D1D1F]",
            children: t47
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 625,
            columnNumber: 11
        }, this);
        $[113] = t47;
        $[114] = t48;
    } else {
        t48 = $[114];
    }
    let t49;
    if ($[115] !== t46 || $[116] !== t48) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[2rem] bg-slate-50 px-5 py-5",
            children: [
                t46,
                t48
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 633,
            columnNumber: 11
        }, this);
        $[115] = t46;
        $[116] = t48;
        $[117] = t49;
    } else {
        t49 = $[117];
    }
    let t50;
    if ($[118] !== t40 || $[119] !== t44 || $[120] !== t49) {
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-4 md:grid-cols-3",
            children: [
                t40,
                t44,
                t49
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 642,
            columnNumber: 11
        }, this);
        $[118] = t40;
        $[119] = t44;
        $[120] = t49;
        $[121] = t50;
    } else {
        t50 = $[121];
    }
    let t51;
    if ($[122] !== notice) {
        t51 = notice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-5 rounded-3xl bg-primary/8 px-5 py-4 text-sm text-primary",
            children: notice
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 652,
            columnNumber: 20
        }, this) : null;
        $[122] = notice;
        $[123] = t51;
    } else {
        t51 = $[123];
    }
    let t52;
    if ($[124] !== error) {
        t52 = error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-5 rounded-3xl bg-rose-50 px-5 py-4 text-sm text-danger",
            children: error
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 660,
            columnNumber: 19
        }, this) : null;
        $[124] = error;
        $[125] = t52;
    } else {
        t52 = $[125];
    }
    let t53;
    if ($[126] !== t50 || $[127] !== t51 || $[128] !== t52) {
        t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "soft-panel p-6 sm:p-8",
            children: [
                t50,
                t51,
                t52
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 668,
            columnNumber: 11
        }, this);
        $[126] = t50;
        $[127] = t51;
        $[128] = t52;
        $[129] = t53;
    } else {
        t53 = $[129];
    }
    let t54;
    if ($[130] !== activeTab || $[131] !== isSavingProfile || $[132] !== isUploadingAvatar || $[133] !== language || $[134] !== profile || $[135] !== profileForm.fullName || $[136] !== profileForm.phone || $[137] !== saveProfile || $[138] !== uploadAvatar || $[139] !== userEmail) {
        t54 = activeTab === "profile" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "soft-panel p-6 sm:p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-8 xl:flex-row xl:items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[2.5rem] bg-slate-50 px-8 py-8 text-center xl:w-[320px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-white shadow-soft",
                                children: profile?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: profile.avatar_url,
                                    alt: profile?.full_name || "Avatar",
                                    className: "h-full w-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                    lineNumber: 678,
                                    columnNumber: 366
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                    size: 34,
                                    className: "text-slate-300"
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                    lineNumber: 678,
                                    columnNumber: 477
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                lineNumber: 678,
                                columnNumber: 225
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "pill-button-ghost mt-6 w-full cursor-pointer gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 678,
                                        columnNumber: 599
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: isUploadingAvatar ? language === "ar" ? "\u062C\u0627\u0631\u064D \u0627\u0644\u0631\u0641\u0639" : "Uploading" : language === "ar" ? "\u0631\u0641\u0639 \u0635\u0648\u0631\u0629" : "Upload avatar"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 678,
                                        columnNumber: 619
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: "image/*",
                                        className: "hidden",
                                        onChange: {
                                            "AccountDashboard[<input>.onChange]": (event)=>{
                                                const file_0 = event.target.files?.[0];
                                                if (file_0) {
                                                    uploadAvatar(file_0);
                                                }
                                            }
                                        }["AccountDashboard[<input>.onChange]"]
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 678,
                                        columnNumber: 831
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                lineNumber: 678,
                                columnNumber: 529
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                        lineNumber: 678,
                        columnNumber: 144
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "eyebrow",
                                        children: language === "ar" ? "\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u062E\u0635\u064A\u0629" : "Profile details"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 685,
                                        columnNumber: 132
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-2xl font-semibold text-[#1D1D1F]",
                                        children: language === "ar" ? "\u062D\u062F\u0651\u062B \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062D\u0633\u0627\u0628" : "Update account information"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 685,
                                        columnNumber: 294
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                lineNumber: 685,
                                columnNumber: 104
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 md:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "grid gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-slate-600",
                                                children: language === "ar" ? "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644" : "Full name"
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                lineNumber: 685,
                                                columnNumber: 596
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: profileForm.fullName,
                                                onChange: {
                                                    "AccountDashboard[<input>.onChange]": (event_0)=>setProfileForm({
                                                            "AccountDashboard[<input>.onChange > setProfileForm()]": (current_2)=>({
                                                                    ...current_2,
                                                                    fullName: event_0.target.value
                                                                })
                                                        }["AccountDashboard[<input>.onChange > setProfileForm()]"])
                                                }["AccountDashboard[<input>.onChange]"],
                                                className: "field-input"
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                lineNumber: 685,
                                                columnNumber: 761
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 685,
                                        columnNumber: 566
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "grid gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-slate-600",
                                                children: language === "ar" ? "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" : "Phone number"
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                lineNumber: 692,
                                                columnNumber: 120
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: profileForm.phone,
                                                onChange: {
                                                    "AccountDashboard[<input>.onChange]": (event_1)=>setProfileForm({
                                                            "AccountDashboard[<input>.onChange > setProfileForm()]": (current_3)=>({
                                                                    ...current_3,
                                                                    phone: event_1.target.value
                                                                })
                                                        }["AccountDashboard[<input>.onChange > setProfileForm()]"])
                                                }["AccountDashboard[<input>.onChange]"],
                                                className: "field-input",
                                                dir: "ltr"
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                lineNumber: 692,
                                                columnNumber: 276
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 692,
                                        columnNumber: 90
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "grid gap-2 md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-slate-600",
                                                children: language === "ar" ? "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" : "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                lineNumber: 699,
                                                columnNumber: 144
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: userEmail,
                                                disabled: true,
                                                className: "field-input bg-slate-50 text-slate-400",
                                                dir: "ltr"
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                lineNumber: 699,
                                                columnNumber: 335
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 699,
                                        columnNumber: 100
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                lineNumber: 685,
                                columnNumber: 523
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: saveProfile,
                                disabled: isSavingProfile,
                                className: "pill-button-primary",
                                children: isSavingProfile ? language === "ar" ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0641\u0638" : "Saving" : language === "ar" ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A" : "Save changes"
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                lineNumber: 699,
                                columnNumber: 453
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                        lineNumber: 685,
                        columnNumber: 70
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                lineNumber: 678,
                columnNumber: 80
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 678,
            columnNumber: 37
        }, this) : null;
        $[130] = activeTab;
        $[131] = isSavingProfile;
        $[132] = isUploadingAvatar;
        $[133] = language;
        $[134] = profile;
        $[135] = profileForm.fullName;
        $[136] = profileForm.phone;
        $[137] = saveProfile;
        $[138] = uploadAvatar;
        $[139] = userEmail;
        $[140] = t54;
    } else {
        t54 = $[140];
    }
    let t55;
    if ($[141] !== activeTab || $[142] !== language || $[143] !== orders) {
        t55 = activeTab === "orders" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "soft-panel p-6 sm:p-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 flex items-center justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-start",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "eyebrow",
                                    children: language === "ar" ? "\u0627\u0644\u0637\u0644\u0628\u0627\u062A" : "Orders"
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                    lineNumber: 716,
                                    columnNumber: 169
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-3 text-2xl font-semibold text-[#1D1D1F]",
                                    children: language === "ar" ? "\u0633\u062C\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A" : "Order history"
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                    lineNumber: 716,
                                    columnNumber: 273
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                            lineNumber: 716,
                            columnNumber: 141
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/account/orders",
                            className: "pill-button-ghost",
                            children: language === "ar" ? "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644" : "View all"
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                            lineNumber: 716,
                            columnNumber: 446
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                    lineNumber: 716,
                    columnNumber: 79
                }, this),
                orders.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-4",
                    children: orders.map({
                        "AccountDashboard[orders.map()]": (order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/account/orders/${order.id}`,
                                className: "rounded-[2rem] border border-slate-100 bg-slate-50 px-5 py-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-soft",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-base font-semibold text-[#1D1D1F]",
                                                    children: [
                                                        "#",
                                                        order.id.slice(0, 8)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                    lineNumber: 717,
                                                    columnNumber: 364
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-sm text-slate-500",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateTime"])(order.created_at, language)
                                                }, void 0, false, {
                                                    fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                    lineNumber: 717,
                                                    columnNumber: 445
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                            lineNumber: 717,
                                            columnNumber: 336
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-2 text-start sm:text-end",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOrderStatusLabel"])(order.status, language)
                                                }, void 0, false, {
                                                    fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                    lineNumber: 717,
                                                    columnNumber: 602
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-lg font-semibold text-[#1D1D1F]",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIQD"])(order.total_iqd, language)
                                                }, void 0, false, {
                                                    fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                    lineNumber: 717,
                                                    columnNumber: 763
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                            lineNumber: 717,
                                            columnNumber: 542
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                    lineNumber: 717,
                                    columnNumber: 252
                                }, this)
                            }, order.id, false, {
                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                lineNumber: 717,
                                columnNumber: 54
                            }, this)
                    }["AccountDashboard[orders.map()]"])
                }, void 0, false, {
                    fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                    lineNumber: 716,
                    columnNumber: 619
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-[2rem] bg-slate-50 px-6 py-12 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-semibold text-[#1D1D1F]",
                        children: language === "ar" ? "\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0628\u0639\u062F." : "No orders yet."
                    }, void 0, false, {
                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                        lineNumber: 718,
                        columnNumber: 122
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                    lineNumber: 718,
                    columnNumber: 55
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 716,
            columnNumber: 36
        }, this) : null;
        $[141] = activeTab;
        $[142] = language;
        $[143] = orders;
        $[144] = t55;
    } else {
        t55 = $[144];
    }
    let t56;
    if ($[145] !== activeTab || $[146] !== addAddress || $[147] !== addressForm.area || $[148] !== addressForm.city || $[149] !== addressForm.name || $[150] !== addressForm.phone || $[151] !== addressForm.street || $[152] !== addressForm.type || $[153] !== addresses || $[154] !== deleteAddress || $[155] !== isSavingAddress || $[156] !== language || $[157] !== setDefaultAddress) {
        t56 = activeTab === "addresses" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "soft-panel p-6 sm:p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-8 xl:grid-cols-[1.1fr_0.9fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "eyebrow",
                                        children: language === "ar" ? "\u0627\u0644\u0639\u0646\u0627\u0648\u064A\u0646" : "Addresses"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 728,
                                        columnNumber: 170
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-3 text-2xl font-semibold text-[#1D1D1F]",
                                        children: language === "ar" ? "\u0627\u0644\u0639\u0646\u0627\u0648\u064A\u0646 \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629" : "Saved delivery addresses"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 728,
                                        columnNumber: 283
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                lineNumber: 728,
                                columnNumber: 142
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 grid gap-4",
                                children: addresses.length > 0 ? addresses.map({
                                    "AccountDashboard[addresses.map()]": (address_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "rounded-[2rem] border border-slate-100 bg-slate-50 px-5 py-5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-start",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-base font-semibold text-[#1D1D1F]",
                                                                        children: address_1.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                                        lineNumber: 729,
                                                                        columnNumber: 328
                                                                    }, this),
                                                                    address_1.is_default ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary",
                                                                        children: language === "ar" ? "\u0627\u0641\u062A\u0631\u0627\u0636\u064A" : "Default"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                                        lineNumber: 729,
                                                                        columnNumber: 426
                                                                    }, this) : null
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                                lineNumber: 729,
                                                                columnNumber: 277
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-3 text-sm leading-7 text-slate-500",
                                                                children: [
                                                                    address_1.city,
                                                                    address_1.area,
                                                                    address_1.street
                                                                ].filter(Boolean).join("\u060C ")
                                                            }, void 0, false, {
                                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                                lineNumber: 729,
                                                                columnNumber: 614
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-2 text-sm text-slate-500",
                                                                children: address_1.phone
                                                            }, void 0, false, {
                                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                                lineNumber: 729,
                                                                columnNumber: 755
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-2 text-xs uppercase tracking-[0.28em] text-slate-400",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$storefront$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddressTypeLabel"])(address_1.type, language)
                                                            }, void 0, false, {
                                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                                lineNumber: 729,
                                                                columnNumber: 819
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                        lineNumber: 729,
                                                        columnNumber: 249
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-3",
                                                        children: [
                                                            !address_1.is_default ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: {
                                                                    "AccountDashboard[addresses.map() > <button>.onClick]": ()=>void setDefaultAddress(address_1.id)
                                                                }["AccountDashboard[addresses.map() > <button>.onClick]"],
                                                                className: "pill-button-ghost",
                                                                children: language === "ar" ? "\u062A\u0639\u064A\u064A\u0646 \u0643\u0627\u0641\u062A\u0631\u0627\u0636\u064A" : "Set default"
                                                            }, void 0, false, {
                                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                                lineNumber: 729,
                                                                columnNumber: 1010
                                                            }, this) : null,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: {
                                                                    "AccountDashboard[addresses.map() > <button>.onClick]": ()=>void deleteAddress(address_1.id)
                                                                }["AccountDashboard[addresses.map() > <button>.onClick]"],
                                                                className: "inline-flex min-h-11 items-center justify-center rounded-full border border-rose-100 px-4 py-3 text-sm font-semibold text-danger transition hover:bg-rose-50",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    size: 16
                                                                }, void 0, false, {
                                                                    fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                                    lineNumber: 733,
                                                                    columnNumber: 249
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                                lineNumber: 731,
                                                                columnNumber: 246
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                        lineNumber: 729,
                                                        columnNumber: 947
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                lineNumber: 729,
                                                columnNumber: 166
                                            }, this)
                                        }, address_1.id, false, {
                                            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                            lineNumber: 729,
                                            columnNumber: 65
                                        }, this)
                                }["AccountDashboard[addresses.map()]"]) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-[2rem] bg-slate-50 px-6 py-12 text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-semibold text-[#1D1D1F]",
                                        children: language === "ar" ? "\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0648\u064A\u0646 \u0645\u062D\u0641\u0648\u0638\u0629." : "No saved addresses yet."
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 734,
                                        columnNumber: 122
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                    lineNumber: 734,
                                    columnNumber: 55
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                lineNumber: 728,
                                columnNumber: 503
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                        lineNumber: 728,
                        columnNumber: 137
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[2.5rem] bg-slate-50 p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "eyebrow",
                                        children: language === "ar" ? "\u0639\u0646\u0648\u0627\u0646 \u062C\u062F\u064A\u062F" : "New address"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 734,
                                        columnNumber: 439
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mt-3 text-xl font-semibold text-[#1D1D1F]",
                                        children: language === "ar" ? "\u0623\u0636\u0641 \u0639\u0646\u0648\u0627\u0646\u0627\u064B \u062C\u062F\u064A\u062F\u0627\u064B" : "Add a new address"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 734,
                                        columnNumber: 561
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                lineNumber: 734,
                                columnNumber: 411
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 grid gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: addressForm.name,
                                        onChange: {
                                            "AccountDashboard[<input>.onChange]": (event_2)=>setAddressForm({
                                                    "AccountDashboard[<input>.onChange > setAddressForm()]": (current_4)=>({
                                                            ...current_4,
                                                            name: event_2.target.value
                                                        })
                                                }["AccountDashboard[<input>.onChange > setAddressForm()]"])
                                        }["AccountDashboard[<input>.onChange]"],
                                        placeholder: language === "ar" ? "\u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0648\u0627\u0646" : "Address name",
                                        className: "field-input"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 734,
                                        columnNumber: 807
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: addressForm.phone,
                                        onChange: {
                                            "AccountDashboard[<input>.onChange]": (event_3)=>setAddressForm({
                                                    "AccountDashboard[<input>.onChange > setAddressForm()]": (current_5)=>({
                                                            ...current_5,
                                                            phone: event_3.target.value
                                                        })
                                                }["AccountDashboard[<input>.onChange > setAddressForm()]"])
                                        }["AccountDashboard[<input>.onChange]"],
                                        placeholder: language === "ar" ? "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" : "Phone number",
                                        className: "field-input",
                                        dir: "ltr"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 741,
                                        columnNumber: 195
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: addressForm.city,
                                        onChange: {
                                            "AccountDashboard[<input>.onChange]": (event_4)=>setAddressForm({
                                                    "AccountDashboard[<input>.onChange > setAddressForm()]": (current_6)=>({
                                                            ...current_6,
                                                            city: event_4.target.value
                                                        })
                                                }["AccountDashboard[<input>.onChange > setAddressForm()]"])
                                        }["AccountDashboard[<input>.onChange]"],
                                        placeholder: language === "ar" ? "\u0627\u0644\u0645\u062F\u064A\u0646\u0629" : "City",
                                        className: "field-input"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 748,
                                        columnNumber: 199
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: addressForm.area,
                                        onChange: {
                                            "AccountDashboard[<input>.onChange]": (event_5)=>setAddressForm({
                                                    "AccountDashboard[<input>.onChange > setAddressForm()]": (current_7)=>({
                                                            ...current_7,
                                                            area: event_5.target.value
                                                        })
                                                }["AccountDashboard[<input>.onChange > setAddressForm()]"])
                                        }["AccountDashboard[<input>.onChange]"],
                                        placeholder: language === "ar" ? "\u0627\u0644\u0645\u0646\u0637\u0642\u0629" : "Area",
                                        className: "field-input"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 755,
                                        columnNumber: 168
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: addressForm.street,
                                        onChange: {
                                            "AccountDashboard[<input>.onChange]": (event_6)=>setAddressForm({
                                                    "AccountDashboard[<input>.onChange > setAddressForm()]": (current_8)=>({
                                                            ...current_8,
                                                            street: event_6.target.value
                                                        })
                                                }["AccountDashboard[<input>.onChange > setAddressForm()]"])
                                        }["AccountDashboard[<input>.onChange]"],
                                        placeholder: language === "ar" ? "\u0627\u0644\u0634\u0627\u0631\u0639" : "Street",
                                        className: "field-input"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 762,
                                        columnNumber: 168
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: {
                                                    "AccountDashboard[<button>.onClick]": ()=>setAddressForm(_AccountDashboardButtonOnClickSetAddressForm)
                                                }["AccountDashboard[<button>.onClick]"],
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pill-button", addressForm.type === "home" ? "bg-[#1D1D1F] text-white" : "border border-slate-200 bg-white text-slate-600"),
                                                children: language === "ar" ? "\u0627\u0644\u0645\u0646\u0632\u0644" : "Home"
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                lineNumber: 769,
                                                columnNumber: 204
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: {
                                                    "AccountDashboard[<button>.onClick]": ()=>setAddressForm(_AccountDashboardButtonOnClickSetAddressForm2)
                                                }["AccountDashboard[<button>.onClick]"],
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pill-button", addressForm.type === "work" ? "bg-[#1D1D1F] text-white" : "border border-slate-200 bg-white text-slate-600"),
                                                children: language === "ar" ? "\u0627\u0644\u0639\u0645\u0644" : "Work"
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                                lineNumber: 771,
                                                columnNumber: 273
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 769,
                                        columnNumber: 164
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: addAddress,
                                        disabled: isSavingAddress,
                                        className: "pill-button-primary",
                                        children: isSavingAddress ? language === "ar" ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0641\u0638" : "Saving" : language === "ar" ? "\u062D\u0641\u0638 \u0627\u0644\u0639\u0646\u0648\u0627\u0646" : "Save address"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                        lineNumber: 773,
                                        columnNumber: 273
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                                lineNumber: 734,
                                columnNumber: 774
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                        lineNumber: 734,
                        columnNumber: 361
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
                lineNumber: 728,
                columnNumber: 82
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 728,
            columnNumber: 39
        }, this) : null;
        $[145] = activeTab;
        $[146] = addAddress;
        $[147] = addressForm.area;
        $[148] = addressForm.city;
        $[149] = addressForm.name;
        $[150] = addressForm.phone;
        $[151] = addressForm.street;
        $[152] = addressForm.type;
        $[153] = addresses;
        $[154] = deleteAddress;
        $[155] = isSavingAddress;
        $[156] = language;
        $[157] = setDefaultAddress;
        $[158] = t56;
    } else {
        t56 = $[158];
    }
    let t57;
    if ($[159] !== isPending || $[160] !== language) {
        t57 = isPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-slate-400",
            children: language === "ar" ? "\u062C\u0627\u0631\u064D \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629" : "Refreshing view"
        }, void 0, false, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 793,
            columnNumber: 23
        }, this) : null;
        $[159] = isPending;
        $[160] = language;
        $[161] = t57;
    } else {
        t57 = $[161];
    }
    let t58;
    if ($[162] !== t53 || $[163] !== t54 || $[164] !== t55 || $[165] !== t56 || $[166] !== t57) {
        t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                t53,
                t54,
                t55,
                t56,
                t57
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 802,
            columnNumber: 11
        }, this);
        $[162] = t53;
        $[163] = t54;
        $[164] = t55;
        $[165] = t56;
        $[166] = t57;
        $[167] = t58;
    } else {
        t58 = $[167];
    }
    let t59;
    if ($[168] !== t36 || $[169] !== t58) {
        t59 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]",
            children: [
                t36,
                t58
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/account/AccountDashboard.tsx",
            lineNumber: 814,
            columnNumber: 11
        }, this);
        $[168] = t36;
        $[169] = t58;
        $[170] = t59;
    } else {
        t59 = $[170];
    }
    return t59;
}
_s(AccountDashboard, "4ehM4dTlhpykTgRSwyL2/+HBgOs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$SupabaseSessionProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$providers$2f$StorefrontProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefront"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c = AccountDashboard;
function _AccountDashboardButtonOnClickSetAddressForm2(current_10) {
    return {
        ...current_10,
        type: "work"
    };
}
function _AccountDashboardButtonOnClickSetAddressForm(current_9) {
    return {
        ...current_9,
        type: "home"
    };
}
function _AccountDashboardSetDefaultAddressSetAddressesAnonymous(left_0, right_0) {
    return left_0.is_default === right_0.is_default ? 0 : left_0.is_default ? -1 : 1;
}
function _AccountDashboardAddAddressSetAddressesAnonymous(left, right) {
    return left.is_default === right.is_default ? 0 : left.is_default ? -1 : 1;
}
var _c;
__turbopack_context__.k.register(_c, "AccountDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Camera
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
            d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
            key: "18u6gg"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "13",
            r: "3",
            key: "1vg3eu"
        }
    ]
];
const Camera = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("camera", __iconNode);
;
 //# sourceMappingURL=camera.js.map
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Camera",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>LogOut
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
            d: "m16 17 5-5-5-5",
            key: "1bji2h"
        }
    ],
    [
        "path",
        {
            d: "M21 12H9",
            key: "dn1m92"
        }
    ],
    [
        "path",
        {
            d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
            key: "1uf3rs"
        }
    ]
];
const LogOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("log-out", __iconNode);
;
 //# sourceMappingURL=log-out.js.map
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LogOut",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript)");
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
"[project]/web/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Package
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
            d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
            key: "1a0edw"
        }
    ],
    [
        "path",
        {
            d: "M12 22V12",
            key: "d0xqtd"
        }
    ],
    [
        "polyline",
        {
            points: "3.29 7 12 12 20.71 7",
            key: "ousv84"
        }
    ],
    [
        "path",
        {
            d: "m7.5 4.27 9 5.15",
            key: "1c824w"
        }
    ]
];
const Package = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("package", __iconNode);
;
 //# sourceMappingURL=package.js.map
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Package",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Star
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
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s"
        }
    ]
];
const Star = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("star", __iconNode);
;
 //# sourceMappingURL=star.js.map
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Star",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Trash2
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
            d: "M10 11v6",
            key: "nco0om"
        }
    ],
    [
        "path",
        {
            d: "M14 11v6",
            key: "outv1u"
        }
    ],
    [
        "path",
        {
            d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
            key: "miytrc"
        }
    ],
    [
        "path",
        {
            d: "M3 6h18",
            key: "d0wm0j"
        }
    ],
    [
        "path",
        {
            d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
            key: "e791ji"
        }
    ]
];
const Trash2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("trash-2", __iconNode);
;
 //# sourceMappingURL=trash-2.js.map
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Trash2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=web_1d881ceb._.js.map