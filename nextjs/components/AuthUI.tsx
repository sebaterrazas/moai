'use client';

import { useSupabase } from '@/app/supabase-provider';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthUI() {
  const { supabase } = useSupabase();
  return (
    <div className="flex flex-col space-y-4">
      <Auth
        supabaseClient={supabase}
        providers={['google']}
        magicLink={true}
        queryParams={{
            access_type: 'offline',
            prompt: 'consent',
        }}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'green',
                brandAccent: '#388E3C',
                brandButtonText: 'hsl(var(--background))',
                defaultButtonText: 'hsl(var(--foreground))',

/*              dividerBackground: 'black',
                inputBackground: 'transparent',
                inputBorder: 'gray',
                inputText: 'black',
                inputPlaceholder: 'darkgray', */
              },

            }
          }
        }}
      />
    </div>
  );
}