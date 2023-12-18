import supabase from "@/lib/supabase";

const getAllDiscussions = supabase
  .from("discussion")
  .select("*, comment(*, user(*))")
  .order("created_at", { ascending: false });

const getAllPolls = supabase
  .from("poll")
  .select("*, poll_option(*, poll_vote(*))")
  .order("created_at", { ascending: false });

const getAllInformation = supabase
  .from("information")
  .select("*")
  .order("created_at", { ascending: false });

export { getAllDiscussions, getAllPolls, getAllInformation };
