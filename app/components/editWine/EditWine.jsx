"use client";

import { useState } from "react";
import { updateWine } from "../../server-actions/updateWine";

export default function EditWines({ wine }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: wine.name,
    producer: wine.producer,
    year: wine.year,
    region: wine.region,
    grapes: wine.grapes,
    color: wine.color,
    price: wine.price,
    quantity: wine.quantity,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <div>
          <form action={updateWine} onSubmit={() => setShowModal(false)}>
            <input type="hidden" name="id" value={wine.id} />
            <div>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="producer">Produtor</label>
              <input
                type="text"
                id="producer"
                name="producer"
                value={formData.producer}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="year">Year</label>
              <input
                type="text"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="region">Região</label>
              <input
                type="text"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="grapes">Castas</label>
              <input
                type="text"
                id="grapes"
                name="grapes"
                value={formData.grapes}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="color">Cor</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="price">Preço</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="quantity">Quantidade</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit">Edit</button>
            </div>
          </form>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
