"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function fetchWines() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.from("wines").select("*");

  if (error) {
    console.error("Error fetching wines:", error.message);
    return { error: "Error fetching wines", error };
  }

  return { data, error };
}
