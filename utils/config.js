const moment = require('moment')

const findDuplicateObject = (reportData) =>{
  return new Promise((resolve, reject)=>{
    try {
      let indice;
      let findIndex;
      let filtrados = reportData.filter((reportDataItem, reportDataIndice, reportDataArray) => {
      findIndex = reportDataIndice;
      indice = reportDataArray.findIndex((reportDataArrayItem) => {
        return JSON.stringify(reportDataArrayItem) === JSON.stringify(reportDataItem)
      })
      return indice !== reportDataIndice;
    })
    
    if(filtrados.length > 0) {
      throw new Error(
      `la fila=> ${indice + 2 } con la fila=> ${findIndex + 2} error=> se esta repitiendo la siguiente informacion ${JSON.stringify(filtrados)} `
    )}
    resolve(true)

    } 
    
    catch (error) {
     reject(error)  
    }
  })
}

const removeObjDuplic = (report) => {
  return new Promise((resolve, reject)=>{
    try {
      let findIndex = 0
      let filtrados = report.filter((actual, indice, arreglo)=>{
          if(arreglo.findIndex((valorArreglo) =>{
            return JSON.stringify(valorArreglo) === JSON.stringify(actual) 
            })!== indice){
              findIndex = indice
            }
          return arreglo.findIndex((valorArreglo) =>{
                return JSON.stringify(valorArreglo) === JSON.stringify(actual) 
                })!== indice
   
      })

      if(filtrados.length > 0){
        throw new Error(
          `fila=> ${findIndex} error=> se esta repitiendo la siguiente informacion ${JSON.stringify(filtrados)} `
        )
      }
      
      resolve(true)
      
    } catch (error) {
      reject(error)
    }
  })
}

const cleanJSON = (fila) => {
  return new Promise((resolve, reject) => {
    try {
      let result = Object.keys(fila).reduce(
        (prev, current) => ({
          ...prev,
          [current.toLowerCase()]: fila[current]
        }),
        {}
      )
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

const findNoExistComas = (
  numeroFila,
  nombreColuma,
  campo,
  regla
) => {
  return new Promise((resolve, reject) => {
    try {
      const tot = campo.split(',').length
      if (tot > 1) {
        throw new Error(
          `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${campo} error=> ${regla.message} `
        )
      }

      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

const validFormatDate = (
  numeroFila,
  nombreColuma,
  campo,
  regla
) => {
  return new Promise((resolve, reject) => {
    try {
      if (
        !moment(
          campo,
          moment.HTML5_FMT.DATE,
          true
        ).isValid()
      ) {
        throw new Error(
          `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${campo} error=> ${regla.message} `
        )
      }

      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

const validIsNumber = (numeroFila, nombreColuma, campo) => {
  return new Promise((resolve, reject) => {
    try {
      if (!Number(campo)) {
        throw new Error(
          `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${campo} error=> Debe ser un valor numerico `
        )
      }

      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

const isValidData = (
  numeroFila,
  nombreColuma,
  campo,
  regla
) => {
  return new Promise((resolve, reject) => {
    try {
      if (regla.valid != 0 && Array.isArray(regla.valid)) {
        if (!regla.valid.includes(campo)) {
          throw new Error(
            `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${campo} error=> debe contener uno de los siguientes valores ${regla.valid}`
          )
        }
      }
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

const findSeparadorComa = (
  numeroFila,
  nombreColuma,
  campo,
  regla
) => {
  return new Promise((resolve, reject) => {
    try {
      const tot = campo.split(',').length
      if (tot > 2) {
        throw new Error(
          `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${campo} error=> ${regla.message} `
        )
      }

      resolve(Number(campo.replace(/,/g, '.')))
    } catch (error) {
      reject(error)
    }
  })
}

const findSeparadorPunto = (
  numeroFila,
  nombreColuma,
  campo,
  regla
) => {
  return new Promise((resolve, reject) => {
    try {
      const tot = campo.split('.').length
      if (tot > 1) {
        throw new Error(
          `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${campo} error=> ${regla.message} `
        )
      }
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  cleanJSON,
  findNoExistComas,
  findSeparadorComa,
  findSeparadorPunto,
  validIsNumber,
  isValidData,
  validFormatDate,
  removeObjDuplic,
  findDuplicateObject
}
