import supabase from "@/lib/supabase";

const getAllProfiles = supabase
  .from("profiles")
  .select("*")
  .order("created_at", { ascending: false });

export { getAllProfiles };
