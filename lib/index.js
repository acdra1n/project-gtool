/*
gtlib Copyright (C) mr_chainman (techspider) 2018.
Licensed under GNU GPL v3

See LICENSE.MD for more information about licensing.

File: index.js
Description: library index file
*/

module.exports = {
    net: {
        DLManager: require("./dlmgr/dlmanager")
    },
    sys: {
        argv: require("./argv/argv")
    },
    utils: {
        w3utils: require("./tools/w3tools"),
        env: require("./env/env")
    },
    cli: {
        cmdRegistry: require("./cli/cmdRegistry"),
        commands: {
            createContext: require("./cli/cmds/cmdCreateContext"),
            generateRandom: require("./cli/cmds/cmdGenerateRandom"),
            getAccounts: require("./cli/cmds/cmdGetAccounts"),
            getAccountTxns: require("./cli/cmds/cmdGetAccountTxns"),
            getBalance: require("./cli/cmds/cmdGetBalance"),
            getBlockTxns: require("./cli/cmds/cmdGetBlockTxns"),
            getCtxInfo: require("./cli/cmds/cmdGetCtxInfo"),
            getLatestTxns: require("./cli/cmds/cmdGetLatestTxns"),
            getTxInfo: require("./cli/cmds/cmdGetTxInfo"),
            help: require("./cli/cmds/cmdHelp"),
            modifyContext: require("./cli/cmds/cmdModifyContext"),
            newAccount: require("./cli/cmds/cmdNewAccount"),
            sendTransaction: require("./cli/cmds/cmdSendTransaction"),
            shell: require("./cli/cmds/cmdShell"),
            unlockAccount: require("./cli/cmds/cmdUnlockAccount"),
            version: require("./cli/cmds/cmdVersion")
        }
    }
}
