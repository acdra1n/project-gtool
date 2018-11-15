const cmdHelp = require("./cmds/cmdHelp.js");
const cmdVersion = require("./cmds/cmdVersion.js");
const cmdCreateContext = require("./cmds/cmdCreateContext.js");
const cmdGetCtxInfo = require("./cmds/cmdGetCtxInfo.js");
const cmdGetAccounts = require("./cmds/cmdGetAccounts.js");
const cmdNewAccount = require("./cmds/cmdNewAccount.js");
const cmdSendTransaction = require("./cmds/cmdSendTransaction");

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