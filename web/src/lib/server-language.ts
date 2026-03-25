import { cookies } from "next/headers";

import { LANGUAGE_COOKIE, normalizeLanguage } from "@/lib/storefront";

export async function getServerLanguage() {
  const cookieStore = await cookies();
  return normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
}
