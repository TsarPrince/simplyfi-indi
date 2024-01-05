import supabase from "@/lib/supabase";
import { Discussion } from "@/types";
import { TablesInsert } from "@/types/database.types";

const getAllDiscussions = supabase
  .from("discussion")
  .select(
    "*, comment(id, title, created_at, user_id(*), comment_like(*), comment_spam(*))"
  )
  .order("created_at", { ascending: false })

  // fix for @ts-ignore, see:
  // https://supabase.com/docs/guides/database/joins-and-nesting
  // https://supabase.com/docs/guides/api/rest/generating-types

  .returns<Discussion[]>();

const createDiscussion = (values: TablesInsert<"discussion">) =>
  supabase.from("discussion").insert([values]).select();

const postComment = (values: TablesInsert<"comment">) =>
  supabase.from("comment").insert([values]).select();

const likeComment = (values: TablesInsert<"comment_like">) =>
  supabase.from("comment_like").insert([values]).select();

const reportComment = (values: TablesInsert<"comment_spam">) =>
  supabase.from("comment_spam").insert([values]).select();

export {
  getAllDiscussions,
  createDiscussion,
  postComment,
  likeComment,
  reportComment,
};
