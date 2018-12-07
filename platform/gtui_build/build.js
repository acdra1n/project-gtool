var path = require('path');
var asar = require('asar');
var os = require('os');
var fse = require('fs-extra');
var cproc = require('child_process');
var relInfo = require("../../lib/release/vinf");

function main()
{
    console.log("Checking build platform for electron...");
    var platform = os.platform();
    
    switch(platform)
    {
        case "win32":
            platform = "win";
            break;
        case "darwin":
            platform = "macos";
            break;
        case "linux":
            break;
        default:
            console.log('Error: your platform is not supported. Build stopped.');
            return 1
    }

    var buildDir = path.join(__dirname, `../../build/${platform}`);
    console.log(`Build dir is ${buildDir}`);
    var electronDir = path.join(__dirname, `../../gtool_gui/node_modules/electron/dist`);
    console.log('Copying electron to build directory...');
    try
    {
        fse.copySync(electronDir, buildDir, { overwrite: true, errorOnExist: false, dereference: true });
        console.log(`Electron successfully copied!`);
    }
    catch(e)
    {
        console.log(`Failed copying electron!`);
        return 1;
    }

    switch(platform)
    {
        case "win":
            console.log(`Removing default resources...`);
            var default_asar = path.join(buildDir, `resources/default_app.asar`);
            if(fse.existsSync(default_asar)) fse.removeSync(default_asar);
            delete default_asar;
            console.log(`Successfully removed default_app.asar`);
            console.log(`Renaming executables...`);
            var binaryPath = null;
            fse.renameSync(path.join(buildDir, "electron.exe"), (binaryPath = path.join(buildDir, "gtool-ui.exe")));
            console.log(`Rebranding electron...`);
            var rcEditExe = path.join(__dirname, "../windows/rcedit.exe");
            if(fse.existsSync(rcEditExe))
            {
                try
                {
                    cproc.execFileSync(rcEditExe, [binaryPath, "--set-icon", path.join(__dirname, "../../assets/gtool_icon_formats/gtool.ico")]);
                    cproc.execFileSync(rcEditExe, [binaryPath, "--set-version-string", "FileDescription", "GTool Frontend"]);
                    cproc.execFileSync(rcEditExe, [binaryPath, "--set-version-string", "CompanyName", "mr_chainman (techspider)"]);
                    cproc.execFileSync(rcEditExe, [binaryPath, "--set-version-string", "LegalCopyright", "Copyright (C) mr_chainman (techspider) 2018"]);
                    cproc.execFileSync(rcEditExe, [binaryPath, "--set-version-string", "ProductName", "gtool-ui"]);
                    cproc.execFileSync(rcEditExe, [binaryPath, "--set-file-version", relInfo.version]);
                    cproc.execFileSync(rcEditExe, [binaryPath, "--set-product-version", relInfo.version]);
                }
                catch(e)
                {
                    console.log(`Failed rebranding electron! Continuing anyway... (bugs are possible)`);
                }
            }
            else
            {
                console.log(`No rcedit.exe present in windows platform directory. Will not rebrand output exe.`);
            }

            console.log(`Archiving gtool-ui assets...`);
            console.log(`WARNING: This will take a long time.`);
            cproc.execSync(`asar pack "${path.join(__dirname, "../../gtool_gui")}" "${path.join(buildDir, "resources/app.asar")}"`);
            console.log(`gtool-ui build complete!`);
            break;
        case "darwin":
            
            break;
        case "linux":

            break;
    }

    return 0;
}

process.exit(main());