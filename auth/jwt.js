/**
 * Created by Anil Jangra on 31/5/17
 */

const jwt = require('jsonwebtoken'),
    constants = require('./constants'),
    exceptions = require('./exception-generator'),

    TOKEN_EXPIRY = {
        SHORT_LIVED: '2 days',            //time format from https://github.com/rauchg/ms.js
        LONG_LIVED: '365 days',            //for keep me logged in functionality.... time format from https://github.com/rauchg/ms.js
    };

//===================================== Exports ===========================================================

module.exports = { generateToken, verifyToken, TOKEN_EXPIRY };

//===================================== Implementation ===========================================================


/**
 * returns token for user
 * @param user
 * @return {*}
 * @private
 */
function generateToken(user, tokenExpiry) {
    //Set Options
    const options = tokenExpiry ? { expiresIn: tokenExpiry } : constants.DO_NOTHING;
    //Generate Token
    return jwt.sign(user, constants.system.JWT_SECRET_KEY, options);
}

/**
 * Verify JWT Token
 * @param token
 * @return {*}
 * @private
 */
function verifyToken(token, doNotThrowError) {
    try {
        return jwt.verify(token, constants.system.JWT_SECRET_KEY);
    } catch (err) {
        if (!doNotThrowError) {
            throw exceptions.unauthorizedAccess(err);
        }
    }
}
