var fs = require('fs');
var os = require('os');
var env = [];
var env_prefix = "";

var chr_repl_tbl = {
    win32_cmd: [
        "^",
        "\"",
        "*",
        "(",
        ")",
        "=",
        "-",
        "?",
        ">",
        "<",
        "|"
    ],
    bash: [
        "\"",
        ">",
        "<",
        "|"
    ]
}

/**
 * An object representing an environment variable
 * @param name The name of the variable
 * @param value The value of the variable
 */
function EnvironmentVar(name, value)
{
    this.name = name;
    this.value = value;
}

/**
 * Set the environment variable prefix
 * @param prefix The prefix to use
 */
function setEnvPrefix(prefix)
{
    env_prefix = prefix;
}

/**
 * Open a new environment variable dictionary.
 */
function open()
{
    env = [];
}

/**
 * Set an environment variable.
 * @param name The name of the variable
 * @param value The value of the variable
 */
function setEnv(name, value)
{
    if(value != null)
        env.push(new EnvironmentVar(name, value.toString()));
    else
        env.push(new EnvironmentVar(name, "null"));
}

/**
 * Get the value of an environment variable.
 * @param name The name of the variable
 */
function getEnv(name)
{
    for(var oi = 0; oi < env.length; oi++)
        if(env[oi] != null)
            if(env[oi].name == name)
                return env[oi];
    return null;
}

/**
 * Delete an environment variable.
 * @param name The name of the variable
 */
function delEnv(name)
{
    for(var oi = 0; oi < env.length; oi++)
        if(env[oi] != null)
            if(env[oi].name == name)
                env.splice(env.indexOf(oi), 1);
}

/**
 * Sync all environment variables with process.env
 */
function sync()
{
    for(var i = 0; i < env.length; i++)
        if(env[i] != null)
            process.env[env[i].name] = env[i].value;
}

/**
 * Save all environment variables to a file and close env[].
 * @param path The output path of the environment variables file
 */
function close(path) //Build env file dependent on OS
{
    var envs = "";
    switch(os.platform())
    {
        case "win32":
            for(var vi = 0; vi < env.length; vi++)
            {
                var v = env[vi];
                var name = v.name;
                var value = v.value;
                for(var ci = 0; ci < chr_repl_tbl.win32_cmd.length; ci++)
                {
                    name = name.replace(chr_repl_tbl.win32_cmd[ci], `^${chr_repl_tbl.win32_cmd[ci]}`);
                    value = value.replace(chr_repl_tbl.win32_cmd[ci], `^${chr_repl_tbl.win32_cmd[ci]}`);
                }
                envs += `set ${env_prefix}${name}=${value}\r\n`;
            }
            break;
        default:
            for(var vi = 0; vi < env.length; vi++)
            {
                var v = env[vi];
                var name = v.name;
                var value = v.value;
                for(var ci = 0; ci < chr_repl_tbl.bash.length; ci++)
                {
                    name = name.replace(chr_repl_tbl.bash[ci], `\\${chr_repl_tbl.bash[ci]}`);
                    value = value.replace(chr_repl_tbl.bash[ci], `\\${chr_repl_tbl.bash[ci]}`);
                }
                envs += `export ${env_prefix}${name}=${value}\n`;
            }
            break;
    }
    fs.writeFileSync(path, envs);
    env = null;
    env_prefix = "";
}

module.exports = {
    open,
    close,
    setEnv,
    setEnvPrefix,
    getEnv,
    delEnv,
    sync
}