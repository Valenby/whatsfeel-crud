//vista administrativa: rutas.
const express = require('express');
const router = express.Router();

// conexion a la base de datos
const conexion = require('./database/db'); 

//importacion de la funcion curdCrear
const importacionFuncionCrudCrear = require('./admin/create') 
const importarFuncionCrudLeer = require('./admin/read')
const importarFuncionCrudUpdate = require('./admin/update')
const importarFuncionCrudDelete = require('./admin/delete')
const importarFuncionReporte = require('./admin/reporte')

//RUTA PRINCIPAL /ADMIN que esta en app-whatsfeel.
router.get('/', (req, res)=>{           
    conexion.query('SELECT * FROM registro',(error, results)=>{
        if(error){
            throw error;
        } else {                                                               
            res.render('admintabla.ejs', {data:results});                                               
        }   
    })
})

//RUTA CREACION DE LA C-crud.
router.get('/create-user', (req, res)=>{ //barra create nos renderizar el archivo admincreate(que es para crear datos uwu html)                                                 
    res.render('admincreatehtml.ejs');                                               
})

//RUTA QUE RECIBE LOS DATOS-USUARIO
router.post('/create-user/guardar', (req,res) =>{
    importacionFuncionCrudCrear(req.body, res) // recibe los datos.usuario y los imprime de la funcion creada en la carpeta(CREATE.JS)
    // (rep.body)= estos son todos los datos que se envian desde el fronend
})

//RUTA CREACION DE LA R-crud
router.get('/read-user/:userid', (req, res)=>{  // con el : after / para crear un parametro dentro de un endpoint. ('/read-user/:id')                                          
    let id = req.params.userid     //req.params extrae lo que tienen los parametros        
    // console.log(id)        
    importarFuncionCrudLeer(id,res) //aca solo recibe el id uwu

})


// RUTA PARA QUE FUNCIONE EL HTLM EN UPDATE
router.get('/datosEdit/:id', (req,res)=>{
    let id = req.params.id
    conexion.query('SELECT * FROM registro WHERE id=?',[id] , (error, results) => { //esto devuelve la informacion de lo que se va actualizar
        if (error) {
            throw error;
        }else{            
            res.render('adminupdatehtml.ejs', {user:results[0]});            
        }        
    });

})

// RUTA CREACION DE LA U-crud
router.post('/update-user', (req,res)=>{
    let id = req.body.id
    importarFuncionCrudUpdate(id, req.body, res)
})

//RUTA CREACION DE LA D-crud

router.get('/delete-user/:id', (req,res)=>{
    const id = req.params.id;
    importarFuncionCrudDelete(id,res)
})

router.get('/descargar-reporte', (req,res)=>{
    console.log("descarga de reporte exitoso")
    importarFuncionReporte(res)
})



module.exports = router;