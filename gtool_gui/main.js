/*
project-gtool Copyright (C) mr_chainman (techspider) 2018.
Licensed under GNU GPL v3

See LICENSE.MD for more information about licensing.

File: index.js
Description: gtool frontend index file
*/

const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const ui = require("./lib/ui/ui");

let window = null;

app.once('ready', () => {
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
                type: "normal",
                label: "Test Menu Item",
            }),
            new MenuItem({
                type: "separator"
            }),
            new MenuItem({
                label: "Exit",
                click: (menuItem, browserWindow, event)=> {
                    process.exit();
                }
            })
        ]
    }));
    
    Menu.setApplicationMenu(menu);
    var mui = new ui.GTUserInterface(window, "index.html");
    mui.load();
})
