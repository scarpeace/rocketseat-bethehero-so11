const crypto = require('cripto')

module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');
}