var path = require('path');
var fs = require('fs');
var vinf = require('../../release/vinf');

module.exports = {
    name: "modify-context",
    usage: "modify-context <property> <value>\nChange a property in the current context.\nExamples:\n\tmodify-context provider http://localhost:7545",
    execute: (args) =>
    {
        var contextPath = path.join(process.cwd(), ".gtoolctx.json");
        if(!fs.existsSync(contextPath))
        {
           console.log("Error: no context was found in the current directory!");
           return 1;
        }
        var ctxObject = require(contextPath);
        if(args.length < 3)
        {
            console.log("Error: invalid parameters.");
            return 1;
        }
        ctxObject[args[1]] = args[2];
        fs.writeFileSync(contextPath, JSON.stringify(ctxObject, null, 4), "utf8");
        console.log(`${args[1]} => ${args[2]}`);
        return 0;
    }
}