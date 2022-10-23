// conexion sacada de app 
const conexion = require('../database/db');  //importacion-pedir

const crud_crear = (datosUsuario, res) => {
    console.log("Creando usuario con datos:", datosUsuario)
    conexion.query('INSERT INTO registro SET ?', 
        { 
            nombres: datosUsuario.nombres,
            apellidos: datosUsuario.apellidos,
            telefono: datosUsuario.telefono,
            correo: datosUsuario.correo,
            usuario: datosUsuario.usuario,
            contrasena: datosUsuario.contrasena
        },
        (error, results) => {
            if(error) {
                console.log(error)
            } else {
                console.log("resultado:", results)
                res.redirect('/admin');
            }
        }
    )
}   
    
//con este se habla a la base de datos.

// exportarcion de la funcion crud-crear.
module.exports = crud_crear   
//exportacion-mandar