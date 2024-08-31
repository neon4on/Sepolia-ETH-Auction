require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_KEY,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
