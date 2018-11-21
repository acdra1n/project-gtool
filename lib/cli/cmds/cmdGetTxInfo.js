var fs = require('fs');
var path = require('path');

module.exports = {
    name: "get-tx-info",
    usage: "get-tx-info <tx_hash>\nGet information about a transaction.\nExamples:\n\tget-tx-info 0x79725265902cb1d63d3a173d4f92f99c4b4c91e6341a9a335c43a4bb0b1e2c7a",
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
            console.log("Error: invalid parameters.");
            return 1;
        }
        try
        {
            var Web3 = require('web3');
            var web3 = new Web3(ctxObject.provider);
            var txInfo = await web3.eth.getTransactionReceipt(args[1]);
            switch(ctxObject.outputType)
            {
                default:
                    console.log(`Error: '${ctxObject.outputType}' output type not available for ${name}`);
                    return -1;
                case "console":
                    //TODO fix undefined values
                    console.log(`[Transaction Info]
From: ${txInfo.from}
To: ${txInfo.to}

Block Hash: ${txInfo.blockHash}
Cumulative Gas Used: ${txInfo.cumulativeGasUsed}
Gas Used: ${txInfo.gasUsed}
Transaction Hash: ${args[1]}
Transaction Index: ${txInfo.transactionIndex}`);
                    return 0;
                case "json":
                    console.log(JSON.stringify(txInfo));
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