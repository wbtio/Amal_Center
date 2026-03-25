import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";
import { getCheckoutData, requireAuthenticatedUser } from "@/lib/storefront-data";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const { user } = await requireAuthenticatedUser();
  const { profile, addresses } = await getCheckoutData(user.id);

  return <CheckoutFlow profile={profile} addresses={addresses} />;
}
