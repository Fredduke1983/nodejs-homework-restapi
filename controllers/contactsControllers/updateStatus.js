const Contact = require("../../models");
const { catchAsync, contactFavValidate } = require("../../utils");

exports.updateStatusContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const { error, value } = contactFavValidate(body);

  if (error) {
    return res.status(400).json({ message: "missing field favorite" });
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
