const { addContact } = require("./addContact");
const { getContactById } = require("./getContactById");
const { listContacts } = require("./getContacts");
const { removeContact } = require("./removeContact");
const { updateContact } = require("./updateContact");
const { updateStatusContact } = require("./updateStatus");

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
