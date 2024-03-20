"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const WineContext = createContext();

export const WineProvider = ({ children }) => {
  const idOne = uuidv4();
  const idTwo = uuidv4();
  const idThree = uuidv4(); // Adding idThree

  let initialWines = {
    [idOne]: {
      id: 1,
      name: "Quinta do Crasto",
      year: 2019,
      producer: "Quinta do Crasto",
      region: "Alentejo",
      grapes: ["Tinta Roriz"],
      color: "Tinto",
      price: 20,
    },
    [idTwo]: {
      id: 2,
      name: "Quinta do Vallado",
      year: 2019,
      producer: "Quinta do Vallado",
      region: "Douro",
      grapes: ["Tinta Roriz", "Touriga Nacional", "Touriga Franca"],
      color: "Tinto",
      price: 25,
    },
    [idThree]: {
      id: 3,
      name: "Poeira",
      year: 2019,
      producer: "Poeira",
      region: "Dão",
      grapes: ["Tinta Roriz", "Touriga Nacional", "Touriga Franca"],
      color: "Branco",
      price: 30,
    },
  };

  const getWines = () => Object.values(initialWines); // Changed to getWines

  const [winesData, setWinesData] = useState([]); // Changed to winesData

  useEffect(() => {
    setWinesData(getWines());
  }, []); // Run only on initial mount

  const addWine = (data) => {
    new Promise((resolve, reject) => {
      if (
        !data.name ||
        !data.price ||
        !data.producer ||
        !data.year ||
        !data.region ||
        !data.grapes ||
        !data.color
      ) {
        throw new Error("Not all information provided");
      }

      const id = uuidv4();
      const newWine = { id, ...data };

      initialWines = { ...initialWines, [id]: newWine }; // Changed to wines

      setTimeout(() => resolve(true), 250);
    });
  };

  // usage
  const doAddWine = async (data) => {
    try {
      const result = addWine(data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  doAddWine({
    name: "Chardonnay",
    price: 20,
    producer: "Quinta da Galeira",
    year: 2019,
    region: "Alentejo",
    grapes: ["Tinta Roriz"],
    color: "Tinto",
  });

  const [filteredWines, setFilteredWines] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const setMinMaxPrice = () => {
    if (!winesData || winesData.length === 0) {
      return;
    }

    const prices = winesData.map((wine) => wine.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  useEffect(() => {
    setMinMaxPrice();
  }, [winesData]);

  const handleFilterChange = (filterType, filterValue) => {
    if (filterType === "price") {
      const [minPrice, maxPrice] = filterValue;
      const filteredData = winesData.filter(
        (wine) => wine.price >= minPrice && wine.price <= maxPrice
      );
      setFilteredWines(filteredData);
    } else if (!filterValue || filterValue === "All") {
      setFilteredWines(winesData);
    } else {
      const lowercasedFilterValue = String(filterValue).toLowerCase();
      const filteredData = winesData.filter((wine) => {
        if (filterType === "grapes") {
          const selectedGrapes = filterValue.split(","); // Split without lowercasing
          return selectedGrapes.some((grape) =>
            wine.grapes.includes(grape.trim())
          );
        } else if (Array.isArray(wine[filterType])) {
          return wine[filterType]
            .map((item) => String(item).toLowerCase())
            .includes(lowercasedFilterValue);
        } else {
          const lowercasedWineValue = String(wine[filterType]).toLowerCase();
          return lowercasedWineValue.includes(lowercasedFilterValue);
        }
      });
      setFilteredWines(filteredData);
    }
  };

  const getUniqueGrapes = () => {
    const allGrapes = winesData.flatMap((wine) => wine.grapes || []);
    return [...new Set(allGrapes)];
  };

  const getUniqueValues = (key) => {
    return [...new Set(winesData.map((wine) => wine[key]))];
  };

  const deleteWine = async (id) => {
    const updatedWines = winesData.filter((wine) => wine.id !== id);
    setWinesData(updatedWines);
    setFilteredWines(updatedWines);
  };

  const contextValue = {
    wines: winesData,
    filteredWines,

    handleFilterChange,
    deleteWine,
    getUniqueGrapes,
    getUniqueValues,
    setMinMaxPrice,
    minPrice,
    maxPrice,
  };

  return (
    <WineContext.Provider value={contextValue}>{children}</WineContext.Provider>
  );
};

export const useWineContext = () => {
  const context = useContext(WineContext);
  if (!context) {
    throw new Error("useWineContext must be used within a WineProvider");
  }
  return context;
};
