# Hello World! Vyper Smart Contract

This project demonstrates a basic smart contract written in Vyper. It comes with a smart contract, a test for the contract, and a script that deploys the contract.

This project was built with hardhat.

---

## Some Common Commands

### Install Dependencies
```shell
npm install
```

### Compile contracts
```shell
npx hardhat compile
```

### Run test cases
```shell
npx hardhat test
```

### Deploy the smart contract to local network
```shell
npx hardhat node
npx hardhat run scripts/deploy.js
```

---

## Next Steps

### Deploy the contract on a live network
 - Configure hardhat.config.js with RPC endpoints for different chains
 - Be careful where you store your private key, ***never** expose it to the internet
 - Run `npx hardhat run scipts/deploy.js --network <evm_network_you_configured>`

### Add additional functionality to the contract
 - Let users like/dislike messages
 - Emit an event when a message is liked/disliked
 - Let users reply to messages

### Setup a frontend for users to interact with your contract
 - Explore options like react-moralis or useDapp to make frontend web3 development a breeze
    