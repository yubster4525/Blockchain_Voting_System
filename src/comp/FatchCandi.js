import React, { useState, useEffect } from 'react';

function FatchCandi({ contract }) {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const fetchedCandidates = await contract.getCandidate();
        setCandidates(fetchedCandidates);
      } catch (error) {
        console.error('Failed to fetch candidates:', error);
      }
    };

    contract && fetchCandidates();
  }, [contract]);

  return (
    <div>
      <p className="text-dark h3">Candidates</p>
      {candidates.map((candidate, index) => (
        <div key={index}>
          <p>Candidate Name: {candidate.name} - Address: {candidate._CandidateAddress} - Votes: {candidate.vote.toString()}</p>
        </div>
      ))}
    </div>
  );
}

export default FatchCandi;
