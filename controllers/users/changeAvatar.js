const path = require("path");
const fs = require("fs").promises;
const jimp = require("jimp");

const { catchAsync } = require("../../utils");
const formatDate = require("../../utils/formatDate");
const { User } = require("../../models");

const changeAvatar = catchAsync(async (req, res) => {
  const destination = path.join(__dirname, "..", "..", "public", "avatars");

  if (req.file) {
    const { id, name } = req.user;

    const { file } = req;
    const img = await jimp.read(file.path);
    img.autocrop().cover(250, 250).writeAsync(file.path);

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const newName = `${name.toLowerCase()}${formattedDate}.jpg`;

    const newLinkToAvatar = path.join(destination, newName);

    await fs.rename(file.path, newLinkToAvatar);

    const user = await User.findOneAndUpdate(
      { _id: id },
      { avatarURL: newLinkToAvatar },
      {
        new: true,
      }
    );
    res.status(200).json({
      avatarURL: user.avatarURL,
    });
    return;
  }
  res.status(400).json({
    message: "Something wrong...",
  });
});

module.exports = changeAvatar;
