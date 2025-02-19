import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qewxgaocsptlgfhiqyiy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFld3hnYW9jc3B0bGdmaGlxeWl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxODg1MDEsImV4cCI6MjA1NDc2NDUwMX0.qkDop_a7WqxkVZ2bVflu0QL8OPIQH0Qqy1rzEtR_WbM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
