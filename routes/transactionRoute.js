const express = require('express');
const { transactionController } = require('../controller/transactionController/transactionController');

const router = express.Router();

router.get("/:id",transactionController)
module.exports = router