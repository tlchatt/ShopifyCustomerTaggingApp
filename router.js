var express = require('express')
  , app = express()
var cors = require('cors')

app.use(cors())

app.use(require('./controllers'))

app.listen(3004, function() {
  console.log('Listening on port 3004...')
}) 