"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchWines } from "../server-actions/fetchWine";

const WineContext = createContext();

export const WineProvider = ({ children }) => {
  const [wines, setWines] = useState([]);
  const [filteredWines, setFilteredWines] = useState([]);
  const [error, setError] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const setMinMaxPrice = () => {
    if (!wines || wines.length === 0) {
      return;
    }

    const prices = wines.map((wine) => wine.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  useEffect(() => {
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

    fetchData();
  }, []);

  const handleFilterChange = (filterType, filterValue) => {
    if (filterType === "price") {
      const [minPrice, maxPrice] = filterValue;
      const filteredData = wines.filter(
        (wine) => wine.price >= minPrice && wine.price <= maxPrice
      );
      setFilteredWines(filteredData);
    } else if (!filterValue || filterValue === "All") {
      setFilteredWines(wines);
    } else {
      const lowercasedFilterValue = String(filterValue).toLowerCase();
      const filteredData = wines.filter((wine) => {
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

  const getAllGrapes = () => wines.flatMap((wine) => wine.grapes || []);

  const getUniqueValues = (key) => {
    return [...new Set(wines.map((wine) => wine[key]))];
  };

  const deleteWine = async (id) => {
    const updatedWines = wines.filter((wine) => wine.id !== id);
    setWines(updatedWines);
    setFilteredWines(updatedWines);
  };

  const contextValue = {
    wines,
    filteredWines,
    error,
    handleFilterChange,
    deleteWine,
    getAllGrapes,
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
