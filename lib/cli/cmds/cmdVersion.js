module.exports = {
    name: "version",
    usage: "version\nDisplays the current gtool version.",
    execute: (args) =>
    {
        console.log("GTool version 1.0.");
        return 0;
    }
}