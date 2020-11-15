const router = require('express').Router()
const {User, Product, Order, ProductOrder} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll()
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    // const order = await Order.findByPk(req.params.orderId)
    // if (!order) {
    //   return res.sendStatus(404)
    // }
    // res.json(order)
    const orderItems = await Order.findAll({
      where: {id: req.params.orderId},
      include: [
        {
          model: Product
        }
      ]
    })
    if (!orderItems.length) {
      return res.sendStatus(404)
    }
    res.json(orderItems)
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
    // Inside our req.body; we NEED userId, productId, quantity, price

    //find an order for a user that is not yet fulfilled if it exists
    let order = await Order.findOne({
      // ***Keep in mind that guests have no userId
      where: {userId: req.body.userId, isFulfilled: false}
    })

    // if find order does not exist, create a new order
    if (!order) order = await Order.create()

    // find the user to associate the order with
    const user = await User.findByPk(req.body.userId)

    //after we get the order from db, then set a user to that order
    await order.setUser(user)

    //then, find the product that we clicked,
    const product = await Product.findByPk(req.body.productId)

    //and associate that product to productOrders via a magic method
    await order.addProduct(product)

    //at current productOrder, add price and quantity only to that specific product
    const productOrder = await ProductOrder.findOne({
      where: {orderId: order.id, productId: product.id}
    })
    productOrder.update({price: +req.body.price, quantity: req.body.quantity})
    // productorder table should have values now
    //we're creating an association between the product we clicked, and the order we found or created.

    // res.send(order)
    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    // user, don’t know their order history? so get an order that isFulfilled = false that matches userId
    const userId = req.body.userId
    const userOrder = await Order.findOne({
      where: {
        userId: userId,
        isFulfilled: false
      }
    })
    await ProductOrder.destroy({
      where: {
        orderId: userOrder.id,
        productId: +req.body.productId
      }
    })
    res.sendStatus(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const userId = req.body.userId
    const userOrder = await Order.findOne({
      where: {
        userId: userId,
        isFulfilled: false
      }
    })

    if (userOrder) {
      //reduce quanitity in product
      await userOrder.update({isFulfilled: true})
      res.sendStatus(204)
    } else {
      const error = new Error('User does not have any current order.')
      throw error
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const userId = req.body.userId
    const userOrder = await Order.findOne({
      where: {
        userId: userId,
        isFulfilled: false
      }
    })

    if (!req.body.quantity) {
      await ProductOrder.destroy({
        where: {
          orderId: userOrder.id,
          productId: req.body.productId
        }
      })
    } else {
      await ProductOrder.update(req.body, {
        where: {
          orderId: userOrder.id,
          productId: req.body.productId
        }
      })
    }
    res.sendStatus(204)
  } catch (err) {
    next(err)
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
