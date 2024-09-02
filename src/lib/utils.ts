import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "@supabase/supabase-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const supabaseUrl = "https://lgeygtuwwkanfeuhmrhc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnZXlndHV3d2thbmZldWhtcmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3MzAxNTEsImV4cCI6MjAxNjMwNjE1MX0.Hp7hAtnp48bT_7ndk8aPs-s_mxdOR1T5yIlCeAt4C-Y";
export const supabase = createClient(supabaseUrl, supabaseKey);
