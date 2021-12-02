const express = require('express')
const router = express.Router()
const entidadService = require('../entidad/service')
const service = new entidadService()
const reportService = require('../reports/service')
const serviceReport = new reportService()

router.get('/', (req, res) => {
  const reportes = serviceReport.listar()
  res.render('index', {
    title: 'Analizer CSV',
    reportes
  })
})

router.get('/new-entry', (req, res) => {
  const entidades = service.listar()
  res.render('new-entries', {
    title: 'generar archivo de configuracion',
    entidades
  })
})

router.post('/new-entry', (req, res) => {
  const entidades = service.listar()
  console.log('data de formulario', req.body)
  res.render('new-entries', {
    title: 'Prueba new Entries',
    entidades
  })
})

module.exports = router
