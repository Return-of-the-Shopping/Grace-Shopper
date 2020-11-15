const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  description: {
    type: Sequelize.TEXT
  },

  abv: {
    type: Sequelize.DECIMAL(4, 2),
    validate: {
      min: 0.0
    }
  },

  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.ball.com/Ball/media/Ball/Global/Markets%20and%20Capabilities%20Images/Beverage-Can-Upright-and-Can-Side-340x430.jpg?ext=.jpg'
  },

  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },

  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },

  category: {
    type: Sequelize.TEXT,
    defaultValue: 'Uncategorized'
  }
})

Product.beforeCreate(product => {
  product.price = product.price * 100
  product.imageUrl = !product.imageUrl
    ? 'https://www.ball.com/Ball/media/Ball/Global/Markets%20and%20Capabilities%20Images/Beverage-Can-Upright-and-Can-Side-340x430.jpg?ext=.jpg'
    : product.imageUrl
})

module.exports = Product
