const { getCategories } = require("../../services/category-services/categories");


const categoryController = async (_req, res) => {
  const categories = await getCategories();
  res.send(categories);
};

module.exports = categoryController;
