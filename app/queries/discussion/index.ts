import supabase from "@/lib/supabase";

const getAllDiscussions = supabase
  .from("discussion")
  .select("*, comment(*, user(*))")
  .order("created_at", { ascending: false });

export { getAllDiscussions };
