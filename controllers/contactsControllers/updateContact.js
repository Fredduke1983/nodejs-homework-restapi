const { errMessage } = require("../../constants/errors");
const { Contact } = require("../../models");
const { catchAsync, contactsValidate, errorUser } = require("../../utils");

exports.updateContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const { error, value } = contactsValidate(body);

  if (error) {
    errorUser(400, errMessage.errMiss);
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
