import React, { useState, useEffect } from 'react';

function FatcVoter({ contract }) {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const fetchedVoters = await contract.getVoter();
        setVoters(fetchedVoters);
      } catch (error) {
        console.error('Failed to fetch voters:', error);
      }
    };

    contract && fetchVoters();
  }, [contract]);

  return (
    <div>
      <p className="text-dark h3">Voters Information</p>
      {voters.map((voter, index) => (
        <div key={index}>
          <p>Voter {voter.name} - VoterAddress {voter.voterAddress} - Voted To {voter._CandidateAddress}</p>
        </div>
      ))}
    </div>
  );
}

export default FatcVoter;
