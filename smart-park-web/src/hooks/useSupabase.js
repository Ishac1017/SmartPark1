import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { getSupabaseClient } from "../helper/supabaseClient";

export const useSupabase = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const supabase = useMemo(() => {
    if (!isAuthenticated) return null;
    return getSupabaseClient(getAccessTokenSilently);
  }, [getAccessTokenSilently, isAuthenticated]);

  return supabase;
};
