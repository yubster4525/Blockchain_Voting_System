import React, { useState } from 'react';
import * as ReactBootStrap from 'react-bootstrap';

function Proposal({ contract, account }) {
  const [showProposal, setShowProposal] = useState(false);
  const [candidateAccount, setCandidateAccount] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [loading, setLoading] = useState(false);
  const [proposals, setProposals] = useState([]);

  const fetchProposals = async () => {
    try {
      const proposalsArray = await contract.getRequestPropsal();
      setProposals(proposalsArray);
    } catch (error) {
      console.error('Failed to fetch proposals:', error);
    }
  };

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    if (candidateAccount && candidateName) {
      try {
        setLoading(true);
        const tx = await contract.RequestForNextVoting(candidateAccount, candidateName);
        await tx.wait();
        alert('Proposal submitted successfully!');
        setCandidateAccount('');
        setCandidateName('');
        await fetchProposals();
      } catch (error) {
        console.error('Error submitting proposal:', error);
        alert('Failed to submit proposal.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill in both account and name fields.');
    }
  };

  return (
    <div>
      <button onClick={() => setShowProposal(!showProposal)} className="btn btn-primary">
        Send Proposal For Next Election!
      </button>
      {showProposal && (
        <form onSubmit={handleProposalSubmit} className="form-group">
          <div className="m-3">
            <p className="h5"> Connected Address: {account}</p>
          </div>
          <div className="p-2">
            <label>Address Of Candidate</label>
            <input
              type="text"
              value={candidateAccount}
              onChange={(e) => setCandidateAccount(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="p-2">
            <label>Name Of Candidate</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-dark mt-2">
            {loading ? (
              <ReactBootStrap.Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            ) : (
              'Submit Now!'
            )}
          </button>
        </form>
      )}
      <br />
      <button onClick={fetchProposals} className="btn btn-success">
        Fetch Next Candidates
      </button>
      {proposals.map((candidate, index) => (
        <div key={index}>
          <p>{candidate.name} - {candidate.candidateAddress}</p>
        </div>
      ))}
    </div>
  );
}

export default Proposal;
