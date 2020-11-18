const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user.dataValues.admin) {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email', 'firstName', 'lastName', 'address']
      })
      res.json(users)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    if (
      //checks user logged in is admin OR if logged-in user is equal to the specific route /:userId
      req.user.dataValues.admin ||
      req.user.dataValues.id === +req.params.userId
    ) {
      const users = await User.findByPk(req.params.userId)
      if (!users) {
        return res.sendStatus(404)
      }
      res.json(users)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/orders/:userId', async (req, res, next) => {
  try {
    //getting an order specific to a user
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
    if (req.user.dataValues.admin || +userId === req.user.dataValues.id) {
      const findUser = await User.findOne({where: {id: userId}})

      // can only manipulate this information, so NOT admin field
      const newInfo = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        DOB: req.body.DOB
      }

      await findUser.update(newInfo)
      res.json(findUser)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    // users can only delete themselves or an admin
    const userId = req.params.userId
    if (req.user.dataValues.admin || +userId === req.user.dataValues.id) {
      const user = await User.findByPk(userId)
      if (!user) {
        res.sendStatus(404)
      } else {
        await user.destroy()
        res.sendStatus(204).end()
      }
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})
