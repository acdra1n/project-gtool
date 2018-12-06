/*
project-gtool Copyright (C) mr_chainman (techspider) 2018.
Licensed under GNU GPL v3

See LICENSE.MD for more information about licensing.

File: devtools.js
Description: developer tools source file
*/

let Web3 = null;

const devTools = {
    exposeWeb3: ()=>{
        Web3 = require('web3');
    }
}