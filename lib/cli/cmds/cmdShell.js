var fs = require('fs');
var path = require('path');
var gtShell = require('../shell/gtshell');

module.exports = {
    name: "shell",
    usage: `shell
Launch a shell. Multi level shells are not supported.

Shell commands:
    exit [code?]  :  Exit the shell optionally with [code].
`,
    executeSync: true,
    execute: (args) =>
    {
        gtShell.initShell();
        gtShell.gtShellMain();
        return 0;
    }
}