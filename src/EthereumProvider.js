// src/EthereumProvider.js

import React from 'react';
import EthereumContext from './EthereumContext';
import useEthereum from './useEthereum';

export const EthereumProvider = ({ children }) => {
  const ethereumState = useEthereum();
  return (
    <EthereumContext.Provider value={ethereumState}>
      {children}
    </EthereumContext.Provider>
  );
};
