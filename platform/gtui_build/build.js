var path = require('path');
var asar = require('asar');
var os = require('os');

var buildArch = {
    win32: {
        name: "win32",
        buildId: "win"
    }
}

var buildDir = path.join(__dirname, `../../build`);
console.log(buildDir);