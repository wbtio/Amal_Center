"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

import { createBrowserSupabaseClient } from "@/lib/supabase";
import type { Database } from "@/lib/types";

type SupabaseSessionContextValue = {
  supabase: SupabaseClient<Database>;
  session: Session | null;
  user: User | null;
};

const SupabaseSessionContext =
  createContext<SupabaseSessionContextValue | null>(null);

type SupabaseSessionProviderProps = {
  children: ReactNode;
  initialSession: Session | null;
};

export function SupabaseSessionProvider({
  children,
  initialSession,
}: SupabaseSessionProviderProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [session, setSession] = useState<Session | null>(initialSession);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setSession(data.session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <SupabaseSessionContext.Provider
      value={{ supabase, session, user: session?.user ?? null }}
    >
      {children}
    </SupabaseSessionContext.Provider>
  );
}

export function useSupabaseSession() {
  const context = useContext(SupabaseSessionContext);

  if (!context) {
    throw new Error(
      "useSupabaseSession must be used within SupabaseSessionProvider"
    );
  }

  return context;
}
