const fetch = require('cross-fetch')
const express = require('express')
const app = express()
const port = 3000

const getUrlContents = (url) => {
  return new Promise((resolve, reject) => { 
    fetch(url, resolve, reject)
    .then(res => res.text())
    .then(body => resolve(body))
  })
}

app.get('/dashboard', async (req, res) => {
  //Get data from service 2 :: Movies
  try {
    const movies = await getUrlContents('http://service2:3000/movies')
    res.type('json')
    res.send(JSON.stringify({ dashboard: movies }))
  } catch (err) {
    res.send("Error")
  }
})

app.listen(port, () => { console.log(`Listening at http://localhost:${port}`)})