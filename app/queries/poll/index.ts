import supabase from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";

const getAllPolls = supabase
  .from("poll")
  .select("*, poll_option(*, poll_vote(*))")
  .order("created_at", { ascending: false });

const createPoll = (values: TablesInsert<"poll">) =>
  supabase.from("poll").insert([values]).select();

const createOptions = (values: TablesInsert<"poll_option">[]) =>
  supabase
    .from("poll_option")
    .insert([...values])
    .select();

export { getAllPolls, createPoll, createOptions };
