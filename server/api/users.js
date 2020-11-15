const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName', 'address']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.userId)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/orders/:userId', async (req, res, next) => {
  try {
    const userOrder = await Order.findOne({
      where: {userId: req.params.userId, isFulfilled: false},
      include: [{model: Product}]
    })
    res.json(userOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const findUser = await User.findOne({where: {id: userId}})
    await findUser.update(req.body)
    res.json(findUser)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (!user) {
      res.sendStatus(404)
    } else {
      await user.destroy()
      res.sendStatus(204).end()
    }
  } catch (err) {
    next(err)
  }
})
