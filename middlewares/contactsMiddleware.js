const { catchAsync } = require("../utils/");
const Contact = require("../models/");

exports.checkContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  if (contactId.length < 10)
    return res.status(400).json({
      message: "Bad request ...",
    });

  const contact = await Contact.findById(contactId).catch(err => {
    console.log(err.message);
    return false;
  });

  if (!contact)
    return res.status(404).json({
      message: "Contact not found",
    });

  req.contact = contact;

  next();
});
