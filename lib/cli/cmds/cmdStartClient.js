var child_proc = require("child_process");
var fs = require('fs');
var path = require('path');

module.exports = {
    name: "start-client",
    usage: "start-client\nStart a context specified Ethereum client.",
    execute: (args)=>
    {
        var contextPath = path.join(process.cwd(), ".gtoolctx.json");
        if(!fs.existsSync(contextPath))
        {
            console.log("Error: no context was found in the current directory!");
            return 1;
        }
        var ctxObject = require(contextPath);
        if(((ctxObject.client.trim() == "(null)") || (ctxObject.client.trim() == "")) || (ctxObject.client == null))
        {
            console.log("Error: client has not been specified in the context. Use modify-context client <path> to specify a client.");
            return 1;
        }
        
        child_proc.execFileSync(ctxObject.client + " " + ctxObject.client_args);
    }
}