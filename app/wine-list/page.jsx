import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import EditWine from "../components/editWine/EditWine";
import WineForm from "../components/wineForm/WineForm";

import styles from "./page.module.scss";

export default async function WinesList() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: wines, error } = await supabase.from("wines").select("*");

  if (error) {
    console.error("error fetching wine data");
  }

  return (
    <main className={styles.wineList}>
      <h1 className={styles.wineList_title}>Lista Vinhos</h1>
      <form action="/auth/signout" method="post">
        <button type="submit">Sign Out</button>
      </form>
      <WineForm />

      <div>
        <table className={styles.wineList_table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Producer</th>
              <th>From</th>
              <th>Grapes</th>
              <th>Color</th>
              <th>Price</th>
              <th>Quantity Left</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {wines &&
              wines.map((wine) => (
                <tr key={wine.id}>
                  <td>{wine.name}</td>
                  <td>{wine.producer}</td>
                  <td>{wine.from}</td>
                  <td>{wine.grapes}</td>
                  <td>{wine.color}</td>
                  <td>{wine.price}€</td>
                  <td>{wine.quantity_left}</td>
                  <td>
                    <button>edit</button>
                  </td>
                  <EditWine wine={wine} />
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
