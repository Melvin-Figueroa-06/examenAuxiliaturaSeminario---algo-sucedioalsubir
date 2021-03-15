const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');


router.post('/', categoryController.create);
router.get('/',  categoryController.readAll);

router.delete('/:productId', categoryController.delete)


module.exports = router;