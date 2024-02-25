"use client";

import React from "react";
import { useWineContext } from "../context/wineContext";
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
  const { wines, filteredWines, handleFilterChange } = useWineContext();

  const displayedData = filteredWines.length > 0 ? filteredWines : wines;

  return (
    <div className={styles.wineMenu}>
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
