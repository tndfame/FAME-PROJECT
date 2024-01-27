import React, { createContext, useContext } from 'react';
import * as api from './ApiClient';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext(ApiContext);
};
