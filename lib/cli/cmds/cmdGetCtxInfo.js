var fs = require('fs');
var path = require('path');

module.exports = {
    name: "get-ctx-info",
    usage: "get-ctx-info\nDisplays the current context information.",
    execute: (args) =>
    {
        var contextPath = path.join(process.cwd(), ".gtoolctx.json");
        if(!fs.existsSync(contextPath))
        {
            console.log("Error: no context was found in the current directory!");
            return 1;
        }
        var ctxObject = require(contextPath);
        var vars = "";
        for(var x in ctxObject.variables)
            if(ctxObject.variables[x].value != null) vars += "\t" + x + "=" + ctxObject.variables[x].value;
        if(vars == "") vars = "\t{None defined}";
        console.log(`[Context Information]
Context Path: ${contextPath}
Provider: ${ctxObject.provider}
Uses Silent Mode: ${ctxObject.silentMode}

Variables:
${vars}`);
        return 0;
    }
}