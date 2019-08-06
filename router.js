var express = require('express')
  , app = express()

app.use(require('./controllers'))

app.listen(3004, function() {
  console.log('Listening on port 3004...')
}) 