var path = require('path');
var asar = require('asar');
var os = require('os');
var fse = require('fs-extra');

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
            console.log(`Archiving gtool-ui assets...`);
            
            break;
        case "darwin":

            break;
        case "linux":

            break;
    }

    return 0;
}

process.exit(main());