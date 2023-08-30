const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  let categories = await Category.findAll()

  categories = await Promise.all(categories.map(async category => {
    let products = await Product.findAll({
      where: {
        categoryId: category.dataValues.id
      }
    })

    return {
      ...category.dataValues,
      products: products
    }
  }))

  res.status(200).json(categories);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id

  let results = await Category.findAll({
    where: {
      id: id
    }
  })

  if (results.length === 0) {
    res.status(404).json({ error: 'Invalid Id Provided' })
  } else {
    let category = results[0]

    let products = await Product.findAll({
      where: {
        categoryId: category.dataValues.id
      }
    })
  
    res.status(200).json({
      ...category.dataValues,
      products: products
    });
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
