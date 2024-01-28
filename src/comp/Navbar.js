
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import EthereumContext from '../EthereumContext'; // Adjust the import path as needed

const Navbar = () => {
  const { isConnected, connect, disconnect } = useContext(EthereumContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">VotingApp</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/vote">Vote</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/proposals">Proposals</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/voters">Voters</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/candidates">Candidates</Link>
            </li>
            {/* Add other navigation links as needed */}
          </ul>
          <div className="d-flex">
            {isConnected ? (
              <button onClick={disconnect} className="btn btn-outline-danger">Disconnect</button>
            ) : (
              <button onClick={connect} className="btn btn-outline-success">Connect</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
