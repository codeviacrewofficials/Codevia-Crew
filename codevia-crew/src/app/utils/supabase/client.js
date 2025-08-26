import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase environment variables are missing or undefined!');
}

export function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are missing. Check your .env.local file and restart the development server.');
  }
  
  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  )
}

