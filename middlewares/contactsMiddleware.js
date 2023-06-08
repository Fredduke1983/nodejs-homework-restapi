const fs = require("fs").promises;
const path = require("path");

const catchAsync = require("../utils/catchAsync");
const contactsPath = path.join(__dirname, "..", "models", "contacts.json");

exports.checkContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  if (contactId.length < 10)
    return res.status(400).json({
      message: "Bad request ...",
    });

  const allContacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const contact = allContacts.find(item => item.id === contactId);

  if (!contact)
    return res.status(404).json({
      message: "Contact not found",
    });

  req.contact = contact;

  next();
});
