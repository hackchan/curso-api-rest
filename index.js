const express = require('express')
const routers = require('./network/router')
const {
  wrapError,
  logError,
  error
} = require('./middlewares/error')
const app = express()

const port = 3000
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
/**Routes */
routers(app)

/**Error MiddleWare */
//app.use(logError)
app.use(wrapError)
app.use(error)

app.listen(port, () => {
  console.log('running in port:' + port)
})
