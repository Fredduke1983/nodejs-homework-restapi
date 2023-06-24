const { errMessage } = require("../../constants/errors");
const { Contact } = require("../../models");
const { catchAsync, contactFavValidate, errorUser } = require("../../utils");

exports.updateStatusContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const { error, value } = contactFavValidate(body);

  if (error) {
    errorUser(400, errMessage.errMiss);
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
