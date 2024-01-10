import supabase from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";

const getAllPolls = supabase
  .from("poll")
  .select("*, poll_option(*, poll_vote(*))")
  .order("created_at", { ascending: false });

const getFilteredPolls = (searchQuery: string) =>
  supabase
    .from("poll")
    .select("*, poll_option(*, poll_vote(*))")
    .order("created_at", { ascending: false })
    // sanitize search query
    .textSearch(
      "title",
      searchQuery
        .trim()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "|")
    );

const createPoll = (values: TablesInsert<"poll">) =>
  supabase.from("poll").insert([values]).select();

const createOptions = (values: TablesInsert<"poll_option">[]) =>
  supabase
    .from("poll_option")
    .insert([...values])
    .select();

const castVote = (values: TablesInsert<"poll_vote">) =>
  supabase.from("poll_vote").insert([values]).select();

export { getAllPolls, getFilteredPolls, createPoll, createOptions, castVote };
