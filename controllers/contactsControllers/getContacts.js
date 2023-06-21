const Contact = require("../../models");
const { catchAsync } = require("../../utils");

exports.listContacts = catchAsync(async (req, res) => {
  const allContacts = await Contact.find();
  res.status(200).json(allContacts);
});
