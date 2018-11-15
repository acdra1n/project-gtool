var fs = require('fs');
var path = require('path');

module.exports = {
    name: "unlock-account",
    usage: "unlock-account <address> <passphrase>\nUnlock an account with a passphrase.\nExamples:\n\tunlock-account 0xca160B673374763A00910d20040690466A46F4B4 test",
    execute: async (args) =>
    {
        var contextPath = path.join(process.cwd(), ".gtoolctx.json");
        if(!fs.existsSync(contextPath))
        {
           console.log("Error: no context was found in the current directory!");
           return 1;
        }
        var ctxObject = require(contextPath);
        if(args.length < 3)
        {
            console.log("Error: invalid parameters!");
            return 1;
        }
        try
        {
            var Web3 = require('web3');
            var web3 = new Web3(ctxObject.provider);
            web3.eth.personal.unlockAccount(args[1], args[2], 300);
            switch(ctxObject.outputType)
            {
                default:
                    console.log(`Error: '${ctxObject.outputType}' output type not available for get-accounts`);
                    return -1;
                case "console":
                    console.log(`Unlocked account ${args[1]} for 5 minutes.`);
                    return 0;
                case "json":
                    console.log(JSON.stringify({account:args[1], duration: 300}));
                    return 0;
            }
        }
        catch(e)
        {
            console.log(e);
            return -1;
        }
    }
}