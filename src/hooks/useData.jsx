import React, { createContext, useContext, useState } from "react";

const MainDataContext = createContext();

export function DataProvider({ children }) {
  const data = useProvideData();
  
  return (
    <MainDataContext.Provider value={data}>
      {children}
    </MainDataContext.Provider>
  )
};

export function useData() {
  return useContext(MainDataContext);
};

function useProvideData() {
  const [selectedUser, setSelectedUser] = useState(null);

  return {
    selectedUser,
    setSelectedUser,
  }
};