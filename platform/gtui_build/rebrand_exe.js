var path = require('path');
var cproc = require('child_process');
var relInfo = require("../../lib/release/vinf");

console.log(`Rebranding exe...`);

var rcEditExe = path.join(__dirname, "../windows/rcedit.exe");
var binaryPath = path.join(__dirname, "../../build/win/gtool.exe");

cproc.execFileSync(rcEditExe, [binaryPath, "--set-icon", path.join(__dirname, "../../assets/gtool_icon_formats/gtool.ico")]);
cproc.execFileSync(rcEditExe, [binaryPath, "--set-version-string", "FileDescription", "GTool Ethereum Development Tool"]);
cproc.execFileSync(rcEditExe, [binaryPath, "--set-version-string", "CompanyName", "mr_chainman (techspider)"]);
cproc.execFileSync(rcEditExe, [binaryPath, "--set-version-string", "LegalCopyright", "Copyright (C) mr_chainman (techspider) 2018"]);
cproc.execFileSync(rcEditExe, [binaryPath, "--set-version-string", "ProductName", "project-gtool"]);
cproc.execFileSync(rcEditExe, [binaryPath, "--set-file-version", relInfo.version]);
cproc.execFileSync(rcEditExe, [binaryPath, "--set-product-version", relInfo.version]);

console.log(`GTool rebranding complete.`);