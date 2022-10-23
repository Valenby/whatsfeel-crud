const conexion = require('../database/db');  //importacion-pedir

// crud-leer recibe los datos individuales que mandemos al id
const crud_leer = (id, res) => {
    let queryparaleerunusuario = 'SELECT * FROM registro WHERE id =' + id //codigo de backend(lenguaje-sql) donde armamos un string con diciho lenguaje y leemos el id de la funcion creada.
   //objeto conexion:
    conexion.query(queryparaleerunusuario,(error, results)=>{ 
        if(error) {
            console.log(error)
        } else {
            console.log("resultado:", results)
            res.render('adminreadhtml.ejs', {data:results})
        }
    })
}

module.exports = crud_leer   
