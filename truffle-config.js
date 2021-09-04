const fs = require('fs-extra');
const { toWei } = require('web3-utils');

const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic =
  process.env.DEV_MNEMONIC ||
  (fs.existsSync('./.secrets.json')
    ? fs.readJsonSync('./.secrets.json').mnemonic
    : false) ||
  'quote token raven federal expand stick swarm transfer fringe random clarify sleep';

const endpoints = fs.readJSONSync('./endpoints.json');

module.exports = {
  networks: {
    // development: {
    //   host: '127.0.0.1', // Localhost (default: none)
    //   port: 8545, // Standard Ethereum port (default: none)
    //   network_id: '*', // Any network (default: none)
    // },
    kovan: {
      network_id: 42,
      provider: () => new HDWalletProvider(mnemonic, endpoints.kovan),
      skipDryRun: true
    },
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: '0.6.12', // Fetch exact version from solc-bin (default: truffle"s version)
    },
  },
};
