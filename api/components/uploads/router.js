const express = require('express')
const router = express.Router()
const entidadService = require('../entidad/service')
const service = new entidadService()
const multer = require('multer')
const path = require('path')
const csvtojson = require('csvtojson')
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

    const ruta = path.join(
      __dirname,
      '../../../',
      `public/uploads/${req.file.filename}`
    )
    const response = await csvtojson({
      delimiter: '|',
      checkColumn: true,
      noheader: false,
      ignoreEmpty: true,
      trim: true,
      defaultEncoding: 'utf8',
      output: 'json'
    }).fromFile(ruta, { encoding: 'utf-8' })
    console.log('response:0', response[0])
    const columnas = Object.keys(response[0])
    console.log('natural:', columnas)
    const columreplace = columnas.map((celda) => {
      return celda
        .toUpperCase()
        .trim()
        .replace(new RegExp(' ', 'g'), '_')
        .replace('%', 'PORCENTAJE')
        .replace('A�O', 'ANIO')
    })

    const configFile = {
      entidad: entidad.nombre,
      sector: entidad.sector,
      sub_sector: entidad.subsector,
      bad_records_path: `/mnt/plata/gpif/${entidad.dbe}/bad_records`,
      destination_path: `plata/gpif/${entidad.dbe}/Backups`,
      origin_data_type: 'CSV',
      source_options: {
        sep: '|',
        encoding: 'ISO-8859-1',
        header: 'true'
      },
      column_names: columreplace.join(),
      date_columns: 'FECHA_REPORTE',
      cast_columns: {
        ANIO_REPORTE: 'int',
        ENTIDAD_REPORTANTE: 'bigint'
      },
      replace_and_convert: 'PENDIENTE',
      Porcentaje_rango_0_1: 'PORCENTAJE_EJECUCION',
      format_date: 'yyyy-MM-dd',
      shuffle: 10
    }

    res.send(configFile)
  } catch (err) {
    next(err)
  }
}

module.exports = router
