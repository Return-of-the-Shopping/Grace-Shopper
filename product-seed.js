const axios = require('axios')
//key was placed in a secrets.js file in root.
//then module.exports = key.

const key = require('./secrets')
const {Product} = require('./server/db/models')

const fetchProducts = async () => {
  const {data} = await axios.get(
    `https://sandbox-api.brewerydb.com/v2/beers/?key=${key}&withBreweries=Y`
  )
  const beers = data.data
  for (let i = 0; i < 50; i++) {
    try {
      await Product.create({
        name: beers[i].name,
        abv: beers[i].abv,
        price: 8.0,
        description: beers[i].description || 'n/a',
        category: beers[i].style
          ? beers[i].style.category.name
          : 'Uncategorized',
        imageUrl: beers[i].labels ? beers[i].labels.large : null
      })
    } catch (error) {
      console.log(error)
    }
  }
  console.log('It worked. First try, definitely, first try.')
}

//run in terminal: node product-seed.js
fetchProducts()
