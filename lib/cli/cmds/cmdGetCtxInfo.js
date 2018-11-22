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
        switch(ctxObject.outputType)
        {
            default:
                console.log(`Error: '${ctxObject.outputType}' output type not available for ${name}`);
                return -1;
            case "console":
                console.log(`[Context Information]
                Context Path: ${contextPath}
                Provider: ${ctxObject.provider}
                Uses Silent Mode: ${ctxObject.silentMode}`);
                break;
            case "json":
                console.log(JSON.stringify(ctxObject, null, 4));
                break;
            case "env":
                var envPath = path.join(process.cwd(), "env");
                var env = require("../../env/env");
                env.open();
                env.setEnvPrefix("gt_");
                env.setEnv("ctx_path", contextPath);
                env.setEnv("provider", ctxObject.provider);
                env.setEnv("silentMode", ctxObject.silentMode);
                env.close(envPath);
                break;
        }
        return 0;
    }
}