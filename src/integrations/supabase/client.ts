// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hdarqavtxzzjzyjqywnb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkYXJxYXZ0eHp6anp5anF5d25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTU2ODksImV4cCI6MjA2ODI3MTY4OX0.jbX9jc4LO3PQ6Z-2c6dNa0qbl40tsDiRqTjeDcoA1wk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});