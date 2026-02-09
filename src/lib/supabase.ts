
import { createClient } from '@supabase/supabase-js';

// TODO: Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Netlify/Vercel environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase credentials are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
}

// Create client only if credentials exist, otherwise provide a proxy or handle errors gracefully in components
export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null as any; 
