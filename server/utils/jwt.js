const jwt = require('jsonwebtoken');

function getToken({ _id, username}) {
  return jwt.sign({ id: _id, username }, process.env.JWT_SECRET);
}

module.exports = {
  getToken,
};