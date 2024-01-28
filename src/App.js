
import { EthereumProvider } from './EthereumProvider'; // Make sure the path is correct
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useEthereum from './useEthereum'; // Adjust the path to where useEthereum is located
import Navbar from './comp/Navbar';
import FatcVoter from './comp/FatcVoter';
import Propsal from './comp/Proposals';
import Set from './comp/FatchCandi';
import Vote from './comp/Vote';
import Home from './comp/Home';

function App() {
  // Using the useEthereum hook
  const { contract, account } = useEthereum();

  return (
    <EthereumProvider>
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vote" element={<Vote contract={contract} account={account} />} />
          <Route path="/proposals" element={<Propsal contract={contract} account={account} />} />
          <Route path="/voters" element={<FatcVoter contract={contract} account={account} />} />
          <Route path="/candidates" element={<Set contract={contract} account={account} />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
    </EthereumProvider>
  );
}

export default App;
