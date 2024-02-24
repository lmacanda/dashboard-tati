"use client";

import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthForm() {
  const supabase = createClientComponentClient();
  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      showLinks={false}
      providers={[]}
      redirectTo="http://localhost:3000/auth/callback"
      appearance={{ theme: "dark" }}
    />
  );
}
