import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_API_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseSecretKey);

export { supabaseClient };
