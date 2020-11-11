const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    if (!product) {
      return res.sendStatus(404)
    }
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const id = +req.params.productId
    await Product.destroy({
      where: {id}
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const id = +req.params.productId
    const product = await Product.findByPk(id)
    if (!product) {
      res.sendStatus(404)
    }
    const updatedProduct = await product.update(req.body, {returning: true})
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})
