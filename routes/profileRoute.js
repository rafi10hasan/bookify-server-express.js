const express = require("express");
const profileController = require("../controller/profileController/profileController");
const upload = require("../lib/file-upload/upload");
const { updatePasswordController } = require("../controller/userController/updatePasswordController");


const router = express.Router();

router.put("/update/:id", upload.single("image"), profileController);
router.put("/update-password/:id", updatePasswordController);
module.exports = router;
