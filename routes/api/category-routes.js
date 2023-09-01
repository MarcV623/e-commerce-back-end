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

router.post('/', async (req, res) => {
  if (req.body.categoryName === undefined) {
    res.status(400).json({ error: 'Missing Category Name' })
  } else if (typeof req.body.categoryName !== 'string') {
    res.status(400).json({ error: 'Invalid Category Name' })
  } else {
    let results = await Category.create({
      ...req.body
    })
  
    res.status(200).json({ message: 'Success!' })
  }
});

router.put('/:id', async (req, res) => {
  let category = await Category.update(req.body, {
    where: {
      id: req.params
    }
  })
  res.status(200).json(category);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  let results = await Category.destroy({
    where: {
      id: id
    }
  })

  res.status(200).json({})
});

module.exports = router;
