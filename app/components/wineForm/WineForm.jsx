"use client";

import { useState } from "react";
import { addWine } from "../../server-actions/addWine";
import style from "./wineForm.module.scss";

export default function WineForm() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Adicionar</button>
      {showModal && (
        <form
          action={addWine}
          className={style.form}
          onSubmit={() => setShowModal(false)}
        >
          <div className={style.form_item}>
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className={style.form_item}>
            <label htmlFor="producer">Produtor</label>
            <input type="text" id="producer" name="producer" />
          </div>
          <div className={style.form_item}>
            <label htmlFor="year">Year</label>
            <input type="text" id="year" name="year" />
          </div>

          <div className={style.form_item}>
            <label htmlFor="region">Região</label>
            <input type="text" id="region" name="region" />
          </div>
          <div className={style.form_item}>
            <label htmlFor="grapes">Castas</label>
            <input type="text" id="grapes" name="grapes" multiple />
          </div>
          <div className={style.form_item}>
            <label htmlFor="color">Cor</label>
            <input type="text" id="color" name="color" />
          </div>
          <div className={style.form_item}>
            <label htmlFor="price">Preço</label>
            <input type="number" id="price" name="price" />
          </div>
          <div className={style.form_item}>
            <label htmlFor="quantity">Quantidade</label>
            <input type="number" id="quantity" name="quantity" />
          </div>
          <div className={style.form_btn}>
            <button className={style.form_btn_cancel} type="reset">
              Cancela
            </button>
            <button className={style.form_btn_add} type="submit">
              Adicionar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
