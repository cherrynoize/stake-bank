var StakeBank = artifacts.require("./StakeBank.sol");

const ether = 10**18;

async function check(var1, var2, err) {
  await assert.equal(var1.toString(), var2.toString(), err + " error: balance incorrect!");
}

contract("StakeBank | early withdrawal", function(accounts) {
  const amount = web3.utils.toBN(0.002 * ether);
  const a = accounts[0];

  it("should revert transaction", async() => {
    const bank = await StakeBank.deployed();
    const initBalance = await bank.balance({from: a});

    await bank.deposit({from: a, value: amount});
    const balance = await bank.balance({from: a});
    check(balance, web3.utils.toBN(initBalance + amount), "Deposit");

    try {
      await bank.withdraw(amount, {from: a});
      const newBalance = await bank.balance({from: a});
      check(newBalance, balance, "Early withdrawal");
    } catch(e) {
      console.log("\nError: " + e + "\n");
    }
  });
});

contract("StakeBank | illegal withdrawal", function(accounts) {
  const amount = web3.utils.toBN(0.0005 * ether);
  const a = accounts[1];

  it("should not alter balance for withdrawals larger than balance", async() => {
    const bank = await StakeBank.deployed();
    const initBalance = await bank.balance({from: a});

    await bank.deposit({from: a, value: amount});
    const balance = await bank.balance({from: a})
    check(balance, web3.utils.toBN(initBalance + amount), "Deposit");

    setTimeout(async function() {
      await bank.withdraw(amount + 1, {from: a});
      const newBalance = await bank.balance({from: a})
      check(newBalance, balance, "Illegal withdrawal");
    }, 2000);
  });
});

contract("StakeBank | send revert", function(accounts) {
  const amount = web3.utils.toBN(0.0003 * ether);
  const a = accounts[2];

  it("should revert ether sent to contract through fallback", async() => {
    const bank = await StakeBank.deployed();
    const initPool = await bank.poolTot();

    try {
      await bank.send(amount, {from: a});
      check(await bank.poolTot(), initPool, "Send revert");
    } catch(e) {
      console.log("\nError: " + e + "\n");
    }
  });
});
