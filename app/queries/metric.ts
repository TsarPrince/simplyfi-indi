import supabase from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";

const getAllMetrics = supabase
  .from("metric")
  .select("*, metric_value(*)")
  .order("created_at", { ascending: false })
  .order("created_at", { ascending: false, foreignTable: "metric_value" });

const createMetric = (values: TablesInsert<"metric">) =>
  supabase.from("metric").insert([values]).select();

const postUpdate = (values: TablesInsert<"metric_value">) =>
  supabase.from("metric_value").insert([values]).select();

export { getAllMetrics, createMetric, postUpdate };
