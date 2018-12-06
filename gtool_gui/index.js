/*
project-gtool Copyright (C) mr_chainman (techspider) 2018.
Licensed under GNU GPL v3

See LICENSE.MD for more information about licensing.

File: index.js
Description: gtool frontend index file
*/

const { app, BrowserWindow } = require('electron');
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
    var mui = new ui.GTUserInterface(window, "index.html");
    mui.load();
})
