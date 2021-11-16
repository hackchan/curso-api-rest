const path = require('path')
const csvtojson = require('csvtojson')
class uploadsService {
  constructor(file) {
    this.file = file
    this.ruta = path.join(
      __dirname,
      '../../../',
      `public/uploads/${this.file.filename}`
    )
    console.log(this.file)
    console.log(this.ruta)
  }

  async csvtojson() {
    try {
      const response = await csvtojson({
        delimiter: '|',
        checkColumn: true,
        noheader: false,
        ignoreEmpty: true,
        trim: true,
        defaultEncoding: 'utf8',
        output: 'json'
      }).fromFile(this.ruta, { encoding: 'utf-8' })
      return await Promise.resolve(response[0])
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  async columnsHeader(header) {
    try {
      const columnas = Object.keys(header)
      const columreplace = columnas.map((celda) => {
        return celda
          .toUpperCase()
          .trim()
          .replace(new RegExp(' ', 'g'), '_')
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace('%', 'PORCENTAJE')
          .replace('A�O', 'ANIO')
      })
      return await Promise.resolve(columreplace.join())
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  async getConfigFile(columna, entidad) {
    return await Promise.resolve({
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
      column_names: columna,
      date_columns: 'FECHA_REPORTE',
      cast_columns: {
        ANIO_REPORTE: 'int',
        ENTIDAD_REPORTANTE: 'bigint'
      },
      replace_and_convert: 'PENDIENTE',
      Porcentaje_rango_0_1: 'PORCENTAJE_EJECUCION',
      format_date: 'yyyy-MM-dd',
      shuffle: 10
    })
  }
}

module.exports = uploadsService
