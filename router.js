const express = require('express');
const router = express.Router();

//Invocamos a la conexion de la DB
const conexion = require('./database/db');

//RUTA PARA MOSTRAR TODOS LOS REGISTROS
router.get('/crud', (req, res)=>{           
     conexion.query('SELECT * FROM registro',(error, results)=>{
        if(error){
            throw error;
        } else {                                                                
            res.render('crud.ejs', {data:results});                                               
        }   
    })
})

//ruta para enviar los datos en formato json
router.get('/data', (req, res)=>{     
    conexion.query('SELECT * FROM registro',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})

//RUTA QUE NOS LLEVA AL FORMULARIO PARA DAR DE ALTA UN NUEVO REGISTRO
router.get('/create', (req,res)=>{
    res.render('create');
})

//RUTA QUE NOS LLEVA AL REGISTRO
router.get('/ruta2', (req,res)=>{
    conexion.query('SELECT * FROM registro',(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('registro', {data:results});
        }
    } )
    
})
//RUTA QUE NOS LLEVA AL INCIO DE PAGINA
router.get('/', (req,res)=>{
    res.render('inicio');
})

//RUTA QUE NOS LLEVA AL INCIO DE PAGINA
router.get('/ruta', (req,res)=>{
    res.render('index');
})

//RUTA QUE NOS LLEVA AL ACERCA DE NOSOTROS
router.get('/ruta1', (req,res)=>{
    res.render('acerca');
})


//RUTA QUE NOS LLEVA AL REGISTRO
router.get('/ruta3', (req,res)=>{
    res.render('test1');
})

//RUTA QUE NOS LLEVA AL REGISTRO
router.get('/ruta4', (req,res)=>{
    res.render('test2');
})

//RUTA QUE NOS LLEVA AL REGISTRO
router.get('/ruta5', (req,res)=>{
    res.render('test3');
})

//RUTA QUE NOS LLEVA AL REGISTRO
router.get('/ruta6', (req,res)=>{
    res.render('infoA');
})

//RUTA QUE NOS LLEVA AL REGISTRO
router.get('/ruta7', (req,res)=>{
    res.render('infoB');
})

//RUTA QUE NOS LLEVA AL REGISTRO
router.get('/ruta8', (req,res)=>{
    res.render('infoD');
})

//RUTA QUE NOS LLEVA AL REGISTRO
router.get('/ruta9', (req,res)=>{
    res.render('login');
})

//RUTA QUE NOS LLEVA AL REGISTRO
router.get('/ruta10', (req,res)=>{
    res.render('AnsiedadC');
})

//RUTA QUE NOS LLEVA AL REGISTRO
router.get('/ruta11', (req,res)=>{
    res.render('DepresionC');
})

//RUTA QUE NOS LLEVA AL REGISTRO
router.get('/ruta12', (req,res)=>{
    res.render('BipolaridadC');
})







//RUTA PARA EDITAR UN REGISTRO SELECCIONADO
router.get('/edit/:id', (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM registro WHERE id=?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('edit.ejs', {user:results[0]});            
        }        
    });
});

//RUTA PARA ELIMINAR UN REGISTRO SELECCIONADO
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM registro WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
    })
});



//Invocamos los metodos para el CRUD
const crud = require('./controllers/crud');
const { json } = require('express');

// usamos router.post porque en el formulario el method="POST"
router.post('/save', crud.save);
router.post('/update', crud.update);
router.get('/GenerarReporte',crud.GenerarReporte);




module.exports = router;