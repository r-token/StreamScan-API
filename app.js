const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

var port = process.env.PORT || 3000
const app = express()

app.get('/', function (req, res) {
    res.send(JSON.stringify({ Hello: 'World'}))
})

app.get('/api/yttv', function (req, res) {
    //Scrape YouTube TV Channels
    axios.get('https://www.groundedreason.com/youtube-tv-channels/').then((response) => {
        //Load the web page source code into a cheerio instance
        const $ = cheerio.load(response.data)
        //'response' is an HTTP response object, whose body is contained in its 'data' attribute

        //The p CSS selector matches all 'p' elements
        const urlElems = $('p')

        const urlSpan = $(urlElems[12])
        const urlText = urlSpan.text()
        const splitText = urlText.split(':')
        const channels = splitText[1]
        const uglyYTTVChannels = channels.split(',')
        const YTTVChannels = uglyYTTVChannels.map(function (channel) {
            return channel.trim()
        })
        //console.log(YTTVChannels)
        res.send(YTTVChannels)
    })
})

app.get('/api/hulu', function (req, res) {
    //Scrape Hulu Live TV Channels
    axios.get('https://www.groundedreason.com/tv-shows-hulu-worth-cost/').then((response) => {
        //Load the web page source code into a cheerio instance
        const $ = cheerio.load(response.data)
        //'response' is an HTTP response object, whose body is contained in its 'data' attribute

        //The p CSS selector matches all 'p' elements
        const urlElems = $('p')

        const urlSpan = $(urlElems[46])
        const urlText = urlSpan.text()
        const splitText = urlText.split(':')
        const channels = splitText[1]
        const uglyHuluChannels = channels.split(',')
        const huluChannels = uglyHuluChannels.map(function (channel) {
            return channel.trim()
        })
        console.log(huluChannels)
        res.send(huluChannels)
    })
})

app.get('/api/vue', function (req, res) {
    //Scrape PlayStation Vue Access Bundle Channels
    axios.get('https://www.groundedreason.com/replace-cable-with-playstation-vue/').then((response) => {
        //Load the web page source code into a cheerio instance
        const $ = cheerio.load(response.data)
        //'response' is an HTTP response object, whose body is contained in its 'data' attribute

        //The p CSS selector matches all 'p' elements
        const urlElems = $('p')

        const urlSpan = $(urlElems[10])
        const urlText = urlSpan.text()
        const splitText = urlText.split(':')
        const channels = splitText[1]
        const uglyVueChannels = channels.split(',')
        const vueChannels = uglyVueChannels.map(function (channel) {
            return channel.trim()
        })
        //console.log(urlText)
        res.send(vueChannels)
    })
})

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})