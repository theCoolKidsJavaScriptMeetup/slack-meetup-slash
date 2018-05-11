require('dotenv').config()
const express = require('express')
const getNextMeetup = require('./services/meetup').getNextMeetup
const bodyParser = require('body-parser')

const PORT = process.env.PORT
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.post('/meetup/next', (req,res) => {
  if(req.body.text === 'next') {
    console.log(req.body)
    getNextMeetup()
    .then(data => {
      res.status(200).json({text: data, response_type: 'in_channel'})
    })
    .catch(e => console.log(e))

  }else {
    console.log('here')
    res.status(200).json({text: 'Not sure what you meant, try adding "next" after `/meetup`'})
  }
})

app.listen(PORT, () => console.log(`express server listening on port: ${PORT}`))