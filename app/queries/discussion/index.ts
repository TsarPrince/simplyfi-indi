import supabase from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";

const getAllDiscussions = supabase
  .from("discussion")
  .select("*, comment(*, user_id(*))")
  .order("created_at", { ascending: false });

const createDiscussion = (values: TablesInsert<"discussion">) =>
  supabase.from("discussion").insert([values]).select();

const postComment = (values: TablesInsert<"comment">) =>
  supabase.from("comment").insert([values]).select();

export { getAllDiscussions, createDiscussion, postComment };
