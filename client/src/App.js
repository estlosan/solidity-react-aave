import React, { Component } from "react";
import AaveContract from "./contracts/AaveContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { 
    web3: null, 
    accounts: null, 
    aaveContract: null, 
    amount: '', 
    asset: '' ,
    assetWithd: '',
    newAsset: '',
    liqAmount:''
  };

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

  onSubmitDeposit = async (event) => {
    event.preventDefault();
    const { aaveContract, asset, amount, web3, accounts } = this.state ;
    
    try {
      await aaveContract.methods.deposit(asset, web3.utils.toWei(amount.toString(), "ether")).send({
        from: accounts[0]
      });
    } catch (error) {
      alert(error);
    }
    
  }

  onSubmitWithdraw = async (event) => {
    event.preventDefault();
    const { aaveContract, assetWithd , newAsset, amount, web3, accounts } = this.state ;

    console.log(assetWithd)
    console.log(newAsset)
    try{
      await aaveContract.methods.withdrawAndAddLiquidity(newAsset, web3.utils.toWei(amount, "ether")).send({
        from: accounts[0]
      });
    } catch (error) {
      alert(error);
    }
    
  }

  handleWeb3Approve = () => {
    // TODO handle approve method
  }

  handleChange = (event) => {
    this.setState({asset: event.target.value || ''});
  }

  handleChangeWithdr = (event) => {
    this.setState({assetWithd: event.target.value || ''});
  }

  handleChangeNew = (event) => {
    this.setState({newAsset: event.target.value || ''});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Aave Manager Contract</h1>
        <h2>Deposit</h2>
        <p>With this UI you can deposit and withdraw inside aave protocol</p>
        <form onSubmit={this.onSubmitDeposit}>
          <label>Pick the asset:</label>
          <select value={this.state.asset}
          onChange={this.handleChange}
          value={this.state.asset}
          >
            <option value="">--------</option>
            <option value="0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD">DAI</option>
            <option value="0xe22da380ee6B445bb8273C81944ADEB6E8450422">USDC</option>
          </select>
          <label>Amount: </label>
          <input
            value={this.state.amount}
            onChange={event => this.setState({ amount: event.target.value })}
          ></input>
          <button>Enter</button>
        </form>

        <p>In this part you can extract deposited assets in aave and add liquidity to uniswap</p>
        <form onSubmit={this.onSubmitDeposit}>
          <label>Extract Asset:</label>
          <select value={this.state.assetWithd}
          onChange={this.handleChangeWithdr}
          value={this.state.assetWithd}
          >
            <option value="">--------</option>
            <option value="0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD">DAI</option>
            <option value="0xe22da380ee6B445bb8273C81944ADEB6E8450422">USDC</option>
          </select>
          <label>New liquidity asset:</label>
          <select value={this.state.newAsset}
          onChange={this.handleChangeNew}
          value={this.state.newAsset}
          >
            <option value="">--------</option>
            <option value="0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD">DAI</option>
            <option value="0xe22da380ee6B445bb8273C81944ADEB6E8450422">USDC</option>
          </select>
          <label>Amount: </label>
          <input
            value={this.state.liqAmount}
            onChange={event => this.setState({ liqAmount: event.target.value })}
          ></input>
          <button>Enter</button>
        </form>
        <h2>withdraw</h2>

      </div>
    );
  }
}

export default App;
