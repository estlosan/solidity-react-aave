import React, { Component } from "react";
import AaveContract from "./contracts/AaveContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, aaveContract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = AaveContract.networks[networkId];
      const instance = new web3.eth.Contract(
        AaveContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, aaveContract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Aave Manager Contract</h1>
        <p>With this UI you can deposit and withdraw inside aave protocol</p>
        <label>Amount: </label>
        <input
          onChange={event => this.setState({ value: event.target.value })}
        ></input>
      </div>
    );
  }
}

export default App;
