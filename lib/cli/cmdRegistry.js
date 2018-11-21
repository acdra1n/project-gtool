const cmdHelp = require("./cmds/cmdHelp");
const cmdVersion = require("./cmds/cmdVersion");
const cmdCreateContext = require("./cmds/cmdCreateContext");
const cmdGetCtxInfo = require("./cmds/cmdGetCtxInfo");
const cmdGetAccounts = require("./cmds/cmdGetAccounts");
const cmdNewAccount = require("./cmds/cmdNewAccount");
const cmdSendTransaction = require("./cmds/cmdSendTransaction");
const cmdUnlockAccount = require("./cmds/cmdUnlockAccount");
const cmdGenerateRandom = require("./cmds/cmdGenerateRandom");
const cmdShell = require("./cmds/cmdShell");
const cmdGetBalance = require("./cmds/cmdGetBalance");
const cmdGetTxInfo = require("./cmds/cmdGetTxInfo");
const cmdGetBlockTxns = require("./cmds/cmdGetBlockTxns");
const cmdGetLatestTxns = require("./cmds/cmdGetLatestTxns");

var _registeredCommands = {};

module.exports = {
    registerAllCommands: () =>
    {
        _registeredCommands[cmdHelp.name] = cmdHelp;
        _registeredCommands[cmdVersion.name] = cmdVersion;
        _registeredCommands[cmdCreateContext.name] = cmdCreateContext;
        _registeredCommands[cmdGetCtxInfo.name] = cmdGetCtxInfo;
        _registeredCommands[cmdGetAccounts.name] = cmdGetAccounts;
        _registeredCommands[cmdNewAccount.name] = cmdNewAccount;
        _registeredCommands[cmdSendTransaction.name] = cmdSendTransaction;
        _registeredCommands[cmdUnlockAccount.name] = cmdUnlockAccount;
        _registeredCommands[cmdGenerateRandom.name] = cmdGenerateRandom;
        _registeredCommands[cmdShell.name] = cmdShell;
        _registeredCommands[cmdGetBalance.name] = cmdGetBalance;
        _registeredCommands[cmdGetTxInfo.name] = cmdGetTxInfo;
        _registeredCommands[cmdGetBlockTxns.name] = cmdGetBlockTxns;
        _registeredCommands[cmdGetLatestTxns.name] = cmdGetLatestTxns;
    },
    getCommand: (name) =>
    {
        return _registeredCommands[name];
    },
    addCommand: (name, cmd) =>
    {
        if(_registeredCommands[name] != null)
            throw new "Error: command already registered!";
        else
            _registeredCommands[name] = cmd;
    },
    getCommands: () =>
    {
        return _registeredCommands;
    }
}