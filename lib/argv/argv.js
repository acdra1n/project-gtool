"use strict";

function getArgv()
{
    var argv = [];
    for(var i = 2; i<process.argv.length;i++)
        argv.push(process.argv[i]);
    return argv;
}

function getArgc()
{
    return process.argv.length - 2;
}

module.exports = {
    getArgv,
    getArgc
}