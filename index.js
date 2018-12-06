/*
project-gtool Copyright (C) mr_chainman (techspider) 2018.
Licensed under GNU GPL v3

See LICENSE.MD for more information about licensing.

File: index.js
Description: gtool index file
*/

const getArgv = require("./lib/argv/argv.js").getArgv;
const Web3 = require('web3');
const fs = require('fs');
const cmdReg = require("./lib/cli/cmdRegistry.js");

async function main(argv)
{
    cmdReg.registerAllCommands();
    if(argv.length < 1)
    {
        console.log("Error: no command specified.\nTry `gtool help` for help.");
        return;
    }
    var command = cmdReg.getCommand(argv[0]);
    if(command == null)
    {
        console.log("Error: command not found.\nTry `gtool help` for help.");
        return;
    }
    var result = 255;
    if((command.executeSync != null) && (command.executeSync))
    {
        command.execute(argv); //Sync commands MUST exit on their own
    }
    else
    {
        result = await command.execute(argv);
        if(typeof(result) == "number")
            process.exit(result);
    }
}

main(getArgv());