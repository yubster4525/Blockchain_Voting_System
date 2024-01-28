// src/EthereumContext.js

import { createContext } from 'react';

const EthereumContext = createContext({
  account: '',
  contract: null,
  isConnected: false,
  loading: false,
  connect: () => {},
  disconnect: () => {},
});

export default EthereumContext;
