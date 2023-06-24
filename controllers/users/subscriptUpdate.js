const { errMessage } = require("../../constants/errors");
const { subscriptEnum } = require("../../constants/subscriptions");
const { User } = require("../../models");
const { errorUser, catchAsync } = require("../../utils");

exports.subscriptUpdate = catchAsync(async (req, res) => {
  const { subscription } = req.body;
  const { id } = req.params;

  const isValidSubscript = subscript => subscriptEnum.includes(subscript);

  if (!isValidSubscript(subscription)) {
    errorUser(400, errMessage.errRequest);
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    { subscription: subscription },
    {
      new: true,
    }
  );
  res.status(200).json({
    message: "Subscription changed",
    user,
  });
});
