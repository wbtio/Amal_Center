// Delete-user edge function
//   { userId }  -> permanently deletes the caller's own auth account
//
// The mobile app deletes the user's rows from the public tables first, then calls
// this function to remove the auth.users record — which requires the service-role
// key and therefore cannot be done from the client.
//
// Security: the account deleted is ALWAYS the one identified by the forwarded JWT.
// The userId in the body is only cross-checked; it can never target another user.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

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

    // If the client sent a userId, it must match the authenticated caller.
    const { userId } = await req.json().catch(() => ({}));
    if (userId && userId !== user.id) {
      return json({ error: "غير مصرح" }, 403);
    }

    const admin = createClient(supabaseUrl, serviceKey);

    // Leftover rows in case the client-side cleanup failed partway.
    // Orders are intentionally kept (accounting records) but unlinked.
    for (const table of ["addresses", "notifications", "wishlist", "coupon_usages"]) {
      await admin.from(table).delete().eq("user_id", user.id);
    }
    await admin.from("profiles").delete().eq("id", user.id);

    const { error: delErr } = await admin.auth.admin.deleteUser(user.id);
    if (delErr) return json({ error: delErr.message }, 500);

    return json({ deleted: true });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
