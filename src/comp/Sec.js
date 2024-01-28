import React, { useState } from 'react';
import * as ReactBootStrap from 'react-bootstrap';

function Sec({ contract, account }) {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const SetCandidate = async (e) => {
    e.preventDefault();
    if (address && name) {
      try {
        setLoading(true);
        const transaction = await contract.SetCandidate(address, name);
        await transaction.wait();
        alert('Candidate Set Successfully!');
      } catch (error) {
        console.error('Error setting candidate:', error);
        alert('Failed to set candidate.');
      } finally {
        setLoading(false);
        setAddress('');
        setName('');
      }
    } else {
      alert('Please fill in both address and name fields.');
    }
  };

  return (
    <div className="pb-3">
      <form onSubmit={SetCandidate}>
        <div className="form-group p-2">
          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={!account}
            className="form-control"
          />
        </div>

        <div className="form-group p-2">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!account}
            className="form-control"
          />
        </div>
        <button type="submit" disabled={!account || loading} className="btn btn-dark mx-2 mt-2">
          {loading ? (
            <ReactBootStrap.Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
          ) : (
            'Set Candidate'
          )}
        </button>
      </form>
    </div>
  );
}

export default Sec;
