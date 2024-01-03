import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

// grants access and refresh tokens
// sets cookies for access and refresh tokens
// sets user in local storage
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

// // redirects with `code` query param for PKCE (Public Key Code Exchange)
// // api route required to exchange code for access & refresh token
// const supabase = createBrowserClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

export default supabase;
