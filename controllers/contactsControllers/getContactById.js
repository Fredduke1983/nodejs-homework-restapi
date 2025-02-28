const { Contact } = require("../../models");
const { catchAsync } = require("../../utils");

exports.getContactById = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(
    contactId,
    "-createdAt -updatedAt"
  );

  res.status(200).json(contactById);
});
