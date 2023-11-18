import React, { createContext, useContext } from "react";

const MainContext = createContext();

export function useContent() {
  const content = useContext(MainContext);
};