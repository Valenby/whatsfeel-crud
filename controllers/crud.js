//Invocamos a la conexion de la DB
const conexion = require('../database/db');

//GUARDAR un REGISTRO
exports.save = (req, res) => {

    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    conexion.query('INSERT INTO registro SET ?', { nombres: nombres, apellidos: apellidos, telefono: telefono, correo: correo, usuario: usuario, contrasena: contrasena }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            //console.log(results);   
            res.redirect('/');
        }
    });
};



//ACTUALIZAR un REGISTRO
exports.update = (req, res) => {
    const id = req.body.id;

    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    conexion.query('UPDATE registro SET ? WHERE id = ?', [{ nombres: nombres, apellidos: apellidos, telefono: telefono, correo: correo, usuario: usuario, contrasena: contrasena }, id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/');
        }
    });

    //ELIMINAR un REGISTRO
    /*
    exports.delete = (req, res)=>{
        console.log(req.params.id)    ;
        console.log('LLEGAMOS A ELIMINAR');
        const id = req.body.id;
        conexion.query('DELETE FROM users WHERE id = ?',[id], (error, results)=>{
            if(error){
                console.log(error);
            }else{           
                res.redirect('/');         
            }
        }) 
    }*/
};
exports.GenerarReporte = (req, res) => {

    var pdf = require('html-pdf');
    var fs = require('fs');
   

    conexion.query("SELECT P.nombres, P.apellidos, P.telefono,P.correo,P.usuario ,P.contrasena FROM registro P;", (err, rs) => {

        if (err) {

            console.log(err);

        } 
        else {
            var contenido = `
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
`;
            console.log(rs);
            rs.forEach(element => {


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
            pdf.create(contenido).toFile('./salida.pdf', function (error, results) {
                if (error) {
                    console.log(error);

                } else {

                    var file = fs.createReadStream('./salida.pdf');
                    var stat = fs.statSync('./salida.pdf');
                    res.setHeader('Content-Length', stat.size);
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
                    file.pipe(res);


                }
            });



        }


    });



}
