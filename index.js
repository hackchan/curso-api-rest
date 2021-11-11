const express = require('express')
const routers = require('./network/router')
const app = express()

const port = 3000
/**Routes */
routers(app)
app.listen(port, () => {
  console.log('running in port:' + port)
})
