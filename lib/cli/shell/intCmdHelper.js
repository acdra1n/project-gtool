/*
Internal command helper for GTool
*/

var commands = {
    "exit": {
        run: (args)=>{
            if(args.length > 1)
                process.exit(parseInt(args[1]));
            else process.exit(0);
        }
    }
}

function cmdExists(cmdName)
{
    if(commands[cmdName] != null)
        return true;
    else return false;
}

function execute(cmd)
{
    commands[cmd[0]].run(cmd);
}

module.exports = {
    cmdExists,
    execute
}