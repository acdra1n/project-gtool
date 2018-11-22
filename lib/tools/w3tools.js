/**
 * Send a simple transaction
 * @param {*} web3 
 * @param {string} src 
 * @param {string} dest 
 * @param {*} amount 
 */
async function send_Transaction(web3, src, dest, amount)
{
    return await web3.eth.sendTransaction({
        from: src,
        to: dest,
        value: amount
    });
}

module.exports = {
    send_Transaction
}