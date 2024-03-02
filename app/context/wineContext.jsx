"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchWines } from "../server-actions/fetchWine";

const WineContext = createContext();

export const WineProvider = ({ children }) => {
  const [wines, setWines] = useState([]);
  const [filteredWines, setFilteredWines] = useState([]);
  const [error, setError] = useState(null);

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
    if (!filterValue || filterValue === "All") {
      setFilteredWines(wines);
      return;
    }

    const lowercasedFilterValue = filterValue.toLowerCase();

    const filteredData = wines.filter((wine) => {
      if (filterType === "grapes") {
        // Check if the selected grape is included in the wine's grapes array
        const selectedGrapes = lowercasedFilterValue.split(",");
        return selectedGrapes.every((grape) =>
          wine.grapes.includes(grape.trim())
        );
      } else if (Array.isArray(wine[filterType])) {
        // Handle array filtering for other array fields
        return wine[filterType]
          .map((item) => item.toLowerCase())
          .includes(lowercasedFilterValue);
      } else {
        // For non-array fields, use the existing logic
        const lowercasedWineValue = String(wine[filterType]).toLowerCase();
        return lowercasedWineValue.includes(lowercasedFilterValue);
      }
    });

    setFilteredWines(filteredData);
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
