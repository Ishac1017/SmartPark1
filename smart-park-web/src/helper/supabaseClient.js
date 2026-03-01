import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const getSupabaseClient = (getAccessTokenSilently) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      fetch: async (url, options = {}) => {
        const token = await getAccessTokenSilently();
        const headers = new Headers(options.headers);
        headers.set("Authorization", `Bearer ${token}`);
        return fetch(url, { ...options, headers });
      },
    },
  });
};

// Export the base client for unauthenticated requests if needed
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
