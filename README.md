# Documentation

GTool is a command line tool helping you interact with the Ethereum blockchain.
The tool also includes a frontend for those less familiar with the command line version.

## What are the requirements?

In order to use gtool, you must have Node.js installed.
You have to run `install_deps` to install dependencies.

Binaries are also available on the releases page if there are issues running it from source.
Note that there is a waiting period whenever a new release is uploaded.

## Building gtool

Building gtool is very simple, although you must make sure you ran the `install_deps` script beforehand.
All you have to do is run `build_win_crossplatform` if you are on Windows or run `build_nix_crossplatform` if you are on a nix platform (e.g. macOS, Linux).

The build script takes care of everything and requires little user interaction. Note that the frontend will only be built for the platform the build is initiated on.

When the build completes, all binaries will be available in the `build/` directory located at the root of the cloned repository.

## Examples

This section lists example tasks you can perform with the command line tool and assumes that gtool (or gtool-dev) is included in your `PATH` variable and has fully been built. If you are running gtool from source, use the `gtool-dev` script instead (located at the root of the cloned repo).

### PRE: **Creating a context**
In order to execute web3 related functions, you must start with a context first. To do this, run `gtool create-context [provider_url]`. This will create a new context file named `.gtoolctx.json` which will contain the provider url amongst other things.

### **Displaying all registered accounts**

`gtool get-accounts` returns a list of accounts registered to your wallet.

*Tip: change the output style in the context file if you are looking for JSON or other types*

### **Creating new accounts**

To create a new account, use `gtool new-account myPassPhrase` to create a new account.
