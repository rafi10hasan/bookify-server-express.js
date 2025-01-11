const express = require('express');
const categoryController = require('../controller/categoryController/categoryController');
const allCategoryController = require('../controller/categoryController/allCategoryController');
const createCategoryController = require('../controller/categoryController/createCategoryController');
const updateCategoryController = require('../controller/categoryController/updateCategoryController');
const deleteCategoryController = require('../controller/categoryController/deleteCategoryController');
const { subCategoryController } = require('../controller/categoryController/subCategoryController');


const router = express.Router()

router.get('',categoryController);
router.get('/all',allCategoryController);
router.get('/sub',subCategoryController)
router.post('/add',createCategoryController);
router.patch('/update/:id',updateCategoryController)
router.delete('/:id',deleteCategoryController)

module.exports = router

