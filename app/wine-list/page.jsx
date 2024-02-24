"use client";

import { useState, useEffect } from "react";
import { fetchWines } from "../server-actions/supabaseFetch";
import { deleteWine } from "../server-actions/deleteWine";
import EditWine from "../components/editWine/EditWine";
import WineForm from "../components/wineForm/WineForm";
import styles from "./page.module.scss";

export default function WinesList() {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const { data, error } = await fetchWines();
      if (error) {
        throw new Error("Error fetching wine data");
      }
      setWines(data || []);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // Fetch initial data on component mount
    fetchData();

    // Set up periodic refresh every 5 seconds
    const intervalId = setInterval(fetchData, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Run once on component mount

  const handleWineAdded = (newWine) => {
    setWines([...wines, newWine]);
  };

  return (
    <main className={styles.wineList}>
      <h1 className={styles.wineList_title}>Lista Vinhos</h1>
      <form action="/auth/signout" method="post">
        <button type="submit">Sign Out</button>
      </form>
      <WineForm onWineAdded={handleWineAdded} />

      <div>
        <table className={styles.wineList_table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Produtor</th>
              <th>Região</th>
              <th>Castas</th>
              <th>Cor</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {wines.map((wine) => (
              <tr key={wine.id}>
                <td>{wine.name}</td>
                <td>{wine.producer}</td>
                <td>{wine.from}</td>
                <td>{wine.grapes}</td>
                <td>{wine.color}</td>
                <td>{wine.price}€</td>
                <td>{wine.quantity}</td>
                <td>
                  <form action={deleteWine}>
                    <input type="hidden" name="id" value={wine.id} />
                    <button
                      className={styles.wineList_table_delete_btn}
                      type="submit"
                    >
                      Delete
                    </button>
                  </form>
                </td>
                <td>
                  <EditWine wine={wine} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
