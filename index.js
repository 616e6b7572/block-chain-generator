const crypto = require('crypto');
const gencls = require('gencls');
const obj = require('./a');

var blockchain = new gencls(obj);
blockchain.createBlock('hello');
console.log(blockchain.getChain());
