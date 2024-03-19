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
        magicLink={false}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'green',
                brandAccent: '#388E3C',
                brandButtonText: 'hsl(var(--foreground))',
                defaultButtonText: 'hsl(var(--foreground))',
                defaultButtonBackground: 'hsl(var(--background))',
                defaultButtonBackgroundHover: 'hsl(var(--highlight))',
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