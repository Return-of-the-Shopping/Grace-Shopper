const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isFulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  confirmation: {
    type: Sequelize.TEXT
  }
})

Order.beforeUpdate(order => {
  function confirmationNum() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  order.confirmation = confirmationNum()
})

module.exports = Order
