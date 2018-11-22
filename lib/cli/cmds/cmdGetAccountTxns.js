var fs = require('fs');
var path = require('path');

async function getBlockTxns(web3, blockNo)
{
    var blk = await web3.eth.getBlock(blockNo, true);
    return blk.transactions;
}

module.exports = {
    name: "get-account-txns",
    usage: "get-account-txns <address> [max_blocks = 1000]\nGet all transactions for an account within the specified maximum block searching range.\nExamples:\n\tget-account-txns 0xacC3294E717c3F2aB9C254a69715A34307064548\n\tget-account-txns 0xeBD7e2EAB3DCBecEf86933930ad0FFcEFcCa1e64 75",
    execute: async (args) =>
    {
        var contextPath = path.join(process.cwd(), ".gtoolctx.json");
        var bsearchMax = 1000;
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
            var address = args[1];
            var transactions = [];
            console.log(`Transactions for ${address}\n===========================================================`);
            if(args.length > 2) bsearchMax = parseInt(args[2]);
            var latestBlockNo = await web3.eth.getBlockNumber();
            for(var i = 0; i < bsearchMax; i++)
            {
                var blkNo = latestBlockNo - i;
                if(blkNo <= 0) break;
                var blockTxns = await getBlockTxns(web3, blkNo);
                if(blockTxns.length < 1) continue;
                for(var t = 0; t < blockTxns.length; t++)
                    if((blockTxns[t].from == address) || (blockTxns[t].to == address))
                        transactions.push(blockTxns[t]);
            }

            switch(ctxObject.outputType)
            {
                default:
                    console.log(`Error: '${ctxObject.outputType}' output type not available for ${name}`);
                    return -1;
                case "console":
                    for(var i = 0; i < transactions.length; i++)
                    {
                        var t = transactions[i];
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
                    console.log(JSON.stringify(transactions));
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