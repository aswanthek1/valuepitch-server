const express = require("express");
const router = express();
const {
  register,
  getUsers,
  deleteDetails,
  editDetails,
} = require("../controllers/userController");

router.post("/register", register);
router.get("/users", getUsers);
router.delete("/deleteDetails", deleteDetails);
router.patch("/editDetails", editDetails);

module.exports = router;
