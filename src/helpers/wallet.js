const crypto = require('crypto');

const generateWalletAddress = () => {
    const adress = crypto.randomBytes(32).toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
    return adress;
}

module.exports = {
    generateWalletAddress
}
