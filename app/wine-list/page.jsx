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
    getUniqueGrapes,
    getUniqueValues,
  } = useWineContext();

  const uniqueRegions = getUniqueValues("region");
  const uniqueGrapes = getUniqueGrapes();

  return (
    <main className={styles.wineList}>
      <h1 className={styles.wineList_title}>Lista Vinhos</h1>

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
                  <option value="branco">branco</option>
                  <option value="tinto">tinto</option>
                  <option value="rosè">rosé</option>
                  <option value="espumante">espumante</option>
                  <option value="fortificado">fortificado</option>
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
