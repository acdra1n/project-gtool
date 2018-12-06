/*
project-gtool Copyright (C) mr_chainman (techspider) 2018.
Licensed under GNU GPL v3

See LICENSE.MD for more information about licensing.

File: index.js
Description: gtool frontend index file
*/

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let window = null;

app.once('ready', () => {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hiddenInset',
        backgroundColor: "#FFFFFF",
        show: false
    });
    window.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    window.once('ready-to-show', () => {
        window.show();
    });
})
