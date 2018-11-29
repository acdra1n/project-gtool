/*
project-gtool (C) mr_chainman (techspider) and its contributors 2018.
https://github.com/techspider/project-gtool

gscript.js - Main source file for gscript.
*/

var fs = require('fs');
var flags = require('./flags');
var cmdReg = require("../cli/cmdRegistry");

var ParsingContext = function(source)
{
    this.src = source;
    this.getDate = ()=> { return new Date(); }
}

/**
 * Parse gscript code
 * @param {string[]} code A string array containing gscript code
 * @param {ParsingContext} parsingContext An object containing the current parsing context (can be left as null if desired) 
 */
function parse(code, parsingContext)
{
    function err(error, line)
    {
        if(parsingContext != null)
            console.log(`error at line ${line} [${parsingContext.src}]: ${error}`);
    }
    var parsingMode = flags.ParsingMode.normal;
    for(var i = 0; i < code.length; i++)
    {
        var raw_line = code[i];
        var tr_line = raw_line.trim();
        var line = tr_line; //TODO add var support
        if(line.startsWith("#")) continue; //Ignore any commented lines
        if(line.trim() == "") continue; //Ignore empty lines
        switch(parsingMode)
        {
            default:
                err(`INTERNAL BUG: parsing mode '${parsingMode}' not supported.`, i+1);
                return;
            case flags.ParsingMode.multiline_comment:
                if(line.startsWith("#/") || line.endsWith("/#"))
                {
                    parsingMode = flags.ParsingMode.normal;
                    continue;
                }
                break;
            case flags.ParsingMode.normal:
                var cmd = line.split(' ');
                switch(cmd[0])
                {
                    default:
                        var icmd = null;
                        if((icmd = cmdReg.getCommand(cmd[0])) != null)
                        {
                            icmd.execute(cmd);
                            break;
                        }
                        else
                        {
                            err(`invalid command ${cmd[0]}`, i+1);
                        }
                        break;
                    case "print":
                        var text = line.split('"')[1];
                        console.log(text);
                        break;
                }
                break;
        }
    }
}

function parseFile(path)
{

}

module.exports = {
    parse,
    parseFile
}