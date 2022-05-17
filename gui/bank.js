/* constants */

const ether = 10**18;

/* web3 provider */

const web3 = new Web3(ethereum);

window.addEventListener('load', async () => {
  if (window.ethereum) {  // new web3 provider
    try {
        // prompt user for connection
        await ethereum.enable();
        console.log('Connection success!');
    } catch (error) {
        console.log('Connection refused!');
    }
  } else {
      console.log('No web3 provider detected!');
  }

  document.getElementById("addr").innerHTML = "<a href='https://rinkeby.etherscan.io/address/" + contractAddress + "'>" + contractAddress + "</a>";
  timer();
});

console.log (window.web3.currentProvider);

/* contract address and abi */

const contractAddress = "0xD29Ada994f490f2D2AF69dDddBF30dE1948C73Dd";
const abi = [
  {
    "inputs": [],
    "stateMutability": "payable",
    "type": "constructor",
    "payable": true
  },
  {
    "inputs": [],
    "name": "cannotDepositAfterPeriodZero",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "cannotWithdrawInPeriodZero",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "clientBalanceNotEmpty",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "insufficientBalance",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "depositMade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "pullEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawalMade",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "T",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pools",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rewardsTot",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "start",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pull",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "balance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "newBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "poolTot",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getPeriod",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "nextPeriod",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

// contract instance
var contract = new web3.eth.Contract(abi, contractAddress);

// accounts
var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err) {
    alert("Error: failed to retrieve accounts!");
    return;
  }

  if (!accounts.length) {
    alert("No account was found!");
    return;
  }

  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

/* contract methods */
const c = contract.methods;

// transaction success
function msg_success(tx, amount, bal) {
  return "Transaction successful! " + tx + ": " + amount / ether + ".\nBalance: " + bal / ether + ".";
}

// deposit
async function deposit() {
  const amount = web3.utils.toBN($("#amount").val() * ether);

  if (amount <= 0) {
    alert("Please, input a valid amount.");
  } else if ((await getPeriod()).toString() != "0") {
    alert("You can only deposit in first period. Current period: " + await getPeriod() + ".");
  } else {
    $("#amount").val('');

    await c.deposit().send({from: account, value: amount});
    const bal = await c.balance().call({from: account});

    console.log(msg_success("Deposit", amount, bal));
    alert(msg_success("Deposit", amount, bal));

    balance();
  }
}

// withdraw
async function withdraw() {
  const amount = web3.utils.toBN($("#amount").val() * ether);

  if (amount <= 0) {
    alert("Please, input a valid amount.");
  } else if ((await getPeriod()).toString() == "0") {
    alert("You cannot withdraw until next period. Try again in " + await getTime() + " seconds.");
  } else if (amount > getBalance()) {
    alert("Insufficient funds.");
  } else {
    $("#amount").val('');

    await c.withdraw(amount).send({from: account});
    const bal = await c.balance().call({from: account});

    console.log(msg_success("Withdraw", amount, bal));
    alert(msg_success("Withdraw", amount, bal));

    balance();
  }
}

// transfer funds to owner
async function pull() {
  if (account != await c.owner().call()) {
    alert("You are not the owner of this contract.");
  } else if ((await getPeriod()).toString() == "0") {
    alert("You cannot pull funds until next period. Try again in " + await getTime() + " seconds.");
  } else if (await c.poolTot().call({from: account}).toString() == "0") {
    alert("You cannot pull funds: users are still staking funds in the pool.");
  } else if (!contractAddress.balance) {
    alert("Nothing to be pulled here!")
  } else {
    const amount = web3.utils.toBN($("#amount").val() * ether);
    $("#amount").val('');

    await c.pull().send({from: account});
    const bal = await c.balance().call({from: account});

    console.log(msg_success("Funds pull", amount, bal));
    alert(msg_success("Funds pull", amount, bal));

    balance();
  }
}

// returns current balance
async function getBalance() {
  const bal = await c.balance().call({from: account});
  return bal / ether;
}

// balance
async function balance() {
  document.getElementById("balance").innerHTML = "Balance: " + await getBalance();
}

// max value
async function max() {
  $("#amount").val(await getBalance());
}

// returns current period
async function getPeriod() {
  return await c.getPeriod().call({from: account});
}

// period
async function period() {
  const currentPeriod = await getPeriod();
  document.getElementById("period").innerHTML = "Period: T" + currentPeriod;
}

// returns time till next period
async function getTime() {
  return await c.nextPeriod().call({from: account});
}

// timer
async function timer() {
  var time;

  setInterval(async function() {
    if (!time) {
      time = await ((await getPeriod() < 3) ? getTime() : c.getTime().call({from: account}));
      period();
      balance();
    }
    document.getElementById("timer").innerHTML = ((await getPeriod() < 3) ?
      "Time till next period: " + time-- : "Running clock: " + time++
    );
  }, 1000);
}
