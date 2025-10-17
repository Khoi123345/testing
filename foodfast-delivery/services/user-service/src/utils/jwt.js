const jwt = require('jsonwebtoken');

const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET) || 'fallback-secret';
    } catch (error) {
    throw new Error('Invalid token');
    }
};

module.exports = {
  generateToken,
  verifyToken,
};