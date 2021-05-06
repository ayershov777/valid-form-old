const validation = require('../utils/validation');

async function validateUsername(req, res) {
    const username = req.query.username;
    const [isValid, feedback] = await validation.username(username);

    res.send({
        message: 'username validation result',
        payload: { isValid, feedback },
    });
}

module.exports = {
    validateUsername,
};