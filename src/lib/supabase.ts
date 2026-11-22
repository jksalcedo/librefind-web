// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.PUBLIC_SUPABASE_URL ||
  import.meta.env.SUPABASE_URL ||
  'https://frmntglebkzkfhrqdgbm.supabase.co';
const supabaseKey =
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybW50Z2xlYmt6a2ZocnFkZ2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDk5OTcsImV4cCI6MjA4NDQ4NTk5N30.E5H1WFGbgBdFyjUcDE7Hg3ajmxgXeGQyXjQQf3Ie_DA';

// Cookie-based storage fallback for environments where Web Storage is unavailable
function createCookieStorage() {
  return {
    getItem(key: string) {
      const name = encodeURIComponent(key) + "=";
      const parts = document.cookie.split(";");
      for (let part of parts) {
        part = part.trim();
        if (part.startsWith(name)) {
          return decodeURIComponent(part.substring(name.length));
        }
      }
      return null;
    },
    setItem(key: string, value: string) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      const maxAgeSeconds = 60 * 60 * 24 * 365;
      document.cookie = `${encodedKey}=${encodedValue}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
    },
    removeItem(key: string) {
      const encodedKey = encodeURIComponent(key);
      document.cookie = `${encodedKey}=; path=/; max-age=0; samesite=lax`;
    },
  };
}

function getStorage() {
  if (typeof window === 'undefined') return createCookieStorage();
  try {
    const testKey = "sb_storage_test";
    let desiredStorage = window.localStorage;
    try {
      const pref = window.localStorage?.getItem("remember_me");
      if (pref === "0") desiredStorage = window.sessionStorage;
    } catch (e) { /* ignore */ }

    desiredStorage.setItem(testKey, "1");
    const ok = desiredStorage.getItem(testKey) === "1";
    desiredStorage.removeItem(testKey);
    if (ok) return desiredStorage;
  } catch (e) {
    console.warn("Web Storage unavailable, using cookie storage", e);
  }
  return createCookieStorage();
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: getStorage(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});