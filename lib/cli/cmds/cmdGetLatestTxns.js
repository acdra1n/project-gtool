var fs = require('fs');
var path = require('path');

async function getBlockTxns(web3, blockNo)
{
    var blk = await web3.eth.getBlock(blockNo, true);
    return blk.transactions;
}

module.exports = {
    name: "get-latest-txns",
    usage: "get-latest-txns <no_of_txns>\nReturn latest transactions based on a specified amount.\nExamples:\n\tget-latest-txns 20",
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
            var transactions = [];
            var txMax = null;
            var latestBlockNo = await web3.eth.getBlockNumber();

            try
            {
                txMax = parseInt(args[1]);
            }
            catch(e)
            {
                console.log(e);
                return -1;
            }

            for(var i = 0; i < txMax; i++)
            {
                var blkNo = latestBlockNo - i;
                if(blkNo <= 0) break;
                var blockTxns = await getBlockTxns(web3, blkNo);
                if(blockTxns.length < 1) continue;
                transactions = transactions.concat(blockTxns);
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
                    console.log(JSON.stringify(transactions, null, 4));
                    break;
                case "env":
                    var envPath = path.join(process.cwd(), "env");
                    var env = require("../../env/env");
                    env.open();
                    env.setEnvPrefix("gt_");
                    env.setEnv("tx_length", transactions.length);
                    for(var i = 0; i < transactions.length; i++)
                    {
                        var t = transactions[i];
                        env.setEnv(`tx_${i}_hash`, t.hash);
                        env.setEnv(`tx_${i}_nonce`, t.nonce);
                        env.setEnv(`tx_${i}_blkhash`, t.blockHash);
                        env.setEnv(`tx_${i}_tindex`, t.transactionIndex);
                        env.setEnv(`tx_${i}_from`, t.from);
                        env.setEnv(`tx_${i}_to`, t.to);
                        env.setEnv(`tx_${i}_value`, t.value);
                        env.setEnv(`tx_${i}_gas`, t.gas);
                        env.setEnv(`tx_${i}_gasPrice`, t.gasPrice);
                        env.setEnv(`tx_${i}_input`, t.input);
                    }
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