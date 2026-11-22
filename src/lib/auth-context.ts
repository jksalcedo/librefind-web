import { supabase } from './supabase';

export type AuthSessionUser = {
  id: string;
  email?: string;
};

const ready = supabase.auth.getSession().then(({ data }) => data.session?.user ?? null);

export async function getSessionUser() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session?.user ?? null;
}

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'librefindAuth', {
    configurable: true,
    value: {
      supabase,
      ready,
      getSessionUser,
    },
  });

  supabase.auth.onAuthStateChange((event, session) => {
    window.dispatchEvent(new CustomEvent('librefind-auth-change', {
      detail: { event, user: session?.user ?? null },
    }));
  });
}
