const jsonwebtoken = require('jsonwebtoken');

const secret = 'your_secret_key';

const JWT = {
    generate(value,exprires,callback) {
        return jsonwebtoken.sign(value,secret,{expiresIn:exprires})
    },
    verify(token,callback) {
        return jsonwebtoken.verify(token,secret,callback)
        // return JSONWebToken.verify(token,secret)
    }
}

module.exports = JWT;