const { Router } = require("express");
const router = Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsControllers");
const checkContactById = require("../../middlewares/");

router.route("/").get(listContacts).post(addContact);

router.use("/:contactId", checkContactById);

router
  .route("/:contactId")
  .get(getContactById)
  .delete(removeContact)
  .put(updateContact)
  .patch(updateStatusContact);

module.exports = router;
