"use client";

import { deleteWine } from "../server-actions/deleteWine";
import EditWine from "../components/editWine/EditWine";
import WineForm from "../components/wineForm/WineForm";
import styles from "./page.module.scss";
import { useWineContext } from "../context/wineContext";

export default function WinesList() {
  const {
    wines,
    filteredWines,
    handleFilterChange,
    getAllGrapes,
    getUniqueValues,
  } = useWineContext();

  const allGrapes = getAllGrapes();

  const uniqueRegions = getUniqueValues("region");
  const uniqueGrapes = getUniqueValues("grapes");

  return (
    <main className={styles.wineList}>
      <h1 className={styles.wineList_title}>Lista Vinhos</h1>
      <form action="/auth/signout" method="post">
        <button type="submit" style={{ display: "none" }}>
          Sign Out
        </button>
      </form>
      <WineForm />

      <div>
        <table className={styles.wineList_table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Produtor</th>
              <th className={styles.wineList_table_region}>
                <label htmlFor="regionFilter">Região:</label>
                <select
                  id="regionFilter"
                  onChange={(e) => handleFilterChange("region", e.target.value)}
                >
                  <option value="">All</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <label htmlFor="grapesFilter">Castas:</label>
                <select
                  id="grapesFilter"
                  onChange={(e) => handleFilterChange("grapes", e.target.value)}
                >
                  <option value="">All</option>
                  {uniqueGrapes.map((grape) => (
                    <option key={grape} value={grape}>
                      {grape}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <label htmlFor="colorFilter">Cor:</label>
                <select
                  id="colorFilter"
                  onChange={(e) => handleFilterChange("color", e.target.value)}
                >
                  <option value="">All</option>
                  <option value="rosé">Rosé</option>
                  <option value="Branco">White</option>
                  <option value="Tinto">Red</option>
                </select>
              </th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {(filteredWines.length > 0 ? filteredWines : wines).map((wine) => (
              <tr key={wine.id}>
                <td>{wine.name}</td>
                <td>{wine.producer}</td>
                <td>{wine.region}</td>
                <td>
                  {wine.grapes &&
                    Array.isArray(wine.grapes) &&
                    wine.grapes.map((grape, index) => (
                      <span key={index}>
                        {grape}
                        {index < wine.grapes.length - 1 && ", "}
                      </span>
                    ))}
                </td>
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
