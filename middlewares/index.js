const { checkContactById } = require("./contactsMiddleware");
const { uniqueUserValidate } = require("./userMiddlewares");
const { authenticate } = require("./authenticate");

module.exports = { checkContactById, uniqueUserValidate, authenticate };
