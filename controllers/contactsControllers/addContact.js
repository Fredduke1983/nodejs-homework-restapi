const Contact = require("../../models");
const { catchAsync, contactsValidate } = require("../../utils");

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
