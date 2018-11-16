module.exports = {
    name: "version",
    usage: "version\nDisplays the current gtool version.",
    execute: (args) =>
    {
        console.log("GTool version alpha-0.0.3.");
        return 0;
    }
}