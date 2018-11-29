var fs = require('fs');
var parser = require("../../gscript/gscript");

module.exports = {
    name: "exec",
    usage: "exec <script_path>\nExecute a script.",
    execute: (args)=>
    {
        if(args.length < 2)
        {
            console.log("Error: no script path specified!");
            return 1;
        }
        if(!fs.existsSync(args[1]))
        {
            console.log("Error: script not found");
            return 1;
        }
        var code = fs.readFileSync(args[1], "utf8").split('\n');
        parser.parse(code, new parser.ParsingContext(args[1]));
        return parser.exitCode;
    }
}