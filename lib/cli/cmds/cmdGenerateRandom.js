var fs = require('fs');
var path = require('path');
var w3utils = require('../../tools/w3tools');

module.exports = {
    name: "generate-random",
    usage: "generate-random <type> [args]\nGenerate random account data. Useful for development.\nExamples:\n\tgenerate-random transactions 20  :  Generate 20 transactions\n\n<type> can be one of the following:\n\ttransactions with arguments <no_of_transactions>",
    execute: async (args) =>
    {
        var contextPath = path.join(process.cwd(), ".gtoolctx.json");
        if(!fs.existsSync(contextPath))
        {
            console.log("Error: no context was found in the current directory!");
            return 1;
        }
        var ctxObject = require(contextPath);
        if(args.length < 2)
        {
            console.log("Error: no type of random was specified");
            return 1;
        }
        switch(args[1])
        {
            default:
                console.log("Error: invalid random type!");
                return 1;
            case "transactions":
                if(args.length < 3)
                {
                    console.log("Error: generate-random transactions requires one additional argument.");
                    return 1;
                }
                var transMax = parseInt(args[2]);
                var Web3 = require('web3');
                var web3 = new Web3(ctxObject.provider);
                var accounts = await web3.eth.getAccounts();
                var amountToSend = 400000000000;
                if(args.length > 3)
                    amountToSend = parseInt(args[3]);
                for(var i = 0; i < transMax; i++)
                    await w3utils.send_Transaction(web3, accounts[0], accounts[1], amountToSend);
                switch(ctxObject.outputType)
                {
                    default:
                        console.log(`Error: '${ctxObject.outputType}' output type not available for ${name}`);
                        return -1;
                    case "console":
                        console.log(`Sent ${transMax} random transactions of ${amountToSend} wei each.`);
                        return 0;
                    case "json":
                        console.log(JSON.stringify({transaction_count: 20, success: true, src: accounts[0], dest: accounts[1], amount: amountToSend}));
                        return 0;
                    case "env":
                        var envPath = path.join(process.cwd(), "env");
                        var env = require("../../env/env");
                        env.open();
                        env.setEnvPrefix("gt_");
                        env.setEnv("tx_count", "20");
                        env.setEnv("success", "true");
                        env.setEnv("src", accounts[0]);
                        env.setEnv("dest", accounts[1]);
                        env.setEnv("amount", amountToSend);
                        env.close(envPath);
                        return 0;
                }
                break;
        }
        return 0;
    }
}