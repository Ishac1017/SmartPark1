import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSupabase } from './useSupabase';

export const useUserSync = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const supabase = useSupabase();

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoading && isAuthenticated && user && supabase) {
        // This 'upsert' command either inserts a new row or updates if it exists
        const { error } = await supabase
          .from('profiles')
          .upsert({ 
            id: user.sub, // The unique Auth0 ID
            email: user.email,
            last_login: new Date() 
          });

        if (error) console.error('Error syncing user to Supabase:', error);
      }
    };

    syncUser();
  }, [user, isAuthenticated, isLoading, supabase]);
};
