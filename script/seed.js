'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')
const faker = require('faker')

const axios = require('axios')
const {key} = require('../secrets')

//created an array to hold all the objects that we create
//generateUsers loop 20 times to create 20 new objects
const usersArr = []
const generateUsers = () => {
  for (let i = 0; i < 20; i++) {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const email = faker.internet.email(firstName, lastName)
    let phone = faker.phone.phoneNumber()
    phone = phone
      .split('')
      .filter(number => {
        const convert = parseInt(number)
        if (isNaN(convert)) {
          return false
        }
        return true
      })
      .join('')

    const address = faker.address.streetAddress()
    let payment = faker.finance.creditCardNumber()
    const password = faker.internet.password()
    const userObj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address,
      payment: payment,
      password: password
    }
    usersArr.push(userObj)
  }
}
// invoke the function to loop
generateUsers()
const ownUser = {
  firstName: 'Min Kyu',
  lastName: 'Han',
  email: 'min@yahoo.com',
  address: '123 Hoppy Street',
  password: '123',
  admin: true
}

usersArr.push(ownUser)

const adminUser = {
  firstName: 'Min Kyu',
  lastName: 'Han',
  email: 'min@yahoo.com',
  address: '123 Hoppy Street',
  password: '1234'
}

const adminUser1 = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'admin@hoppyendings.com',
  address: '123 Hoppity Street',
  password: 'jdoe123'
}

usersArr.push(adminUser)
usersArr.push(adminUser1)
const beerPrice = () => {
  return 10 - Math.floor(Math.random() * 4)
}

const fetchProducts = async () => {
  // 23 total pages
  for (let i = 1; i <= 1; i++) {
    try {
      const {data} = await axios.get(
        `https://sandbox-api.brewerydb.com/v2/beers/?key=${process.env
          .BREW_KEY || key}&withBreweries=Y&p=${i}`
      )
      const beers = data.data
      for (let j = 0; j < 50; j++) {
        await Product.create({
          name: beers[j].name,
          quantity: 10,
          abv: beers[j].abv,
          price: beerPrice(),
          description: beers[j].description || 'n/a',
          category: beers[j].style
            ? beers[j].style.category.name
            : 'Uncategorized',
          imageUrl: beers[j].labels ? beers[j].labels.large : null
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // map the usersArray and create a single instance for each object in the array
  await Promise.all(
    usersArr.map(user => {
      return User.create(user)
    })
  )
  await fetchProducts()
  console.log(`seeded ${usersArr.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
