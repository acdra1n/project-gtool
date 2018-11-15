module.exports = {
    name: "help",
    usage: "help [command]\nExamples:\n\tgtool --help version",
    execute: (args) =>
    {
        if(args.length < 2)
        {
            console.log(`GTool version 1.0.
TODO: INSERT COPYRIGHT HERE
Usage: gtool <command> [arguments]

Commands:
    create-context <provider>  :  Creates a new context in the current directory.
    get-accounts  :  List all accounts.
    get-ctx-info  :  Return current context information.
    new-account <passphrase>  :  Create a new account with a passphrase.
    version  :  Displays the current GTool version.
`);
            return 0;
        }
        console.log(`Usage: ${require("../cmdRegistry.js").getCommand(args[1]).usage}`);
        return 0;
    }
}