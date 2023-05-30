import React, { createContext, useState } from "react";

export const MonitoringContext = createContext(null);

const MonitoringProvider = ({ children }) => {
  const [isLayerOpen, setIsLayerOpen] = useState(false);

  const [selected, setSelected] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [isMarkerOpen, setIsMarkerOpen] = useState(false);

  const [selectedLayer, setSelectedLayer] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedKabkot, setselectedKabkot] = useState();

  return (
    <MonitoringContext.Provider
      value={{
        isLayerOpen,
        setIsLayerOpen,
        selected,
        setSelected,
        selectedYear,
        setSelectedYear,
        isMarkerOpen,
        setIsMarkerOpen,
        selectedLayer,
        setSelectedLayer,
        selectedProvince,
        setSelectedProvince,
        selectedKabkot,
        setselectedKabkot,
      }}
    >
      {children}
    </MonitoringContext.Provider>
  );
};

export default MonitoringProvider;
