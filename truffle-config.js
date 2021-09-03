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
    gulp: {
      host: 'localhost',
      port: 8545,
      network_id: 5777,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, endpoints.rinkeby), // 'https://rinkeby.infura.io/v3/' + infuraProjectID
      network_id: 4, // eslint-disable-line camelcase
      gas: 6721975, // Ropsten has a lower block limit than mainnet
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
      gasPrice: toWei('26', 'gwei'),
    },
    
    kovan: {
      network_id: 42,
      provider: () => new HDWalletProvider(mnemonic, endpoints.kovan),
      confirmations: 1,
      skipDryRun: true,
    },

    goerli: {
      network_id: 5,
      gas: 7500000,
      provider: () => new HDWalletProvider(mnemonic, endpoints.goerli),
      skipDryRun: true,
      gasPrice: 5e9,
    },
  },

  plugins: ['solidity-coverage', 'truffle-plugin-verify'],
  api_keys: {
    etherscan: 'N3AN8X6UJ7RWTRUVGRM4VGYRJDZEC6YFAC',
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.6.12', // Fetch exact version from solc-bin (default: truffle"s version)
    },
  },
};
