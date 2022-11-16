const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

class AuthService {
  issue(payload) {
    return jwt.sign(payload, secret, { expiresIn: '24 hours' });
  }

  verify(token, next) {
    return jwt.verify(token, secret, {}, next);
  }
}

module.exports = new AuthService();
