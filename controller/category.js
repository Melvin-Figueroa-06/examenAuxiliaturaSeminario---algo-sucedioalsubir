const Category = require('../models/Category');

exports.create = async (req, res, next) => {
	const { category, description } = req.body;

	try {
		const categoryExist = await Category.findOne({ category });
		if (categoryExist) {
			return res.status(400).json({
				errorMessage: `${category} ya existe`,
			});
		}

		let newCategory = new Category();
		newCategory.category = category;
        newCategory.description = description;

		newCategory = await newCategory.save();

		res.status(200).json({
			category: newCategory,
			successMessage: `${newCategory.category} ha sido creado`,
		});
	} catch (err) {
		console.log('Error al crear la Task: ', err);
		res.status(500).json({
			errorMessage: 'Por favor despues',
		});
	}
};

exports.readAll = async (req, res) => {
	try {
		const categories = await Category.find({});
		res.status(200).json({
			categories,
		});
	} catch (err) {
		console.log('Error al leerTodo la categoria: ', err);
		res.status(500).json({
			errorMessage: 'Por favor despues',
		});
	}
};

exports.delete = async (req, res) => {
	try {
		const categoryId = req.params.categoryId;
		const deletedCategory = await Category.findByIdAndDelete(categoryId);
        
		res.json(deletedCategory);
	} catch (err) {
		console.log(err, 'categoryController.delete error');
		res.status(500).json({
			errorMessage: 'Por favor elimine despues la category',
		});
	}
};
