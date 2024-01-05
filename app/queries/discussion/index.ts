import supabase from "@/lib/supabase";
import { Discussion } from "@/types";
import { TablesInsert } from "@/types/database.types";

const getAllDiscussions = supabase
  .from("discussion")
  .select("*, comment(*, user_id(*))")
  .order("created_at", { ascending: false })

  // fix for @ts-ignore, see:
  // https://supabase.com/docs/guides/database/joins-and-nesting
  // https://supabase.com/docs/guides/api/rest/generating-types

  .returns<Discussion[]>();

const createDiscussion = (values: TablesInsert<"discussion">) =>
  supabase.from("discussion").insert([values]).select();

const postComment = (values: TablesInsert<"comment">) =>
  supabase.from("comment").insert([values]).select();

export { getAllDiscussions, createDiscussion, postComment };
