"use client";

import React, { useState, useEffect } from "react";
import { useWineContext } from "../context/wineContext";
import Slider from "@mui/material/Slider";
import styles from "./page.module.scss";

const WineMenu = () => {
  const pastelTones = [
    "#FFB6C1", // LightPink
    "#FFC0CB", // Pink
    "#FFD700", // Gold
    "#BA55D3", // MediumOrchid
    "#87CEEB", // SkyBlue
    "#98FB98", // PaleGreen
    "#FFA07A", // LightSalmon
    "#FF6347", // Tomato
    "#20B2AA", // LightSeaGreen
    "#9370DB", // MediumPurple
    "#87CEFA", // LightSkyBlue
    "#32CD32", // LimeGreen
    "#FFDAB9", // PeachPuff
    "#F0E68C", // Khaki
    "#DDA0DD", // Plum
  ];

  const getRandomPastelColor = () => {
    const randomIndex = Math.floor(Math.random() * pastelTones.length);
    return pastelTones[randomIndex];
  };

  const randomColor = getRandomPastelColor();
  const {
    wines,
    filteredWines,
    handleFilterChange,
    getAllGrapes,
    getUniqueValues,
    setMinMaxPrice,
    minPrice,
    maxPrice,
  } = useWineContext();

  useEffect(() => {
    setMinMaxPrice();
  }, [wines, setMinMaxPrice]);

  const [value, setValue] = useState([minPrice, maxPrice]);

  const marks = [
    {
      value: minPrice,
      label: `${minPrice}€`,
    },
    {
      value: maxPrice,
      label: `${maxPrice}€`,
    },
  ];

  useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    handleFilterChange("price", newValue);
  };

  const valuetext = (value) => {
    return `${value}€`;
  };

  const allGrapes = getAllGrapes();

  const uniqueRegions = getUniqueValues("region");
  const uniqueGrapes = getUniqueValues("grapes");

  const displayedData = filteredWines.length > 0 ? filteredWines : wines;

  return (
    <div className={styles.wineMenu}>
      <h1 className={styles.wineMenu_title}>Wine Menu</h1>
      <div>
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
        <Slider
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={minPrice}
          marks={marks}
        />
      </div>
      {displayedData.length === 0 ? (
        <h1>No wines found</h1>
      ) : (
        displayedData.map(
          ({ id, name, year, producer, region, grapes, color, price }) => {
            const randomColor = getRandomPastelColor();

            return (
              <div className={styles.wineMenu_product_card} key={id}>
                <div
                  style={{ backgroundColor: randomColor }}
                  className={styles.wineMenu_product_card_left}
                >
                  <h1 className={styles.wineMenu_product_card_left_name}>
                    {name}
                  </h1>
                  <div className="color-squares">
                    {color === "rosé" && <div className="square rose"></div>}
                    {color === "Branco" && <div className="square white"></div>}
                    {color === "Tinto" && <div className="square red"></div>}
                  </div>
                  <div className={styles.wineMenu_product_card_left_info}>
                    <h2
                      className={
                        styles.wineMenu_product_card_left_info_producer
                      }
                    >
                      {producer}
                    </h2>
                    <h3 className={styles.wineMenu_product_card_left_info_year}>
                      {year}
                    </h3>
                  </div>
                  <h2 className={styles.wineMenu_product_card_left_region}>
                    {region}{" "}
                  </h2>
                  <h3 className={styles.wineMenu_product_card_left_grapes}>
                    🍇{grapes}
                  </h3>
                  <h2 className={styles.wineMenu_product_card_left_price}>
                    {price}€
                  </h2>
                </div>

                <div className="product-card-right">
                  <h1>image</h1>
                </div>
              </div>
            );
          }
        )
      )}
    </div>
  );
};

export default WineMenu;
