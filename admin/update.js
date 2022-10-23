const conexion = require('../database/db');  //importacion-pedir


const crud_update = (id, body, res) => {
    let queryparaActualizarunusuario = 'UPDATE registro SET ? WHERE id =' + id //codigo de backend(lenguaje-sql) donde armamos un string con diciho lenguaje y leemos el id de la funcion creada.
   //objeto conexion:
    conexion.query(queryparaActualizarunusuario,
        [{ nombres: body.nombres, apellidos: body.apellidos, telefono: body.telefono, correo: body.correo, usuario: body.usuario, contrasena: body.contrasena }],
        (error, results)=>{ 
        if(error) {
            console.log(error)
        } else {
            console.log("resultado:", results)
            res.redirect('/admin');
        }
    })
}

module.exports = crud_update   