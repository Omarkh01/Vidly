// require('dotenv').config();
const config = require('config');

module.exports = function() {
    // console.log('running');

    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
}