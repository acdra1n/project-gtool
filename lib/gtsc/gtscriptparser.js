/*
gtool-script alpha
Copyright (C) mr_chainman (techspider) 2018.
Licensed under GNU GPLv3

This file is the parser used for gtool-script
*/

var types = require("./gtsc_types");
var gtsc_context = new types.GTSCContext();

const parse = function(code, args)
{
    for(var lc = 0; lc < code.length; lc++)
    {
        //TODO add better variable replacement
        var rawLine = code[lc];
        var tcrLine = rawLine.trim();
        if(tcrLine.startsWith("#")) continue;
        else if(tcrLine.trim() == "") continue;
        var line = rawLine;
        for(var vc = 0; vc < gtsc_context.variables.length; vc++)
            line = line.replace(`%${gtsc_context.variables[vc].name}%`, gtsc_context.variables[vc].data);
        
        console.log(line);
    }
}

module.exports = {
    parse,
    context: gtsc_context
}