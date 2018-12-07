/*
project-gtool Copyright (C) mr_chainman (techspider) 2018.
Licensed under GNU GPL v3

See LICENSE.MD for more information about licensing.

File: main.js
Description: gtool frontend index file
*/

const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const ui = require("./lib/ui/ui");
const cp = require('child_process');
const os = require('os');
const relInfo = require('../lib/release/vinf');

let window = null;

app.once('ready', () => {
    app.setName("gtool-ui");
    app.setVersion(relInfo.version_string);
    window = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hiddenInset',
        backgroundColor: "#FFFFFF",
        show: false
    });
    var menu = new Menu();
    let fileMenu = null;

    menu.append(fileMenu = new MenuItem({
        label: "File",
        type: "submenu",
        submenu: [
            new MenuItem({
                label: "Exit",
                click: (menuItem, browserWindow, event)=> {
                    process.exit();
                }
            })
        ]
    }));

    menu.append(new MenuItem({
        label: "Tools",
        type: "submenu",
        submenu: [
            new MenuItem({
                label: "Developer Tools",
                type: "submenu",
                submenu: [
                    new MenuItem({
                        label: "Open Dev Tools",
                        type: "normal",
                        click: (menuitem, browserWindow, event)=>{
                            browserWindow.inspectElement(0, 0);
                        }
                    })
                ]
            })
        ]
    }));

    menu.append(new MenuItem({
        label: "Help",
        type: "submenu",
        submenu: [
            new MenuItem({
                type: "normal",
                label: "Documentation",
                click: (menuItem, browserWindow, event)=>{
                    switch(os.platform())
                    {
                        case "win32":
                            cp.execSync("start http://github.com/techspider/project-gtool/wiki");
                            break;
                        case "linux":
                            cp.execSync("xdg-open http://github.com/techspider/project-gtool/wiki");
                            break;
                        case "darwin":
                            cp.execSync("open http://github.com/techspider/project-gtool/wiki");
                            break;
                    }
                }
            }),
            new MenuItem({
                type: "separator"
            }),
            new MenuItem({
                type: "normal",
                label: "About project-gtool",
                click: (menuItem, browserWindow, event)=> {
                    var aboutWindow = new BrowserWindow({
                        width: 500,
                        height: 230,
                        titleBarStyle: 'hidden',
                        backgroundColor: '#e0e0e0',
                        show: false,
                        maximizable: false,
                        minimizable: false,
                        alwaysOnTop: true,
                        resizable: false,
                    });
                    aboutWindow.setMenu(null);
                    var aui = new ui.GTUserInterface(aboutWindow, "about.html");
                    aui.load();
                }
            }),
        ]
    }));

    Menu.setApplicationMenu(menu);
    var mui = new ui.GTUserInterface(window, "index.html");
    mui.load();
})
