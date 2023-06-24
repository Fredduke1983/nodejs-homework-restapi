const { catchAsync, errorUser } = require("../utils/");
const { Contact } = require("../models/");
const { errMessage } = require("../constants/errors");

exports.checkContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  if (contactId.length < 10) errorUser(400, errMessage.errRequest);

  const contact = await Contact.findById(contactId).catch(() => {
    throw errorUser(404, errMessage.errNotFound);
  });

  if (!contact) errorUser(404, errMessage.errNotFound);

  req.contact = contact;

  next();
});
