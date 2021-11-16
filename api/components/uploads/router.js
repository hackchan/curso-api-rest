const express = require('express')
const router = express.Router()
const entidadService = require('../entidad/service')
const service = new entidadService()
const uploadService = require('./service')
const multer = require('multer')
const path = require('path')
//const csvtojson = require('csvtojson')
//const uploadsService = require('./service')
//const parse = require('csv-parse')
// const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    cb(
      null,
      'entidad' +
        path.extname(file.originalname).toLocaleLowerCase()
    )
  }
})

const upload = multer({
  storage,
  dest: 'public/uploads/',
  limits: { fileSize: 1000000 }
})

router.get('/', loadingExcel)
router.post('/', upload.single('file'), loadingCSV)

function loadingExcel(req, res, next) {
  try {
    res.send({ loading: true })
  } catch (err) {
    next(err)
  }
}

async function loadingCSV(req, res, next) {
  try {
    const codigoEntidad = req.body.entity
    const entidad = await service.listarByOne(codigoEntidad)
    const serviceUpload = new uploadService(req.file)
    const header = await serviceUpload.csvtojson()
    const columna = await serviceUpload.columnsHeader(
      header
    )
    const configFile = await serviceUpload.getConfigFile(
      columna,
      entidad
    )
    res.send(configFile)
  } catch (err) {
    next(err)
  }
}

module.exports = router
