"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteWine(formData) {
  const wineID = formData.get("id");
  console.log(wineID);

  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });

  try {
    const { data, error } = await supabase
      .from("wines")
      .delete()
      .match({ id: parseInt(wineID) });

    if (error) {
      console.error(error);
      return { error: "error deleting data", error };
    }

    console.log("Wine deleted successfully!");

    revalidatePath("/wine-list");

    return { message: "Wine deleted successfully!" };
  } catch (error) {
    console.error("An unexpected error occurred:", error.message);
    return { error: "An unexpected error occurred", error };
  }
}
