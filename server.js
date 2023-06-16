const app = require("./app");
const dotenv = require("dotenv");

dotenv.config("./.env");
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
