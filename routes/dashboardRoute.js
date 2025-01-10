const express = require("express");
const { userListController } = require("../controller/dashboardController/userController/userListController");
const { deleteUserController } = require("../controller/dashboardController/userController/deleteUserController");
const { makeAdminController } = require("../controller/dashboardController/userController/makeAdminController");
const { overviewController } = require("../controller/dashboardController/overviewController/overViewController");

const router = express.Router();

router.get('/users',userListController);
router.get('/overview',overviewController)
router.delete('/users/:id',deleteUserController);
router.patch('/users/role/:id',makeAdminController);
module.exports = router;
