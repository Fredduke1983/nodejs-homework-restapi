const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config("./.env");
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log("something wrong...", err);
    process.exit(1);
  });
