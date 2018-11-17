const vinf = require("../../release/vinf");

module.exports = {
    name: "version",
    usage: "version\nDisplays the current gtool version.",
    execute: (args) =>
    {
        console.log(`GTool version ${vinf.version_string}`);
        return 0;
    }
}