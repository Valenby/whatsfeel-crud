const conexion = require('../database/db');  //importacion-pedir
const pdf = require('html-pdf');
const fs = require('fs');

const reporte = (res) => {
    //con este codigo query vamos a la base de datos y mediante el boton trae datos.
    conexion.query("SELECT P.nombres, P.apellidos, P.telefono,P.correo,P.usuario ,P.contrasena FROM registro P;", (err, rs) => {
        if(err) {
            console.log(error)
        } else {
            console.log("resultado:", rs)  //TABLA PRINCIPAL
            let contenido = `
                <center>         
                <br>
                <h1>REPORTE DE AGENDAMIENTO WHATSFEEL</h1></center>
                <br><br>
                <table  style = "border : 1px solid black  ; width:100%; ">
                <tr>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Telefono</th>
                    <th>Correo</th>
                    <th>Usuario</th>
                    <th>Contraseña</th>
                </tr>
            `
            rs.forEach(element => {     // FOREACH COGE CADA ELEMENTO DE LA LISTA(por cada elemento de la base d edatos crea un contenido)
                contenido += `<tr> <td style="border : 1px solid black ;" > ` + element["nombres"] + `</td>
                <td style="border : 1px solid black ;" > `+ element["apellidos"] + `</td>
                <td style="border : 1px solid black ;" > `+ element["telefono"] + `</td>
                <td style="border : 1px solid black ;" > `+ element["correo"] + `</td>
                <td style="border : 1px solid black ;" > `+ element["usuario"] + `</td>
                <td style="border : 1px solid black ;" > `+ element["contrasena"] + `</td>
                </tr> `
            });
            contenido += "</table>"
            console.log(contenido);
            pdf.create(contenido).toFile('./salida2.pdf', function (error, results) { //crear pdf y salida
                if (error) {
                    console.log(error);
                } else {

                    var file = fs.createReadStream('./salida2.pdf');
                    var stat = fs.statSync('./salida2.pdf');
                    res.setHeader('Content-Length', stat.size);
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'attachment; filename=reporte.pdf');
                    file.pipe(res);

                }

            })

        }

    })
}
    
module.exports = reporte
