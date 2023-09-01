const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  let tags = await Tag.findAll()

  tags = await Promise.all(tags.map(async tag => {
    let products = await Product.findAll({
      where: {
        categoryId: category.dataValues.id
      }
    })

    return {
      ...tag.dataValues,
      products: products
    }
  }))

  res.status(200).json(tags);
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  let results = await Tag.destroy({
    where: {
      id: id
    }
  })

  res.status(200).json({})
});

module.exports = router;
