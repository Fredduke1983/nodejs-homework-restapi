const Contact = require("../../models");
const { catchAsync, contactsValidate } = require("../../utils");

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
