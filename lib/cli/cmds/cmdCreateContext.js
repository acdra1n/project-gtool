var path = require('path');
var fs = require('fs');
var vinf = require('../../release/vinf');

module.exports = {
    name: "create-context",
    usage: "create-context [url]\nCreates a new context in the current directory.\nExamples:\n\tset-provider http://127.0.0.1:8545\n\tset-provider ipc://geth.ipc",
    execute: (args) =>
    {
        var provider = "http://localhost:7545/";

        if(args.length > 1)
        {
            if(!(args[1].startsWith("http://") || args[1].startsWith("ipc://")))
            {
                console.log("Error: invalid provider specified!\nValid providers must be IPC, HTTP, or Websocket urls.");
                return 1;
            }
            else provider = args[1];
        }
        else
        {
            console.log("No provider specified, defaulting to http://localhost:7545...");
        }
        
        var contextPath = path.join(process.cwd(), ".gtoolctx.json");
        var contextObj = {
            provider: provider,
            gtoolVer: vinf.version_string,
            silentMode: false,
            outputType: "console", //Set to json for JSON type outputs
            client: "(null)",
            client_args: "",
            variables: {} //TODO consider removal, use env variables instead?
        };

        console.log(`Creating new context at ${contextPath}`);
        console.log(`Setting provider to ${provider}...`);
        fs.writeFileSync(contextPath, JSON.stringify(contextObj, null, 4), "utf8");
        return 0;
    }
}