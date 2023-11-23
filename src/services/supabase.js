import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://tfzmcbhkzzjolonywkpu.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmem1jYmhrenpqb2xvbnl3a3B1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODYyMDIsImV4cCI6MjAxNjA2MjIwMn0.tkZKYO_aeL68Agkx5WLUwtY3EOcLcmCC2C6G6Yw2vAo';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
