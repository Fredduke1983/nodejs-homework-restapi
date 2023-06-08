const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const catchAsync = require("../utils/catchAsync");
const { contactsValidate } = require("../utils/contactsValidator");

const contactsPath = path.join(__dirname, "contacts.json");

const getAllContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, "utf-8"));
};

exports.listContacts = catchAsync(async (req, res) => {
  const allContacts = await getAllContacts();
  res.status(200).json({
    allContacts,
  });
});

exports.getContactById = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const allContacts = await getAllContacts();

  res.status(200).json({
    ...allContacts.find(el => el.id === contactId),
  });
});

exports.addContact = catchAsync(async (req, res) => {
  const { error, value } = contactsValidate(req.body);

  if (error) {
    return res.status(400).json({
      massage: "Bad request data",
    });
  }

  const allContacts = await getAllContacts();
  allContacts.push({ id: nanoid(), ...value });

  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  res.status(201).json({
    message: `New contact ${value.name} added`,
  });
});

exports.removeContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const allContacts = await getAllContacts();

  const filteredContacts = allContacts.filter(el => el.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));

  res.status(200).json({ message: "contact deleted" });
});

exports.updateContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const { error, value } = contactsValidate(body);

  if (error) {
    return res.status(400).json({
      massage: "missing fields",
    });
  }
  const allContacts = await getAllContacts();

  const index = allContacts.findIndex(el => {
    return el.id === contactId;
  });

  if (index === -1) return res.status(400).json({ message: "null" });
  allContacts[index] = { id: contactId, ...value };

  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  res.status(200).json({ ...value });
};
