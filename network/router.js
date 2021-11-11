const productos = require('../api/components/products/router')

const routers = (server) => {
  server.use('/api', productos)
}

module.exports = routers
