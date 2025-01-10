const express = require('express');
const { contactController } = require('../controller/contactController/contactController');



const router = express.Router();

router.post("/", contactController);

module.exports = router