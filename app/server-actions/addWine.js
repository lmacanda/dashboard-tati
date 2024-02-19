"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addWine(formData) {
  const name = formData.get("name");
  const producer = formData.get("producer");
  const year = formData.get("year");
  const region = formData.get("region");
  const grapes = formData.get("grapes");
  const color = formData.get("color");
  const price = formData.get("price");
  const quantity = formData.get("quantity");

  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });

  const { data, error } = await supabase
    .from("wines")
    .insert([{ name, producer, year, region, grapes, color, price, quantity }]);

  if (error) {
    console.error(error);
    return { error: "error inserting data", error };
  }

  revalidatePath("/dashboard");

  return { message: "Wine added successfully!" };
}
