const router = require('express').Router()
const {User, Order, ProductOrder} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll()
    res.json(order)
  } catch (err) {
    next(err)
  }
})

// router.get('/:productId', async (req, res, next) => {
//   try {
//     const product = await Product.findByPk(req.params.productId)
//     if (!product) {
//       return res.sendStatus(404)
//     }
//     res.json(product)
//   } catch (err) {
//     next(err)
//   }
// })

router.post('/', async (req, res, next) => {
  try {
    //find an order for a user that is not yet fulfilled, or create one.
    //if order is created, then set a user to that order
    //then, take product that we clicked, and add to order via a magic method
    //product order at specific id, add price and quantity
    // productorder table should have values now
    // const order = await Order.findOne({
    //   where: {userId: req.body.id, isFulfilled: false},
    // })
    const order = await Order.create()
    const user = await User.findByPk(req.body.id)
    await order.setUser(user)
    //we need to know who the user is?? req.body??
    // order.setUser()
    //we're creating an association between the product we clicked, and the order we found or created.
    // // order.setOrder()
    res.send(order)
    // res.status(201).json(order)
  } catch (error) {
    next(error)
  }
})

// router.delete('/:productId', async (req, res, next) => {
//   try {
//     const id = +req.params.productId
//     await Product.destroy({
//       where: {id},
//     })
//     res.sendStatus(204)
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/:productId', async (req, res, next) => {
//   try {
//     const id = +req.params.productId
//     const product = await Product.findByPk(id)
//     if (!product) {
//       res.sendStatus(404)
//     }
//     const updatedProduct = await product.update(req.body, {returning: true})
//     res.json(updatedProduct)
//   } catch (error) {
//     next(error)
//   }
// })
