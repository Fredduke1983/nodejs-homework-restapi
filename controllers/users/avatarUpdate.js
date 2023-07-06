const multer = require("multer");
const path = require("path");
const { errorUser, catchAsync } = require("../../utils");

class UploadAvatar {
  static upload(dest) {
    const tempDir = path.join(__dirname, "..", "..", "temp");
    const multerStorage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, tempDir);
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      },
    });

    const multerFilter = catchAsync(async (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(errorUser(400, "Please, upload images only!"), false);
      }
    });

    const fileSizeLimit = { fileSize: 2 * 1024 * 1024 };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
      limits: fileSizeLimit,
    }).single(dest);
  }
}

module.exports = UploadAvatar;
