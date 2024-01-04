import { PostgrestError } from "@supabase/supabase-js";

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never;
export type DbResultErr = PostgrestError;

export type ActiveSideWindow =
  | "poll"
  | "information"
  | "discussion"
  | "post"
  | undefined;

export type Filter =
  | "All"
  | "Polls"
  | "Announcements"
  | "Discussions"
  | "Information"
  | "Posts";

export type Poll = {
  created_at: string;
  id: number;
  title: string;
  user_id: string;
  poll_option: {
    id: number;
    order: number;
    poll_id: number;
    title: string;
    poll_vote: {
      created_at: string;
      id: number;
      poll_option_id: number;
      user_id: string | null;
    }[];
  }[];
};

export type Information = {
  content: string | null;
  created_at: string;
  flag: boolean;
  id: number;
  image: string | null;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVE";
  title: string;
};

export type Discussion = {
  content: string | null;
  created_at: string;
  id: number;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVE";
  title: string | null;
  comment: {
    created_at: string;
    discussion_id: number;
    id: number;
    title: string;
    user_id: {
      id: number;
      avatar_url: string | null;
      full_name: string | null;
    };
  }[];
};
