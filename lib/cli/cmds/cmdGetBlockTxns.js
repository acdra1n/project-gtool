var fs = require('fs');
var path = require('path');

module.exports = {
    name: "get-block-txns",
    usage: "get-block-txns <blockNo>\nGet all blocks in block <blockNo>.\nExamples:\n\tget-block-txns 402\n\tget-block-txns latest",
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
            var blkNo = null;
            try
            {
                if(args[1] != "latest")
                    blkNo = parseInt(args[1]);
                else
                    blkNo = args[1];
            }
            catch(e)
            {
                console.log(`Error: Invalid block number!`);
                return -1;
            }
            var blk = await web3.eth.getBlock(args[1], true);
            
            switch(ctxObject.outputType)
            {
                default:
                    console.log(`Error: '${ctxObject.outputType}' output type not available for ${name}`);
                    return -1;
                case "console":
                    for(var i = 0; i < blk.transactions.length; i++)
                    {
                        var t = blk.transactions[i];
                        console.log(`Transaction Information #${i+1}

Hash: ${t.hash}
Nonce: ${t.nonce}
Block Hash: ${t.blockHash}
Transaction Index: ${t.transactionIndex}
From: ${t.from}
To: ${t.to}
Value: ${t.value} wei
Gas: ${t.gas}
Gas Price: ${t.gasPrice}
Input: ${t.input}
`);
                    }
                    return 0;
                case "json":
                    console.log(JSON.stringify(blk.transactions));
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