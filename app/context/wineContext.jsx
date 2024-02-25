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
      const lowercasedWineValue = String(wine[filterType]).toLowerCase();
      return lowercasedWineValue.includes(lowercasedFilterValue);
    });

    setFilteredWines(filteredData);
  };
  const contextValue = {
    wines,
    filteredWines,
    error,
    handleFilterChange,
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
