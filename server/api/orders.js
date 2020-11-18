const router = require('express').Router()
const {User, Product, Order, ProductOrder} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user.dataValues.admin) {
      const order = await Order.findAll()
      res.json(order)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    //Read Order Route//
    // retrieves an order with all the products attached to the order
    const orderItems = await Order.findOne({
      where: {id: req.params.orderId},
      include: [
        {
          model: Product
        }
      ]
    })
    // check if admin for the sake of a user searching someone else's order
    if (
      req.user.dataValues.id === orderItems.userId ||
      req.user.dataValues.admin
    ) {
      if (!orderItems.id) {
        res.sendStatus(404)
      }
      res.json(orderItems)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

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

    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    // This route deletes an item from the cart
    const userId = req.body.userId
    if (req.user.dataValues.admin || +userId === +req.user.dataValues.id) {
      const userOrder = await Order.findOne({
        where: {
          userId: userId,
          isFulfilled: false
        }
      })
      if (userOrder) {
        await ProductOrder.destroy({
          where: {
            orderId: userOrder.id,
            productId: +req.body.productId
          }
        })
        res.sendStatus(204).end()
      } else {
        res.sendStatus(401)
      }
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const {userId, cart} = req.body

    if (userId === req.user.dataValues.id) {
      const userOrder = await Order.findOne({
        where: {
          userId: userId,
          isFulfilled: false
        }
      })
      // when we checkout, we update the quantity for that specific product
      if (userOrder) {
        //reduce quanitity in product
        Object.keys(cart).map(async productId => {
          const product = await Product.findOne({
            where: {
              id: productId
            }
          })
          const originalQuantity = product.dataValues.quantity
          const orderQuantity = +JSON.parse(cart[productId]).quantity
          product.update({quantity: originalQuantity - orderQuantity})
        })
        await userOrder.update({isFulfilled: true})
        res.sendStatus(204)
      } else {
        const error = new Error('User does not have any current order.')
        throw error
      }
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    // If the quantity reaches 0, delete it from the cart
    // Else, update the quantity
    const userId = req.body.userId
    if (req.user.dataValues.admin || +userId === +req.user.dataValues.id) {
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
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})
