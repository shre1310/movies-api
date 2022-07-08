const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
 
const app = express()                  //get express and all the packages that comes with and call it and save it in the 'app'

const websites = [
    {
        name: 'IMDb',
        address: 'https://www.imdb.com/'
    },
    {
        name: 'Rotten Tomatoes',
        address: 'https://editorial.rottentomatoes.com/article/the-10-scariest-horror-movies-ever/'
    }
]

const articles = []

websites.forEach(website => {
    axios.get(website.address)
        .then(response => {
            const html = response.data
             const $ = cheerio.load(html)

             $('a:contains("the")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url,
                    source: website.name
                })
             }) 
        })
})

app.get('/', (req, res) =>{
    res.json("welcome")
} )

app.get('/movies', (req, res) =>{
    res.json(articles)
})

app.get('/movies/:websiteId', async (req, res) =>{
    console.log(req)
})

app.listen(PORT, () => console.log(`server running on port  ${PORT}`) )