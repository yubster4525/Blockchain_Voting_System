require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY, COSVM_RPC_URL } = process.env;

module.exports = {
   solidity: "0.8.18",
   defaultNetwork: "cosvm",
   networks: {
      hardhat: {},
      cosvm: {
         url: API_URL, // Make sure this is defined in your .env file
         chainId: 323, // CosVM chain ID
         accounts: [`0x${PRIVATE_KEY}`],
         gas: 200,
         gasPrice: 2000, // No need to convert to number
      },
      // ... other network configurations
   },
};
