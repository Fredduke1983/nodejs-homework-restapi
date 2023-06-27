exports.getCurrent = (req, res) => {
  const { name, email, subscription } = req.user;

  res.status(200).json({
    name,
    email,
    subscription,
  });
};
