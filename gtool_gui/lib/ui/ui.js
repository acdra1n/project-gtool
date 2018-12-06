/*
project-gtool Copyright (C) mr_chainman (techspider) 2018.
Licensed under GNU GPL v3

See LICENSE.MD for more information about licensing.

File: ui.js
Description: gtool ui file
*/

const path = require('path');
const url = require('url');

/**
 * User Interface Class
 */
class GTUserInterface
{
    /**
     * Create a new user interface object
     * @param {*} window The window object
     * @param {string} uif_path The ui file path
     */
    constructor(window, uif_path)
    {
        this.window = window;
        this.uipath = uif_path;
    }
    load()
    {
        var window = this.window;
        window.loadURL(url.format({
            pathname: path.join(__dirname, `../../ui/${this.uipath}`),
            protocol: 'file:',
            slashes: true
        }));
        window.once('ready-to-show', () => {
            window.show();
        });
    }
}




module.exports = {
    GTUserInterface
}