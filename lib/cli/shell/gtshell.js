/*
GTool Shell
*/

const readline = require('readline');
const fs = require('fs');
const intCmdHelper = require("./intCmdHelper");

var rl = null;

function initShell()
{
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

function gtShellMain()
{
    const cmdReg = require('../cmdRegistry');
    rl.question('gtool-shell> ', (answer) => {
        var cmd = answer.split(' ');
        //TODO check for internal command first
        var executed = false;
        if(intCmdHelper.cmdExists(cmd[0]))
        {
            intCmdHelper.execute(cmd);
            executed = true;
        }
        if(!executed)
        {
            var commandObject = cmdReg.getCommand(cmd[0]);
            if(commandObject != null)
            {
                if(commandObject.name == "shell")
                    console.log("Error: only one shell can be ran at a time!");
                else
                    commandObject.execute(cmd);
            }
        }
        gtShellMain();
    });
}

module.exports = {
    gtShellMain,
    initShell
}