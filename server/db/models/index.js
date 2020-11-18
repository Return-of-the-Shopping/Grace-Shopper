const User = require('./user')
const Product = require('./products')
const Order = require('./orders')
const ProductOrder = require('./product-orders')

User.hasMany(Order)
Order.belongsTo(User)

//productId and orderId are created, through table is created
Product.belongsToMany(Order, {through: ProductOrder})
Order.belongsToMany(Product, {through: ProductOrder})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  ProductOrder
}
