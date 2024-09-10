const moment = require('moment');
function formatMessage(username, text , isCurrentUser , userImage) {
    return {
        username,
        text, // This should be a string
        time: moment().format('h:mm a'),
        userImage: userImage,
        isCurrentUser,
    };
}


module.exports = formatMessage;