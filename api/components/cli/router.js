const express = require('express')
const router = express.Router()
const entidadService = require('../entidad/service')
const service = new entidadService()

router.get('/', (req, res) => {
  const entidades = service.listar()
  res.render('index', {
    title: 'Analizer CSV',
    entidades
  })
})

router.get('/new-entry', (req, res) => {
  res.render('new-entries', {
    title: 'Prueba new Entries'
  })
})

router.post('/new-entry', (req, res) => {
  console.log('data de formulario', req.body)
  res.render('new-entries', {
    title: 'Prueba new Entries'
  })
})

module.exports = router
