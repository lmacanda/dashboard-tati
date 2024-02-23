"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateWine(formData) {
  const id = formData.get("id");
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
    .update({ name, producer, year, region, grapes, color, price, quantity })
    .match({ id });

  if (error) {
    console.error(error);
    return { error: "error updating data", error };
  }

  revalidatePath("/wine-list");

  return { message: "Wine updated successfully!" };
}
