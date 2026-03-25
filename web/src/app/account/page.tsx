import { AccountDashboard } from "@/components/account/AccountDashboard";
import { getServerLanguage } from "@/lib/server-language";
import {
  getAccountOverview,
  requireAuthenticatedUser,
} from "@/lib/storefront-data";
import { getMessages } from "@/lib/storefront";

export const dynamic = "force-dynamic";

type AccountPageProps = {
  searchParams: Promise<{
    tab?: string | string[];
  }>;
};

function readTab(value?: string | string[]) {
  const first = Array.isArray(value) ? value[0] : value;

  if (first === "orders" || first === "addresses") {
    return first;
  }

  return "profile";
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const params = await searchParams;
  const language = await getServerLanguage();
  const messages = getMessages(language);
  const { user } = await requireAuthenticatedUser();
  const { profile, orders, addresses } = await getAccountOverview(user.id);

  return (
    <div className="space-y-10">
      <section className="soft-panel px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="text-start">
          <p className="eyebrow">{messages.account.title}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
            {messages.account.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-500">
            {messages.account.subtitle}
          </p>
        </div>
      </section>

      <AccountDashboard
        userId={user.id}
        userEmail={user.email ?? ""}
        initialProfile={profile}
        initialOrders={orders}
        initialAddresses={addresses}
        initialTab={readTab(params.tab)}
      />
    </div>
  );
}
