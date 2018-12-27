var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var port = process.env.PORT || 8080;
var dateTime = require('node-datetime');
var ip = require("ip");
var randomstring = require("randomstring");
var request = require("request");
var Web3 = require("web3");
var web3;
const abiDecoder = require('abi-decoder'); // NodeJS

var ethers = require('ethers');
var providers = ethers.providers;


// bundle our routes
var router = express.Router();
var abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "INITIAL_SUPPLY",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

/*---------------------------------------------------------------------
ROUTE PARA CRIAR UM USER (POST http://localhost:8080/api/signup)
*-------------------------------------------------------------------*/
router.get('/newTransaction', function (req, res) {
if (typeof web3 !== 'undefined') {
  web3 = new Web3(Web3.setProvider('https://ropsten.infura.io/token=qv2Kiqt79Keww6LWqd8q'));
  console.log(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(Web3.setProvider('https://ropsten.infura.io/token=qv2Kiqt79Keww6LWqd8q'));
  console.log(web3.currentProvider);
}
});
/*---------------------------------------------------------------------
ROUTE PARA CRIAR UM USER (POST http://localhost:8080/api/signup)
*-------------------------------------------------------------------*/
router.get('/getBalance', function (req, res) {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));

    }
    else {
        // set the provider you want from Web3.providers
        res.json({ success: false, message: "web3 nao logado" });
    }

    var testecoin = new web3.eth.Contract(abi, "0x8f9343f23d74f953f6de7558b2015d5a5768d669");
    testecoin.methods.balanceOf('0xffE53FB499a119D42779e84027AA9B006daD939c').call()
        .then(function (result) {
            var myTokenBalance = result;
            res.json({ success: true, balance: myTokenBalance });
        });
});

module.exports = router;
