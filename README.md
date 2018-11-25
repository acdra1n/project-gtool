# Documentation

GTool is a command line utility helping you interact with the ethereum blockchain.

## What are the requirements?

In order to use gtool, you must have Node.js installed.
You have to run `install_deps` to install dependencies.

Binaries are also available on the releases page if there are issues running it from source.

## Examples

### PRE: **Creating a context**
In order to execute web3 related functions, you must start with a context first. To do this, run `gtool create-context [provider_url]`. This will create a new context file named `.gtoolctx.json` which will contain the provider url amongst other things.

### **Displaying all registered accounts**

`gtool get-accounts` returns a list of accounts registered to your wallet.

*Tip: change the output style in the context file if you are looking for JSON or other types*

### **Creating new accounts**

To create a new account, use `gtool new-account myPassPhrase` to create a new account.
