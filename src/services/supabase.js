import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mmofyslssmewzvzzqfpd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tb2Z5c2xzc21ld3p2enpxZnBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1Njc0MzAsImV4cCI6MjA1ODE0MzQzMH0.PdNcCIibWgR04RyTNIOMVx5VXv8Wfq_FGFeAib2BONQ";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
