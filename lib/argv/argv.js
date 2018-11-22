"use strict";

/**
 * Get all supplied arguments to the current script file.
 */
function getArgv()
{
    var argv = [];
    for(var i = 2; i<process.argv.length;i++)
        argv.push(process.argv[i]);
    return argv;
}

/**
 * Get the number of arguments supplied to the current script file.
 */
function getArgc()
{
    return process.argv.length - 2;
}

module.exports = {
    getArgv,
    getArgc
}