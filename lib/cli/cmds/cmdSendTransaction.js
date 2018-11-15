var fs = require('fs');
var path = require('path');

module.exports = {
    name: "send-transaction",
    usage: "send-transaction <source> <dest> <amount>\nSend a transaction\nExamples:\n\tsend-transaction 0x3f4B95ec16E2595BD35DA04604b5c5b2b027787d 0x1Aedb2d06AD40ac435ba1F4bDC4ab43b3830F46E 1000000000000000000",
    execute: async (args) =>
    {
        var contextPath = path.join(process.cwd(), ".gtoolctx.json");
        if(!fs.existsSync(contextPath))
        {
           console.log("Error: no context was found in the current directory!");
           return 1;
        }
        var ctxObject = require(contextPath);
        if(args.length < 4)
        {
            console.log("Error: invalid parameters!");
            return 1;
        }
        try
        {
            var Web3 = require('web3');
            var web3 = new Web3(ctxObject.provider);
            var tx = {
                from: args[1],
                to: args[2],
                value: args[3]
            }
            var tres = await web3.eth.sendTransaction(tx);
            switch(ctxObject.outputType)
            {
                default:
                    console.log(`Error: '${ctxObject.outputType}' output type not available for get-accounts`);
                    return -1;
                case "console":
                    console.log(`[Transaction results]
Hash: ${tres.transactionHash}
Index: ${tres.transactionIndex}
Block Number: ${tres.blockNumber}
Block Hash: ${tres.blockHash}
Gas Used: ${tres.gasUsed}
Cumulative Gas Used: ${tres.cumulativeGasUsed}`);
                    return 0;
                case "json":
                    tres.source = args[1];
                    tres.dest = args[2];
                    tres.amount = args[3];
                    tres.dateSent = new Date();
                    console.log(tres);
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