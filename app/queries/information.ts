import supabase from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";

const getAllInformation = supabase
  .from("information")
  .select("*")
  .order("created_at", { ascending: false });

const getFilteredInformation = (searchQuery: string) =>
  supabase
    .from("information")
    .select("*")
    .order("created_at", { ascending: false })
    .textSearch(
      "title",
      searchQuery
        .trim()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "|")
    );

const getInformationById = (id: string) =>
  supabase.from("information").select("*").eq("id", id).single();

const createInformation = (values: TablesInsert<"information">) =>
  supabase.from("information").insert([values]).select();

export {
  getAllInformation,
  getFilteredInformation,
  getInformationById,
  createInformation,
};
