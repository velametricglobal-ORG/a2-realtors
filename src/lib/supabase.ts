import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mdfssxcepslyfithlyfp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZnNzeGNlcHNseWZpdGhseWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMDY2OTQsImV4cCI6MjEwMjY4MjY5NH0.GJkNf1QPaNWI8ypXQTHjloow8cOQMevK-oFu9ygKJn8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
