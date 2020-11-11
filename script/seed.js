'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const faker = require('faker')

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
    // had to get rid of - values cause of isNumeric validator, I think it'll be preferred if we get rid of the validator so its more clean

    const address = faker.address.streetAddress()
    let payment = faker.finance.creditCardNumber()

    // at first, the isCreditCard validator worked for us but not sure why it won't work for the random generator, so I got rid of it.

    // payment = payment.split('').filter((number)=>{
    //   const convert = parseInt(number);
    //   if(isNaN(convert)){
    //     return false;
    //   }
    //   return true;
    // }).join('');

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

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // map the usersArray and create a single instance for each object in the array
  await Promise.all(
    usersArr.map(user => {
      return User.create(user)
    })
  )

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
