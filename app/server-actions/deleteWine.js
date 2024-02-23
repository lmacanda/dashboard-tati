"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteWine(formData) {
  const wineID = formData.get("id");
  console.log(wineID);

  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });

  const { data, error } = await supabase
    .from("wines")
    .delete()
    .match({ id: wineID });

  if (error) {
    console.error(error);
    return { error: "error inserting data", error };
  }

  revalidatePath("/wine-list");

  return { message: "Wine added successfully!" };
}
