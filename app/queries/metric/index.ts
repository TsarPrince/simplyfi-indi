import supabase from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";

const getAllMetrics = supabase
  .from("metric")
  .select("*")
  .order("created_at", { ascending: false });

const createMetric = (values: TablesInsert<"metric">) =>
  supabase.from("metric").insert([values]).select();

export { getAllMetrics, createMetric };
