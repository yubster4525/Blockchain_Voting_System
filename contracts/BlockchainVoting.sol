// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

error CandidateAlreadyExists();
error AlreadyVoted();
error CandidateCannotVoteThemselves();

contract BlockchainVoting {
    address manager;
    uint256 totalCandidates;
    uint256 totalVoters;

    // Event that is emitted whenever a new vote is cast
    event VoteCast(uint256 candidateId, address voter);

    constructor() {
        manager = msg.sender;
    }

    struct Voter {
        uint256 id;
        string name;
        address voterAddress;
        address candidateAddress;
    }

    struct Candidate {
        string name;
        address candidateAddress;
        uint256 voteCount;
    }

    struct Proposal {
        string name;
        address candidateAddress;
    }

    Voter[] public voters;
    Candidate[] public candidates;
    Proposal[] public proposals;

    function setCandidates(
        address _address,
        string memory _name
    ) external onlyManager {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].candidateAddress == _address) {
                revert CandidateAlreadyExists();
            }
        }
        candidates.push(Candidate(_name, _address, 0));
        totalCandidates++;
    }

    function setVote(
        uint256 _id,
        string memory _name,
        address _voterAddress,
        address _candidateAddress
    ) external {
        require(
            candidates.length >= 2,
            "There must be at least 2 candidates to vote."
        );

        for (uint256 i = 0; i < voters.length; i++) {
            if (voters[i].id == _id && voters[i].voterAddress == _voterAddress) {
                revert AlreadyVoted();
            }
        }

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].candidateAddress == _voterAddress) {
                revert CandidateCannotVoteThemselves();
            }
        }

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].candidateAddress == _candidateAddress) {
                candidates[i].voteCount++;
                voters.push(Voter(_id, _name, _voterAddress, _candidateAddress));
                emit VoteCast(i, _voterAddress); // Emit the event here
                totalVoters++;
                return;
            }
        }
    }

    function requestForNextVoting(
        address _requestAddress,
        string memory _name
    ) external {
        proposals.push(Proposal(_name, _requestAddress));
    }

    function getProposals() external view returns (Proposal[] memory) {
        return proposals;
    }

    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }

    function getVoters() external view returns (Voter[] memory) {
        return voters;
    }

    // Utility function to get the total votes for all candidates
    function getTotalVotesForCandidates() external view returns (uint256[] memory voteCounts) {
        voteCounts = new uint256[](candidates.length);
        for (uint256 i = 0; i < candidates.length; i++) {
            voteCounts[i] = candidates[i].voteCount;
        }
    }

    modifier onlyManager() {
        require(msg.sender == manager, "This function is restricted to the contract's manager");
        _;
    }
}
