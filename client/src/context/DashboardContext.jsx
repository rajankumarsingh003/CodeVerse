import React, { createContext, useState } from "react";
import { stats as mockStats } from "../data/mockData";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [stats, setStats] = useState({});

  const fetchStats = async () => {
    // In real app, fetch from backend
    setStats(mockStats);
  };

  return (
    <DashboardContext.Provider value={{ stats, fetchStats }}>
      {children}
    </DashboardContext.Provider>
  );
};
