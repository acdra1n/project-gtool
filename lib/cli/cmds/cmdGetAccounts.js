var fs = require('fs');
var path = require('path');

module.exports = {
    name: "get-accounts",
    usage: "get-accounts\nDisplays all registered accounts.",
    execute: async (args) =>
    {
        var contextPath = path.join(process.cwd(), ".gtoolctx.json");
        if(!fs.existsSync(contextPath))
        {
           console.log("Error: no context was found in the current directory!");
           return 1;
        }
        var ctxObject = require(contextPath);
        try
        {
            var Web3 = require('web3');
            var web3 = new Web3(ctxObject.provider);
            var accounts = await web3.eth.getAccounts();
            switch(ctxObject.outputType)
            {
                default:
                    console.log(`Error: '${ctxObject.outputType}' output type not available for get-accounts`);
                    return -1;
                case "console":
                    for(var i = 0; i < accounts.length; i++)
                        console.log(accounts[i]);
                    return 0;
                case "json":
                    console.log(accounts);
                    break;
                case "env":
                    var envPath = path.join(process.cwd(), "env");
                    var env = require("../../env/env");
                    env.open();
                    env.setEnvPrefix("gt_");
                    env.setEnv("ac_length", accounts.length);
                    for(var i = 0; i < accounts.length; i++)
                        env.setEnv(`ac_account_${i}`, accounts[i]);
                    env.close(envPath);
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