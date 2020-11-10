const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  description: {
    type: Sequelize.STRING
  },

  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS79p1If1EXMMm57dOqsPyux4OULqzhizOZLg&usqp=CAU'
  },

  price: {
    type: Sequelize.DECIMAL(10, 2),
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
  }
})

module.exports = Product
