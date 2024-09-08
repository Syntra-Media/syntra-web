import { createClient } from "@supabase/supabase-js";

export const supabaseClient = (supabaseToken?: string) => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
        {
            global: {
                headers: supabaseToken
                    ? { Authorization: `Bearer ${supabaseToken}` } // Only add the Authorization header if the token is provided
                    : {}
            }
        }
    );

    return supabase;
};
