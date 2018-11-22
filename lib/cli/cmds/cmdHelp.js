const vinf = require("../../release/vinf");

module.exports = {
    name: "help",
    usage: "help [command]\nExamples:\n\tgtool --help version",
    execute: (args) =>
    {
        if(args.length < 2)
        {
            console.log(`GTool version ${vinf.version_string}.
Copyright (C) mr_chainman (techspider) 2018.
https://github.com/techspider/project-gtool
Usage: gtool <command> [arguments]

Commands:
    create-context <provider>  :  Creates a new context in the current directory.
    generate-random <type> [args]  :  Generate random <type> with arguments [args].
    get-account-txns <address> [max_blocks = 1000]  :  Get all transactions for an account within the specified maximum block searching range.
    get-accounts  :  List all accounts.
    get-balance <account> <wei/eth>  :  Get the balance of an account in either WEI or ETH.
    get-block-txns <blockNo>  :  Get all blocks in block <blockNo>.
    get-ctx-info  :  Return current context information.
    get-latest-txns <no_of_txns>  :  Return latest transactions based on a specified amount.
    get-tx-info <tx_hash>  :  Get information about transaction with hash.
    modify-context <property> <value>  :  Change a property in the current context.
    new-account <passphrase>  :  Create a new account with a passphrase.
    send-transaction <source> <dest> <amount>  :  Send a simple transaction to the specified account in the specified unit.
    shell  :  Start a gtool shell.
    unlock-account <address> <passphrase>  :  Unlock an account with a passphrase.
    version  :  Displays the current GTool version.
`);
            return 0;
        }
        console.log(`Usage: ${require("../cmdRegistry.js").getCommand(args[1]).usage}`);
        return 0;
    }
}