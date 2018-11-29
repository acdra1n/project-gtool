/*
project-gtool (C) mr_chainman (techspider) and its contributors 2018.
https://github.com/techspider/project-gtool

gscript.js - Main source file for gscript.
*/

var ParsingMode = new function()
{
    this.normal = 1;
    this.multiline_comment = 2;
    this.javascript = 3;
}

module.exports = {
    ParsingMode
}