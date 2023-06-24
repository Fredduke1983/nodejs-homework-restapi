const { errMessage } = require("../../constants/errors");
const { Contact } = require("../../models");
const { catchAsync, contactsValidate, errorUser } = require("../../utils");

exports.addContact = catchAsync(async (req, res) => {
  const { error, value } = contactsValidate(req.body);

  const { _id: owner } = req.user;

  if (error) {
    errorUser(400, errMessage.errRequest);
  }
  const uniqContact = await Contact.findOne({ email: `${req.body.email}` });
  console.log(uniqContact);
  if (uniqContact) errorUser(400, errMessage.errUniq);

  await Contact.create({ ...value, owner });

  res.status(201).json({
    message: `New contact ${value.name} added`,
    newContact: value,
  });
});
