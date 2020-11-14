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
    type: Sequelize.DECIMAL(4, 2)
  },

  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS79p1If1EXMMm57dOqsPyux4OULqzhizOZLg&usqp=CAU'
  },

  price: {
    type: Sequelize.INTEGER,
    validate: {
      isDecimal: true,
      min: 0.0
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
})

module.exports = Product
