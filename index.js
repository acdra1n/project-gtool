/*
GTool version 1.0
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
    var result = await command.execute(argv);
    if(typeof(result) == "number")
        process.exit(result);
}

main(getArgv());