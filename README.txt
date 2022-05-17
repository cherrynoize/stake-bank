You can just compile, migrate and test with Truffle:

$ truffle develop
$ test

Or migrate to Rinkeby network:

$ truffle develop
$ migrate --network rinkeby --reset

You can edit gas specifics in truffle-config.js if necessary.

--------------------------------

For the GUI I ran it locally with Express Node:

$ npm install express --save
$ cd gui
$ node server.js

Then you can access localhost on port 3300:

$ firefox 127.0.0.1:3300

--------------------------------

GUI commands:

Deposit	- deposit amount
Withdraw	- withdraw amount
Pull		- transfer everything to owner
Max		- input max balance value
