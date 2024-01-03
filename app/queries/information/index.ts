import supabase from "@/lib/supabase";

const getAllInformation = supabase
  .from("information")
  .select("*")
  .order("created_at", { ascending: false });

export { getAllInformation };
