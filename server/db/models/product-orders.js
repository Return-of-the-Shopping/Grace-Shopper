const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productOrder', {
  //price when order was fulfilled
  price: {type: Sequelize.INTEGER},
  //quantity when order was fulfilled
  quantity: {type: Sequelize.INTEGER}
})

module.exports = ProductOrder
