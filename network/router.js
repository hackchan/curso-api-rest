const productos = require('../api/components/products/router')
const clients = require('../api/components/clients/router')
const uploads = require('../api/components/uploads/router')

const routers = (app) => {
  app.use('/api/products', productos)
  app.use('/api/clients', clients)
  app.use('/api/uploads', uploads)
}

module.exports = routers
