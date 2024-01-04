import supabase from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";

const getAllInformation = supabase
  .from("information")
  .select("*")
  .order("created_at", { ascending: false });

const createInformation = (values: TablesInsert<"information">) =>
  supabase.from("information").insert([values]).select();

export { getAllInformation, createInformation };
