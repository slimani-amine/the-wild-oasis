import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ndfhemxeosmwetsieejo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kZmhlbXhlb3Ntd2V0c2llZWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyNDA0MjgsImV4cCI6MjAxODgxNjQyOH0.9OmX9HiIa99eQ8O19KsHn14KzIaN01JQoJ6nO1BEaF4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
