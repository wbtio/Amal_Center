// Wayl payment edge function
// Actions:
//   { action: 'create', orderId }  -> creates a Wayl payment link for the order, returns { url }
//   { action: 'status', orderId }  -> checks the link status, marks the order paid when Complete
//
// The Wayl merchant token is read from the admin-only `payment_gateway_settings`
// table using the service-role key, so it never reaches the mobile client.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const WAYL_API = "https://api.thewayl.com/api/v1";
// The mobile WebView watches for this URL to know checkout is finished.
const RETURN_URL = "https://amalcenter.app/payment-return";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Identify the caller from the forwarded JWT.
    const authHeader = req.headers.get("Authorization") ?? "";
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user) return json({ error: "غير مصرح" }, 401);

    const { action, orderId } = await req.json().catch(() => ({}));
    if (!action || !orderId) return json({ error: "طلب غير صالح" }, 400);

    // Service-role client for DB + reading the secret token (bypasses RLS).
    const admin = createClient(supabaseUrl, serviceKey);

    const { data: order, error: orderErr } = await admin
      .from("orders")
      .select("id, user_id, total_iqd, payment_status, status")
      .eq("id", orderId)
      .single();
    if (orderErr || !order) return json({ error: "الطلب غير موجود" }, 404);
    if (order.user_id !== user.id) return json({ error: "غير مصرح" }, 403);

    const { data: gw } = await admin
      .from("payment_gateway_settings")
      .select("enabled, env, api_token")
      .eq("provider", "wayl")
      .single();

    if (!gw?.enabled || !gw.api_token) {
      return json({ error: "الدفع الإلكتروني غير مفعّل" }, 403);
    }

    const waylHeaders = {
      "Content-Type": "application/json",
      "X-WAYL-AUTHENTICATION": gw.api_token,
    };

    if (action === "create") {
      const total = Math.round(Number(order.total_iqd));
      const res = await fetch(`${WAYL_API}/links`, {
        method: "POST",
        headers: waylHeaders,
        body: JSON.stringify({
          env: gw.env,
          referenceId: order.id,
          total,
          currency: "IQD",
          customParameter: "",
          lineItem: [{ label: "Basket Value", amount: total, type: "increase" }],
          redirectionUrl: RETURN_URL,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        return json(
          { error: body?.message || "تعذّر إنشاء رابط الدفع", details: body },
          502,
        );
      }
      const url = body?.data?.url;
      const code = body?.data?.code;
      if (!url) return json({ error: "استجابة غير متوقعة من البوابة" }, 502);

      await admin
        .from("orders")
        .update({ payment_url: url, payment_code: code ?? null })
        .eq("id", order.id);

      return json({ url, code });
    }

    if (action === "status") {
      const res = await fetch(`${WAYL_API}/links/${order.id}`, {
        method: "GET",
        headers: waylHeaders,
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        return json(
          { error: body?.message || "تعذّر التحقق من حالة الدفع", details: body },
          502,
        );
      }
      const status: string = body?.data?.status ?? "Unknown";
      const paid = status === "Complete";

      if (paid && order.payment_status !== "paid") {
        await admin
          .from("orders")
          .update({ payment_status: "paid", status: "confirmed" })
          .eq("id", order.id);
      }

      return json({ status, paid });
    }

    return json({ error: "إجراء غير معروف" }, 400);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
