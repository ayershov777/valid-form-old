const User = require('../models/user');

function isUsernamePolite(username) {
    return username !== "inappropriate";
}

async function username(username) {
    const isTaken = (await User.findOne({ username }));
    const isPolite = isUsernamePolite(username);
    
    if(!isPolite)
        return [false, "username is inappropriate"];
    else if(isTaken)
        return [false, "please pick a different username"];
    else
        return [true, ""];
}

module.exports = {
    username,
};