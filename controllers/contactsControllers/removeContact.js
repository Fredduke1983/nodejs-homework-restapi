const { Contact } = require("../../models");
const { catchAsync } = require("../../utils");

exports.removeContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  await Contact.findByIdAndDelete(contactId);

  res.status(200).json({ message: "contact deleted" });
});
