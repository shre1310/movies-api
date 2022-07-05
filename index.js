const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
 
const app = express()                  //get express and all the packages that comes with and call it and saving in the 'app'

const articles = []

app.get('/myname', (req, res) =>{
    res.json("welcome")
} )

app.get('/movies', (req, res) =>{
    axios.get('https://www.imdb.com/chart/top/')
    .then((response) =>{
        const html = response.data
        // console.log(html)
        const $ = cheerio.load(html)

        $('a:contains("of")', html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,
                url
            })
        })
        res.json(articles)
    }).catch((err) => console.log(err) )
})

app.listen(PORT, () => console.log(`server running on port  ${PORT}`) )