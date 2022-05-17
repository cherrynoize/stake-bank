// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract StakeBank is Ownable {
    mapping (address => uint) private balances;
    mapping (address => uint) private rewardCount;
    uint public start; // deployment time
    uint public rewardsTot; // total rewards allocated

    uint32 constant public T = 1 minutes; // period length
    uint8[] public pools = [20, 30, 50]; // pools reward distribution

    event depositMade(address indexed from, uint amount);
    event withdrawalMade(address indexed from, uint amount);
    event pullEvent(address indexed from, uint amount);

    error cannotWithdrawInPeriodZero();
    error cannotDepositAfterPeriodZero();
    error insufficientBalance();
    error clientBalanceNotEmpty();

    modifier early() {
        if (getPeriod() > 0) revert cannotDepositAfterPeriodZero();
        _;
    }
    modifier late() {
        if (getPeriod() == 0) revert cannotWithdrawInPeriodZero();
        _;
    }

    constructor() payable {
        start = block.timestamp; // set start time
        rewardsTot = msg.value; // create reward pool
    }

    // deposit amount
    function deposit() public payable early {
        balances[msg.sender] += msg.value;
        emit depositMade(msg.sender, msg.value);
    }

    // withdraw amount
    function withdraw(uint amount) public late {
        if (amount <= newBalance()) {
            balances[msg.sender] -= amount;
            payable(msg.sender).transfer(amount);
            emit withdrawalMade(msg.sender, amount);
        } else revert insufficientBalance();
    }

    // transfer everything to owner
    function pull() public late onlyOwner {
        if (poolTot() - balances[msg.sender] > 0) {
            revert clientBalanceNotEmpty();
        } else {
            uint amount = address(this).balance;
            payable(msg.sender).transfer(amount);
            emit pullEvent(msg.sender, amount);
        }
    }

    // retrieve account balance
    function balance() public view returns(uint) {
        return (address(this).balance > 0) ?
            balances[msg.sender] : 0;
    }

    // update balance
    function newBalance() public returns(uint) {
        // claim rewards
        if (rewardCount[msg.sender] < getPeriod()) {
            uint perc;

            // calculate total rewards percentage
            for (uint8 i = 0; i < getPeriod(); i++)
                perc += pools[i];

            // current period rewards claimed
            rewardCount[msg.sender]++;

            // rewards allocated per tokens staked
            balances[msg.sender] += (balances[msg.sender] / poolTot()) * ((perc / 100) * rewardsTot);
        }

        return balance();
    }

    // total staked tokens balance
    function poolTot() public view returns(uint) {
        return address(this).balance - rewardsTot;
    }

    // time since deployment
    function getTime() public view returns(uint) {
        return block.timestamp - start;
    }

    // periods since deployment
    function getPeriod() public view returns(uint) {
        uint p = (getTime()) / T;
        if (p > pools.length) p = pools.length;
        return p;
    }

    // time till next period
    function nextPeriod() public view returns(uint) {
        return T - (getTime() % T);
    }
}
