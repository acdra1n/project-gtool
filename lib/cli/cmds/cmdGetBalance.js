var fs = require('fs');
var path = require('path');

module.exports = {
    name: "get-balance",
    usage: "get-balance <account> <ether/wei/gwei>\nGet the balance of an account in either WEI or ETH.",
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
            console.log("Error: invalid parameters.");
            return 1;
        }
        try
        {
            var Web3 = require('web3');
            var web3 = new Web3(ctxObject.provider);
            var balanceWei = await web3.eth.getBalance(args[1]);
            var balance = await web3.utils.fromWei(balanceWei, args[2])
            switch(ctxObject.outputType)
            {
                default:
                    console.log(`Error: '${ctxObject.outputType}' output type not available for get-balance`);
                    return -1;
                case "console":
                    console.log(`${balance} ${args[2]}`);
                    return 0;
                case "json":
                    console.log(JSON.stringify({account:args[1], balance:balance, unit:args[2]}));
                    break;
                case "env":
                    var envPath = path.join(process.cwd(), "env");
                    var env = require("../../env/env");
                    env.open();
                    env.setEnvPrefix("gt_");
                    env.setEnv("account", args[1]);
                    env.setEnv("balance", balance);
                    env.setEnv("unit", args[2]);
                    env.close(envPath);
                    break;
            }
            return 0;
        }
        catch(e)
        {
            console.log(e);
            return -1;
        }
    }
}