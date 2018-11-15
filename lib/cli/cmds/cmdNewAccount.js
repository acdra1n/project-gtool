var fs = require('fs');
var path = require('path');

module.exports = {
    name: "new-account",
    usage: "new-account <passphrase>\nCreate a new account with passphrase.",
    execute: async (args) =>
    {
        var contextPath = path.join(process.cwd(), ".gtoolctx.json");
        var ctxObject = require(contextPath);
        if(!fs.existsSync(contextPath))
        {
           console.log("Error: no context was found in the current directory!");
           return 1;
        }
        if(args.length < 2)
        {
            console.log("Error: missing passphrase.");
            return 1;
        }
        try
        {
            var Web3 = require('web3');
            var web3 = new Web3(ctxObject.provider);
            var account = await web3.eth.accounts.create(args[1]);

            switch(ctxObject.outputType)
            {
                default:
                    console.log(`Error: '${ctxObject.outputType}' output type not available for get-accounts`);
                    return -1;
                case "console":
                    console.log(`Account successfully created.\nAddress: ${account.address}\nPrivate Key: ${account.privateKey}`);
                    return 0;
                case "json":
                    console.log(JSON.stringify({address:account.address, privateKey:account.privateKey}));
                    break;
            }
        }
        catch(e)
        {
            console.log(e);
            return -1;
        }
    }
}