const { success } = require('../../../config/response')

const express = require('express')
const router = express.Router()

router.get('/productos', listaProductos)

async function listaProductos(req, res, next) {
  try {
    success(req, res, 'wow')
  } catch (error) {
    next(error)
  }
}

module.exports = router
