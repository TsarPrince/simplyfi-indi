import supabase from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";

const getRitual = supabase.from("ritual").select("*");

const createRitual = (values: TablesInsert<"ritual">) =>
  supabase.from("ritual").insert([values]).select();

export { getRitual, createRitual };
