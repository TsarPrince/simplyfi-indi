import supabase from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";

const getAllInformation = supabase
  .from("information")
  .select("*")
  .order("created_at", { ascending: false });

const getInformationById = (id: string) =>
  supabase.from("information").select("*").eq("id", id).single();

const createInformation = (values: TablesInsert<"information">) =>
  supabase.from("information").insert([values]).select();

export { getAllInformation, getInformationById, createInformation };
