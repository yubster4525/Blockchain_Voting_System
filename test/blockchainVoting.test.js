const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BlockchainVoting", function () {
  let Voting, voting, owner, candidate1, candidate2, voter;

  beforeEach(async function () {
    [owner, candidate1, candidate2, voter] = await ethers.getSigners();
    Voting = await ethers.getContractFactory("BlockchainVoting");
    voting = await Voting.deploy();
    await voting.deployed();
  });

  it("setCandidates adds candidates and prevents duplicates", async function () {
    await voting.setCandidates(candidate1.address, "Alice");
    await voting.setCandidates(candidate2.address, "Bob");

    const candidates = await voting.getCandidates();
    expect(candidates.length).to.equal(2);
    expect(candidates[0].name).to.equal("Alice");

    await expect(
      voting.setCandidates(candidate1.address, "Alice")
    ).to.be.revertedWithCustomError(voting, "CandidateAlreadyExists");
  });

  it("setVote increases vote count for a candidate", async function () {
    await voting.setCandidates(candidate1.address, "Alice");
    await voting.setCandidates(candidate2.address, "Bob");

    await voting.connect(voter).setVote(1, "Voter1", voter.address, candidate1.address);

    const candidates = await voting.getCandidates();
    expect(candidates[0].voteCount).to.equal(1);
  });
});
