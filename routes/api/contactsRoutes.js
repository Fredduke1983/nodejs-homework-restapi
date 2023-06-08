const { Router } = require("express");
const router = Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const { checkContactById } = require("../../middlewares/contactsMiddleware");

router.route("/").get(listContacts).post(addContact);
router.use("/:contactId", checkContactById);
router
  .route("/:contactId")
  .get(getContactById)
  .delete(removeContact)
  .put(updateContact);

module.exports = router;
