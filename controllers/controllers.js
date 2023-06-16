const { catchAsync } = require("../utils/");
const { contactsValidate, contactFavValidate } = require("../utils/");
const Contact = require("../models/");

const getAllContacts = () => Contact.find();

exports.listContacts = catchAsync(async (req, res) => {
  const allContacts = await getAllContacts();
  res.status(200).json(allContacts);
});

exports.getContactById = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);

  res.status(200).json(contactById);
});

exports.addContact = catchAsync(async (req, res) => {
  const { error, value } = contactsValidate(req.body);

  if (error) {
    return res.status(400).json({
      massage: "Bad request data",
    });
  }
  await Contact.create(value);

  res.status(201).json({
    message: `New contact ${value.name} added`,
    newContact: value,
  });
});

exports.removeContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  await Contact.findByIdAndDelete(contactId);

  res.status(200).json({ message: "contact deleted" });
});

exports.updateContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const { error, value } = contactsValidate(body);

  if (error) {
    return res.status(400).json({
      massage: "missing fields",
    });
  }

  await Contact.findByIdAndUpdate(
    contactId,
    {
      name: value.name,
      email: value.email,
      phone: value.phone,
    },
    {
      new: true,
    }
  );

  res.status(200).json(value);
});

exports.updateStatusContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const { error, value } = contactFavValidate(body);

  if (error) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  await Contact.findByIdAndUpdate(
    contactId,
    {
      favorite: value.favorite,
    },
    {
      new: true,
    }
  );
  res.status(200).json(value);
});
