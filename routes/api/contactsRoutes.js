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
const { checkContactById, authenticate } = require("../../middlewares/");

router
  .route("/")
  .get(authenticate, listContacts)
  .post(authenticate, addContact);

router.use("/:contactId", checkContactById);

router
  .route("/:contactId")
  .get(authenticate, getContactById)
  .delete(authenticate, removeContact)
  .put(authenticate, updateContact)
  .patch(authenticate, updateStatusContact);

module.exports = router;
