import supabase from "@/lib/supabase";

const getAllDiscussions = supabase
  .from("discussion")
  .select("*, comment(*, user(*))");

const getAllPolls = supabase
  .from("poll")
  .select("*, poll_option(*, poll_vote(*))");

const getAllInformation = supabase.from("information").select("*");

export { getAllDiscussions, getAllPolls, getAllInformation };
