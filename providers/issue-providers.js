import React, { createContext, useState } from "react";

export const MonitoringContext = createContext(null);

const MonitoringProvider = ({ children }) => {
  const [isLayerOpen, setIsLayerOpen] = useState(false);

  const [selected, setSelected] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);

  return (
    <MonitoringContext.Provider
      value={{
        isLayerOpen,
        setIsLayerOpen,
        selected,
        setSelected,
        selectedYear,
        setSelectedYear,
      }}
    >
      {children}
    </MonitoringContext.Provider>
  );
};

export default MonitoringProvider;
