
const cleanJSON = (fila) => {
   return new Promise ((resolve, reject)=>{
       try {
        let result = Object.keys(fila).reduce((prev, current) => 
        ({ ...prev, [current.toLowerCase()]: fila[current]}), {})
        resolve(result)
       } catch (error) {
           reject(error)
       }
   })
}

module.exports ={
    cleanJSON
}